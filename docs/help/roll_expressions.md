# Roll Expressions

> :warning:Page under construction, please refer to the previous [README_PREVIOUS.MD](../../README_PREVIOUS.MD)

Rolls can be defined for Properties and cItems, if some requirements are met:
- Properties: a property will trigger a dice roll when its label is clicked on the character sheet, only if the property option "Rollable" is checked. When checked, a Property item will display the roll options menu (see below).
- cItems: all cItems types except PASSIVE accept rolls. When a cItem activation checkbox or icon is clicked on a character sheet, a roll will be triggered.

**Roll options menu**

Both Properties and cItems have a section where you can configure how the roll will be triggered. This menu looks like this:


## Roll expressions flags
Flags can be added at the end of a roll expression, changing basic functionality of the roll.
All flags are used with surrounding tildes `~flag~`
| Flag                  | Description                                                  |
| --------------------- | ------------------------------------------------------------ |
| `~gm~`                | Changes the Roll Mode to Private GM                          |
| `~blind~`             | Changes the Roll Mode to Blind GM                            |
| `~self~`              | Changes the Roll Mode to Self Roll                           |
| `~init~`              | Sends the result of the roll to the initiative on the combat tracker |
| `~nochat~`            | No chat message is created                                   |
| `~noresult~`          | No result is shown in the created chat message               |
| `~secretconditional~` | All text in conditional(`&&...&&`) will be marked as `secret` |