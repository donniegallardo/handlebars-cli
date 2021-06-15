# gih (Guil's handlebars-cli)

Generate template from CLI using handlebars

```sh
Usage: gih [ [data.json]  | [ --KEY val ...] [[--t <TEMPLATE>]|<<<] [[--o <FILEOUT>]| >]
        --t or pipe in 
        --o or pipe out
        one datafile or keys
-------------------------------------------
Example: 
gih --t template.tpl --name allo --name bla > outfile.js
gih --t template.tpl --name allo --name bla --o outfile.js
cat template.handlebars | gih --KEY1 VALUE1 --KEY2 VALUE2 > outfile.ext
cat _render_TEMPLATE.sh.handlebars | gih --MODELNAME model_gia-ds-daliwill-210123-v02_new > render.sh 
gih --STCGOAL "That is my goal"<<<$(cat template.sh.handlebars)

```

Example:

    echo "Hello {{name}}" | gih --name Test

Output:

    Hello Test

You may also pass a JSON string as an argument and it will be 
interpreted as an object.


You can also pass a JSON file:

    gih data.json < template.tpl > output.txt

# install

    npm install -g gih

# include helper

gih comes with a built-in helper `#include`
    
    {{{include 'api.md'}}}

You can also pass context (optional)
    
    {{{include 'render.md.hbs' item}}}

# license

MIT

# distribution and extension

Guillaume Descoteaux-Isabelle, 2021

