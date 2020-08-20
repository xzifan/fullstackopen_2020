Diagram created basedon service from https://www.websequencediagrams.com/

```
    user->browser: write something into the texfield
    browser-->SPA:Updates in HTML elements
    user->browser: click the submit button
    browser-->SPA: JS functions trigered
    SPA->server:HTTP POST https://fullstack-exampleapp.herokuapp.com/new_note_spa
    server->SPA:HTTP Response
    SPA-->browser:Display updated notes

    note over browser:
    https://fullstack-exampleapp.herokuapp.com/spa
    end note

```