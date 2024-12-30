var debug = false
const ps = new PubSubClient()

const counterElement = document.querySelector('#counter')

async function getInitialState(channelName) {
    const request = [
        {
            "operationName": "ActiveGoals",
            "variables": {
                "channelLogin": `${channelName}`
            },
            "extensions": {
                "persistedQuery": {
                    "version": 1,
                    "sha256Hash": "c855218eb019092b69369658150473e440e1c09cb8515396897b96cfe350e647"
                }
            }
        }
    ]

    const response = await sendRequest(request)
    const channel = response[0].data.channel

    const id = channel?.id ?? undefined
    const followerEdge = channel?.goals?.edges?.find((edge) => edge.node.contributionType == 'FOLLOWERS')
    const { currentContributions, targetContributions } = followerEdge?.node ?? { undefined, undefined }
    return { id, currentContributions, targetContributions }
}

function sendRequest(request) {
    return fetch('https://gql.twitch.tv/gql', {
        method: 'POST',
        headers: {
            'Client-id': 'kimne78kx3ncx6brgo4mv6wki5h1ko'
        },
        body: JSON.stringify(request)
    }).then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        } else {
            return response.json()
        }
    }).then((json) => {
        const errors = json[0].errors
        if (errors) {
            throw new Error(`GraphQL error! Error(s): ${JSON.stringify(errors)}`)
        } else {
            return json
        }
    })
}

function setCounterColor(color) {
    counterElement.style.color = color
}

function getCounterColor() {
    return counterElement.style.color
}

function setCounterFont(font) {
    counterElement.style.fontFamily = font
}

function getCounterFont() {
    return counterElement.style.fontFamily
}

function setCounterFontSize(fontSize) {
    counterElement.style.fontSize = fontSize
}

function getCounterFontSize() {
    return counterElement.style.fontSize
}

function setCounterOutlineColor(outlineColor) {
    counterElement.style.setProperty('-webkit-text-stroke-color', outlineColor)
}

function getCounterOutlineColor() {
    return counterElement.style.getPropertyValue('-webkit-text-stroke-color')
}

function setCounterOutlineWidth(outlineWidth) {
    counterElement.style.setProperty('-webkit-text-stroke-width', outlineWidth)
}

function getCounterOutlineWidth() {
    return counterElement.style.getPropertyValue('-webkit-text-stroke-width')
}

function setStyles() {
    setCounterColor(configWanager.getSetting('counter_color'))
    setCounterFont(configWanager.getSetting('counter_font'))
    setCounterFontSize(configWanager.getSetting('counter_font_size'))
    setCounterOutlineColor(configWanager.getSetting('counter_outline_color'))
    setCounterOutlineWidth(configWanager.getSetting('counter_outline_width'))
}

function handleCounterUpdate(event) {
    if (debug) console.log(`Got message: ${JSON.stringify(event.data)}`)

    if (event.data.type == 'MESSAGE') {
        const data = JSON.parse(event.data.data.message).data
        if (data.goal.contributionType == 'FOLLOWERS') {
            if (getCounter() < 0) {
                setCounterText('')
            }
            setCounter(data.goal.currentContributions)
        }
    }
}

function getCounter() {
    return counterElement.style.getPropertyValue('--num')
}

function setCounter(amount) {
    counterElement.style.setProperty('--num', amount)
}

function setCounterText(text) {
    counterElement.textContent = ` ${text}`
}

function showCounter() {
    counterElement.hidden = false
}

function hideCounter() {
    counterElement.hidden = true
}

async function main() {
    configWanager.load()
    setStyles()

    const channelName = configWanager.getSetting('channel_name')

    if (channelName) {
        if (configWanager.getSetting('allow_chat_commands')) {
            initTmi(channelName)
        }

        const { id, currentContributions } = await getInitialState(channelName)

        if (currentContributions != undefined) {
            setCounter(currentContributions)
        } else {
            setCounter(-404)
            setCounterText('Follower goal not found')
        }

        if (id != undefined) {
            ps.addEventListener('PS_onMessage', handleCounterUpdate)

            ps.addEventListener('PS_onOpen', (e) => {
                ps.listen(`creator-goals-events-v1.${id}`)
            })

            ps.addEventListener('PS_onReconnecting', async (e) => {
                const { currentContributions } = await getInitialState(channelName)
                setCounter(currentContributions)
            })

            ps.connect()
        } else {
            setCounter(-404)
            setCounterText('Channel not found')
        }
    } else {
        const msg = 'No channel name configured!'
        setCounterText(msg)
    }
}
main();
