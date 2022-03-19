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
    }
  
    handleOnClick(event){
      alert(event.target.value);
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
                    console.log("TASK");
                    console.log(task);
                  document.getElementById("task-" + task.processInstanceId).innerHTML = "<a href='/" + task.taskDefinitionKey + "/" +  task.processInstanceId + "/" + task.id + "'>" + task.name + "</a>";
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
              <div class="table-responsive">
                <table class="table table-striped table-sm">
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
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td id={item.id}>{item.businessKey}</td>
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