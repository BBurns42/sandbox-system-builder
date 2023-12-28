# Sandbox User Interface

This chapter describes various aspects of using a Sandbox world

## Sandbox Toolbar

On the Game Settings tab, the Sandbox Toolbar can be found. From here, you can access various system functions.

![](./resources/game_settings_sandbox_toolbar_annotated.png)

### Build Actor Templates

Re-builds all actor templates. This is the equivalence of clicking Rebuild Sheet on every actor template.

### Check Consistency

Checks and makes sure that all items are consistent. 
Consistency checks are run automatically after a **Build Actor Templates**-command

### Custom CSS

This will only be showed if the module Custom CSS is installed and activated in this world.
Clicking this icon will display the interface for Custom CSS. See [CSS and Styling](css_and_styling.md)

### JSON Export

Starts the Sandbox Export to JSON. See [Exporting and importing](exporting_and_importing.md)

### JSON Import

Starts the Sandbox Import from JSON. See [Exporting and importing](exporting_and_importing.md)

### Sandbox Settings

Shows Sandbox Settings dialog. See [Sandbox Settings](sandbox_settings.md)

### Sandbox Toolbox

Shows the Sandbox Toolbox dialog.

### Bug Report

Shows the bug report dialog

## Sheets Title Bar

Sandbox adds three clickable captions to all items and actor sheets

![](./resources/item_sheet_title_bar.png)

### Icons(Show/Hide Delete/Add)

Shows/hides all delete icons on sheets, it also shows/hides the Add new row icon for free tables.

### Show(Info to others)

This tool makes it easy to show other selected players/GMs an item/actor without needing giving ownership to that item/actor. 

![](./resources/show_to_others_basic.png)

#### Popup

![](./resources/show_to_others_popup.png)

#### Chat

![](./resources/show_to_others_chat.png)

#### Chat(compact)

![](./resources/show_to_others_chat_compact.png)

### Info

This is only shown if the option `Display ID in sheet caption` is enabled in Sheet Options in [Settings](sandbox_settings.md)
It is only shown to GMs.

When clicked, it will output the item/actors data to the Console(press F12).

For actors, CTRL+Click will display the Actor Properties Manager for that actor

## Actor Properties Manager

The Actor Properties manager is a useful tool to remove obsolete properties and otherwise troubleshoot actor properties problems.

![](./resources/actor_properties_manager.png)

## Difficulty Class

If enabled in Settings, this will display a box with a Difficulty Class number, usable in expressions as #{diff}

![](./resources/difficulty_class_input.png)

If defined in Settings, the DC will have a dropdown with defined Difficulty Classes.

## Last Roll

If enabled in Settings, this will display a box with the last roll made

![](./resources/last_roll.png)

