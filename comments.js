// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/comments', (req, res) => {
    fs.readFile('comments.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal server error');
        } else {
            res.send(JSON.parse(data));
        }
    });
});

app.post('/comments', (req, res) => {
    fs.readFile('comments.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal server error');
        } else {
            const comments = JSON.parse(data);
            comments.push(req.body);
            fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Internal server error');
                } else {
                    res.send({ success: true });
                }
            });
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});