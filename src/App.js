import logo from './logo.svg';
import './App.css';
import React from 'react';
import { render } from '@testing-library/react';

function List(){
  return (
    <div>
      <h1>This is List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Wisnu</td>
            <td>$100</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
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
      let res = fetch(process.env.REACT_APP_CAMUNDA_API + "/process-definition/expense_tracking/start", {
        mode: "no-cors",
        method: "POST",
        body: {
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
         "businessKey" : this.state.name
        },
      });
      
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
      <List/>
      <RequestForm/>
    </div>
  );
}

export default App;
