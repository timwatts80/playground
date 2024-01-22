const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const cluster = process.env.MONGO_CLUSTER;
const database = process.env.MONGO_DATABASE;

mongoose.connect(`mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${database}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.json());

app.post('/api/users', async (req, res) => {
  const { firstName, lastName, email } = req.body;
  const user = new User({ firstName, lastName, email });
  await user.save();
  res.json(user);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});