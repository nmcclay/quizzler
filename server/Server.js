const path = require('path');
const fs = require('fs');
const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

class MyServer {
    constructor(port) {
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = new Server(this.server);
        this.setupRoutes();

        this.server.listen(port, () => {
            console.log('Server listening at port %d', port);
        });
    }

    setupRoutes() {
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

        this.app.use(express.static(rootAssetPath, httpOptions));
        this.app.get('/api', (req, res) => {
            res.set('x-timestamp', Date.now());
            res.json({ message: "Foobar!" });
        });
        this.app.get('/api/quiz', async (req, res) => {
            const files = await fs.promises.readdir(quizAssetPath);
            res.set('x-timestamp', Date.now());
            res.json(files);
        });
        this.app.use('/api/quiz/', express.static(quizAssetPath, jsonOptions));
    }
}

module.exports = MyServer;
