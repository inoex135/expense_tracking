import logo from './logo.svg';
import './App.css';
import React from 'react';
import { render } from '@testing-library/react';

function List(){
  return (
    <div>
      <h1>This is List</h1>
      <table>
        <tr>
          <th>Name</th>
          <th>Amount</th>
        </tr>
        <tr>
          <td>Wisnu</td>
          <td>$100</td>
        </tr>
      </table>
    </div>
  );
}
class RequestForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {name: 'wisnu', amount : 0, description : ''};

    // this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChanged(event) {
    this.setState({name: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.name);
    event.preventDefault();
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
            <div><input type='text' name='amount' value={this.state.amount}/></div>
          </div>
          <div>
            <label>Description</label>
            <div><textarea value={this.state.description}/></div>
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
