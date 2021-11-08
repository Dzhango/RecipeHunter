window.addEventListener('DOMContentLoaded', init);

//a list of populated recipes for testing
let recipes = []
//separtor to separate between recipes for favorite_recipes string stored in local storage.
let separator = "<SEPARATOR-SAPARATOR>"

//Helper functions to display json recipe object on the screen
function logTheObj(obj) {
    var ret = "";
    ret = obj['id'] + obj['title']
    return "<ul>" + ret + "</ul>";
}

//store the newly added recipe into the list
//structure localStorage.getItem('favorite_recipes') get a string of recipes
//format: <SEPARATOR-SEPARATOR> + JSON.stringify(recipe1) + <SEPARATOR-SEPARATOR> + JSON.stringify(recipe2) + <SEPARATOR-SEPARATOR> + etc.
function storeIntoFav(obj){  // Translate string to an array? Can we directly store and get an array object?
    
    //console.log(localStorage.getItem('favorite_recipes'));

    //When store the first favorite recipe, localStorage.getItem('favorite_recipes') = null, to prevent becomes null + RecipeContent, remove the null
    if (localStorage.getItem('favorite_recipes') == null){
        localStorage.setItem('favorite_recipes', '');
    }

    //get the current list of favorite recipes
    let favoriteRecipes = ''
    try{
        favoriteRecipes = localStorage.getItem('favorite_recipes'); // This is a string
    }
    catch(e){
        console.log('WARNING!!: favorite_recipes not grabbed')
    }

    //store the passed in recipe 'obj' into favorite_recipes
    favoriteRecipes += separator+JSON.stringify(obj);
    try {
        localStorage.setItem('favorite_recipes', favoriteRecipes);
        console.log(favoriteRecipes);
        stored = true;
    }
    catch (e){
        console.log('WARNING!!: Recipe not stored')
    }
}

function Display(){
    //display current favorite recipes oon the screen
    let favorite_recipes_arr = localStorage.getItem('favorite_recipes').split(separator);
    //console.log(favorite_recipes_arr);
    let jsonContent = "";
    for (let i = 1; i < favorite_recipes_arr.length; i++){
        jsonContent = jsonContent + logTheObj(JSON.parse(favorite_recipes_arr[i]));
    }
    document.querySelector(".card-body").innerHTML =
    `${jsonContent}`;
}

//TODO:
function DeleteFromFav(obj){  // Translate string to an array? Can we directly store and get an array object?
    favoriteRecipes += separator+JSON.stringify(obj);
    try {
        localStorage.setItem('favorite_recipes', favoriteRecipes);
        stored = true;
    }
    catch (e){
        console.log('WARNING!!: Recipe not stored')
    }
}

//bind favorite button
function bindButton(){
    const SearchButton = document.querySelector('button');
    SearchButton.addEventListener('click', function(event){
        //Currently only storing the first recipe in the populated recipe list for testing
        storeIntoFav(recipes[0]['recipes'][0]);
        Display();
    });
}

//populate recipe list randomly N recipes for testing
async function populateRecipe(N){
    return new Promise((resolve, reject) => {
        for(let i = 0; i < N; i++){
            fetch(`https://api.spoonacular.com/recipes/random?apiKey=67931e62b88649359913dbc496b0ad08`).then((response) => {
                //console.log(response);
                return response.json();
            }).then((data) => {
                recipes.push(data);
                if(Object.keys(recipes).length == N){resolve(true);}
            }).catch((error) => {
                reject(false);
            })
        }
    })
}

//initiate the sandbox
async function init() {
    //clear so that each run is clear
    window.localStorage.clear();
    
    let fetchSucessful = await populateRecipe(1);

    //console.log(recipes)
    if(!fetchSucessful){
        console.log('no recipes populated, an error occurs');
        return;
    }

    bindButton();
}