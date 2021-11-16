window.addEventListener('DOMContentLoaded', init);

function init() {
    const searchBtn = document.querySelector('.search-button');
    searchBtn.addEventListener('click', searchAndRender);
}

/**
 * Makes an API call based on a user search to retrieve JSON recipe data
 */
function searchAndRender(event) {
    const searchBar = document.querySelector('.search-bar');
    const searchInput = searchBar.value;
    // do nothing if the user searches an empty string
    if(searchInput == '') {
        return;
    }
    fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=67931e62b88649359913dbc496b0ad08&query=${searchInput}&instructionsRequired=true&addRecipeInformation=true`).then((response) => {
        return response.json();
      }).then((data) => {
        let recipeData = data.results;
        createRecipeCards(recipeData);
    });
}

/**
 * Alters the recipe cards on the main page to display the recipes retrieved by search 
 * @param {Object} recipeData the object containing JSON recipe data
 */
function createRecipeCards(recipeData) {
    // clear loaded recipe cards
    const recipesContainer = document.querySelector('.recipes-container');
    while (recipesContainer.firstChild) {
        recipesContainer.removeChild(recipesContainer.firstChild);
    }
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