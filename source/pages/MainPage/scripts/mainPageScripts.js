function displayTime() {
  const inputRange = document.getElementById('time');
  const displayDiv = document.querySelector('.selectedTime');

  const timeValue = inputRange.value;

  displayDiv.innerHTML = `Under ${timeValue} Minutes`;
}

function init() {
  // eslint-disable-next-line no-console
  console.log('Called');

  // Making div display time selected from slider
  document.getElementById('time').addEventListener('input', displayTime);
  getDefaultRecipes();
}

/**
* Makes an API call to retrieve JSON recipe data
*/
function getDefaultRecipes() {
  fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=67931e62b88649359913dbc496b0ad08&instructionsRequired=true&addRecipeInformation=true`).then((response) => {
      return response.json();
    }).then((data) => {
      let recipeData = data.results;
      defaultRecipes(recipeData);
  });
}

/**
 * Populates mainPage with default recipes 
 * @param {Object} recipeData the object containing JSON recipe data
 */
 function defaultRecipes(recipeData) {
  for(let i=0; i<recipeData.length; i++) {
      // delegates the creation of recipe-card and its content to RecipeCard.js
      const recipeCard = document.createElement('recipe-card');
      recipeCard.data = recipeData[i];
      console.log(recipeData[i]['title']);
      document.querySelector('.recipes-container').appendChild(recipeCard);
  
      recipeCard.setAttribute('name', recipeData[i]['title']);
      recipeCard.setAttribute('image', recipeData[i]['image']);

      recipeCard.shadowRoot.querySelector('span').innerText = recipeData[i]['title'];
      recipeCard.shadowRoot.querySelector('div').style.backgroundImage = `url(${recipeData[i]['image']})`;
  }
}

window.addEventListener('DOMContentLoaded', init);
