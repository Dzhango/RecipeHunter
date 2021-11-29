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
function displayTime() {
    const inputRange = document.getElementById('time')
    const displayDiv = document.querySelector('.selected-time')

    const timeValue = inputRange.value

    displayDiv.innerHTML = `Under ${timeValue} Minutes`
}

/**
 * Alters the recipe cards on the main page to display the recipes retrieved by search
 * @param {Object} recipeData the object containing JSON recipe data
 */
function createRecipeCards(recipeData) {
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

        recipeCard.setAttribute('name', recipeData[i].title)
        recipeCard.setAttribute('image', recipeData[i].image)
        
        recipeCard.shadowRoot.querySelector('.recipe-title').innerText = recipeData[i].title
        recipeCard.shadowRoot.querySelector('.card-img-top').setAttribute('src', recipeData[i].image)
    }
}

function storeToSessionStorage(recipeData) {
    sessionStorage.clear()
    for (let i = 0; i < recipeData.length; i++) {
        sessionStorage.setItem(recipeData[i].id, JSON.stringify(recipeData[i]))
    }
}

function populateFromSession() {
    // refresh the page through repopulating page from session storage
    let list_recipes = []
    for (let i = 0; i < sessionStorage.length; i++) {
        key = sessionStorage.key(i)
        if (key == 'IsThisFirstTime_Log_From_LiveServer' || key == 'curr') {
            continue
        }
        let recipe = sessionStorage.getItem(sessionStorage.key(i))
        list_recipes.push(JSON.parse(recipe))
    }
    createRecipeCards(list_recipes)
    bindRecipes()
}

/**
 * Makes an API call to retrieve JSON recipe data
 */
function getDefaultRecipes() {
    fetch('https://api.spoonacular.com/recipes/complexSearch?apiKey=99a52ef738514021ab33c7e15116c1ca&instructionsRequired=true&addRecipeInformation=true').then((response) => {
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
function fetchCall(query) {
    fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=99a52ef738514021ab33c7e15116c1ca&${query}&instructionsRequired=true&addRecipeInformation=true`).then((response) => {
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
function bindButton() {
    const SearchButton = document.querySelector('.search-button')
    const FilterButton = document.querySelector('.filters-button')
    SearchButton.addEventListener('click', filterRecipes)
    FilterButton.addEventListener('click', filterRecipes)

    function filterRecipes(event) {
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

        fetchCall('query=' + searchText + '&' + 'intolerances=' + allergies.join(',') + '&' +
            'type=' + type.join(',') + '&' +
            'maxReadyTime=' + timeMax + '&' +
            'diet=' + diet)
    }
}

function bindRecipes() {
    // Add event listener to each recipe card
    let recipeCardList = Array.from(document.querySelectorAll('recipe-card'));
    for (let i = 0; i < recipeCardList.length; i++) {
        recipeCardList[i].addEventListener("click", (e) => {
            sessionStorage.setItem('curr', recipeCardList[i].data.id)
                //if on live server
            if (location.origin == 'http://127.0.0.1:5500') {
                location.href = "/source/pages/GeneralRecipePage/recipepage.html";
            } else {
                location.href = "/pages/GeneralRecipePage/recipepage.html";
            }
        })
    }
}

function init() {
    // eslint-disable-next-line no-console

    // Making div display time selected from slider
    document.getElementById('time').addEventListener('input', displayTime)
    if (sessionStorage.length < 3) {
        getDefaultRecipes()
    } else {
        //getDefaultRecipes()
        populateFromSession()
    }
    bindButton()
}

window.addEventListener('DOMContentLoaded', init)