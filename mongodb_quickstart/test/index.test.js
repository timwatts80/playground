const { MongoClient } = require('mongodb');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

const uri = `mongodb+srv://tim:AtSVmTE15oUshefN@test-cluster.mgsuad7.mongodb.net/`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

describe('MongoDB Quickstart', () => {
  beforeAll(async () => {
    await client.connect();
  });

  afterAll(async () => {
    await client.close();
  });

  it('should connect to MongoDB server', async () => {
    const isConnected = await client.isConnected();
    expect(isConnected).toBe(true);
  });

  it('should insert a document into the testCol collection', async () => {
    const database = client.db("testDB");
    const collection = database.collection("testCol");
    const doc = { name: 'John Doe', age: 30 };
    const result = await collection.insertOne(doc);
    expect(result.insertedCount).toBe(1);
  });

  it('should retrieve the document count from the testCol collection', async () => {
    const database = client.db("testDB");
    const collection = database.collection("testCol");
    const docCount = await collection.countDocuments({});
    expect(docCount).toBe(1);
  });
});