const express = require('express');
const exegesisExpress = require('exegesis-express');
const path = require('path');
const http = require('http');
//
async function createServer() {
    // See https://github.com/exegesis-js/exegesis/blob/master/docs/Options.md
    const options = {
        controllers: path.resolve(__dirname, 'controllers'),
        allowMissingControllers: false,
    };

    // This creates an exegesis middleware, which can be used with express,
    // connect, or even just by itself.

    const exegesisMiddleware = await exegesisExpress.middleware(
        path.resolve(__dirname, './apidefinition.yaml'),
        options
    );

    const app = express();
    //app.use(cors());
    // If you have any body parsers, this should go before them.
    app.use(exegesisMiddleware);
    /*
    app.use(
        '/reference',
        apiReference({
          spec: {
            content: YAML.parse(fs.readFileSync('./apidefinition.yaml', 'utf8')),
          },
        }),
      );
    */
    const server = http.createServer(app);
    return server;
}
createServer().then(server => {
    server.listen(80, 'localhost');
    console.log('Access Scalardocs at: http://localhost:80/api?f=html')
})
    .catch(err => {
        console.error(err.stack);
        process.exit(1);
    });