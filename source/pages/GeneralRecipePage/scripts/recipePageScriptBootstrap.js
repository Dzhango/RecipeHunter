window.addEventListener('DOMContentLoaded', init)

const sessionStorage = window.sessionStorage
const localStorage = window.localStorage

/**
 * bind favorite button on the general recipe page
 */
function bindFavoriteButton (event) {
  let recipeData = JSON.parse(sessionStorage.getItem(sessionStorage.getItem('curr')))
  if (recipeData === null) {
    recipeData = JSON.parse(localStorage.getItem(sessionStorage.getItem('curr')))
  }
  const FavoriteButton = event.target
  let inList = false
  if (localStorage.getItem(recipeData.id) != null) {
    inList = true
  }
  if (!inList) {
    // store
    try {
      localStorage.setItem(recipeData.id, JSON.stringify(recipeData))
    } catch {
      console.log('WARNING!!: Recipe not stored')
    }
    FavoriteButton.innerHTML = 'Remove from MyRecipes'
  } else {
    // delete
    try {
      localStorage.removeItem(recipeData.id)
    } catch {
      console.log('Remove Unsuccessful')
    }
    FavoriteButton.innerHTML = 'Add to MyRecipes'
  }
}

/**
* Go back on step in the history, bind to Back to Search button
*/
function backToSearch () {
  window.history.back()
}

function init () {
  // eslint-disable-next-line no-console

  // populate page with JSON data
  const dataKey = sessionStorage.getItem('curr')
  let recipeData
  if (sessionStorage.getItem(dataKey) == null) {
    recipeData = JSON.parse(localStorage.getItem(dataKey))
  } else {
    recipeData = JSON.parse(sessionStorage.getItem(dataKey))
  }
  const recipeExpand = document.createElement('recipe-expand-bootstrap')
  recipeExpand.data = recipeData
  document.querySelector('.main-div').appendChild(recipeExpand)

  // Return to search results when "Back to search" is clicked
  recipeExpand.shadowRoot.querySelector('.back-button').addEventListener('click', backToSearch)

  // Add to MyRecipes and Remove from MyRecipes
  recipeExpand.shadowRoot.querySelector('.add-to-myrecipes').addEventListener('click', bindFavoriteButton)
}

module.exports = { bindFavoriteButton, backToSearch, init }
