


var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIDCounter = 0;


var taskFormHandler = function (event) {
  event.preventDefault();
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

// check if imput values are empty strings

if (!taskNameInput || !taskTypeInput) {
    alert("You need to fill out the task form!");
    return false;
}

formEl.reset()
 // package up data as an object
 var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput
};

// send it as an argument to createTaskEl
createTaskEl(taskDataObj);
};



var createTaskEl = function(taskDataObj){
// create list item
var listItemEl = document.createElement("li");
listItemEl.className = "task-item";

//add task id as a custom attribute
listItemEl.setAttribute("data-task-id" , taskIDCounter);


// create div to hold task info and add to list item
var taskInfoEl = document.createElement("div");
taskInfoEl.className = "task-info";
taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
listItemEl.appendChild(taskInfoEl);

// increase task counter for next unique id
taskIDCounter++;

var taskActionsEl = createTaskActions(taskIDCounter);
listItemEl.appendChild(taskActionsEl);


// add entire list item to list
tasksToDoEl.appendChild(listItemEl);


};

var createTaskAction = function(taskId) {
var actionContainerEl = document.createElement("div");
actionContainerEl.className = "task-actions";
}

var createTaskActions = function(taskId) {
var actionContainerEl = document.createElement("div");
actionContainerEl.className = "task-action";

//create edit button
var editButtonEl = document.createElement("button")
editButtonEl.textContent = "Edit";
editButtonEl.className = "btn edit-btn";
editButtonEl.setAttribute("data-task-id" , taskId);

actionContainerEl.appendChild(editButtonEl);

//create delete button
var deleteButtonEl = document.createElement("button");
deleteButtonEl.textContent = "Delete";
deleteButtonEl.className = "btn delete-btn";
deleteButtonEl.setAttribute("data-task-id", taskId);

actionContainerEl.appendChild(deleteButtonEl);

var statusSelectEl = document.createElement("select");
statusSelectEl.className = "select-status";
statusSelectEl.setAttribute("name", "status-change");
statusSelectEl.setAttribute("data-task-id", taskId);
var statusChoices = ["To Do" , "In Progress" , "Completed"];

for (var i = 0; i < statusChoices.length; i++) {

  //create option element
  var statusOptionEl = document.createElement("option");
  statusOptionEl.textContent = statusChoices[i];
  statusOptionEl.setAttribute("value" , statusChoices[i]);

  //append to select
  statusSelectEl.appendChild(statusOptionEl);
}


actionContainerEl.appendChild(statusSelectEl);

return actionContainerEl;
};


formEl.addEventListener("submit", taskFormHandler);