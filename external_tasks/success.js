const { Client, logger } = require("camunda-external-task-client-js");

// configuration for the Client:
//  - 'baseUrl': url to the Process Engine
//  - 'logger': utility to automatically log important events
const config = { baseUrl: "http://localhost:8080/engine-rest", use: logger };

// create a Client instance with custom configuration
const client = new Client(config);

// susbscribe to the topic: 'approved'
client.subscribe("approved", async function({ task, taskService }) {
  // Put your business logic
  // complete the task
  console.log("Hello world");
  console.log(task.id + " was here");
  
  fetch(process.env.REACT_APP_CAMUNDA_API + "/process-instance/" + this.props.id + "/variables", {
    method: "GET",
    headers: new Headers({
      'Content-Type':'application/json'
    }),
    }) .then((res) => res.json())
    .then((json) => {
        fetch(process.env.REACT_APP_CAMUNDA_API + "/process-definition/key/approved_expense/start", {
            method: "POST",
            headers: new Headers({
              'Content-Type':'application/json'
            }),
            body: JSON.stringify(
              {
                "variables": {
                  "name" : {
                      "value" : json.name,
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
    }
    )

  

  await taskService.complete(task);
});