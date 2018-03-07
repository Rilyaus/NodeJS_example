var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.locals.pretty = true;
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/form', (req, res) => {
    res.render('form');
});
app.get('/form_receiver', (req, res) => {
    var title= req.query.title;
    var description = req.query.description;
    res.send(title + ',' + description);
});
app.post('/form_receiver', (req, res) => {
    var title = req.body.title;
    var description = req.body.description;
    res.send(title + ',' + description);
});

app.get('/topic/:id', (req, res) => {
    var topics = [
        'Javascript is ...',
        'Node JS is ...',
        'Express is ...'
    ];
    var output = `
    <a href="/topic?id=0">JavaScript</a><br>
    <a href="/topic?id=1">Node JS</a><br>
    <a href="/topic?id=2">Express</a><br><br>
    ${topics[req.params.id]}
    `;
    res.send(output);
});
app.get('/topic/:id/:mode', (req, res) => {
    res.send(req.params.id + ',' + req.params.mode);
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
