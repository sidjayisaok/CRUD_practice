//express variables
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
let db;
const login = 'mongodb://sidjayisaok:12345@ds153677.mlab.com:53677/crud_test';
const PORT = process.env.PORT || 8000;

//MongoDB call
MongoClient.connect(login, (error, database)=>{
    if (error) return console.log(error);
    db = database;
    //fire up server
    app.listen(PORT, ()=>{
        console.log('Jet Set Radio now broadcasting on ' + PORT);
    });
});

//middleware, not Middle Earth
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('public'));

app.use(bodyParser.json());

//this sets up embedded javascript ejs
app.set('view engine', 'ejs');

//get request
app.get('/', (request, response)=>{
   response.sendFile(__dirname + '/index.html'); 
});

//grab quotes from database
app.get('/quotes', (request, response)=>{
    db.collection('quotes').find().toArray((error, results)=>{
        if (error) return console.log(error)
        response.render('index.ejs', {quotes: results})
    });
});

//post request
app.post('/quotes', (request, response)=>{
    db.collection('quotes').save(request.body, (error, results)=>{
        if (error) return console.log(error)
        console.log(request.body);
        console.log('message saved');
        response.redirect('/');
    });
});

//update request not working yet
app.put('/quotes', (request, response)=>{
    db.collections('quotes').findOneAndUpdate(
        //query part
        {
            name: 'UNK'
        },
        //update part
        {
            $set:{
                name: request.body.name,
                quote: request.body.quote
            }   
        },
        //options part
        {
            sort: {_id: -1},
            upsert: true
        },
        //callback part
        (error, results)=>{
            if (error) return response.send(error)
            response.send(results)
        }
    )
});

//delete request not working yet
app.delete('/quotes', (request, response)=>{
    db.collections('quotes').findOneAndDelete(
        //query part
        {
            name: request.body.name
        },
        //callback part
        (error, results)=>{
            if (error) return response.send(500, error)
            response.send('deleted!')
        })
});

