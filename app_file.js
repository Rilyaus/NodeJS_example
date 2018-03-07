var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

app.locals.pretty = true;
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', './views_file');
app.set('view engine', 'pug');

app.get('/topic/new', (req, res) => {
    fs.readdir('data', (err, files) => {
        if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.render('new', {topics:files});
    });
});

app.get(['/topic', '/topic/:id'], (req, res) => {
    var id = req.params.id;
    fs.readdir('data', (err, files) => {
        if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        var id = req.params.id;
        if(id) {
            // id 값이 존재할 경우
            fs.readFile('data/' + id, 'utf8', (err, data) => {
                if(err) {
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }
                res.render('view', {topics:files, title:id, description:data});
            });
        } else {
            res.render('view', {topics:files, title:'Welcome', description:'Hello, JavaScript for Server'});
        }
    });
});

// app.get('/topic', (req, res) => {
//     fs.readdir('data', (err, files) => {
//         if(err) {
//             console.log(err);
//             res.status(500).send('Internal Server Error');
//         }
//         res.render('view', {topics:files});
//     });
// });

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
