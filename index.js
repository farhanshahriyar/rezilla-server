const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// middleware
app.use(cors());
app.use(express.json());

// database connection and functionalties
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.s2iwh9r.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


    // Establish and verify connection
    //   const userCollection = client.db("realestateDB").collection("properties");
    

    // all post request
    //user collection for post request
   
      
      // If the user does not exist, insert the new user
   
    

    // all get request
    // all users collection for get request
    

    //menu collection for get request
   
    // cart collection for get request
   

    // all post request
    //contact collection for post request
    

    //cart collection for post request
    

    // all patch request
    // role update for patch request from dashboard admin
    

    // all delete request
    // cart collection for delete request
   

    // user collection for delete request
    


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



// route
app.get ('/', (req, res) => {
    res.send('Rezilla`s server is running');
});

// listen
app.listen(port, () => {
    console.log(`Rezilla's server is running on port: ${port}`);
});