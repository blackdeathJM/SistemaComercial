let path = require('path');
let express = require('express');
let app = express();

app.use(express.static(__dirname + '/sistema-comercial'));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '/sistema-comercial', 'index.html'))
});
app.listen({ port: process.env.PORTFRONT || 5642 }, () => console.log('Servidor iniciado https://26.62.148.73:5642'));
