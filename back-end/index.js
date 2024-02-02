import pgPromise from 'pg-promise';
import express from 'express';
import bodyParser from 'body-parser';

const pgp = pgPromise();

const cn = {
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'postgres'
};

const db = pgp(cn);

const port = 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api', (req, res) => res.send('Hello World!'));

app.listen(
    port,
    () => console.log(`Listening on port ${port}`)
);