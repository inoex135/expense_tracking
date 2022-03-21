import React from 'react';
export default class RequestForm extends React.Component{
    constructor(props) {
      super(props);
      this.state = {name: '', amount : 0, description : ''};
  
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
        fetch(process.env.REACT_APP_CAMUNDA_API + "/process-definition/key/expense_tracking/start", {
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
             "businessKey" : this.state.name
            }
          )
        }).then((json)=>{
            alert("Submitted")
        });
        } catch (err) {
            console.log(err);
        }
    }
  
    render(){
      return(
        <>
          <h2>Apply Request</h2>
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