const YAML = require('yaml');
const fs = require('fs');

const jsonURL = 'http://localhost/v1/api?f=json';

exports.apiDef = async function apiDef(context) {
    !context.params.query.f ? f = 'json' : f = context.params.query.f;
    if (f == 'json') {
        const Doc = YAML.parse(fs.readFileSync('./apidefinition.yaml', 'utf8'));
        context.res
            .status(200)
            .set('content-type','application/json')
            .setBody(Doc);
    } else if (f == 'html') {
        //console.log(Def);
        //const Def1=JSON.parse(Def);
        const scalarCode =
            '<!doctype html>' +
            '<html>' +
            '<head>' +
            '<title>API Reference</title>' +
            '<meta charset="utf-8" />' +
            '<meta' +
            'name="viewport"' +
            'content = "width=device-width, initial-scale=1" />' +
            '<style>' +
            'body {' +
            'margin: 0;' +
            '}' +
            '</style >' +
            '</head >' +
            '<body>' +
            '<script ' +
            'id="api-reference" ' +
            //'type="application/json" ' +
            'data-url="' + jsonURL + '">' +
            '</script>' +
            '<script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"></script>' +
            '</body>' +
            '</html>'
        /*
        const redocCode = '<html>' +
            '<head>' +
            '<title>Documentation</title>' +
            '</head>' +
            '<body>' +
            '<redoc spec-url=' + jsonURL + '></redoc>' +
            '<script src="https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js"> </script>' +
            '</body>' +
            '</html>'
               */
        context.res
            .status(200)
            .set('content-type', 'text/html')
            .setBody(scalarCode);

    }
}