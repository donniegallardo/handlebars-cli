#!/usr/bin/env node

var fs = require('fs'),
    args = require('optimist').argv,
    hbs = require('handlebars');

var argv = process.argv.slice(2);
if (!argv[0] || argv[0] == "--help") {
    console.log(`Usage:
cat template.handlebars | gih --KEY1 VALUE1 --KEY2 VALUE2 > outfile.ext
cat _render_TEMPLATE.sh.handlebars | gih --MODELNAME model_gia-ds-daliwill-210123-v02_new > render.sh 
gih --STCGOAL "That is my goal"<<<$(cat template.sh.handlebars)
`);
    process.exit(1)
}
var templateFile = "";
var fileout = "";
//console.log("args0 :" + args._[0]);
//console.log("args1 :" + args._[1]);

if (args._[1] && fs.existsSync(args._[1])) {
    templateFile = args._[1];
    //  console.log(`            //@state We have out template as second arg    `);
    for (var key in args) {
        try {
            if (key == "out") fileout = args[key];
            args[key] = JSON.parse(args[key]);
        } catch (e) {
        }
    }
    //console.log(args);
}
//console.log(fileout);
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

//console.log(args);

function readStream(s, done) {
    var bufs = [];
    s.on('data', function (d) {
        bufs.push(d);
    });
    s.on('end', function () {
        done(null, Buffer.concat(bufs));
    });
    s.resume();
}
function readTemplate(done) {
    fs.readFile(templateFile, { encoding: 'utf-8' }, function (err, data) {
        if (err) console.error(err);
        else
            done(data);
    })
}

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

if (templateFile == "")
    readStream(process.stdin, function (err, tmpl) {
        process.stdout.write(handle(tmpl, args));
    });
else {
    // console.log("We wont use stream");
    readTemplate(function (tmpl) {
        if (fileout != "") {
            fs.writeFileSync(fileout, handle(tmpl, args));
            console.log("Written " + fileout);
        }
        else
            process.stdout.write(handle(tmpl, args));
    });
}

