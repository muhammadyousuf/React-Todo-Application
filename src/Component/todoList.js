import React, { Component } from 'react';
import * as firebase from 'firebase/app';
// import {List, ListItem} from 'material-ui/List';
// import RaisedButton from 'material-ui/RaisedButton';


class ShowTodo extends Component {
    ref = firebase.database().ref('Todo')
    constructor(props){
        super(props);
        this.state ={
            isEditing:false
        }
        this.handleremove = this.handleremove.bind(this);
        this.renderform = this.renderform.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.updateItem = this.updateItem.bind(this);
        
    }
    renderform(){
        return(
            <div>
            <form onSubmit={this.updateItem} >
            <input type='text' ref={ (value) => 
             this.input = value
            } defaultValue={this.props.todolist} />
            <button type='submit'>Update</button>
        </form>
        <button type='submit'>Cancel</button>
        </div>
        )
    }
    updateItem(evt){
        evt.preventDefault();
        console.log(this.input.value)
        this.props.edit(this.props.index, this.input.value)
        this.handleToggle();
    }
    renderItem(){
        return(
            <span>
            {this.props.todolist}
            <button onClick={() =>this.handleremove(this.props.index)} >Delete</button>
            <button onClick={() => this.handleToggle()} >Edit</button>
        </span>
        )
    }
   handleremove(id){
       this.props.remove(id);
   }
   handleToggle(){
       const isEditing = this.state.isEditing;
       this.setState({
           isEditing : !isEditing
       })
   }
    render(){
        const {isEditing} = this.state;
        return(
            <div >
            <section>
                {
                   isEditing ? this.renderform() : this.renderItem()
                }
               </section>
                
            </div>
        )
    }
}
export default ShowTodo;