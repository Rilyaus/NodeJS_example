var express = require('express');
var app = express();
app.locals.pretty = true;
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));

app.get('/topic', (req, res) => {
    var topics = [
        'Javascript is ...',
        'Node JS is ...',
        'Express is ...'
    ];
    var output = `
    <a href="/topic?id=0">JavaScript</a><br>
    <a href="/topic?id=1">Node JS</a><br>
    <a href="/topic?id=2">Express</a><br><br>
    ${topics[req.query.id]}
    `;
    res.send(output);
});

app.get('/template', (req, res) => {
    res.render('temp', {_title:'Node JS and Pug', time:Date()});
});
app.get('/', (req, res) => {
    res.send('Hello home page');
});

app.get('/dynamic', (req, res) => {
    var output = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <title></title>
        </head>
        <body>
            Hello Dynamic !
        </body>
    </html>`;
    res.send(output);
});

app.get('/Queen', (req, res) => {
    res.send('Hello Router, <img src="/Queen.jpg">');
});

app.get('/login', (req, res) => {
    res.send('Login please');
});

app.listen(3000, (req, res) => {
    console.log('Conneted 3000 port!');
});
