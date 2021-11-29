window.addEventListener('DOMContentLoaded', init);

//a list of populated recipes for testing
let recipes = []
let selected = false

//store the newly added recipe into the list
//structure: local storage is used for only storing favorite recipes
//key: recipe[id] value: recipe
//@param obj the recipe json object to store
function storeIntoFav(obj){
    //note: obj['id'] has type int, change it to type string
    //Before store, check if it already exists
    if (localStorage.getItem(obj['id']) != null){
        console.log('The recipe to add already exists')
        return;
    }
    //store
    try{
        localStorage.setItem(obj['id'], JSON.stringify(obj));
        // console.log(localStorage.getItem(obj['id']));
    }
    catch{
        console.log('WARNING!!: Recipe not stored')
    }
}

//Delete from favorite
function DeleteFromFav(obj){
    try{
        localStorage.removeItem(obj['id']);
    }
    catch{
        console.log('Remove Unsuccessful')
    }
}

//Delete from favorite by id
function DeleteFromFavID(id){
    try{
        //Delete the item from local storage
        localStorage.removeItem(id)
        // //refresh the page through repopulating page from local storage
        // let list_recipes = []

        // for (let i = 0; i < localStorage.length; i++){
        //     let recipe = localStorage.getItem(localStorage.key(i))
        //     // console.log(recipe)
        //     list_recipes.push(JSON.parse(recipe))
        // }
    
        // // console.log(list_recipes)
    
        // createRecipeCards(list_recipes)
    }
    catch{
        console.log('Remove Unsuccessful')
    }
}

/**
 * Bind the remove button to remove recipes from local storages that are selected
 * Selected: if in the select mode, the recipe 
 */
function bindRemoveButton () {
    document.getElementById("remove-button").addEventListener("click", ()=>{
        let removalArray = []
        let recipes_selected = []
        //const select = document.getElementsById('select-button')
        recipes_selected = document.querySelectorAll('recipe-card')
        for (let r of recipes_selected){
            const sr = r.shadowRoot
            const innerdiv = sr.querySelector('.recipe-card')
            if (!innerdiv.classList.contains("grey")) {
                removalArray.push(r.id)
            }
        }
        for (let recipeID of removalArray) {
            DeleteFromFavID(recipeID)
        }

        populateMyRecipe()
        greyOut(false)
        selected = false
    })
}

/**
 * populate recipe list randomly N recipes for testing
 * @param {int} N the number of recipes to populate
 * @returns a promise
 */
async function populateRecipe(N){
    return new Promise((resolve, reject) => {
        for(let i = 0; i < N; i++){
            fetch(`https://api.spoonacular.com/recipes/random?apiKey=3e93b73153474c30b568c44760ca6620`)
                        .then((response) => {
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

function populateMyRecipe () {
    // refresh the page through repopulating page from local storage
    let list_recipes = []
    for (let i = 0; i < localStorage.length; i++) {
        let recipe = localStorage.getItem(localStorage.key(i))
        list_recipes.push(JSON.parse(recipe))
    }    
    createRecipeCards(list_recipes)

    // Add event listener to each recipe card
    let recipeCardList = Array.from(document.querySelectorAll('recipe-card'));
    for(let i=0;i<recipeCardList.length;i++){
        recipeCardList[i].addEventListener("click",(e)=>{
        //console.lo g(recipeCardList[i])
        if(selected){
            //if the grey class exist
        // console.log(e)
        if (recipeCardList[i].shadowRoot.querySelector('.recipe-card').classList.contains('grey')){
            recipeCardList[i].shadowRoot.querySelector('.recipe-card').classList.remove('grey')
        }else{       
            recipeCardList[i].shadowRoot.querySelector('.recipe-card').classList.add('grey')    
        }
    }
    })
}
}

//if on == true; addes grey filter to every card's image
//if(on ==false ) removes grey filter from every card's image
function greyOut(on){
    //select all recipe cards
    let recipeCardList = Array.from(document.querySelectorAll('recipe-card'));
    
    //if true is passed in, grey out every card by adding the grey class to each recipe card
    if (on){
        
        for(let i=0;i<recipeCardList.length;i++){
           recipeCardList[i].shadowRoot.querySelector('.recipe-card').classList.add("grey")
        }
            

    }else{
        //otherwise (if false is passed in), remove the grey class from each recipe card
        for(let i=0;i<recipeCardList.length;i++){
           recipeCardList[i].shadowRoot.querySelector('.recipe-card').classList.remove("grey")
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

        console.log(recipeData[i].title)

        document.querySelector('.recipes-container').appendChild(recipeCard)

        recipeCard.setAttribute('name', recipeData[i].title)
        recipeCard.setAttribute('image', recipeData[i].image)

        recipeCard.shadowRoot.querySelector('span').innerText = recipeData[i].title
        recipeCard.shadowRoot.querySelector('div').style.backgroundImage = `url(${recipeData[i].image})`
        console.log(recipeCard.id)
    }
    
} 
/**
 * Adds new recipe to My Recipes page from user imput
 * @param {string} URL the link to the recipe we need to extract
 */ 
    
function addRecipeURL(URL) {
    //make api call to spoonacular
    fetch(`https://api.spoonacular.com/recipes/extract?apiKey=99a52ef738514021ab33c7e15116c1ca&url=${URL}`)
    .then((response) => {
        //converting file to json format
        return response.json()
    }).then((recipeData) => {
        //insert data into recipe array and repopulate local storage
        const localStorage = window.localStorage
        let inList = false
        recipeData.id = hashing(recipeData.title)
        console.log(recipeData.id)
        //if there isnt a duplicate recipe, add it to myRecipe;
        if (localStorage.getItem(recipeData.id) != null) {
            console.log("DUPLICATE RECIPE")
        } else {
            localStorage.setItem(recipeData.id, JSON.stringify(recipeData))
            //repopulate myrecipepage
            populateMyRecipe();
            resolve(true);
        }
        // if(Object.keys(recipes).length == N){resolve(true);}
    }).catch((error) => {
        reject(false);
        alert("invalid URl");
    })
}
function hashing(string) {
    //set variable hash as 0
    var hash = 0;
    // if the length of the string is 0, return 0
    if (string.length == 0) return hash;
    for (i = 0; i < string.length; i++) {
        ch = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + ch;
        hash = hash & hash;
    }
    return hash;

}

//logic for clicking the button
function addButtonOnClick(){


}
//initiate the sandbox
async function init() {
    //clear so that each run is clear
    // window.localStorage.clear();

    // let fetchSucessful = await populateRecipe(5);

    // //console.log(recipes)
    // if(!fetchSucessful){
    //     console.log('no recipes populated, an error occurs');
    //     return;
    // }

    // console.log(recipes)
    // console.log(recipes[0]['recipes'][0])

    // for (let recipe of recipes) {
    //     storeIntoFav(recipe['recipes'][0]);
    // }

    populateMyRecipe()


    console.log("GREY TEST" +document.querySelector('recipe-card'))

    let  gflag = true;
    
    // document.querySelector('recipe-card').shadowRoot.querySelector('.recipe-card').classList.add("grey") 
    // document.querySelector('recipe-card').shadowRoot.querySelector('.recipe-card').classList.remove("grey")
    document.getElementById("select-button").addEventListener("click", () => {

        //grey all of the recipe-card
        greyOut(true);
        //set selected to true;
        selected = true

    })

    // logic for cancel button
    document.getElementById("cancel-button").addEventListener("click", () => {
        
        // remove all the grey class
        greyOut(false);  
        // set selected to false
        selected = false;
    })



    
    
    //     //Code for adding myRecipePage event listener to each recipe card
    // let recipeCardList = Array.from(document.querySelectorAll('recipe-card'));
    // for(let i=0;i<recipeCardList.length;i++){
    //     recipeCardList[i].addEventListener("click",(e)=>{
    //     //console.log(recipeCardList[i])
    //     if(selected){
    //         //if the grey class exist
    //         // console.log(e)
    //     if (recipeCardList[i].shadowRoot.querySelector('.recipe-card').classList.contains('grey')){
    //     recipeCardList[i].shadowRoot.querySelector('.recipe-card').classList.remove('grey')
        
    //     }else{
    //     recipeCardList[i].shadowRoot.querySelector('.recipe-card').classList.add('grey')    
    //     }
    //     }
    //     })        
    //}


    
    // console.log("TEST DELETE FOR ID: " + document.querySelector('recipe-card').id + " with title " + document.querySelector('recipe-card').getAttribute("name"))
    // document.getElementById("remove-button").addEventListener("click", ()=>{
  
    //     console.log('clicked')
    //     console.log(document.querySelector('recipe-card').id)
    //     DeleteFromFavID(document.querySelector('recipe-card').id)
    // })
    addRecipeURL("https://natashaskitchen.com/pan-seared-steak/")
    document.querySelector('#add-button').addEventListener('click', ()=>{addButtonOnClick()})
    bindRemoveButton()
}