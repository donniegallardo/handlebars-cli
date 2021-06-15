#!/usr/bin/env node

var fs   = require('fs'),
    args = require('optimist').argv,
    hbs  = require('handlebars');

var argv = process.argv.slice(2);
if (argv && argv[0] == "--help") 
{console.log(`Usage:
cat template.handlebars | gih --KEY1 VALUE1 --KEY2 VALUE2 > outfile.ext
cat _render_TEMPLATE.sh.handlebars | gih --MODELNAME model_gia-ds-daliwill-210123-v02_new > render.sh `);
process.exit(1)
}

if (args._.length) {
    try {
        args = JSON.parse(fs.readFileSync(args._[0]).toString());
    } catch (e) { }
}
else for (var key in args) {
    try {
        args[key] = JSON.parse(args[key]);
    } catch (e) {
    }
}

function readStream(s, done) {
    var bufs = [];
    s.on('data', function(d) {
        bufs.push(d);
    });
    s.on('end', function() {
        done(null, Buffer.concat(bufs));
    });
    s.resume();
}

readStream(process.stdin, function(err, tmpl) {
    function handle(tmpl, args) {
        hbs.registerHelper('include', function (file, context, opt) {
            var context = null == context ? args : context;
            var f = fs.readFileSync(file);
            return handle(f, context); 
        });
        var template = hbs.compile(tmpl.toString());
        var result = template(args);
        return result;
    }
    process.stdout.write(handle(tmpl, args));
});

