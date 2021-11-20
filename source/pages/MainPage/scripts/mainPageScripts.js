const MAX_RECIPE_TIME = 100

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
 * Connect time label with the range input
 */
function displayTime () {
  const inputRange = document.getElementById('time')
  const displayDiv = document.querySelector('.selected-time')

  const timeValue = inputRange.value

  displayDiv.innerHTML = `Under ${timeValue} Minutes`
}

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
    document.querySelector('.recipes-container').appendChild(recipeCard)

    recipeCard.setAttribute('name', recipeData[i].title)
    recipeCard.setAttribute('image', recipeData[i].image)

    recipeCard.shadowRoot.querySelector('span').innerText = recipeData[i].title
    recipeCard.shadowRoot.querySelector('div').style.backgroundImage = `url(${recipeData[i].image})`
  }
}

function storeToSessionStorage (recipeData) {
  sessionStorage.clear()
  for (let i = 0; i < recipeData.length; i++) {
    sessionStorage.setItem(recipeData[i].id, recipeData[i])
  }
}

/**
* Makes an API call to retrieve JSON recipe data
*/
function getDefaultRecipes () {
  fetch('https://api.spoonacular.com/recipes/complexSearch?apiKey=2937aa3dddaa4891808d0cbf0110d3ee&instructionsRequired=true&addRecipeInformation=true').then((response) => {
    return response.json()
  }).then((data) => {
    const recipeData = data.results
    console.log(recipeData)
    // defaultRecipes(recipeData)
    createRecipeCards(recipeData)
    storeToSessionStorage(recipeData)
  })
}

/**
 * Makes an API call to retrieve JSON recipe data according to search
 * and filter input
 * @param {String} query the string specify filter and search information
 */
function fetchCall (query) {
  fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=2937aa3dddaa4891808d0cbf0110d3ee&${query}&instructionsRequired=true&addRecipeInformation=true`).then((response) => {
    return response.json()
  }).then((data) => {
    console.log(data.results)
    const recipeData = data.results
    console.log(recipeData)
    createRecipeCards(recipeData)
    storeToSessionStorage(recipeData)
  })
}

/**
 * Get filter and search information from input and call fetchCall function
 * to retrieve recipe.
 */
function bindButton () {
  const SearchButton = document.querySelector('.search-button')
  const FilterButton = document.querySelector('.filters-button')
  SearchButton.addEventListener('click', filterRecipes)
  FilterButton.addEventListener('click', filterRecipes)
  function filterRecipes (event) {
    type = []
    timeMax = MAX_RECIPE_TIME
    allergies = []
    diet = ''

    const searchBar = document.querySelector('.search-bar')
    searchText = searchBar.value

    // type checkbox
    const listedTypes = ['breakfast', 'lunch', 'dinner', 'snack']
    for (const a of listedTypes) {
      // type checkboxes
      const cbType = document.getElementById('type-' + a)
      // add to list
      if (cbType.checked) {
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
    const listedAllergies = ['lactose', 'egg', 'seafood', 'shellfish', 'peanut', 'wheat', 'soy', 'tree-nut']
    for (const a of listedAllergies) {
      const cbAllergies = document.getElementById('allergies-' + a)
      if (cbAllergies.checked) {
        allergies.push(a)
      } else {
        const index = allergies.indexOf(a)
        if (index > -1) {
          allergies.splice(index, 1)
        }
      }
    }

    // Diet need to be make sure that only one checkbox is checked at a time
    const cbDiets = document.getElementsByName('r-diet')
    for (let i = 0; i < cbDiets.length; i++) {
      if (cbDiets[i].checked) {
        diet = cbDiets[i].value
      }
    }
    if (diet === 'none') {
      diet = ''
    }

    console.log('query=' + searchText + '&' + 'intolerances=' + allergies.join(',') + '&' +
    'type=' + type.join(',') + '&' +
    'maxReadyTime=' + timeMax + '&' +
    'diet=' + diet)

    fetchCall('query=' + searchText + '&' + 'intolerances=' + allergies.join(',') + '&' +
    'type=' + type.join(',') + '&' +
    'maxReadyTime=' + timeMax + '&' +
    'diet=' + diet)
  }
}

function bindRecipes () {
  // Add event listener to each recipe card
  let recipeCardList = Array.from(document.querySelectorAll('recipe-card'));
  for (let i = 0; i < recipeCardList.length; i++){
    recipeCardList[i].addEventListener("click",(e)=>{
      sessionStorage.setItem('curr', recipeCardList.data.id)
      location.href = "hrefTotheGeneralRecipePage";
    })
  }
}

function init () {
  // eslint-disable-next-line no-console
  console.log('Called')

  // Making div display time selected from slider
  document.getElementById('time').addEventListener('input', displayTime)
  getDefaultRecipes()
  bindButton()
  bindRecipes()
}

window.addEventListener('DOMContentLoaded', init)
