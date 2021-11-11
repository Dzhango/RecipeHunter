function displayTime() {
  const inputRange = document.getElementById('time');
  const displayDiv = document.querySelector('.selectedTime');

  const timeValue = inputRange.value;

  displayDiv.innerHTML = `Under ${timeValue} Minutes`;
}

function init() {
  console.log('Called');

  // Making div display time selected from slider
  document.getElementById('time').addEventListener('input', displayTime);
}

window.addEventListener('DOMContentLoaded', init);
