import logo from './logo.svg';
import './App.css';
import React from 'react';
import { render } from '@testing-library/react';

class TaskRequest extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      DataisLoaded: false
    };
  }

  componentDidMount(){
    fetch(
      process.env.REACT_APP_CAMUNDA_API + "/process-instance?processDefinitionKey=expense_tracking")
        .then((res) => res.json())
        .then((json) => {
            this.setState({
                items: json,
                DataisLoaded: true
            });
        })
  }
  render(){
    const { DataisLoaded, items } = this.state;
        if (!DataisLoaded) return <div>
            <h1> Pleses wait some time.... </h1> </div> ;
   
        return (
        <div className = "App">
            
        </div>
    );
  }
}

class ListRequest extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      ids: [],
      DataisLoaded: false
    };
  }

  getTasks(ids){
    return fetch(process.env.REACT_APP_CAMUNDA_API + "/task?processInstanceIdIn=" + ids)
    .then((res) => res.json())
    .then((json) => {
      console.log(json)
    })
  }

  componentDidMount(){
    fetch(
      process.env.REACT_APP_CAMUNDA_API + "/process-instance?processDefinitionKey=expense_tracking")
        .then((res) => res.json())
        .then((json) => {
          let items = json;
          let ids = json.map(function(item){
            return item.id
          });

          fetch(process.env.REACT_APP_CAMUNDA_API + "/task?processInstanceIdIn=" + ids)
          .then((res) => res.json())
          .then((json) => {
            items.forEach(function(item){
              item.tasks = json.filter(function(task){
                document.getElementById("task-" + task.processInstanceId).innerHTML = task.name;
              })
            })  
          })

          this.setState({
              items: items,
              DataisLoaded: true,
              ids: ids
          });
        })
  }
  render(){
    const { DataisLoaded, items } = this.state;
        if (!DataisLoaded) return <div>
            <h1> Pleses wait some time.... </h1> </div> ;
   
        return (
        <div className = "App">
            <h1> Fetch data from an api in react </h1>  
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Business Key</th>
                  <th>Tasks</th>
                </tr>
              </thead>
              <tbody>
              {
                items.map((item) => (  
                  <tr>
                    <td>{item.id}</td>
                    <td>{item.businessKey}</td>
                    <td id={"task-" + item.id}></td>
                  </tr>
                ))
            }
              </tbody>
            </table>
        </div>
    );
  }
}

class RequestForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {name: 'wisnu', amount : 0, description : ''};

    this.handleNameChanged = this.handleNameChanged.bind(this);
    this.handleAmountChanged = this.handleAmountChanged.bind(this);
    this.handleDescriptionChanged = this.handleDescriptionChanged.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChanged(event) {
    this.setState({name: event.target.value});
  }

  handleAmountChanged(event) {
    this.setState({amount: event.target.value});
  }

  handleDescriptionChanged(event) {
    this.setState({description: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    try {
      let res = fetch(process.env.REACT_APP_CAMUNDA_API + "/process-definition/key/expense_tracking/start", {
        method: "POST",
        headers: new Headers({
          'Content-Type':'application/json'
        }),
        body: JSON.stringify(
          {
            "variables": {
              "name" : {
                  "value" : this.state.name,
                  "type": "String"
              },
              "amount" : {
                "value" : this.state.amount,
                "type": "Double"
              },
              "description" : {
                  "value" : this.state.description,
                  "type": "String"
              }
            },
           "businessKey" : this.state.name + " - " + this.state.amount
          }
        )
      }
    );
    } catch (err) {
      console.log(err);
    }
  }

  render(){
    return(
      <div>
        <h1>Apply Request</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Name</label>
            <div><input type='text' name='name' value={this.state.name} onChange={this.handleNameChanged}/></div>
          </div>
          <div>
            <label>Amount</label>
            <div><input type='text' name='amount' value={this.state.amount} onChange={this.handleAmountChanged}/></div>
          </div>
          <div>
            <label>Description</label>
            <div><textarea value={this.state.description} onChange={this.handleDescriptionChanged}/></div>
          </div>
          <div>
            <input type='submit' value='Submit'/>
          </div>
        </form>
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <ListRequest/>
      <RequestForm/>
    </div>
  );
}

export default App;
