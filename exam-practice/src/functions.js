import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CrudComponent() {
  const [data, setData] = useState([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('API_URL');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const createItem = async () => {
    try {
      const response = await axios.post('API_URL', { item: newItem });
      setNewItem('');
      fetchData();
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  const updateItem = async (itemId, updatedValue) => {
    try {
      const response = await axios.put(`API_URL/${itemId}`, { item: updatedValue });
      fetchData();
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const deleteItem = async (itemId) => {
    try {
      const response = await axios.delete(`API_URL/${itemId}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleChange = (event) => {
    setNewItem(event.target.value);
  };

  return (
    <div>
      <ul>
        {data.map(item => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => deleteItem(item.id)}>Delete</button>
            <input
              type="text"
              value={item.name}
              onChange={(e) => updateItem(item.id, e.target.value)}
            />
          </li>
        ))}
      </ul>
      <input type="text" value={newItem} onChange={handleChange} />
      <button onClick={createItem}>Add Item</button>
    </div>
  );
}

export default CrudComponent;
