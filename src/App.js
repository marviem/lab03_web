import React from 'react';
import './App.css';
import Nav from './Nav';
import Add from './add';
import About from './About';
import Recipes from './Recipes';
import Recipe from './ItemDetails'
import Edit from './Edit';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav/>
        <Switch>
          <Route path="/" exact>{<Redirect to="/recipes" />}</Route>
          <Route path="/about" component={About} />
          <Route path="/add" component={Add}/>
          <Route path="/recipes" exact component={Recipes} />
          <Route path="/recipes/:id" component={Recipe}/>
          <Route path="/edit/:id" component={Edit}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
