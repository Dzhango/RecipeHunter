window.addEventListener('DOMContentLoaded', init)

// a list of populated recipes for testing
let selected = false
const localStorage = window.localStorage
const sessionStorage = window.sessionStorage

/**
 * delete the recipe from local storage with that id
 * @param {int} id of recipe
 */
function DeleteFromFavID (id) {
  try {
    localStorage.removeItem(id)
  } catch {
    console.log('Remove Unsuccessful')
  }
}

/**
 * Bind the remove button to remove recipes from local storages that are selected
 * Selected: if in the select mode, the recipe
 */
function bindRemoveButton () {
  document.querySelector('.remove-button').addEventListener('click', () => {
    const removalArray = []
    let recipesSelected = []
    recipesSelected = document.querySelectorAll('recipe-card')
    for (const r of recipesSelected) {
      const sr = r.shadowRoot
      const innerdiv = sr.querySelector('.recipe-card')
      if (!innerdiv.classList.contains('grey')) {
        removalArray.push(r.id)
      }
    }
    for (const recipeID of removalArray) {
      DeleteFromFavID(recipeID)
    }
    populateMyRecipe()
    greyOut(false)
    selected = false
    bindRecipeCards()
    document.querySelector('.cancel-button').classList.add('hide')
    document.querySelector('.remove-button').classList.add('hide')
  })
}

function populateMyRecipe () {
  // refresh the page through repopulating page from local storage
  const listRecipes = []
  for (let i = 0; i < localStorage.length; i++) {
    const recipe = localStorage.getItem(localStorage.key(i))
    listRecipes.push(JSON.parse(recipe))
  }
  createRecipeCards(listRecipes)
  bindRecipeCards()
}

function bindRecipeCards () {
  // Add event listener to each recipe card
  const recipeCardList = Array.from(document.querySelectorAll('recipe-card'))
  for (let i = 0; i < recipeCardList.length; i++) {
    if (selected) {
      recipeCardList[i].removeEventListener('click', bindRecipeClick)
      recipeCardList[i].addEventListener('click', bindRecipeSelect)
    } else {
      recipeCardList[i].removeEventListener('click', bindRecipeSelect)
      recipeCardList[i].addEventListener('click', bindRecipeClick)
    }
  }
}

function bindRecipeSelect (event) {
  const recipe = event.target
  if (recipe.shadowRoot.querySelector('.recipe-card').classList.contains('grey')) {
    recipe.shadowRoot.querySelector('.recipe-card').classList.remove('grey')
  } else {
    recipe.shadowRoot.querySelector('.recipe-card').classList.add('grey')
  }
}

function bindRecipeClick (event) {
  const recipe = event.target
  sessionStorage.setItem('curr', recipe.data.id)
  // if on live server
  if (window.location.origin.includes('netlify.app')) {
    window.location.href = '/pages/GeneralRecipePage/recipePageBootstrap.html'
  } else {
    window.location.href = '/source/pages/GeneralRecipePage/recipePageBootstrap.html'
  }
}

// if on == true; addes grey filter to every card's image
// if(on ==false ) removes grey filter from every card's image
function greyOut (on) {
  // select all recipe cards
  const recipeCardList = Array.from(document.querySelectorAll('recipe-card'))
  // if true is passed in, grey out every card by adding the grey class to each recipe card
  if (on) {
    for (let i = 0; i < recipeCardList.length; i++) {
      recipeCardList[i].shadowRoot.querySelector('.recipe-card').classList.add('grey')
    }
  } else {
    // otherwise (if false is passed in), remove the grey class from each recipe card
    for (let i = 0; i < recipeCardList.length; i++) {
      recipeCardList[i].shadowRoot.querySelector('.recipe-card').classList.remove('grey')
    }
  }
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
    recipeCard.id = recipeData[i].id
    recipeCard.classList.add('col-md-3')
    document.querySelector('.recipes-container').appendChild(recipeCard)
    recipeCard.setAttribute('name', recipeData[i].title)
    recipeCard.setAttribute('image', recipeData[i].image)
    recipeCard.shadowRoot.querySelector('.recipe-title').innerText = recipeData[i].title
    recipeCard.shadowRoot.querySelector('.card-img-top').setAttribute('src', recipeData[i].image)
  }
}

function addRecipeURL (URL) {
  const fetchUrl = `https://api.spoonacular.com/recipes/extract?apiKey=aebc3ef46cd54888b77ec872fa50deb1&url=${URL}`
  fetch(fetchUrl)
    .then((response) => {
      return response.json()
    }).then((recipeData) => {
      // insert data into recipe array and repopulate local storage
      // let inList = false
      recipeData.id = hashing(recipeData.title)
      // if there isnt a duplicate recipe, add it to myRecipe;
      if (localStorage.getItem(recipeData.id) != null) {
        console.log('DUPLICATE RECIPE')
      } else {
        localStorage.setItem(recipeData.id, JSON.stringify(recipeData))
        populateMyRecipe()
      }
    })
    .catch(error => {
      console.log(error)
    })
}

/**
 * return the hashed string
 * @param {string} string to hash
 * @returns the hashed value of the string
 */
function hashing (string) {
  // set variable hash as 0
  let hash = 0
  // if the length of the string is 0, return 0
  if (string.length === 0) return hash
  for (let i = 0; i < string.length; i++) {
    const ch = string.charCodeAt(i)
    hash = ((hash << 5) - hash) + ch
    hash = hash & hash
  }
  return hash
}

function addPageSubmitOnClick () {
  const URL = document.querySelector('.addPageText').value
  addRecipeURL(URL)
  document.querySelector('.addPageText').value = ''
}

async function init () {
  populateMyRecipe()
  document.querySelector('.select-button').addEventListener('click', () => {
    document.querySelector('.cancel-button').classList.remove('hide')
    document.querySelector('.remove-button').classList.remove('hide')
    // grey all of the recipe-card
    greyOut(true)
    selected = true
    bindRecipeCards()
  })

  // logic for cancel button
  document.querySelector('.cancel-button').addEventListener('click', () => {
    document.querySelector('.cancel-button').classList.add('hide')
    document.querySelector('.remove-button').classList.add('hide')
    // remove all the grey class
    greyOut(false)
    selected = false
    bindRecipeCards()
  })
  document.querySelector('.addPageSubmit').addEventListener('click', () => { addPageSubmitOnClick() })
  bindRemoveButton()
}

module.exports = {
  DeleteFromFavID,
  bindRemoveButton,
  populateMyRecipe,
  bindRecipeCards,
  bindRecipeSelect,
  bindRecipeClick,
  greyOut,
  createRecipeCards,
  addRecipeURL,
  hashing,
  addPageSubmitOnClick
}
