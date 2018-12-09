const mongoose = require('mongoose');

const dbURI = "mongodb://ryvaldriz101@gmail.com:3bPNBm_E5rnPJG@cluster0-shard-00-00-4xwi0.mongodb.net:27017,cluster0-shard-00-01-4xwi0.mongodb.net:27017,cluster0-shard-00-02-4xwi0.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";
const options = {
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  poolSize: 10
};

mongoose.connect(dbURI, {dbName: 'duodolo'}).then(//, options).then(
  function res() {
    console.log("Database connection established!");
  },
  function err() {
    console.log("Error connecting Database instance.");
  }
);




//mongoose.connect('mongodb://localhost/logindb');
// mongoose.connect('mongodb://testuser:testpassword@ds151753.mlab.com:51753/duodolotest');


// const MongoClient = require('mongodb').MongoClient;
//
// // replace the uri string with your connection string.
// const uri = "ongodb+srv://duodolo:<homosapien>@cluster0-4xwi0.mongodb.net/test?retryWrites=true"
// MongoClient.connect(uri, function(err, client) {
//    if(err) {
//         console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
//    }
//    console.log('Connected...');
//    const collection = client.db("test").collection("devices");
//    // perform actions on the collection object
//    client.close();
// });
