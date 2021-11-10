window.addEventListener('DOMContentLoaded', init);


function init() {


console.log("Called");

//Making div display time selected from slider    
document.getElementById("time").addEventListener("input", displayTime);


 

}
function displayTime(){


    let inputRange  = document.getElementById("time");
      let displayDiv = document.querySelector(".selectedTime");
      
      let timeValue = inputRange.value;

      displayDiv.innerHTML = `Under ${timeValue} Minutes`;


     

  }