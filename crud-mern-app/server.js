const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
const port = 3001;

//configure
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//connect to mongodb
mongoose.connect('mongodb+srv://tim:AtSVmTE15oUshefN@test-cluster.mgsuad7.mongodb.net/newitemsDB');

//data schema
const itemSchema = {
  title: String,
  description: String,
}

//data model
const Item = mongoose.model('Item', itemSchema);

//read route
app.get('/items', (req, res) => {
  Item.find({})
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json('Error: ' + err));
});

//create route
app.post('/newItem', (req, res) => {
  const newItem = new Item(
    {
      title: req.body.title,
      description: req.body.description,
    }
  )
  newItem.save()
    .then(item => console.log(item))
    .catch((err) => res.status(400).json('Error: ' + err));
})

//delete route
// app.delete('/delete/:id', (req, res) => {
//     const id = req.params.id;
//     Item.findByIdAndDelete(id, (req, res, err) => {
//         if (!error) {
//             console.log('Item deleted');
//             res.send('Item deleted');
//         } else {
//             console.log(err);
//             res.status(500).send('Error deleting item');
//         }
//     });
// });



app.delete('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deletedItem = await Item.findByIdAndDelete(id);
    if (deletedItem) {
      console.log(`Item with id ${id} deleted`);
      res.status(200).send(`Item with id ${id} deleted`);
    } else {
      console.log(`Item with id ${id} not found`);
      res.status(404).send(`Item with id ${id} not found`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting item');
  }
});

//update route

app.put('/put/:id', (req, res) => {
  const updatedItem = {
    title: req.body.title,
    description: req.body.description,
  }

  Item.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: updatedItem }
  )
  .then(() => {
    // console.log("Item updated");
    res.send("Item updated");
  })
  .catch((err) => {
    console.log(err);
    // res.status(500).send(err);
  });
});

  app.listen(port, () => {
    console.log(`Express is running on port ${port}`)
  });