import React from 'react';
import './App.css';
import {Link} from 'react-router-dom';
import'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from './SearchBar';
import { withRouter } from 'react-router-dom';

class Recipes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            term: '',
            categories: [],
            selectedCategory: ''
        }
    }

    componentDidMount() {
        fetch(`http://localhost:3000/recipes`).then(response => response.json())
        .then(data => this.setState({items: data}))
        .then(this.setSort.bind(this, (localStorage.getItem('sortType') == null) ? "asc" : localStorage.getItem('sortType')))
        .then(() => {
            let categories = [];
            this.state.items.map(item => categories.push(item.category));
            this.setState({categories: Array.from(new Set(categories))});
        });
    }

    filterCat = async category => {
        this.setState({selectedCategory: category, term: ''});
        if (category === "All categories") {
            await fetch(`http://localhost:3000/recipes`).then(response => response.json())
            .then(data => this.setState({items: data}))
            .then(this.setSort.bind(this, (localStorage.getItem('sortType') == null) ? "asc" : localStorage.getItem('sortType')));    
        } else {
            await fetch(`http://localhost:3000/recipes?category=${category}`).then(response => response.json())
            .then(data => this.setState({items: data}))
            .then(this.setSort.bind(this, (localStorage.getItem('sortType') == null) ? "asc" : localStorage.getItem('sortType')));  
        }
    }

    onDelete = async (id) => {

        const currentItems = [...this.state.items].filter(item => item.id !== id);

        let categories = [];
        currentItems.map(item => categories.push(item.category));

        this.setState({
            items: currentItems,
            categories: Array.from(new Set(categories))
        });

        fetch(`http://localhost:3000/recipes/${id}`, { method: 'DELETE'})
        .then(response => response.json);
    }

    updateData(config) {
        this.setState(config);
    }

    setSort = sortType => {
        localStorage.setItem('sortType', sortType);
        
        const myData = [...this.state.items].sort((a, b) => {
            let datePartsa = a.createDate.split('/');
            let datea = new Date(datePartsa[2], datePartsa[1] - 1, datePartsa[0]);

            let datePartsb = b.createDate.split('/');
            let dateb = new Date(datePartsb[2], datePartsb[1] - 1, datePartsb[0]);
            
            let res = (sortType === "asc") ? (datea - dateb) : (dateb - datea);
            return res;
        });
        this.setState({items: myData});
    }

    render() {
        const {items, categories} = this.state;
        
        return (
            <div className="main row">              
                <div className="col-sm-9">
                    <div className="row">
                        {items.map(item => (
                            <div className="card col-6 col-md-4" key={item.id}>
                                <div className="card-body d-flex flex-column">
                                <img className="card-img-top" src={require('./images/food-img.jpg')} alt="food" />
                                <h3  style={{fontSize: "20px"}}>
                                    <Link to={`/recipes/${item.id}`}>{item.name}</Link>
                                </h3>
                                <p>Category: {item.category}</p>
                                <p>{item.shortDesc}</p>
                                <div className="mt-auto">
                                    <Link className="btn-link" to={{
                                        pathname: `/edit/${item.id}`,
                                        state: {
                                            prevPath: this.props.location.pathname,
                                            name: item.name
                                        }
                                    }}><button className="btn">Edit</button></Link>
                                    <div className="divider"/>
                                    <button className="btn" onClick={this.onDelete.bind(this, item.id)}>Delete</button>
                                </div>
                                <small>Added on {item.createDate}</small>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-sm-3">
                    <SearchBar
                        term={this.state.term}
                        data={items}
                        category={this.state.selectedCategory}
                        update={this.updateData.bind(this)}
                        sort={localStorage.getItem('sortType')}
                    />
                    <Link className="btn-link" to={{
                        pathname: '/add',
                        state: {
                            prevPath: this.props.location.pathname
                        }
                    }}><button className="btn add">Add new recipe</button></Link>
                    <div>
                    <button onClick={this.setSort.bind(this, "asc")} className="btn sort">AZ <i className="fa fa-arrow-up"></i></button>
                    <div className="divider"/>
                    <button onClick={this.setSort.bind(this, "desc")} className="btn sort">ZA <i className="fa fa-arrow-down"></i></button>       
                    </div>
                    <div><p className="catsHeader">Select your category:</p>
                    <div className="cats btn" onClick={(e) => this.filterCat(e.target.textContent)}>All categories</div>
                    {categories.map((category, index) => (<div className="cats btn" onClick={(e) => this.filterCat(e.target.textContent)} key={index}>{category}</div>))}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Recipes);