/*       ___-------------___                                                                                                                    
        /                   \                                                                       __
       |    |           |    |   /'\_/`\   __                                                      /\ \__                 
   /\  |    |  ^  w  ^  |    |  /\      \ /\_\     ___       __       ___     ___    __  __    ___ \ \ ,_\     __   _ __          
   \ \_/____/           \____|  \ \ \__\ \\/\ \  /' _ `\   /'__`\    /'___\  / __`\ /\ \/\ \ /' _ `\\ \ \/   /'__`\/\`'__\   
    \                        /   \ \ \_/\ \\ \ \ /\ \/\ \ /\ \L\.\_ /\ \__/ /\ \L\ \\ \ \_\ \/\ \/\ \\ \ \_ /\  __/\ \ \/               
     |   _   ____    ___    /     \ \_\\ \_\\ \_\\ \_\ \_\\ \__/.\_\\ \____\\ \____/ \ \____/\ \_\ \_\\ \__\\ \____\\ \_\        
     |__| |_|    |__|   |__|       \/_/ \/_/ \/_/ \/_/\/_/ \/__/\/_/ \/____/ \/___/   \/___/  \/_/\/_/ \/__/ \/____/ \/_/                                                                                                                                                              
*/

/* Counter Settings */
// Lines between /* and */ or starting with // are comments and are ignored. */
/* To use the default value for a setting, add a // before the setting. e.g. //counter_font_size = '5rem'. */

/* Twitch channel with follower goal enabled */
channel_name = 'cerberVT'

/* Font size of the counter. Units that can be used px, em, rem, and ex. */
counter_font_size = '5rem'

/* Font to use for the counter */ 
counter_font = 'Vividly'

/* Font color of the counter.
 * Can also use HTML color names (see below for list of color names) 
 * and rgb(red, green, blue) where red, green, and blue are numbers from 0 - 255. 
 * e.g. counter_color = 'rgb(240, 64, 178)' 
 */
counter_color = '#f040b2'

/* Counter outline size */
counter_outline_width = '2px'

/* Counter outline color */
counter_outline_color = '#000000'


/* List of chat commands:
 *   !counter reconnect                   - attempts to reconnect the counter to Twitch without reloading the counter (broadcaster and mods only)
 *   !counter refresh/reload              - reloads the counter overlay page (broadcaster and mods only)
 *   !counter color <color, reset>        - set counter color (broadcaster, mods, VIPs, and allowed users only)
 *   !counter font <font, reset>          - set counter font (broadcaster, mods, VIPs, and allowed users only)
 *   !counter fontSize <size, reset>      - set counter font size (broadcaster, mods, VIPs, and allowed users only)
 *   !counter outlineColor <color, reset> - set counter outline color size (broadcaster, mods, VIPs, and allowed users only)
 *   !counter outlineWidth <width, reset> - set counter outline width (broadcaster, mods, VIPs, and allowed users only)
 *   !counter show                        - show the counter (broadcaster and mods only)
 *   !counter hide                        - hide the counter (broadcaster and mods only)
 *   !counter allowMods <1, 0>            - allow mods to run commands (broadcaster only)
 *   !counter allowVips <1, 0>            - allow VIPs to run commands (broadcaster and mods only)
 *   !counter allowUser <username>        - allow a user to run commands (broadcaster and mods only)
 *   !counter removeUser <username>       - remove a user from running commands (broadcaster and mods only)
 *   !counter resetSettings               - reset saved counter style settings (broadcaster and mods only)
 */

/* Allow counter to listen for chat commands. Default setting is false. */
allow_chat_commands = false

/* The chat command that the counter will listen for (! and ? is automatically prepended). 
 * Default is counter (!counter or ?counter in chat). 
 */
chat_command_keyword = 'counter'

/* Allow Mods to run counter commands. Default setting is true. */
allow_mods_run_commands = true

/* Allow VIPs to run counter commands. Default setting is false. */
allow_vips_run_commands = false

/* Allow specific users to run counter commands. Separate each name with a space. Default setting is '' (no specific users allowed to run commands). */
allowed_users_run_commands = ''

/* Cooldown in seconds for refresh/reload/reconnect commands */
reload_command_cooldown = 30

/* Cooldown in seconds for other commands */
command_cooldown = 5


/* Advanced Options */
/* The ping interval in minutes for keeping the Twitch PubSub WebSocket connected. 
 * Try lowering this setting if the counter loses connection to Twitch and stops updating. 
 * Allowed range is 1 to 4 minutes inclusive. Default is 4 minutes.
 */
ping_interval = 4

/* Whether to load saved style settings from localStorage */
load_saved_settings = true

/* List of HTML colors:
 * HTML Color Name      Hex Color Code     Color Group
 * Aqua                 #00ffff            Blue 
 * AquaMarine           #7fffd4            Blue 
 * Blue                 #0000ff            Blue 
 * CadetBlue            #5f9ea0            Blue 
 * CornFlowerBlue       #6495ed            Blue 
 * Cyan                 #00ffff            Blue 
 * DarkBlue             #00008b            Blue 
 * DarkTurquoise        #00ced1            Blue 
 * DeepSkyBlue          #00bfff            Blue 
 * DodgerBlue           #1e90ff            Blue 
 * LightBlue            #add8e6            Blue 
 * LightCyan            #e0ffff            Blue 
 * LightSkyBlue         #87cefa            Blue 
 * LightSteelBlue       #b0c4de            Blue 
 * MediumBlue           #0000cd            Blue 
 * MediumSlateBlue      #7b68ee            Blue 
 * MediumTurquoise      #48d1cc            Blue 
 * MidnightBlue         #191970            Blue 
 * Navy                 #000080            Blue 
 * PaleTurquoise        #afeeee            Blue 
 * PowderBlue           #b0e0e6            Blue 
 * RoyalBlue            #4169e1            Blue 
 * SkyBlue              #87ceeb            Blue 
 * SteelBlue            #4682b4            Blue 
 * Turquoise            #40e0d0            Blue 
 *  
 * Bisque               #ffe4c4            Brown 
 * BlanchedAlmond       #ffebcd            Brown 
 * Brown                #a52a2a            Brown 
 * BurlyWood            #deb887            Brown 
 * Chocolate            #d2691e            Brown 
 * Cornsilk             #fff8dc            Brown 
 * DarkGoldenRod        #b8860b            Brown 
 * GoldenRod            #daa520            Brown 
 * Maroon               #800000            Brown 
 * NavajoWhite          #ffdead            Brown 
 * Peru                 #cd853f            Brown 
 * RosyBrown            #bc8f8f            Brown 
 * SaddleBrown          #8b4513            Brown 
 * SandyBrown           #f4a460            Brown 
 * Sienna               #a0522d            Brown 
 * Tan                  #d2b48c            Brown 
 * Wheat                #f5deb3            Brown 
 *  
 * Black                #000000            Gray 
 * DarkGray             #a9a9a9            Gray 
 * DarkSlateGray        #2f4f4f            Gray 
 * DimGray              #696969            Gray 
 * Gainsboro            #dcdcdc            Gray 
 * Gray                 #808080            Gray 
 * LightGray            #d3d3d3            Gray 
 * LightSlateGray       #778899            Gray 
 * Silver               #c0c0c0            Gray 
 * SlateGray            #708090            Gray 
 *  
 * YellowGreen          #9acd32            Green
 * Chartreuse           #7fff00            Green 
 * DarkCyan             #008b8b            Green 
 * DarkGreen            #006400            Green 
 * DarkOliveGreen       #556b2f            Green 
 * DarkSeaGreen         #8fbc8f            Green 
 * ForestGreen          #228b22            Green 
 * Green                #008000            Green 
 * GreenYellow          #adff2f            Green 
 * LawnGreen            #7cfc00            Green 
 * LightGreen           #90ee90            Green 
 * LightSeaGreen        #20b2aa            Green 
 * Lime                 #00ff00            Green 
 * LimeGreen            #32cd32            Green 
 * MediumAquaMarine     #66cdaa            Green 
 * MediumSeaGreen       #3cb371            Green 
 * MediumSpringGreen    #00fa9a            Green 
 * Olive                #808000            Green 
 * OliveDrab            #6b8e23            Green 
 * PaleGreen            #98fb98            Green 
 * SeaGreen             #2e8b57            Green 
 * SpringGreen          #00ff7f            Green 
 * Teal                 #008080            Green 
 *  
 * Coral                #ff7f50            Orange 
 * DarkOrange           #ff8c00            Orange 
 * LightSalmon          #ffa07a            Orange 
 * Orange               #ffa500            Orange 
 * OrangeRed            #ff4500            Orange 
 * Tomato               #ff6347            Orange 
 *  
 * DeepPink             #ff1493            Pink 
 * HotPink              #ff69b4            Pink 
 * LightPink            #ffb6c1            Pink 
 * MediumVioletRed      #c71585            Pink 
 * PaleVioletRed        #db7093            Pink 
 * Pink                 #ffc0cb            Pink 
 *  
 * BlueViolet           #8a2be2            Purple 
 * DarkMagenta          #8b008b            Purple 
 * DarkOrchid           #9932cc            Purple 
 * DarkSlateBlue        #483d8b            Purple 
 * DarkViolet           #9400d3            Purple 
 * Fuchsia              #ff00ff            Purple 
 * Indigo               #4b0082            Purple 
 * Lavender             #e6e6fa            Purple 
 * Magenta              #ff00ff            Purple 
 * MediumOrchid         #ba55d3            Purple 
 * MediumPurple         #9370d8            Purple 
 * Orchid               #da70d6            Purple 
 * Plum                 #dda0dd            Purple 
 * Purple               #800080            Purple 
 * SlateBlue            #6a5acd            Purple 
 * Thistle              #d8bfd8            Purple 
 * Violet               #ee82ee            Purple 
 *  
 * Crimson              #dc143c            Red 
 * DarkRed              #8b0000            Red 
 * DarkSalmon           #e9967a            Red 
 * FireBrick            #b22222            Red 
 * IndianRed            #cd5c5c            Red 
 * LightCoral           #f08080            Red 
 * Red                  #ff0000            Red 
 * Salmon               #fa8072            Red 
 *  
 * AliceBlue            #f0f8ff            White 
 * AntiqueWhite         #faebd7            White 
 * Azure                #f0ffff            White 
 * Beige                #f5f5dc            White 
 * FloralWhite          #fffaf0            White 
 * GhostWhite           #f8f8ff            White 
 * HoneyDew             #f0fff0            White 
 * Ivory                #fffff0            White 
 * LavenderBlush        #fff0f5            White 
 * Linen                #faf0e6            White 
 * MintCream            #f5fffa            White 
 * MistyRose            #ffe4e1            White 
 * OldLace              #fdf5e6            White 
 * SeaShell             #fff5ee            White 
 * Snow                 #fffafa            White 
 * White                #ffffff            White 
 * WhiteSmoke           #f5f5f5            White 
 *  
 * DarkKhaki            #bdb76b            Yellow 
 * Gold                 #ffd700            Yellow 
 * Khaki                #f0e68c            Yellow 
 * LemonChiffon         #fffacd            Yellow 
 * LightGoldenrodYellow #fafad2            Yellow 
 * LightYellow          #ffffe0            Yellow 
 * Moccasin             #ffe4b5            Yellow 
 * PaleGoldenRod        #eee8aa            Yellow 
 * PapayaWhip           #ffefd5            Yellow 
 * PeachPuff            #ffdab9            Yellow 
 * Yellow               #ffff00            Yellow 
 */

