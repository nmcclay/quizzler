const path = require('path');
const fs = require('fs');
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

const quizAssetPath = path.resolve(path.join("..", "data", "quiz"));
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
app.get('/api/quiz', async (req, res) => {
    const files = await fs.promises.readdir(quizAssetPath);
    res.json(files);
});
app.use('/api/quiz/', express.static(quizAssetPath, jsonOptions));

app.listen(3001, () => {
    console.log("Server Started");
});
