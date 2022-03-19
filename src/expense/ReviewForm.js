import React from 'react';
import Modeler from 'bpmn-js/lib/Modeler';

  export default class ReviewForm extends React.Component{
    constructor(props) {
      super(props);
      this.state = {id: '', name: '', amount : 0, description : '', decision:''};
  
      this.handleDecisionChanged = this.handleDecisionChanged.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleDecisionChanged(event) {
      this.setState({decision: event.target.value});
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

        
        // fetch(process.env.REACT_APP_CAMUNDA_API + "/process-definition/key/expense_tracking/xml", {
        //     method: "GET",
        //     headers: new Headers({
        //       'Content-Type':'application/json'
        //     }),
        //     }) .then((res) => res.json())
        //     .then((json) => {
        //         // the diagram you are going to display
        //         const bpmnXML = json.bpmn20Xml;

        //         // BpmnJS is the BPMN viewer instance
        //         const viewer = new Modeler({ container: '#canvas', height:'400px' });

        //         // import a BPMN 2.0 diagram
        //         try {
        //         // we did well!
        //             viewer.importXML(bpmnXML);
        //             viewer.get('canvas').zoom('fit-viewport');
        //             var canvas = viewer.get('canvas');
        //             canvas.addMarker('review', 'highlight');

        //         } catch (err) {
        //             console.log(err);
        //         }
        //     }
        //     )
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
                "decision" : {
                    "value" : this.state.decision,
                    "type": "String"
                },
              },
             "businessKey" : this.state.name + " - " + this.state.amount
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
          <h2>Review Manager</h2>
          <div class='row'>
              <div class='col-2'><strong>ID</strong></div>
              <div class='col-6'>{this.state.id}</div>
          </div>
          <div class='row'>
              <div class='col-2'><strong>Name</strong></div>
              <div class='col-6'>{this.state.name}</div>
          </div>
          <div class='row'>
              <div class='col-2'><strong>Amount</strong></div>
              <div class='col-6'>${this.state.amount}</div>
          </div>
          <div class='row'>
              <div class='col-2'><strong>Description</strong></div>
              <div class='col-6'>{this.state.description}</div>
          </div>

          <form onSubmit={this.handleSubmit}>
              <br/>
          <div class="row mb-3">
              <div class='col-2'>
              <label class="form-label"><strong>Decision</strong></label>
              </div>
              <div class='col-8'>
                <select name='decision' onChange={this.handleDecisionChanged}>
                    <option>Select Decision</option>
                    <option value='yes'>Yes</option>
                    <option value='no'>No</option>
                    <option value='amend'>Amend</option>
                </select>
              </div>
            </div>
            
            <div>
              <input type='submit' value='Submit'/>
            </div>
          </form>
            <br/><br/><br/><br/>
            <div id="canvas" ></div>
        </>
      );
    }
  }