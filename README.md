# handlebars-cli

Invoke handlebars from the commandline. 

Example:

    echo "Hello {{name}}" | handlebars-cli --name Test

Output:

    Hello Test

You may also pass a JSON string as an argument and it will be 
interpreted as an object.


You can also pass a JSON file:

    handlebars-cli data.json < template.tpl > output.txt

# install

    npm install -g handlebars-cli

# include helper

handlebars-cli comes with a built-in helper `#include`
    
    {{{include 'api.md'}}}

You can also pass context (optional)
    
    {{{include 'render.md.hbs' item}}}

# license

MIT
