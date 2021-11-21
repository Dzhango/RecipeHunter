window.addEventListener('DOMContentLoaded', init)

const MAX_RECIPE_TIME = 100

// The recipes list contain json objects of recipes
const recipes = []

// create lists of types checked
// the types of recipes input: breakfast, lunch, main course, snack
let type = []
// maximum cooking time
let timeMax = MAX_RECIPE_TIME
// a list of allergies / intolerance
let allergies = []
// the name of diet: there can only be one diet choosen.
let diet = ''
let searchText = ''

/**
 * Alters the recipe cards on the main page to display the recipes retrieved by search
 * @param {Object} recipeData the object containing JSON recipe data
 */
function createRecipeCards (recipeData) {
  // clear loaded recipe cards
  const recipesContainer = document.querySelector('.recipes-container')
  while (recipesContainer.firstChild) {
    recipesContainer.removeChild(recipesContainer.firstChild)
  }
  for (let i = 0; i < recipeData.length; i++) {
    // delegates the creation of recipe-card and its content to RecipeCard.js
    const recipeCard = document.createElement('recipe-card')
    recipeCard.data = recipeData[i]
    console.log(recipeData[i].title)
    console.log(recipeData[i].image)
    document.querySelector('.recipes-container').appendChild(recipeCard)

    recipeCard.setAttribute('name', recipeData[i].title)
    recipeCard.setAttribute('image', recipeData[i].image)

    recipeCard.shadowRoot.querySelector('span').innerText = recipeData[i].title
    recipeCard.shadowRoot.querySelector('div').style.backgroundImage = `url(${recipeData[i].image})`
  }
}

function fetchCall (query) {
  fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=67931e62b88649359913dbc496b0ad08&${query}&instructionsRequired=true&addRecipeInformation=true`).then((response) => {
    return response.json()
  }).then((data) => {
    console.log(data.results)
    const recipeData = data.results
    console.log(recipeData)
    createRecipeCards(recipeData)
    // let jsonContent = logTheObj(data.results);
    // console.log(typeof(data.results));
    // document.querySelector(".card-body").innerHTML =
    // `${jsonContent}`;
  })
}

function bindButton () {
  const SearchButton = document.querySelector('.search-button')
  SearchButton.addEventListener('click', function (event) {
    type = []
    timeMax = MAX_RECIPE_TIME
    allergies = []
    diet = ''

    const searchBar = document.querySelector('.search-bar')
    searchText = searchBar.value

    // type checkbox
    listed_types = ['breakfast', 'lunch', 'dinner', 'snack']
    for (a of listed_types) {
      // type checkboxes
      const cb_type = document.getElementById('type-' + a)
      // add to list
      if (cb_type.checked) {
        type.push(a)
      } else {
        // remove from list
        const index = type.indexOf(a)
        if (index > -1) {
          type.splice(index, 1)
        }
      }
    }

    // time checkbox
    const inputRange = document.getElementById('time')
    timeMax = inputRange.value

    // treenut?
    listed_allergies = ['lactose', 'egg', 'seafood', 'shellfish', 'peanut', 'wheat', 'soy', 'tree-nut']
    for (a of listed_allergies) {
      const cb_allergies = document.getElementById('allergies-' + a)
      if (cb_allergies.checked) {
        allergies.push(a)
      } else {
        const index = allergies.indexOf(a)
        if (index > -1) {
          allergies.splice(index, 1)
        }
      }
    }

    // Diet need to be make sure that only one checkbox is checked at a time
    const cb_diets = document.getElementsByName('r-diet')
    for (let i = 0; i < cb_diets.length; i++) {
      if (cb_diets[i].checked) {
        diet = cb_diets[i].value
      }
    }
    if (diet == 'none') {
      diet = ''
    }
    // matching with API: diets
    // in design channel graph - input to the API
    // keto - ketogenic
    // paleo - paleo
    // vegetarian - vegetarain
    // mediterranean - not exist
    // raw - not exsit
    // low carb - gluten free
    // no sugar - not exist

    // matching with API: allergies / intolerance
    // in design channel graph - input to the API
    // fish - seafood
    // dairy - dairy
    // tree nut - tree nut
    // shellfish - shellfish
    // eggs - egg
    // peanut - peanut
    // soy - soy
    // wheat - wheat

    // Filter recipes according to list content
    // if use spoonacular API:

    console.log('query=' + searchText + '&' + 'intolerances=' + allergies.join(',') + '&' +
        'type=' + type.join(',') + '&' +
        'maxReadyTime=' + timeMax + '&' +
            'diet=' + diet)

    fetchCall('query=' + searchText + '&' + 'intolerances=' + allergies.join(',') + '&' +
        'type=' + type.join(',') + '&' +
        'maxReadyTime=' + timeMax + '&' +
            'diet=' + diet)
  })
}

function displayTime () {
  const inputRange = document.getElementById('time')
  const displayDiv = document.querySelector('.selectedTime')
  const timeValue = inputRange.value
  displayDiv.innerHTML = `Under ${timeValue} Minutes`
}

async function init () {
  bindButton()
  document.getElementById('time').addEventListener('input', displayTime)
}
