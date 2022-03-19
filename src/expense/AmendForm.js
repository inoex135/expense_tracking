import React from 'react';
import {
    useParams,
    BrowserRouter,
    Routes,
    Link,
    Route
  } from "react-router-dom";


export default class AmendForm extends React.Component{
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

    componentDidMount(){
        const id = this.props.id;
        const taskId = this.props.taskId;
        console.log("ID " + id);
        this.setState({id: id});
        fetch(process.env.REACT_APP_CAMUNDA_API + "/process-instance/" + this.props.id + "/variables", {
          method: "GET",
          headers: new Headers({
            'Content-Type':'application/json'
          }),
          }) .then((res) => res.json())
          .then((json) => {
              this.setState({name: json.name.value, amount : json.amount.value, description : json.description.value});
          }
          )
      }
  
    handleSubmit(event) {
      event.preventDefault();
      try {
        let res = fetch(process.env.REACT_APP_CAMUNDA_API + "/task/" + this.props.taskId + "/submit-form", {
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
              }
            }
          )
        }
      ).then((json)=>{
        alert("Submitted")
      });
      } catch (err) {
        console.log(err);
      }
    }
  
    render(){
      return(
        <>
          <h2>Amend Request</h2>
          <form onSubmit={this.handleSubmit}>
            <div class="row mb-3">
            <div class='col-2'>
              <label class="form-label"><strong>Name</strong></label>
              </div>
              <div class='col-8'><input type='text' name='name' value={this.state.name} onChange={this.handleNameChanged}/></div>
            </div>
            <div class='row mb-3'>
                <div class='col-2'>
                    <label><strong>Amount</strong></label>
                </div>
              <div class='col'>$<input type='text' name='amount' value={this.state.amount} onChange={this.handleAmountChanged}/></div>
            </div>
            <div class='row mb-3'>
            <div class='col-2'>
              <label><strong>Description</strong></label>
              </div>
              <div class='col'><textarea cols='50' rows='8' value={this.state.description} onChange={this.handleDescriptionChanged}/></div>
            </div>
          
              <input type='submit' value='Submit'/>
        
          </form>
        </>
      );
    }
  }