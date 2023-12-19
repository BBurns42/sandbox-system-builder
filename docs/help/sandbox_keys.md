# Keys in Sandbox

All items in Sandbox must have a unique key that identifies them. 

## Key requirements

- Must not be empty
- A string of characters, minimum 1 character but no maximum limit
- No whitespaces inside or around the string
- No special characters(dot,comma,semicolon etc)
- Is case sensitive(`aaa` is different from `AAA`)

## Key uniqueness requirement

Sandbox offers two options

- Standard(default)

  Keys can be duplicate between item datatypes except panels/multipanels

- Enforced

  Keys are valid if containing only A-Z,a-z,0-9,_(underscore)
  Keys can not be duplicate between datatypes

See [Sandbox Settings](sandbox_settings.md) for more information

## Key recommendations

For ease of standard, it is recommended to use only A-Z(upper-case),0-9,_(underscore)