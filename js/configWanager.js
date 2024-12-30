var channel_name

// Counter appearance settings
var counter_color
var counter_font
var counter_font_size
var counter_outline_width
var counter_outline_color

// Chat command settings
var allow_chat_commands
var chat_command_keyword
var allow_mods_run_commands
var allow_vips_run_commands
var allowed_users_run_commands
var reload_command_cooldown
var command_cooldown

// Advanced settings
var ping_interval
var load_saved_settings

class ConfigWanager {
    settings = {}
    allowedUsersSet

    getSetting(settingName) {
        let settingValue = this.settings[settingName]

        if (settingValue === undefined) {
            switch (settingName) {
                case 'channel_name':
                    settingValue = channel_name.toLowerCase()
                    break

                case 'counter_color':
                    settingValue = counter_color ?? '#ffffff'
                    break

                case 'counter_font':
                    settingValue = counter_font ?? 'Comic Sans MS'
                    break

                case 'counter_font_size':
                    settingValue = counter_font_size ?? '42px'
                    break

                case 'counter_outline_color':
                    settingValue = counter_outline_color ?? '#000000'
                    break

                case 'counter_outline_width':
                    settingValue = counter_outline_width ?? '1px'
                    break

                case 'allow_chat_commands':
                    settingValue = allow_chat_commands ?? false
                    break

                case 'chat_command_keyword':
                    settingValue = chat_command_keyword ?? 'counter'
                    break

                case 'allow_mods_run_commands':
                    settingValue = allow_mods_run_commands ?? true
                    break

                case 'allow_vips_run_commands':
                    settingValue = allow_vips_run_commands ?? false
                    break

                case 'allowed_users_run_commands':
                    if (!this.allowedUsersSet) {
                        const allowedUsersArray = (allowed_users_run_commands ?? '').split(' ').map((name) => name.toLowerCase())
                        this.allowedUsersSet = new Set(allowedUsersArray != [''] ? allowedUsersArray : undefined)
                    }
                    settingValue = this.allowedUsersSet
                    break

                case 'reload_command_cooldown':
                    settingValue = reload_command_cooldown ?? 30
                    break

                case 'command_cooldown':
                    settingValue = command_cooldown ?? 5
                    break

                case 'ping_interval':
                    settingValue = Math.min(Math.max(1, ping_interval ?? 4), 4)
                    break

                case 'load_saved_settings':
                    settingValue = load_saved_settings ?? false
                    break
            }
        }

        return settingValue
    }

    setSetting(settingName, settingValue) {
        this.settings[settingName] = settingValue
    }

    clearSetting(settingName) {
        delete this.settings[settingName]
    }

    clearSettings() {
        this.settings = {}
        this.save()
    }

    save() {
        window.localStorage.setItem('settings', JSON.stringify(this.settings))
    }

    load() {
        if (this.getSetting('load_saved_settings')) {
            this.settings = JSON.parse(window.localStorage.getItem('settings') ?? '{}')
        }
    }
}

const configWanager = new ConfigWanager()