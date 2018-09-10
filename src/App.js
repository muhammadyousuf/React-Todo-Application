import React, { Component } from 'react';
import AddTodo from './Component/addTodo';
import ShowTodo from './Component/showTodo';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <AddTodo />
      <ShowTodo />
      </div>
    );
  }
}

export default App;
