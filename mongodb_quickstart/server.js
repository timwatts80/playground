const express = require('express');
const mongoose = require('mongoose');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');
require('dotenv').config();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
const clusterUrl = process.env.MONGODB_CLUSTER_URL;
const dbName = process.env.MONGODB_DB_NAME;
const dbColl = process.env.MONGODB_COLLECTION;

mongoose.connect(`mongodb+srv://${username}:${password}@${clusterUrl}/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true });

// Check connection to db
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("connection to " + dbColl + " successful!");
});


// create data schema
const recordSchema = {
  name: String,
  age: Number,
  color: String
}

const Record = mongoose.model("Record", recordSchema);

app.get('/', async (req, res) => {
  try {
    const records = await Record.find({});
    res.render('records', { records: records });
  } catch (err) {
    console.log(err);
    res.status(500).send('Unable to retrieve records!');
  }
});

app.post("/", async (req, res) => {
  let name = req.body.name.trim();
  let age = req.body.age.trim();
  let color = req.body.color.trim();
  if (name === '' || age === '' || color === '') {
    res.status(400).send('Name, age, and color fields are required!');
    return;
  }
  let newRecord = new Record({
    name: name,
    age: age,
    color: color
  });
  await newRecord.save();
  try {
    const records = await Record.find({});
    res.redirect('/');
  } catch (err) {
    console.log(err);
    res.status(500).send('Unable to retrieve records!');
  }
});

app.delete("/", async (req, res) => {
  try {
    const deletedRecord = await Record.findByIdAndDelete(req.params.id);
    if (!deletedRecord) {
      res.status(404).send('Record not found!');
      return;
    }
    res.redirect('/');
  } catch (err) {
    console.log(err);
    res.status(500).send('Unable to delete record!');
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
})

