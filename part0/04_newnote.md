Diagram created basedon service from https://www.websequencediagrams.com/

```
user->browser: write something into the texfield
user->browser: click the submit button
browser-->server: HTTP POST https://fullstack-exampleapp.herokuapp.com/new_note
server-->browser:Display updated notes

note over browser:
https://fullstack-exampleapp.herokuapp.com/notes
end note

```