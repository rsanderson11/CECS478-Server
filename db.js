var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/logindb');
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
