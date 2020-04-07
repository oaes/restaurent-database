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

app.get('/' , (req, res) => {
  res.send("Welcome to Red Onion database");
})

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

app.get('/food/:id',(req, res) => {
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

//post data section
app.post('/orders' , (req,res) => {
  const data = req.body;
  console.log(data);
  // client = new MongoClient(uri , {useNewUrlParser:true , useUnifiedTopology: true});
  client.connect(err => {
      const collection = client.db('hotOnion').collection('orders');
      collection.insert(data , (reject, result) =>  {
          if(reject){
              res.status(500).send("failed")
          }else{
              res.send(result.ops[0])
          }
      });
      // client.close()
  });
});
const port = process.env.PORT || 5000;
app.listen(port, () => console.log('listening song on port 5000'))
