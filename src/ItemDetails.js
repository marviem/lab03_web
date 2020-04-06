import React from 'react';
import {Link} from 'react-router-dom'
import './App.css';

class Recipe extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      item: []
    }
  }

  componentDidMount() {
    fetch(`http://localhost:3000/recipes/${this.props.match.params.id}`).then(response => response.json())
    .then(data => this.setState({item: data}));
  }

  onDelete = async () => {

    this.setState({
        item: []
    });

    fetch(`http://localhost:3000/recipes/${this.props.match.params.id}`, { method: 'DELETE'})
    .then(response => response.json);
  }

  render() {
    const {item} = this.state;
    return (
      <div className="card details" key={item.id}>
        <img className="card-img-top" src={require('./images/food-img.jpg')} alt="food" />
        <h1 style={{fontWeight: "bolder"}}>{item.name}</h1>
        <p>Category: {item.category}</p>
        <p>Description: {item.shortDesc}</p>
        <h3>Cooking method</h3>
        <p>{item.longDesc}</p>
        <div>
          <Link to={{
            pathname: `/edit/${item.id}`,
            state: {
              prevPath: this.props.location.pathname,
              name: item.name
            }
          }}><button className="btn btn-outline-warning">Edit</button></Link>
          <div className="divider"/>
          <Link to="/recipes">
            <button className="btn btn-outline-danger" onClick={this.onDelete}>Delete</button>
          </Link>
        </div>  
        <small>Added on {item.createDate}</small>
      </div>
    );
  }
}

export default Recipe;