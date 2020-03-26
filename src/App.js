import React, {Component} from 'react';
import {TodoBanner} from './TodoBanner';
import {TodoRow} from './TodoRow';
import {TodoCreater} from './TodoCreater';
import {VisibilityControl} from './VisibilityControl';
//!Above, we have brought in the React library. We also need to bring in the component class. To add that import, we will comma seperate the classes we want to bring in that live in the React library 

export default class App extends Component{
  //!Above, we have created a class called "App" that extends the functionality of the component class in the React package. The export keyword makes the class available for use outside of the JavaScript file where it is defined. Simliar to an access modifier in C#

  //!We are going to create state data for our comonent. To do that, we need to create a Constructor method. This method will get called when an object is created using this class. Said in another way, this method will be called when the component is initialized.

  //!To ensure we have all of the neccesary features from React to create a stateful component, we need to call the SUPER method first. This calls the constructor for the component class in React.
  constructor(props){
    super(props)
    //!React components have a special property called "state" which is what we will use to define state data.
    this.state = {
      userName: "Devon Plackard",
      todoItems: [
        {
          action: "Buy Flowers for the girlfriend you dont have you sad boi",
          done: false
        },
        {
          action: "Get dem fresh J's",
          done: false
        },
        {
          action: "He need some MILK",
          done: true
        },
        {
          action: "Work towards world peace, sike. Work towards a cure for COVID19",
          done: true
        }
      ]
    }
  }
  //!We now need a way to change the state data for our component. We will create a nethod that can be called upon via a button click to change the value of userName. Remember that userName is a property stored in state data. We will use the "fat arrow" syntax. This allows functions to be expressed concisely. What we are really doing is creating an anonymous function. 
  changeStateData = () => {
    this.setState({
      userName: this.state.userName === "Devon Plackard" ? "Ricky Bobby" : "Devon Plackard"
    })
  }

  updateNewTextValue = (event) => {
    this.setState({newItemText: event.target.value});
  }

  createNewTodo = (task) => {
    if(!this.state.todoItems.find(x => x.action === task))
    {
      this.setState({
        //!We use the setState method here becase state data should NOT be updated directly. When setState is called the components stateData is updated with new values and then the render method is called (invoked) so that the UI is updated
        todoItems: [
          ...this.state.todoItems,
          //!The above use of the spread operator means that we are adding what was previous in the arrya back and then we are extending (adding) a new todo list item to the array
          {
            action: task,
            done: false
          }
        ]
      },
      () => localStorage.setItem("todos", JSON.stringify(this.state))
      )
    }
  }
  //!We have been focusing on embedding JavaScript expressions in fragments of HTML. However, since JSX allows us to freely mix HTML like syntax inside of JS, we can create methods that return HTML content.

  //!The map() below allows us to generate a sequence of HTML foreach item in the todoitem prop of state data
  //!The key property allows React to keep track of which items are updated. This is so we can avoid unneccesary re-render preformance hits 
  todoTableRows = (doneValue) => this.state.todoItems.filter(item => item.done === doneValue).map(item =>
    // <tr>
    //   <td>
    //     {item.action}
    //   </td>
    //   <td>
    //     <input type="checkbox" checked={item.done} onChange={() => this.toggleTodo(item)}/>
    //   </td>
    // </tr>
    <TodoRow key={item.action} item= {item} callback={this.toggleTodo}/>
  );

  toggleTodo = (todo) => this.setState(
  {
    todoItems: this.state.todoItems.map(item => item.action === todo.action ? {...item, done: !item.done } : item)
  },
    () => localStorage.setItem("todos", JSON.stringify(this.state))
  );

  componentDidMount = () => {
    let data = localStorage.getItem("todos");
    this.setState(
      data != null ? JSON.parse(data) :
      {
        userName: "Jenna",
        todoItems: [
          {
            action: "Buy Flowers for the girlfriend you dont have you sad boi",
            done: false
          },
          {
            action: "Get dem fresh J's",
            done: false
          },
          {
            action: "He need some MILK",
            done: true
          },
          {
            action: "Work towards world peace, sike. Work towards a cure for COVID19",
            done: true
          }
        ],
        showCompleted: true

      });
  }

  render(){
    return(
      <div>
        {/*
        <h4 className="bg-primary text-white text-center p-2">
          { this.state.userName }'s To Do List
          ({ this.state.todoItems.filter(t => !t.done).length} items to do)
        </h4>
        */}
        <TodoBanner name={this.state.userName} tasks={this.state.todoItems}/>
        {/* <button className="btn btn-primary m-2" onClick={ this.changeStateData }>Change</button> */}
        <div className="container-fluid">
          {/* <div className="my-1">
            <input className="form-control" value={this.state.newItemText} onChange={this.updateNewTextValue} />
            <button className="btn btn-primary mt-1" onClick={this.createNewTodo}>Add</button>
          </div> */}
          <TodoCreater callback={this.createNewTodo}/>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Description</th>
                <th>Done</th>
              </tr>
            </thead>
            <tbody>
              {this.todoTableRows(false)}
            </tbody>
          </table>
          <div className="bg-secondary text-white text-center p-2">
            <VisibilityControl description="Completed Tasks" isChecked={this.state.showCompleted} callback={(checked) => this.setState({showCompleted: checked})}/>
          </div>
          {this.state.showCompleted &&
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Done</th>
                </tr>
              </thead>
              <tbody>
                {this.todoTableRows(true)}
              </tbody>
            </table>
          }
        </div>
      </div>
    );
  }
};
