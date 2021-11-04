window.addEventListener('DOMContentLoaded', init);

const MAX_RECIPE_TIME = 100;

//create lists of types checked
let type = [];
let timeMin = 0;
let timeMax = MAX_RECIPE_TIME;
let allergies = [];
let diet = "";

//Helper functions
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

//TODO
function filter(json, type_, timeMin_, timeMax_, allergies_, diet_){

}

function init() {
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
            diet = "vegan";
        }

        //Filter recipes according to list content
        //if use spoonacular API:
        fetchCall("intolerances=" + allergies.join(',') + "&" +
        "type=" + type.join(',') + "&" +
        "maxReadyTime=" + timeMax + "&" +
            "diet=" + diet);
        //TODO: only one diet, no minReadyTime
        //fetchCall("diet=vegan");

    });
}