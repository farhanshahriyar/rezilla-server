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
    const userCollection = client.db("realestateDB").collection("users"); // all registered users
    const propertiesCollection = client.db("realestateDB").collection("properties"); // all properties
    const wishlistsCollection = client.db("realestateDB").collection("wishlists"); // all wishlist
    const contactCollection = client.db("realestateDB").collection("contact"); // all contact


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

    //properties collection for get request
    app.get('/properties', async (req, res) => {
      const cursor = propertiesCollection.find({});
      const properties = await cursor.toArray();
      res.send(properties);
    });

    // single property collection for get request
    app.get('/properties/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const property = await propertiesCollection.findOne(query);
      res.send(property);
      // console.log(property) // working
    });
   
    // wishlist  collection for get request
    app.get('/wishlists', async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const result = await wishlistsCollection.find(query).toArray();
      res.send(result);
    });
   

    // all post request
    //contact collection for post request
    app.post('/contact', async (req, res) => {
      const newContact = req.body;
      const result = await contactCollection.insertOne(newContact);
      res.json(result);
    });

    

    //wishlist collection for post request
    app.post('/wishlists', async (req, res) => {
      const wishItem = req.body;
      const result = await wishlistsCollection.insertOne(wishItem);
      res.send(result);
    });
    

    // all patch request
    // role update for patch request from dashboard admin
    

    // all delete request
    // cart collection for delete request
    app.delete('/wishlists/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await wishlistsCollection.deleteOne(query);
      res.send(result);
    });

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