const path = require('path');
const express = require('express');
const app = express();

const rootAssetPath = path.resolve(path.join("..", "ui", "build"));
const httpOptions = {
    extensions: ['htm', 'html'],
    index: 'index.html',
    maxAge: '1d',
    redirect: false,
    setHeaders: function (res, path, stat) {
        res.set('x-timestamp', Date.now())
    }
}

const dataAssetPath = path.resolve(path.join("..", "data"));
const jsonOptions = {
    dotfiles: 'ignore',
    extensions: ['json'],
    etag: false,
    maxAge: '7d',
    redirect: false,
    setHeaders: function (res, path, stat) {
        res.set('Content-Type', "application/json");
        res.set('x-timestamp', Date.now());
    }
}

app.use(express.static(rootAssetPath, httpOptions));
app.get('/api', (req, res) => {
    res.json({ message: "Foobar!" });
});
app.use('/api/data', express.static(dataAssetPath, jsonOptions));

app.listen(3000, () => {
    console.log("Server Started");
});
