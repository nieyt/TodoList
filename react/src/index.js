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
            todos:[],
            select: 0 //底部选择todo状态 0：all | 1：active | 2：complete
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
    filterItem(status){
        this.setState({select: status});
    }
    render(){
        let showState = [];
        switch (this.state.select){
            case 0:
                showState = this.state.todos;
                break;
            case 1:
                this.state.todos.forEach((item) => {
                    if (!item.complete)
                        showState.push(item);
                })
                break;
            case 2:
                this.state.todos.forEach((item) => {
                    if (item.complete)
                        showState.push(item);
                })
                break;
            default:
                showState = this.state.todos;
        }
        return (
            <div>
                <AddTodo submit = {this.submit.bind(this)}/>
                <TodoList todos = {showState} singleToggle = {this.singleToggle.bind(this)}/>
                <Footer filterItem={this.filterItem.bind(this)}/>
            </div>
        )
    }
}

ReactDOM.render(<App/>,document.getElementById('app')) 