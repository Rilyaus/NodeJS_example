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
    var sql = 'SELECT FROM topic';
    db.query(sql).then( (topics) => {
        res.render('add', {topics:topics});
    });
});

app.post('/topic/add', (req, res) => {
    var title = req.body.title;
    var description = req.body.description;
    var author = req.body.author;
    var sql = 'INSERT INTO topic (title, description, author) VALUES(:title, :desc, :author)';
    db.query(sql, {
        params: {
            title:title,
            desc:description,
            author:author
        }
    }).then( (results) => {
        res.redirect('/topic/' + encodeURIComponent(results[0]['@rid']));
    });
})

app.get('/topic/:id/edit', (req, res) => {
    var sql = 'SELECT FROM topic';
    var id = req.params.id;
    db.query(sql).then( (topics) => {
        var sql = 'SELECT FROM topic WHERE @rid=:rid';
        db.query(sql, {params:{rid:id}}).then( (topic) => {
            res.render('edit', {topics:topics, topic:topic[0]});
        });
    });
});

app.post('/topic/:id/edit', (req, res) => {
    var sql = 'UPDATE topic SET title=:t, description=:d, author=:a WHERE @rid=:rid';
    var id = req.params.id;
    var title = req.body.title;
    var desc = req.body.description;
    var author = req.body.author;

    db.query(sql, {
        params: {
            t:title,
            d:desc,
            a:author,
            rid:id
        }
    }).then( (topics) => {
        res.redirect('/topic/' + encodeURIComponent(id));
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

app.listen(3000, () => {
    console.log('Connected, 3000 port!');
});
