var fs = require('fs');

// Sync
console.log(1);
var data = fs.readFileSync('data.txt', {encoding:'utf8'});
console.log(data);

// readFileSync
console.log(2);
var data2 = fs.readFile('data.txt', {encoding:'utf8'}, (err, data) => {
    if (err) throw err;
    console.log(3);
    console.log(data);
});
console.log(4);
