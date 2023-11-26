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
    const userCollection = client.db("realestateDB").collection("users");
    const contactCollection = client.db("realestateDB").collection("contact");


    // all post request
    //user collection for post request
    app.post('/users', async (req, res) => {
      const user = req.body;
      const query = { email: user.email };
      const existingUser = await userCollection.find(query).toArray();
      
      // Check if the user array is not empty, meaning the user already exists
      if (existingUser.length > 0) {
        // Stop the function execution and send response here
        return res.send({ message: 'User already exists', insertedId: null });
      }
      
      // If the user does not exist, insert the new user
      const result = await userCollection.insertOne(user);
      res.send(result);
    });
    
   
    

    // all get request
    // all users collection for get request
    app.get('/users', async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });

    //menu collection for get request
   
    // cart collection for get request
   

    // all post request
    //contact collection for post request
    app.post('/contact', async (req, res) => {
      const newContact = req.body;
      const result = await contactCollection.insertOne(newContact);
      res.json(result);
    });

    

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