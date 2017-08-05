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
                            onClick = {this.props.singleToggle.bind(this,item.id)}
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
    changeFilter(key){
        this.props.filterItem(+key);
    }
    render(){
        let props=this.props;
        return (
           <p>show: 
               {
                props.children.map((item,index) => {
                    let iProps=item.props;
                    return (props.select == iProps.value ?
                             <span key={iProps.value}>{iProps.children}</span>: 
                             <a href='#' key={iProps.value} onClick={(e)=>{e.preventDefault;this.changeFilter(iProps.value)}}>
                             {iProps.children}</a>)
                })
               }
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
                <Footer filterItem={this.filterItem.bind(this)} select={this.state.select}>
                    <span value='0'>All</span>
                    <span value='1'>Active</span>
                    <span value='2'>Completed</span>
                </Footer>
            </div>
        )
    }
}

ReactDOM.render(<App/>,document.getElementById('app')) 