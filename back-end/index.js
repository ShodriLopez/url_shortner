import pgPromise from 'pg-promise';
import express from 'express';
import bodyParser from 'body-parser';

const pgp = pgPromise();

const cn = 'postgres://postgres:postgres@db:5432/postgres';

const db = pgp(cn);

const port = 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/:shortenCode', (req, res) => {
    const shortenCode = req.params.shortenCode;
    //validar?
    
    //buscarlo en la db
    db.any('SELECT * FROM urls WHERE shortUrl = $1', [shortenCode])
    .then((data) => {
        if (!data.length) {
            //si no retornar {message 'link inexistente' type 'error?'}
            res.json({
                message: 'ERROR! Unprocessed url',
                type: 'error'
            });
        }
        else {
            //si existe redirigir al originalUrl
            //generar el full link
            //evaluar si ya tiene el http o https, en caso de que no agregarlo
            res.send('existe, devuelvo ese');
        }
        
        //res.send('success '+data[0].originalurl);
    })
    .catch((error) => {
        //error {message 'error wtf' type 'error'}
        res.send('error '+error);
    });
    //res.send('shortenCode'+shortenCode);
});

app.post('/api/shorten', (req, res) => {
    const originalUrl = req.body.url;

    /* INSERT INTO urls (originalUrl, shortUrl)
    VALUES('https://www.postgresqltutorial.com','PSQLlqsp'); */

    //revisar si ya existe en la db
    //si existe, devolver ese shortUrl {message 'link existente en la db' type 'succes'}
    //si no existe, creo uno y lo devuelvo {message 'link acortado' type 'succes'}
    //error {message 'error wtf' type 'error'}

    res.send('Link to short '+originalUrl);
});

app.listen(
    port,
    () => console.log(`Listening on port ${port}`)
);