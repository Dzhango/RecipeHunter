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

const dropdownBtnTemplate = document.createElement('template')
dropdownBtnTemplate.innerHTML = `
<button type="button" class="btn btn-light dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
</button>
`

const toggleBtnTemplate = document.createElement('template')
toggleBtnTemplate.innerHTML = `
<button class="btn filter-toggle align-items-center" data-toggle="collapse">
</button>
`

/**
 * Connect time label with the range input
 */
function displayTime () {
  const inputRange = document.getElementById('time')
  const displayDiv = document.querySelector('#timeintext')
  const timeValue = inputRange.value
  displayDiv.innerHTML = `${timeValue}`
}

/**
 * Pop out filter div
 * @param {String} name the string of the filter
 */
function mediumFilterDiv (name) {
  const filterDiv = document.getElementById(`${name.toLowerCase()}-filters`)
  filterDiv.classList.add('btn-group')
  filterDiv.classList.add('dropright')
  filterDiv.removeChild(filterDiv.children[0])
  const typeBtn = dropdownBtnTemplate.content.cloneNode(true)
  const typeBtnEle = typeBtn.querySelector('.btn')
  typeBtnEle.innerText = name
  filterDiv.insertBefore(typeBtn, filterDiv.children[0])
  const typeCheckboxDiv = document.getElementById(`collapse-${name.toLowerCase()}`)
  typeCheckboxDiv.classList.remove('collapse')
  typeCheckboxDiv.classList.remove('show')
  typeCheckboxDiv.classList.add('dropdown-menu')
  typeCheckboxDiv.classList.add('bg-light')
}

/**
 * Drop down filter div
 * @param {String} name the string of the filter
 */
function largeFilterDiv (name) {
  const typeDiv = document.getElementById(`${name.toLowerCase()}-filters`)
  typeDiv.classList.remove('btn-group')
  typeDiv.classList.remove('dropright')
  typeDiv.removeChild(typeDiv.children[0])
  const typeBtn = toggleBtnTemplate.content.cloneNode(true)
  const typeBtnEle = typeBtn.querySelector('.btn')
  typeBtnEle.innerText = name
  typeBtnEle.setAttribute('data-target', `#collapse-${name.toLowerCase()}`)
  typeDiv.insertBefore(typeBtn, typeDiv.children[0])
  const typeCheckboxDiv = document.getElementById(`collapse-${name.toLowerCase()}`)
  typeCheckboxDiv.classList.remove('dropdown-menu')
  typeCheckboxDiv.classList.remove('bg-light')
  typeCheckboxDiv.classList.add('collapse')
  if (name === 'Type') {
    typeCheckboxDiv.classList.add('show')
    typeBtnEle.setAttribute('aria-expanded', 'true')
  } else {
    typeBtnEle.setAttribute('aria-expanded', 'false')
  }
}

/**
 * Collapse the filter sidebar
 */
function collapseSidebar (mq) {
  let mgl
  if (mq.matches) {
    mgl = '100px'
  } else {
    mgl = '180px'
  }
  const sidebarEle = document.querySelector('.sidebar')
  const toggleSidebarBtn = document.querySelector('#togglesidebar')
  const recipesContainer = document.querySelector('.recipes-container')
  if (sidebarEle.hidden) {
    sidebarEle.hidden = false
    sidebarEle.style.display = ''
    recipesContainer.style.marginLeft = mgl
    toggleSidebarBtn.setAttribute('aria-expanded', 'true')
  } else {
    sidebarEle.setAttribute('style', 'display: none !important;')
    sidebarEle.hidden = true
    recipesContainer.style.marginLeft = '0px'
    toggleSidebarBtn.setAttribute('aria-expanded', 'false')
  }
}

/**
 * Change filter div based on screen size
 */
function changeSidebar (mq) {
  const sidebarEle = document.querySelector('.sidebar')
  if (sidebarEle.hidden) {
    return
  }
  let mgl
  if (mq.matches) {
    // screen size is smaller than 768px
    mgl = '100px'
    mediumFilterDiv('Type')
    mediumFilterDiv('Time')
    mediumFilterDiv('Allergies')
    mediumFilterDiv('Diet')
  } else {
    mgl = '180px'
    largeFilterDiv('Type')
    largeFilterDiv('Time')
    largeFilterDiv('Allergies')
    largeFilterDiv('Diet')
  }
  const recipesContainer = document.querySelector('.recipes-container')
  recipesContainer.style.marginLeft = mgl
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
    document.querySelector('.recipes-container').appendChild(recipeCard)
    recipeCard.classList.add('col-12', 'col-sm-4', 'col-lg-3', 'pl-3', 'pr-3', 'pb-3')
    recipeCard.style.padding = 0
    recipeCard.setAttribute('name', recipeData[i].title)
    recipeCard.setAttribute('image', recipeData[i].image)
    recipeCard.shadowRoot.querySelector('.recipe-title').innerText = recipeData[i].title
    recipeCard.shadowRoot.querySelector('.card-img-top').setAttribute('src', recipeData[i].image)
  }
}

/**
 * Store a list of recipes into the session storage
 * @param {Object} recipeData the object containing JSON recipe data
 */
function storeToSessionStorage (recipeData) {
  sessionStorage.clear()
  for (let i = 0; i < recipeData.length; i++) {
    sessionStorage.setItem(recipeData[i].id, JSON.stringify(recipeData[i]))
  }
}

/**
 * Create recipe cards from recipe data in session storage
 */
function populateFromSession () {
  // refresh the page through repopulating page from session storage
  const list_recipes = []
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i)
    if (key == 'IsThisFirstTime_Log_From_LiveServer' || key == 'curr') {
      continue
    }
    const recipe = sessionStorage.getItem(sessionStorage.key(i))
    list_recipes.push(JSON.parse(recipe))
  }
  createRecipeCards(list_recipes)
  bindRecipes()
}

/**
 * Makes an API call to retrieve JSON recipe data
 */
function getDefaultRecipes () {
  fetch('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?instructionsRequired=true&addRecipeInformation=true&addRecipeNutrition=true', {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      'x-rapidapi-key': 'e448cb3f23msh24599c589d222bfp18177ajsn2d6682024b3b'
    }
  })
    .then((response) => {
      return response.json()
    }).then((data) => {
      const recipeData = data.results
      createRecipeCards(recipeData)
      bindRecipes()
      storeToSessionStorage(recipeData)
    })
}

/**
 * Makes an API call to retrieve JSON recipe data according to search
 * and filter input
 * @param {String} query the string specify filter and search information
 */
function fetchCall (query) {
  fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?${query}&instructionsRequired=true&addRecipeInformation=true&addRecipeNutrition=true`, {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      'x-rapidapi-key': 'e448cb3f23msh24599c589d222bfp18177ajsn2d6682024b3b'
    }
  })
    .then((response) => {
      return response.json()
    }).then((data) => {
      const recipeData = data.results
      createRecipeCards(recipeData)
      bindRecipes()
      storeToSessionStorage(recipeData)
    })
}

/**
 * Get filter and search information from input and call fetchCall function
 * to retrieve recipe.
 */
function bindButton () {
  const FilterButton = document.querySelector('.filters-button')
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

    fetchCall('query=' + searchText + '&' + 'intolerances=' + allergies.join(',') + '&' +
            'type=' + type.join(',') + '&' +
            'maxReadyTime=' + timeMax + '&' +
            'diet=' + diet)
  }
}

/**
 * Bind recipe card to general recipe page
 */
function bindRecipes () {
  // Add event listener to each recipe card
  const recipeCardList = Array.from(document.querySelectorAll('recipe-card'))
  for (let i = 0; i < recipeCardList.length; i++) {
    recipeCardList[i].addEventListener('click', (e) => {
      sessionStorage.setItem('curr', recipeCardList[i].data.id)
      // if on live server
      if (location.origin == 'http://127.0.0.1:5500') {
        location.href = '/source/pages/GeneralRecipePage/recipePageBootstrap.html'
      } else {
        location.href = '/pages/GeneralRecipePage/recipePageBootstrap.html'
      }
    })
  }
}

function init () {
  // eslint-disable-next-line no-console

  // Making div display time selected from slider
  const smWindowSize = window.matchMedia('(max-width: 768px)')
  document.getElementById('togglesidebar').addEventListener('click', () => collapseSidebar(smWindowSize))
  changeSidebar(smWindowSize)
  smWindowSize.addEventListener('change', () => changeSidebar(smWindowSize))
  document.getElementById('time').addEventListener('input', displayTime)
  if (sessionStorage.length < 3) {
    getDefaultRecipes()
  } else {
    populateFromSession()
  }
  bindButton()
}

window.addEventListener('DOMContentLoaded', init)

module.exports = {
  displayTime,
  mediumFilterDiv,
  largeFilterDiv,
  collapseSidebar,
  changeSidebar,
  createRecipeCards,
  storeToSessionStorage,
  populateFromSession,
  getDefaultRecipes,
  fetchCall,
  bindButton,
  bindRecipes,
  init
}
