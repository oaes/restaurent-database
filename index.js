const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();


const uri = process.env.DB_PATH;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//
const app = express();
app.use(bodyParser.json());
app.use(cors());

//post data section
app.post("/order", (req, res) => {
    const orderDetails = req.body;
    orderDetails.orderTime = new Date();
    // database Connection
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect((err) => {
      const collection = client.db("hotOnion").collection("order");
      // perform actions on the collection object
      collection.insertOne(order, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log("successfully inserted");
  
          res.send(result.ops[0]);
        }
      });
      console.log("database connected...");
  
      client.close();
    });
  });
//get data section
app.get('/addFood', (req, res) => {
    client.connect(err => {
        const collection = client.db("hotOnion").collection("food");
        collection.find().toArray((err, documents) => {
            if (err) {
                console.log(err);
                res.status(500).send({ message: err })
            }
            else {
                res.send(documents);
            }
        })
    });
});

app.get("/food/:id", (req, res) => {
    console.log(req.query.sort);
  
    //dynamic url api
    const id = req.params.id;
    // client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });
    client.connect((err) => {
      const collection = client.db("hotOnion").collection("food");
      // perform actions on the collection object
      collection.find(id).toArray((err, documents) => {
        if (err) {
          console.log(err);
          res.status(500).send({ message: err });
        } else {
          console.log("successfully inserted", id);
          // console.log(documents[id]);
  
          res.send(documents[id]); //reding data from post req from body
        }
      });
      console.log("database connected...");
  
      // client.close();
    });
  });


const port = process.env.PORT || 5000;
app.listen(port, () => console.log('listening song on port 5000'))
