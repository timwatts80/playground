const http = require('http');
const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser = require('body-parser');
require('dotenv').config();

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
const clusterUrl = process.env.MONGODB_CLUSTER_URL;
const dbName = process.env.MONGODB_DB_NAME;

const uri = `mongodb+srv://${username}:${password}@${clusterUrl}/${dbName}`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
}
);

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    // Send a ping to confirm a successful connection
    await client.db(dbName).command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // Read the first 3 documents from the mongodbQuickstart collection
    const cursor = client.db(dbName).collection('mongodbQuickstart').find({}, { projection: { name: 1, age: 1, color: 1 } }).limit(3);
    const results = await cursor.toArray();
    console.log(results);

    // Create an HTML string to display the query results
    let html = `
      <html>
        <body>
          <h1>Query Results:</h1>
            <ul>`;
              results.forEach(result => {
                html += `
                    <li>${result.name} - ${result.age} - ${result.color}</li>`;
              });
              html += `
            </ul>
        </body>
      </html>`;

    // Send the HTML string as a response to the HTTP request
    const server = http.createServer((req, res) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(html);
    });

    server.listen(3000, () => {
      console.log('Server running on port 3000');
    });

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
