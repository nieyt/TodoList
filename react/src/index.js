import React from 'react';
import ReactDOM from 'react-dom';

class AddTodo extends React.Component{
    constructor(props){
        super(props);
    }
    onSubmit(e){
        e.preventDefault();

    }
    render(){
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <input ref={(node)=>{this.input=node}}/>
                <button type="submit">Add Todo</button>
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
                {this.props.todos.map((item,index)=>{
                    return (
                        <li key={index}>{item.content}</li>
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
        this.state={
            todos:[{
                content: 'study',
                complete: false
            }]
        }
    }
    render(){
        return (
            <div>
                <AddTodo/>
                <TodoList todos = {this.state.todos}/>
                <Footer/>
            </div>
        )
    }
}
ReactDOM.render(<App/>,document.getElementById('app')) 