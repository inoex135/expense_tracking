import React from 'react';
import {
    useParams,
    BrowserRouter,
    Routes,
    Link,
    Route
  } from "react-router-dom";
export default class ListRequest extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
        items: [],
        ids: [],
        DataisLoaded: false
      };
      this.handleOnClick = this.handleOnClick.bind(this);
      this.handleSearch = this.handleSearch.bind(this);
    }
  
    handleOnClick(event){
      alert(event.target.value);
    }

    handleSearch(event){
        console.log("Keyword" + event.target.value);
        fetch(
            process.env.REACT_APP_CAMUNDA_API + "/process-instance?processDefinitionKey=expense_tracking&variables=name_like_" + event.target.value + "%")
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
                    document.getElementById("task-" + task.processInstanceId).innerHTML = "<a href='/" + task.taskDefinitionKey + "/" +  task.processInstanceId + "/" + task.id + "'>" + task.name + "</a>";
                    })
                })  
                });

                fetch(process.env.REACT_APP_CAMUNDA_API + "/variable-instance?processInstanceIdIn=" + ids)
                .then((res) => res.json())
                .then((json) => {
                items.forEach(function(item){
                    item.variables = json.filter(function(variable){
                        if(variable.name === "name"){
                            document.getElementById("name-" + variable.processInstanceId).innerHTML = variable.value;
                        }
                        if(variable.name === "amount"){
                            document.getElementById("amount-" + variable.processInstanceId).innerHTML = "$" + variable.value;
                        }
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
                    document.getElementById("task-" + task.processInstanceId).innerHTML = "<a href='/" + task.taskDefinitionKey + "/" +  task.processInstanceId + "/" + task.id + "'>" + task.name + "</a>";
                    })
                })  
                });

                fetch(process.env.REACT_APP_CAMUNDA_API + "/variable-instance?processInstanceIdIn=" + ids)
                .then((res) => res.json())
                .then((json) => {
                items.forEach(function(item){
                    item.variables = json.filter(function(variable){
                        if(variable.name === "name"){
                            document.getElementById("name-" + variable.processInstanceId).innerHTML = variable.value;
                        }
                        if(variable.name === "amount"){
                            document.getElementById("amount-" + variable.processInstanceId).innerHTML = "$" + variable.value;
                        }
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
              <h2>Expense Requests</h2>  
              <div class='row'>
                  <div class='col-3'>
                  Search by Name <input type='text' name='search' onChange={this.handleSearch}/>
                  </div>
              </div>
              <div class="table-responsive">
                <table class="table table-striped table-sm">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    items.map((item) => (  
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td id={"name-" + item.id}></td>
                        <td id={"amount-" + item.id}></td>
                        <td id={"task-" + item.id}></td>
                      </tr>
                      
                    ))
                }
                  </tbody>
                </table>
              </div>
          </div>
      );
    }
  }