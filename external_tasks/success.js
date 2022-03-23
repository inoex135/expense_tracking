const { Client, logger } = require("camunda-external-task-client-js");

const request = require('request');



// configuration for the Client:
//  - 'baseUrl': url to the Process Engine
//  - 'logger': utility to automatically log important events
const REACT_APP_CAMUNDA_API = "http://localhost:8080/engine-rest";

const config = { baseUrl: REACT_APP_CAMUNDA_API, use: logger };

// create a Client instance with custom configuration
const client = new Client(config);

// susbscribe to the topic: 'approved'
client.subscribe("approved", async function({ task, taskService }) {
  // Put your business logic
  // complete the task
  request(REACT_APP_CAMUNDA_API + "/process-instance/" + task.processInstanceId + "/variables", { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }

    request.post({
      headers : {'Content-Type':'application/json'},
      url : REACT_APP_CAMUNDA_API + "/process-definition/key/approved_expense/start",
      body :JSON.stringify(
                    {
                      "variables": {
                        "name" : {
                            "value" : body.name.value,
                            "type": "String"
                        },
                        "amount" : {
                          "value" : body.amount.value,
                          "type": "Double"
                        },
                        "description" : {
                            "value" : body.description.value,
                            "type": "String"
                        }
                      },
                     "businessKey" : body.name.value
                    }
                  )
    }, function(error, response, body){
      console.log(body);
    });
    
  });
  await taskService.complete(task);
  console.log("DONE");
});