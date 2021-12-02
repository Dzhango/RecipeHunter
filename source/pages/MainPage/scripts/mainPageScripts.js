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
function displayTime() {
    const inputRange = document.getElementById('time')
    const displayDiv = document.querySelector('.selected-time')

    const timeValue = inputRange.value

    displayDiv.innerHTML = `Under ${timeValue} Minutes`
}

function mediumFilterDiv(name) {
    const filterDiv = document.getElementById(`${name}-filters`)
    filterDiv.classList.add('btn-group')
    filterDiv.classList.add('dropright')
    filterDiv.removeChild(filterDiv.children[0])
    const typeBtn = dropdownBtnTemplate.content.cloneNode(true)
    const typeBtnEle = typeBtn.querySelector('.btn')
    typeBtnEle.innerText = name
    filterDiv.insertBefore(typeBtn, filterDiv.children[0])
    const typeCheckboxDiv = document.getElementById(`collapse-${name}`)
    typeCheckboxDiv.classList.remove('collapse')
    typeCheckboxDiv.classList.remove('show')
    typeCheckboxDiv.classList.add('dropdown-menu')
    typeCheckboxDiv.classList.add('bg-light')
}

function largeFilterDiv(name) {
    const typeDiv = document.getElementById(`${name}-filters`)
    typeDiv.classList.remove('btn-group')
    typeDiv.classList.remove('dropright')
    typeDiv.removeChild(typeDiv.children[0])
    const typeBtn = toggleBtnTemplate.content.cloneNode(true)
    const typeBtnEle = typeBtn.querySelector('.btn')
    typeBtnEle.innerText = name
    typeBtnEle.setAttribute('data-target', `#collapse-${name}`)
    typeDiv.insertBefore(typeBtn, typeDiv.children[0])
    const typeCheckboxDiv = document.getElementById(`collapse-${name}`)
    typeCheckboxDiv.classList.remove('dropdown-menu')
    typeCheckboxDiv.classList.remove('bg-light')
    typeCheckboxDiv.classList.add('collapse')
    if (name === 'type') {
        typeCheckboxDiv.classList.add('show')
        typeBtnEle.setAttribute('aria-expanded', 'true')
    } else {
        typeBtnEle.setAttribute('aria-expanded', 'false')
    }
}

function changeSidebar(mq) {
    if (mq.matches) {
        // screen size is smaller than 768px
        mediumFilterDiv('type')
        mediumFilterDiv('time')
        mediumFilterDiv('allergies')
        mediumFilterDiv('diet')
    } else {
        largeFilterDiv('type')
        largeFilterDiv('time')
        largeFilterDiv('allergies')
        largeFilterDiv('diet')
    }
}

/**
 * Alters the recipe cards on the main page to display the recipes retrieved by search
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

        recipeCard.classList.add('col-6')
        recipeCard.classList.add('col-sm-4')
        recipeCard.classList.add('col-lg-3')
        recipeCard.style.marginBottom = "10px";
        recipeCard.setAttribute('name', recipeData[i].title)
        recipeCard.setAttribute('image', recipeData[i].image)

        recipeCard.shadowRoot.querySelector('.recipe-title').innerText = recipeData[i].title
        recipeCard.shadowRoot.querySelector('.card-img-top').setAttribute('src', recipeData[i].image)
    }
}

/**
 * Store a list of recipes into the session storage
 */
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
    fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?instructionsRequired=true&addRecipeInformation=true&addRecipeNutrition=true", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
                "x-rapidapi-key": "e448cb3f23msh24599c589d222bfp18177ajsn2d6682024b3b"
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
function fetchCall(query) {
    fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?${query}&instructionsRequired=true&addRecipeInformation=true&addRecipeNutrition=true`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
                "x-rapidapi-key": "e448cb3f23msh24599c589d222bfp18177ajsn2d6682024b3b"
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

/**
 * Bind recipe card to general recipe page
 */
function bindRecipes() {
    // Add event listener to each recipe card
    let recipeCardList = Array.from(document.querySelectorAll('recipe-card'));
    for (let i = 0; i < recipeCardList.length; i++) {
        recipeCardList[i].addEventListener("click", (e) => {
            sessionStorage.setItem('curr', recipeCardList[i].data.id)
                //if on live server
            if (location.origin == 'http://127.0.0.1:5500') {
                location.href = "/source/pages/GeneralRecipePage/recipePageBootstrap.html";
            } else {
                location.href = "/pages/GeneralRecipePage/recipePageBootstrap.html";
            }
        })
    }
}

function init() {
    // eslint-disable-next-line no-console

    // Making div display time selected from slider
    let smWindowSize = window.matchMedia('(max-width: 768px)')
    changeSidebar(smWindowSize)
    smWindowSize.addEventListener('change', () => changeSidebar(smWindowSize))
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