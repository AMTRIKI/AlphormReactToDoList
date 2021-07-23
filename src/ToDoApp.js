import {Component} from 'react';
import './ToDo.css'

export default class ToDoApp extends Component{
    constructor(props){
        super(props);
        this.state = {
            items : [ 
                { text:"item#1", done: false, key: new Date().getMilliseconds()+ "item #1"},
                { text:"item#2", done: false, key: new Date().getMilliseconds()+ "item #2"},
                { text:"item#3", done: false, key: new Date().getMilliseconds()+ "item #3"},
                { text:"item#4", done: false, key: new Date().getMilliseconds()+ "item #4"}
            ],
            input:''
        }

    }
    move = (key) => {
        let filtered = this.state.items.map( item =>{
            if(item.key === key)
             item.done = !item.done;
             return item;
        })
        this.setState({items:filtered});
    } 
    handleChange =(e) =>{
       // console.log(e.target.value);
        this.setState({input: e.target.value})
    }
    add =()=>{
        console.log(this.state.input);
        let newItem = { text:this.state.input, done: false, key: new Date().getMilliseconds()};
        this.setState((state) => ({
            items:[newItem].concat(this.state.items)
        }))
    }
    getUndone = ()=>{
        let undone = this.state.items.filter(item => !item.done);
        if(!undone.length)
        return 
        return undone.length;
    }
    delet = (key) =>{
        let filtered = this.state.items.filter (item =>{return item.key!==key})
        this.setState({items:filtered})
    }
    render(){
        return(
            <div>
                <nav className="navbar navbar-light bg-light">
                    <div className="container-fluid">
                        <span className="navbar-brand mb-0 h1">ToDo App</span>
                    </div>
                </nav>
        <div className="container">
            <br/>
            <div className="row">
                <div className="col-md-6">
                    <div className="todolist">
                   <form onSubmit={(e)=>{e.preventDefault();this.add()}}>
                       <input placeholder="add to do " 
                       className= "form-control form-control-lg add-todo"
                       value={this.state.input} onChange={(e)=>this.handleChange(e)}/>
                   </form>
                   <br/>
                    <ul className="no-padding" id="not-done">
                        {
                            this.state.items.map(item =>{
                                if(!item.done)
                                return(<li className="list-unstyled" key={item.key}>
                                    <label onClick={()=>this.move(item.key)}>{item.text}</label></li>)})
                        }
                    </ul>
                    <div className="todo-footer"> 
                    <span>{this.getUndone()}</span> Items Left
                    </div>
                    </div>
     
                </div>
                <div className="col-md-6">

                <div className="todolist">                    
                    <ul id="done-items">
                        {
                            this.state.items.map(item =>{
                                if (item.done)
                                return(<li className="list-unstyled"  key={item.key} >
                                    <label onClick={()=>this.move(item.key)}>{item.text}</label>
                                    <button className="btn float-right"
                                    onClick={e=>this.delet(item.key)}><i className="fas fa-trash    "></i></button></li> )
                            })
                        }
                    </ul>
                </div>
                </div>
            </div>
        </div>
        </div>);
    }

}