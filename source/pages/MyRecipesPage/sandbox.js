
window.addEventListener('DOMContentLoaded', init);
function init() {
console.log("ready");
    // addRecipeURL("https://natashaskitchen.com/pan-seared-steak/");
     document.querySelector('#add-button').addEventListener('click', ()=>{addButtonOnClick()})

    document.querySelector('.addPageSubmit').addEventListener('click', ()=>{addPageSubmitOnClick()})
    document.querySelector('.addPageClose').addEventListener('click', ()=>{addPageCloseOnClick()})
}


 function addButtonOnClick(){
    //  alert('clicked')
    document.querySelector('.addPage').classList.remove('hide');
    document.querySelector('.recipes-container').classList.add('hide');
}
// function addRecipeURL(URL) {
function addPageSubmitOnClick(){
    let URL = document.querySelector('.addPageText').value;
    console.log(URL);

    addRecipeURL(URL)
     document.querySelector('.addPageText').value ="";

}
function addPageCloseOnClick(){
    document.querySelector('.addPageText').value ="";
    document.querySelector('.addPage').classList.add('hide');
    document.querySelector('.recipes-container').classList.remove('hide');
}

 
    function addRecipeURL(URL) {
        console.log(`https://api.spoonacular.com/recipes/extract?apiKey=99a52ef738514021ab33c7e15116c1ca&url=${URL}`)
    //make api call to spoonacular
    fetch(`https://api.spoonacular.com/recipes/extract?apiKey=aebc3ef46cd54888b77ec872fa50deb1&url=${URL}`)
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
            // populateMyRecipe();
            resolve(true);
        }
        // if(Object.keys(recipes).length == N){resolve(true);}
    })
    // .catch((error) => {
    //     reject(false);
    //     alert("invalid URl");
    // })
     document.querySelector('.addPage').classList.add('hide');
    document.querySelector('.recipes-container').classList.remove('hide');
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