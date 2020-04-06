import React from 'react';
import {Link} from 'react-router-dom';
import './App.css';

class Edit extends React.Component {

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

    componentDidMount() {
        fetch(`http://localhost:3000/recipes/${this.props.match.params.id}`).then(response => response.json())
        .then(data => this.setState({
            name: data.name,
            category: data.category,
            shortDesc: data.shortDesc,
            longDesc: data.longDesc
        }));
    }
  
    handleInputChange(event) {
        const value = event.target.value;
        const name = event.target.name;
    
        this.setState({
            [name]: value
        });
    }
  
    handleSubmit(event) {
        const {name, category, shortDesc, longDesc} = this.state;
        event.preventDefault();
        fetch(`http://localhost:3000/recipes/${this.props.match.params.id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                category: category,
                shortDesc: shortDesc,
                longDesc: longDesc,
            })
        }).then(() => alert("The recipe was successfully updated!"));
        console.log(this.state.name + " " + this.state.category + "\n" + this.state.shortDesc + " " + this.state.longDesc);
    }
  
    render() {
        const {name, category, shortDesc, longDesc} = this.state;
        return (
            <div className="card edit">
                <h3>Edit your {this.props.location.state.name} recipe</h3>
                <form>
                    <p htmlFor="name">Name:</p>
                    <div className="ip">
                        <i className="fa fa-pencil"></i>
                        <input type="text" name="name" value={name} 
                        onChange={this.handleInputChange} placeholder="Enter your recipe's name"/>
                    </div>

                    <p htmlFor="category">Category:</p>
                    <div className="ip">
                    <i className="fa fa-pencil"></i>
                    <input type="text" name="category" value={category} 
                    onChange={this.handleInputChange} placeholder="Enter your recipe's category"/>
                    </div>
                                       
                    <p htmlFor="shortDesc">Description:</p>
                    <div className="ip">
                    <i className="fa fa-pencil"></i>
                    <input type="text" name="shortDesc" value={shortDesc} 
                    onChange={this.handleInputChange} placeholder="Enter your recipe's description"/>
                    </div>

                    <p htmlFor="longDesc">Cooking method:</p>
                    <div className="ip">
                        <i className="fa fa-pencil"></i>
                        <input type="text" name="longDesc" value={longDesc} 
                            onChange={this.handleInputChange} placeholder="Enter your recipe's preparing method"/>
                    </div>
                </form>

                <div>
                    <button onClick={this.handleSubmit} className="btn">Update the recipe</button>
                    <div className="divider"/>
                    <Link to={this.props.location.state.prevPath}><button className="btn">Go back</button></Link>
                </div>
            </div>
        );
    }
}

export default Edit;