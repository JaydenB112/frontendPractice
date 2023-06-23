import React from 'react';
import axios from 'axios';

class CrudComponent extends React.Component {
  state = {
    data: [],
    newItem: ''
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const response = await axios.get('API_URL');
      this.setState({ data: response.data });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  createItem = async () => {
    try {
      const response = await axios.post('API_URL', { item: this.state.newItem });
      this.setState({ newItem: '' });
      this.fetchData();
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  updateItem = async (itemId, updatedValue) => {
    try {
      const response = await axios.put(`API_URL/${itemId}`, { item: updatedValue });
      this.fetchData();
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  deleteItem = async (itemId) => {
    try {
      const response = await axios.delete(`API_URL/${itemId}`);
      this.fetchData();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  handleChange = (event) => {
    this.setState({ newItem: event.target.value });
  };

  render() {
    const { data, newItem } = this.state;

    return (
      <div>
        <ul>
          {data.map(item => (
            <li key={item.id}>
              {item.name}
              <button onClick={() => this.deleteItem(item.id)}>Delete</button>
              <input
                type="text"
                value={item.name}
                onChange={(e) => this.updateItem(item.id, e.target.value)}
              />
            </li>
          ))}
        </ul>
        <input type="text" value={newItem} onChange={this.handleChange} />
        <button onClick={this.createItem}>Add Item</button>
      </div>
    );
  }
}

export default CrudComponent;
