import React from 'react';
import './App.css';
import { withRouter } from 'react-router-dom';
import {Link} from 'react-router-dom';

class Add extends React.Component {

  constructor(props) {
    super(props);
      this.state = {
        name: '',
        category: '',
        shortDesc: '',
        longDesc: ''
      };
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    const {name, category, shortDesc, longDesc} = this.state;

    event.preventDefault();

    let dd = new Date().getDate(); 
    let mm = new Date().getMonth() + 1; 
    let yyyy = new Date().getFullYear(); 
        
    if (dd < 10) dd = '0' + dd; 
    if (mm < 10) mm = '0' + mm; 
    const date = dd + '/' + mm + '/' + yyyy; 

    const newId = (Math.random() / + new Date()).toString(36).replace(/[^a-z]+/g, '');
    
    fetch('http://localhost:3000/recipes', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: newId,
        name: name,
        category: category,
        shortDesc: shortDesc,
        longDesc: longDesc,
        createDate: date
      })
    });
  }

  handleBack = () => window.history.goBack();

  render() {
    return (
      <div className="card edit">
        <h3>Add a recipe</h3>
        <form>
          <p htmlFor="name">Name:</p>
          <div className="ip">
            <i className="fa fa-pencil"></i>
            <input type="text" name="name" value={this.state.name} 
              onChange={this.handleInputChange} placeholder="Enter your recipe's name"/>
          </div>
              
          <p htmlFor="category">Category:</p>
          <div className="ip">
            <i className="fa fa-pencil"></i>
            <input type="text" name="category" value={this.state.category} 
               onChange={this.handleInputChange} placeholder="Enter your recipe's category"/>
          </div>
              
          <p htmlFor="shortDesc">Description:</p>
          <div className="ip">
            <i className="fa fa-pencil"></i>
            <input type="text" name="shortDesc" value={this.state.shortDesc} 
              onChange={this.handleInputChange} placeholder="Enter your recipe's description"/>
          </div>
              
          <p htmlFor="longDesc">Cooking method:</p>
          <div className="ip">
            <i className="fa fa-pencil"></i>
            <input type="text" name="longDesc" value={this.state.longDesc} 
              onChange={this.handleInputChange} placeholder="Enter your recipe's preparing method"/>
          </div>
        </form>

        <div>
          <button onClick={this.handleSubmit} className="btn">Add a recipe</button>
          <div className="divider"/>
          <Link to={this.props.location.state.prevPath}><button className="btn">Go back</button></Link>
        </div>
      </div>
    );
  }
}

export default withRouter(Add);