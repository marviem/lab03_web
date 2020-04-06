import React from 'react';
import './Search.css';

class SearchBar extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      result: []
    };
  }
    
  dataSearch = async e => {
    const query = e.target.value.toLowerCase();
    let response = null;
    if (this.props.category === "All categories")
      response = await fetch(`http://localhost:3000/recipes?name_like=${query}`);
    else
      response = await fetch(`http://localhost:3000/recipes?name_like=${query}&category_like=${this.props.category}`);

    if (response.ok) { 
      let json = await response.json();
      this.setState({result: json});
    } else {
      alert("HTTP error: " + response.status);
    }
    this.setSort();
    this.props.update({
      items: this.state.result,
      term: query
    });
  };

  setSort = () => {
    const sortType = (this.props.sort) ? this.props.sort : "asc";
    
    const myData = [...this.state.result].sort((a, b) => {
        let datePartsa = a.createDate.split('/');
        let datea = new Date(datePartsa[2], datePartsa[1] - 1, datePartsa[0]);

        let datePartsb = b.createDate.split('/');
        let dateb = new Date(datePartsb[2], datePartsb[1] - 1, datePartsb[0]);
        
        let res = (sortType === "asc") ? (datea - dateb) : (dateb - datea);
        return res;
    });
    this.setState({result: myData});
  }
  
  render() {
		return (
			<div className="searchbar">
        <i className="fa fa-search"/>
        <input value={this.props.term}
          type="text"
          placeholder="Search recipes by name..."
          onChange={this.dataSearch}
        />
      </div>
		);
	}
}

export default SearchBar;