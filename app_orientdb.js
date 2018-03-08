var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

var OrientDB = require('orientjs');

var server = OrientDB({
   host:       'localhost',
   port:       2424,
   username:   'root',
   password:   '426ckh'
});

var db = server.use('o2');
console.log('Using Database : ' + db.name);
app.locals.pretty = true;
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', './views_orientdb');
app.set('view engine', 'pug');

app.get('/topic/add', (req, res) => {
    fs.readdir('data', (err, files) => {
        if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.render('add', {topics:files});
    });
});

app.get(['/topic', '/topic/:id'], (req, res) => {
    var sql = 'SELECT FROM topic';
    db.query(sql).then( (topics) => {
        var sql = 'SELECT FROM topic WHERE @rid=:rid';
        var id = req.params.id;
        if(id) {
            db.query(sql, {params:{rid:id}}).then( (topic) => {
                res.render('view', {topics:topics, topic:topic[0]});
            });
        } else {
            res.render('view', {topics:topics});
        }
    });
});

app.post('/topic', (req, res) => {
    var title = req.body.title;
    var description = req.body.description;
    fs.writeFile('data/' + title, description, (err) => {
        if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.redirect('/topic/' + title);
    });
});

app.listen(3000, () => {
    console.log('Connected, 3000 port!');
});
