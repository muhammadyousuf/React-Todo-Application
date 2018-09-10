import React, { Component } from 'react';
import {TextField, RaisedButton} from 'material-ui';
import '../Confiq/firebase.js';
import * as firebase from 'firebase/app';


const style ={
    buttonStyle : {
        width:80,
    },
    labelStyle: {
        color: 'rgb(18, 17, 114)',
        backgroundColor:'white',
        fontWeight:'bold',
        fontFamily: 'sans-serif',
        fontSize:16,
    
    },
}

class AddTodo extends Component {
    ref = firebase.database().ref("Todo");
    constructor(props){
        super(props);
        this.state = {
            Todo:'',
           
        }

    }
    handleChange(event){

        this.setState({
            Todo : event.target.value,
        })
    }
    addTodo(){
        if(this.state.Todo === ""){
            alert('Please add todo task')
        }
        else{
            this.ref.push({Todo:this.state.Todo});
            this.setState({Todo:''})

        }
    }
    cancelTodo(){
        this.setState({Todo:''})
    }
    render() {
      return (
        <div className="App">
        <h1>Todo App</h1>
        <TextField maxLength='20'  hintText="Enter the text" floatingLabelText="Add Todo"  onChange={this.handleChange.bind(this)} value={this.state.Todo} />
        <RaisedButton label="ADD" disabled={false}  labelStyle={style.labelStyle} labelColor='rgb(114, 129, 179)' buttonStyle={style.buttonStyle} style={style.buttonStyle} onClick={this.addTodo.bind(this)}/>
        <RaisedButton label="Cancel" disabled={false}  labelStyle={style.labelStyle} labelColor='rgb(114, 129, 179)' buttonStyle={style.buttonStyle} style={style.buttonStyle} onClick={this.cancelTodo.bind(this)}/>
        </div>
      );
    }
  }
 
  
  export default AddTodo;