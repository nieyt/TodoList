import React from 'react';
import ReactDOM from 'react-dom';

class AddTodo extends React.Component{
    constructor(props){
        super(props);
        this.id = 0;
    }
    onSubmit(e){
        e.preventDefault();
        if (!this.input.value.trim()) return;
        this.props.submit(this.makeObj(this.input.value))
        this.input.value = '';
    }
    makeObj(value){
        return {
            id: this.id++,
            content: value,
            complete: false
        }
    }
    render(){
        return (
            <form onSubmit = {this.onSubmit.bind(this)}>
                <input ref = {(node) => {this.input=node}}/>
                <button type = "submit">Add Todo</button>
            </form>
        )
    }
}

class TodoList extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
           <ul>
                {this.props.todos.map((item) => {
                    return (
                        <li key = {item.id} 
                            onClick = {()=>{this.props.singleToggle(item.id)}}
                            style = {item.complete?{textDecoration:'line-through'}:{}}>{item.content}</li>
                    )
                })}
           </ul>
        )
    }
}

class Footer extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
           <p>show &nbsp;
                <span>All</span>,
                <span>Active</span>,
                <span>Completed</span>
           </p>
        )
    }
}

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            todos:[]

        }
    }
    //add todo
    submit(todo){
        this.setState((preState)=>{
            return {
                todos: [].concat(preState.todos,todo)
            }
        })
    }
    //toggle complete
    singleToggle(id){
        this.setState((preState)=>{
            return {
                todos : preState.todos.map((item)=>{
                    if (item.id == id) {
                        return Object.assign({},item,{
                            complete: !item.complete
                        })
                    }
                    return item;
                })
            }
        })
    }
    //filter
    filterItem(){

    }
    render(){
        return (
            <div>
                <AddTodo submit = {this.submit.bind(this)}/>
                <TodoList todos = {this.state.todos} singleToggle = {this.singleToggle.bind(this)}/>
                <Footer/>
            </div>
        )
    }
}

ReactDOM.render(<App/>,document.getElementById('app')) 