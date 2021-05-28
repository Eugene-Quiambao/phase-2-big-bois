const express = require('express');
const cors = require('cors');
const fs = require('fs');
const routes = require('./routes/routes.js');
const db = require('./models/db.js');

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use('/', routes);

db.connect();

app.get('/', function(req, res)
{
    fs.readFile("index.html", function(err, data)
    {
        res.setHeader("Content-Type", "text/html");
        if(err)
        {
            res.status = 404;
            res.write("404 not found");
        }
        else
        {
            res.status = 200;
            res.write(data);
        }
        res.end();
    });
});

// app.post("/", function(req, res)
// {
//     var username = user1;
//     var password = pass1;

//     var person = 
//     {
//         username: username,
//         password: password,
//         gscore = 0
//     }

//     db.insertOne(User, person);

//     res.write("username = " + username + "\npassword = " + password);
//     res.end();
// });

app.get('/api/customers', cors(), (req, res) => {
  const customers = [
    {id: 1, firstName: 'John', lastName: 'Doe'},
    {id: 2, firstName: 'Brad', lastName: 'Traversy'},
    {id: 3, firstName: 'Mary', lastName: 'Swanson'},
  ];

  res.json(customers);
});

const port = process.env.PORT || 8080;

app.listen(port, () => `Server running on port ${port}`);
