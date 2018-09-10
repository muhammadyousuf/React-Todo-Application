import React, { Component } from 'react';
import '../Confiq/firebase.js';
import * as firebase from 'firebase/app';
import Todolist from './todoList';


class ShowTodo extends Component {
  ref = firebase.database().ref("Todo");
  constructor(props){
    super(props);
    this.state = {
      Note:[]
    }
    this.remove = this.remove.bind(this)
    this.edit = this.edit.bind(this);
  }
  componentWillMount(){
    const previousNotes = [];

     this.ref.on('child_added' , ChildSnapshot => {
      previousNotes.push({
        id: ChildSnapshot.key,
        Todo: ChildSnapshot.val().Todo,
    })
    this.setState({Note: previousNotes })     
    
  })

     this.ref.on('child_removed', ChildSnapshot =>{
       for(var i = 0; i < previousNotes.length; i++){
         if(previousNotes[i].id === ChildSnapshot.key){
           previousNotes.splice(i,1);
         }
       }
       this.setState({
         Note : previousNotes
       })
     })
     this.ref.on('child_changed', ChildSnapshot =>{
       let myvalue = ChildSnapshot.val();
       for(var i=0; i <previousNotes.length; i++){
         if(previousNotes[i].id === ChildSnapshot.key){
              previousNotes[i].Todo = myvalue.Todo;
         }
       }
       this.setState({
        Note : previousNotes
      })
     })

    
  }
  remove(id){
   this.ref.child(id).remove();
    console.log(id)
  }
  edit(index,value){
    console.log(index, value)
    this.ref.child(index).set({Todo:value})

  }
    render() {
      return (
        <div className="App">
        <h1>Todo List</h1>
        <div style={{border: '5px solid darkgrey' , marginLeft: '5%' , marginRight: '5%'}}>
                {
                    
                    this.state.Note.map((value) =>
                {
                    return(

                        <Todolist  
                         key={value.id} index={value.id} todolist={value.Todo} remove={this.remove} edit={this.edit}  />
                      
                )
                    

                })     
                  
            }
            
            </div>
        </div>
      );
    }
  }
  
  export default ShowTodo;