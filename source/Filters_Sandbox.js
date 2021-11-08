window.addEventListener('DOMContentLoaded', init);

const MAX_RECIPE_TIME = 100;

//The recipes list contain json objects of recipes
let recipes = [];

//create lists of types checked
//the types of recipes input: breakfast, lunch, main course, snack
let type = [];
//maximum cooking time
let timeMax = MAX_RECIPE_TIME;
//a list of allergies / intolerance
let allergies = [];
//the name of diet: there can only be one diet choosen.
let diet = "";

//populate recipe list randomly for testing
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

//Helper functions to display json recipe object on the screen
function logTheObj(obj) {
    var ret = "";
    for (var o in obj) {
        var data = obj[o];
        if (typeof data !== 'object') {
            ret += "<li>" + o + " : " + data + "</li>";
        } else {
            ret += "<li>" + o + " : " + logTheObj(data) + "</li>";
        }
    }
    return "<ul>" + ret + "</ul>";
}

//Helper function: fetch a random recipe from spoonacular
function fetchCall(query){
fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=67931e62b88649359913dbc496b0ad08&${query}&instructionsRequired=true&addRecipeInformation=true`).then((response) => {
    console.log(response);
    return response.json();
}).then((data) => {
    console.log(data.results);
    let jsonContent = logTheObj(data.results);
    console.log(typeof(data.results));
    document.querySelector(".card-body").innerHTML =
    `${jsonContent}`;
});
}

//'manually' filter in local storage instead of a API call
//Implemented: filter by types[] MaxTime
//TODO: filter by allergies (intolenrance): This property is not defined
//in the data json. Thus to implement we have to find the ingredients, then
//define which terms we are searching for (eg, fish = salmon, albacore, etc)
function filter(json_arr, type_, timeMax_, allergies_, diet_){
    let filtered = []
    bool_filt = true;
    for(let recipe of json_arr){
        recipe = recipe['recipes'][0];
        console.log("keys: " + Object.keys(recipe));
        let b = false;
        for(let t in type_){
            if(t in recipe['dishTypes']){
                b = true;
            }
        }
        if (b === false){continue;}
        if (timeMax_ < recipe['readyInMinutes']){continue;}
        // for(let a in allergies_){
        //     if(a in recipe['dishTypes']){
        //         b = true;
        //     }
        // }
        // let b = false;
        // for(let d in diet_){
        //     if(d in recipe['dishTypes']){
        //         b = true;
        //     }
        // }
        // if (b === false){continue;}
        filtered.push(recipe);
    }
}

function bindButton(){
    const SearchButton = document.querySelector('button');
    SearchButton.addEventListener('click', function(event){
        //Add the checked checkbox into the list
        //Remove the unchecked checkbox from the list
        console.log('search');
        const cb_recipe_type = document.getElementById('recipe_type');
        //add to list
        if(cb_recipe_type.checked){
            type.push('breakfast');
        }else{
            //remove from list
            const index = type.indexOf('breakfast');
            if (index > -1) {
            type.splice(index, 1);
            }
        }
        const cb_recipe_time = document.getElementById('recipe_time');
        if(cb_recipe_time.checked){
            timeMin = 10;
            timeMax = 30;
        }else{
            timeMin = 0;
            timeMax = MAX_RECIPE_TIME;
        }
        const cb_recipe_allergies = document.getElementById('recipe_allergies');
        if(cb_recipe_allergies.checked){
            allergies.push('egg');
        }else{
            const index = allergies.indexOf('egg');
            if (index > -1) {
            allergies.splice(index, 1);
            }
        }
        //Diet need to be make sure that only one checkbox is checked at a time
        const cb_recipe_diets = document.getElementById('recipe_diets');
        if(cb_recipe_diets.checked){
            diet = "ketogenic";
        }
//matching with API: diets
//in design channel graph - input to the API
//keto - ketogenic
//paleo - paleo
//vegetarian - vegetarain
//mediterranean - not exist
//raw - not exsit
//low carb - gluten free
//no sugar - not exist

//matching with API: allergies / intolerance
//in design channel graph - input to the API
//fish - seafood
//dairy - dairy
//tree nut - tree nut
//shellfish - shellfish
//eggs - egg
//peanut - peanut
//soy - soy
//wheat - wheat

        //Filter recipes according to list content
        //if use spoonacular API:
        fetchCall("intolerances=" + allergies.join(',') + "&" +
        "type=" + type.join(',') + "&" +
        "maxReadyTime=" + timeMax + "&" +
            "diet=" + diet);

        //if use local storage filter function created ourselves
        filter(recipes, type, timeMin, timeMax, allergies, diet);
    });
}

//initiate the sandbox
async function init() {
    let fetchSucessful = await populateRecipe(5);
    console.log(recipes)
    if(!fetchSucessful){
        console.log('no recipes populated, an error occurs');
        return;
    }
    bindButton()
}