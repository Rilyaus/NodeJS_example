var OrientDB = require('orientjs');

var server = OrientDB({
    host:       'localhost',
    port:       2424,
    username:   'root',
    password:   '426ckh'
});

var db = server.use('o2');
console.log('Using Database : ' + db.name);
//
// var rec = db.record.get('#27:0').then((record) => {
//         console.log('Loaded Record : ', record);
//     });

// var sql = 'SELECT FROM topic';
// db.query(sql).then(function(results) {
//     console.log(results);
// });

// var sql = 'SELECT FROM topic WHERE @rid=:id';
// var param = {
//     params:{
//         id:'#26:0'
//     }
// };
// db.query(sql,param).then((results) => {
//     console.log(results);
// });

var sql = "INSERT INTO topic (title, description) VALUES(:title, :desc)";
var param = {
    params:{
        title:'Express',
        desc:'Express is framwork for web'
    }
};
db.query(sql, param).then((results) => {
    console.log(results);
});
