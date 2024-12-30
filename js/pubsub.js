const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

class PubSubClient extends EventTarget {
    initialReconnectInterval = 1000; // ms to wait before reconnect

    heartbeatInterval = configWanager.getSetting('ping_interval'); // minutes between PINGs
    heartbeatHandle = -1;

    reconnectInterval = this.initialReconnectInterval
    reconnectHandle = -1;

    pongTimeout = 1000 * 15 // ms to wait for pong from server
    pongTimeoutHandle = -1;

    ws; // the websocket
    disconnectRequested = false

    resetReconnectInterval() {
        this.reconnectInterval = this.initialReconnectInterval
    }

    heartbeat() {
        const message = {
            type: 'PING'
        };

        if (debug) console.log('SENT: ' + JSON.stringify(message) + '\n');

        this.ws.send(JSON.stringify(message));
        this.heartbeatHandle = setTimeout(() => this.heartbeat(), this.heartbeatInterval * 60 * 1000);
        this.pongTimeoutHandle = setTimeout(() => this.onPongTimeout(), this.pongTimeout)
    }

    onPongTimeout() {
        clearTimeout(this.pongTimeoutHandle)
        if (debug) console.log(`Did not receive PONG from server in ${this.pongTimeout / 1000} s. Reconnecting...`)
        this.ws.close()
    }

    generateNonce(length = 30) {
        let chars = []
        for (let i = 0; i < length; i++) {
            chars.push(charSet[getRandomInt(0, charSet.length)])
        }
        return chars.join('')
    }

    listen(topic) {
        const message = {
            type: 'LISTEN',
            nonce: this.generateNonce(),
            data: {
                topics: [topic],
            }
        };

        if (debug) console.log('SENT: ' + JSON.stringify(message) + '\n');

        this.ws.send(JSON.stringify(message));
    }

    connect() {
        if (this.ws && (this.ws.readyState === WebSocket.CONNECTING || this.ws.readyState === WebSocket.OPEN)) {
            this.ws.close()
        } else {
            this.ws = new WebSocket('wss://pubsub-edge.twitch.tv');

            this.ws.onopen = (event) => {
                if (debug) console.log('INFO: Socket Opened\n');
                this.heartbeat();
                const ev = new Event('PS_onOpen')
                this.dispatchEvent(ev)
            };

            this.ws.onerror = (error) => {
                if (debug) console.log('ERR:  ' + JSON.stringify(error) + '\n');
            };

            this.ws.onmessage = (event) => {
                const message = JSON.parse(event.data);

                if (debug) console.log('RECV: ' + JSON.stringify(message) + '\n');

                switch (message.type) {
                    case 'RECONNECT':
                        if (debug) console.log('INFO: Got reconnect message. Reconnecting...\n');
                        this.ws.close()
                        break
                    case 'PONG':
                        if (debug) console.log('Got PONG')
                        clearTimeout(this.pongTimeoutHandle)
                        this.resetReconnectInterval()
                        break
                    default:
                        const ev = new Event('PS_onMessage')
                        ev.data = message
                        this.dispatchEvent(ev)
                }
            };

            this.ws.onclose = () => {
                if (debug) console.log('INFO: Socket Closed\n');
                clearTimeout(this.heartbeatHandle);
                clearTimeout(this.pongTimeoutHandle)
                clearTimeout(this.reconnectHandle)

                if (!this.disconnectRequested) {
                    if (debug) console.log('INFO: Reconnecting...\n');
                    this.reconnectHandle = setTimeout(() => this.connect(), this.reconnectInterval);
                    this.reconnectInterval = Math.min(this.reconnectInterval * 2, 1000 * 60 * 2)

                    const ev = new Event('PS_onReconnecting')
                    this.dispatchEvent(ev)
                } else {
                    this.disconnectRequested = false
                }
            };
        }
    }

    disconnect() {
        this.disconnectRequested = true
        this.ws.close()
    }
}
