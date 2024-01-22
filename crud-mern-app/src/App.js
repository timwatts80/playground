import { set } from 'mongoose';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [item, setItem] = useState(
    {
      title: '',
      description: '',
    });
  const [items, setItems] = useState([
    {
      title: '',
      description: '',
      _id: '',
    },
  ]);

  const [isPut, setIsPut] = useState(false);
  const [updatedItem, setUpdatedItem] = useState({
    title: '',
    description: '',
    id: '',
  });

  useEffect(() => {
    fetch('/items').then(res => {
      if (res.ok) {
        return res.json()
      }
    })
      .then(jsonRes => setItems(jsonRes))
      .catch(err => console.log(err));
  }, [items]);

  function handleChange(event) {
    const { name, value } = event.target;
    setItem(prevInput => {
      return {
        ...prevInput,
        [name]: value,
      }
    });
  }

  function addItem(event) {
    event.preventDefault();
    const newItem = {
      title: item.title,
      description: item.description
    }
    axios.post("/newItem", newItem);
    console.log(newItem);
    // alert("Item added");

    setItem({
      title: '',
      description: ''
    })
  }

  function deleteItem(id) {
    axios.delete(`/delete/` + id);
    // alert("Item deleted");
    console.log('Deleted item with id: ' + id);
  }

  function openUpdate(id) {
    setIsPut(true);
    setUpdatedItem(prevInput => {
      return {
        ...prevInput,
        id: id,
      };
    });
  }

  function updateItem(id) {
    axios.put(`/put/` + id, updatedItem);
    // alert("Item updated");
    console.log('Updated item with id: ' + id + ' updated');
  }

  function handleUpdate(event) {
    const { name, value } = event.target;
    setUpdatedItem(prevInput => {
      return {
        ...prevInput,
        [name]: value,
      }
    });
    console.log(updatedItem);
  }

  return (
    <div className="App">
      {!isPut ? 
      (<div className="main">
        <input
          onChange={handleChange}
          name="title"
          value={item.title}
          placeholder="title"
        ></input>
        <input
          onChange={handleChange}
          name="description"
          value={item.description}
          placeholder="description"
        ></input>
        <button onClick={addItem} >ADD ITEM</button>
      </div>) : (
        <div className="main">
        <input
          onChange={handleUpdate}
          name="title"
          value={updatedItem.title}
          placeholder="title"
        ></input>
        <input
          onChange={handleUpdate}
          name="description"
          value={updatedItem.description}
          placeholder="description"
        ></input>
        <button onClick={() => updateItem(updatedItem.id)} >UPDATE ITEM</button>
      </div>
      )}
      <div className="container">
        {items.map(item => {
          return (
            <div key={item._id} className="card">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <button onClick={() => deleteItem(item._id)}>DELETE</button>
              <button onClick={() => openUpdate(item._id)}>UPDATE</button>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
