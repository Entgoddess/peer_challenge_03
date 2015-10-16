var atticus = {
  name : "Atticus",
  code : "2405",
  salary : "47000",
  score : 3
};

var jem = {
  name : "Jem",
  code : "62347",
  salary : "63500",
  score : 4
};

var boo = {
  name : "Boo",
  code : "11435",
  salary : "54000",
  score : 3
};

var scout = {
  name : "Scout",
  code : "6243",
  salary : "74750",
  score : 5
};

var array = [atticus, jem, boo, scout];

//Create variables used to write to the DOM
var newEl, newText, position;
//Capture the position of insertion into the DOM
position = document.getElementById('content');

//Loop the array, extracting each array and writing information to the DOM
//Note that the information is not 'clean'
for(var i = 0; i < array.length; i++){
  array[i] = calculateSTI(array[i]);  //added [i]
  //newEl = document.createElement('li');
  // newText = document.createTextNode(array[i].name);
  // newEl.appendChild(newText);
  // position.appendChild(newEl);
};


$(document).ready(function(){
  $("#container").on('click', '.myButton',function(){
    for(var i = 0; i < array.length; i++){
      var employee = (array[i].name + ", " + array[i].sti + ", " + array[i].salary + ", " + array[i].salaryBump);
      console.log(employee);
    }
  });

  for(i = 0; i < array.length; i++){
    $("#container").append("<div></div>");
    $("#container").children().last().append("<li></li>");
    $("#container").children().last().text(array[i].name + ", " + array[i].sti + ", " + array[i].salary + ", " + array[i].salaryBump);
    $("#container").children().last().append("<button class='myButton'>Click me!</button>");
  }
});

function calculateSTI(person){
  var newObject = {};

  newObject.name = person.name;
  

  var employeeNumber = person.code;
  var baseSalary = person.salary;
  var reviewScore = person.score;

  
  var bonus = getBaseSTI(reviewScore) + getYearAdjustment(employeeNumber) - getIncomeAdjustment(baseSalary);
  if(bonus > 0.13){
    bonus = 0.13;
  }
  newObject.sti = bonus;
  newObject.salary = Math.round(baseSalary * (1.0 + bonus)); //added Math.round()
  newObject.salaryBump = (baseSalary * bonus);
  console.log(newObject.name + " " + newObject.sti + " " + newObject.salary + " " + newObject.salaryBump);
  return newObject;
}

function getBaseSTI(reviewScore){
  var basePercent;
  switch(reviewScore){
    case 1:
      basePercent = 0;
      break;
    case 2:
      basePercent = 0;
      break;
    case 3:
      basePercent = 0.04;
      break;
    case 4:
      basePercent = 0.06;
      break;
    case 5:
      basePercent = 0.10;
      break;
  }
  return basePercent; // removed -1
}

function getYearAdjustment(employeeNumber){
  var yearAdjustment = 0;
  if(employeeNumber.length == 4){
    yearAdjustment = 0.05;
  }
  return yearAdjustment;
}

function getIncomeAdjustment(salary){
  var incomeAdjustment = 0;
  salary = parseInt(salary);
  if(salary > 65000){
    incomeAdjustment = 0.01;
  }
  return incomeAdjustment;
}


