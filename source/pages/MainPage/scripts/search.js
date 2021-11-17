//A Sandbox, none functions are called in html

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