import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Client } from 'pg'

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/users/auth', (req, res) => {
    if(req.body.login === 'admin' && req.body.password === 'toto') {
        res.send({ status: "success" });
    }
    else {
        res.send({ status: "error" });
    }
});

app.get('/books', (req, res) => {
    res.json({ books: [
        {
            id: 1,
            title: 'Harry Potter',
            description: "jeune à lunettes"
        },
        {
            id: 2,
            title: 'Harry Potter 2',
            description: "jeune à lunettes mais c'est le 2"
        },
        {
            id: 3,
            title: 'Mary Poppins',
            description: "une nounou magique"
        },
        {
            id: 4,
            title: 'Star Wars',
            description: "qui est ton père ?"
        },
    ]});
});

app.get('/users/admin/books', (req, res) => {
    res.json({ user: { login: "admin"}, books: [1, 4] });
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});