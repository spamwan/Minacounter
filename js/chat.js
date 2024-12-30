let tmiClient
let reloadRefreshCooldown = Date.now()
let chatCommandCooldown = Date.now()

function initTmi(channelName) {
    tmiClient = new tmi.Client({
        channels: [channelName]
    })

    tmiClient.connect().catch(console.error)

    tmiClient.on('message', onChatMsg)
}

function isCooldownElapsed(subcommand) {
    let cooldownElapsed = false

    switch (subcommand) {
        case 'reconnect':
        case 'reload':
        case 'refresh':
            cooldownElapsed = (Date.now() - reloadRefreshCooldown) > configWanager.getSetting('reload_command_cooldown') * 1000
            if (cooldownElapsed) {
                reloadRefreshCooldown = Date.now()
            }
            break
        case 'color':
        case 'font':
        case 'font_size':
        case 'fontsize':
        case 'outline_color':
        case 'outlinecolor':
        case 'outline_width':
        case 'outlinewidth':
        case 'allow_mod':
        case 'allow_mods':
        case 'allowmod':
        case 'allowmods':
        case 'allow_vip':
        case 'allow_vips':
        case 'allowvip':
        case 'allowvips':
        case 'allow_user':
        case 'allowuser':
        case 'remove_user':
        case 'removeuser':
        case 'reset_settings':
        case 'resetsettings':
        case 'show':
        case 'hide':
            cooldownElapsed = (Date.now() - chatCommandCooldown) > configWanager.getSetting('command_cooldown') * 1000
            if (cooldownElapsed) {
                chatCommandCooldown = Date.now()
            }
            break
    }

    return cooldownElapsed
}

function canUserRunSubcommand(subcommand, userTags) {
    const modEnabled = configWanager.getSetting('allow_mods_run_commands')
    const vipEnabled = configWanager.getSetting('allow_vips_run_commands')

    const isBroadcaster = userTags['room-id'] == userTags['user-id']
    const isMod = userTags.mod ?? false
    const isVip = userTags.vip ?? false

    const allowedUsers = configWanager.getSetting('allowed_users_run_commands')
    const isUserAllowed = allowedUsers.has(userTags.username)

    switch (subcommand) {
        case 'color':
        case 'font':
        case 'font_size':
        case 'fontsize':
        case 'outline_color':
        case 'outlinecolor':
        case 'outline_width':
        case 'outlinewidth':
            return (isBroadcaster) || (modEnabled && isMod) || (vipEnabled && isVip) || isUserAllowed
        case 'allow_mod':
        case 'allow_mods':
        case 'allowmod':
        case 'allowmods':
            return (isBroadcaster)
        case 'reconnect':
        case 'reload':
        case 'refresh':
        case 'allow_vip':
        case 'allow_vips':
        case 'allowvip':
        case 'allowvips':
        case 'allow_user':
        case 'allowuser':
        case 'remove_user':
        case 'removeuser':
        case 'reset_settings':
        case 'resetsettings':
        case 'show':
        case 'hide':
            return (isBroadcaster) || (modEnabled && isMod)
    }

    return false
}

async function onChatMsg(channel, tags, message, self) {
    if (self || (!message.startsWith('!') && !message.startsWith('?'))) return;
    if (debug) console.log(`${channel}: tags - ${JSON.stringify(tags)} message - ${message}`)

    const args = message.slice(1).split(' ');
    const command = args.shift()?.toLowerCase();

    if (command === configWanager.getSetting('chat_command_keyword')) {
        const subcommand = args.shift()?.toLowerCase();

        if (!canUserRunSubcommand(subcommand, tags)) return
        if (!isCooldownElapsed(subcommand)) return

        if (debug) console.log(`Got subcommand: ${subcommand} with args ${args.join(' ')}`)

        switch (subcommand) {
            case 'reconnect':
                ps.disconnect()
                ps.connect()
                break

            case 'reload':
            case 'refresh':
                location.reload()
                break

            case 'color': {
                const color = args.join(' ')
                handleStyleCommand('counter_color', color, setCounterColor, getCounterColor)
                break
            }

            case 'font': {
                const font = args.join(' ')
                handleStyleCommand('counter_font', font, setCounterFont, getCounterFont)
                break
            }

            case 'font_size':
            case 'fontsize': {
                const fontSize = args.join('')
                handleStyleCommand('counter_font_size', fontSize, setCounterFontSize, getCounterFontSize)
                break
            }

            case 'outline_color':
            case 'outlinecolor': {
                const color = args.join(' ')
                handleStyleCommand('counter_outline_color', color, setCounterOutlineColor, getCounterOutlineColor)
                break
            }

            case 'outline_width':
            case 'outlinewidth': {
                const width = args.join('')
                handleStyleCommand('counter_outline_width', width, setCounterOutlineWidth, getCounterOutlineWidth)
                break
            }

            case 'allow_mod':
            case 'allow_mods':
            case 'allowmod':
            case 'allowmods': {
                const arg = toBool(args.shift())
                if (arg !== undefined) {
                    configWanager.setSetting('allow_mods_run_commands', arg)
                }
                break
            }

            case 'allow_vip':
            case 'allow_vips':
            case 'allowvip':
            case 'allowvips': {
                const arg = toBool(args.shift())
                if (arg !== undefined) {
                    configWanager.setSetting('allow_vips_run_commands', arg)
                }
                break
            }

            case 'allow_user':
            case 'allowuser': {
                const username = args.shift()?.toLowerCase()
                if (username) {
                    const allowedUsers = configWanager.getSetting('allowed_users_run_commands')
                    allowedUsers.add(username)
                }
                break
            }

            case 'remove_user':
            case 'removeuser': {
                const username = args.shift()?.toLowerCase()
                if (username) {
                    const allowedUsers = configWanager.getSetting('allowed_users_run_commands')
                    allowedUsers.delete(username)
                }
                break
            }

            case 'reset_settings':
            case 'resetsettings':
                configWanager.clearSettings()
                setStyles()
                break

            case 'hide':
                hideCounter()
                break

            case 'show':
                showCounter()
                break
        }
    }
}

function handleStyleCommand(styleSettingName, styleArg, styleSetter, styleGetter) {
    if (styleArg !== undefined) {
        if (styleArg === 'reset') {
            configWanager.clearSetting(styleSettingName)
            setStyles()
        } else {
            styleSetter(styleArg)
            configWanager.setSetting(styleSettingName, styleGetter())
        }
        configWanager.save()
    }
}
