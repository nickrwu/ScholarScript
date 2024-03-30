const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://pz2036:dVr6BowLoJLAffEQ@hackprinceton.fcnjegw.mongodb.net/?retryWrites=true&w=majority&appName=hackprinceton";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

module.exports = client;