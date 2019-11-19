// server.js

var express = require('express');

var app = express();
var PORT = 4567;
const cors = require('cors');
const fs = require('fs');


app.use(cors())
app.get('/get_data', function (req, res) {
    fs.readFile('./data.csv', function (err, data) {

        if (err) {
            return console.log(err);
        }

        //Convert and store csv information into a buffer. 
        bufferString = data.toString();
        let arr = bufferString.split('\n');
        let markers = [];
        let headers = arr[0].split(',');
        for (let i = 1; i < arr.length; i++) {
            let data = arr[i].split(',');
            let obj = {};
            for (let j = 0; j < data.length; j++) {
                obj[headers[j].trim()] = data[j].trim();
            }
            markers.push(obj);
        }
        return res.status(200).send(markers);
    });
});

app.listen(PORT, function () {
    console.log('Server is running on PORT:', PORT);
});