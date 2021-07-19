import {Component} from 'react';
export default class ToDoApp extends Component{
    constructor(props){
        super(props);
        this.state = {
            items : [ 
                { text:"item#1", done: false, key: new Date().getMilliseconds()+ "item#1"},
                { text:"item#2", done: false, key: new Date().getMilliseconds()+ "item#2"},
                { text:"item#3", done: false, key: new Date().getMilliseconds()+ "item#3"},
                { text:"item#4", done: false, key: new Date().getMilliseconds()+ "item#4"}
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
    render(){
        return(
        <div className="container">
            <br/>
            <div className="row">
                <div className="col-md-6">
                   <form onSubmit={(e)=>{e.preventDefault();this.add()}}>
                       <input placeholder="add to do " value={this.state.input} onChange={(e)=>this.handleChange(e)}/>
                   </form>
                   List Undone
                    <ul>
                        {
                            this.state.items.map(item =>{
                                if(!item.done)
                                return(<li key={item.key} onClick={()=>this.move(item.key)}>{item.text}</li>)})
                        }
                    </ul>
                </div>
                <div className="col-md-6">
                    List Done
                    <ul>
                        {
                            this.state.items.map(item =>{
                                if (item.done)
                                return(<li key={item.key} onClick={()=>this.move(item.key)}>{item.text}</li>)
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>);
    }

}