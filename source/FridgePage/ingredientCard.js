const template = document.createElement('template');
template.innerHTML=`

<style>
h3{
    color: coral;
    color: #6B6B6B;
    margin: 0rem;
    
    // position: absolute;
    // margin: .75rem;
    // margin-top: 1rem;
    // margin-left: 1rem;
    // font-size: .2rem;
    // text-align: left;
}
// .ingredient-button{

//     position: relative;
//     right: 0rem;
//     top: 0rem;
//     margin: 0px;
//     padding:0px;
//     // color: blue;
// }
.ingredient-card{
    text-overflow: ellipsis;

    z-index =1;
    background-color: #C4C4C4;
    border-radius: 1rem;
    width:15rem;
    height:1.6rem;
    display:flex;
    justify-content: space-Between;
    margin-top:.6rem;


}
.ingredient-name{
    // font-size: 1rem;
    margin-left: 1rem;
}
.delete{
    cursor: pointer;
    margin-right: .5rem;
}
 h3.delete:hover {
    color: red;
}

</style>

<div class="ingredient-card">
    <h3 class= "ingredient-name">{this.getAttribute('name')}</h3> <h3 class ="delete" >x</h3> 

    
</div>


`
class IngredientCard extends HTMLElement{
    constructor(){
        super();

        this.attachShadow({mode:'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        // this.innerHTML = `<h1>${this.getAttribute('name')}</h1>`;
        this.shadowRoot.querySelector("h3").innerText = this.getAttribute('name');
        // this.shadowRoot.querySelector(".delete").addEventListener("click",()=>{
        //     console.log(`Delete ${this.getAttribute('name')}` );
        //     //add logic to remove the ingredient from the inner data structure
        //     // let elem = document.querySelector('.ingredient-list');
        //     // elem.parentNode.removeChild(elem);

        //     let ingredList = document.querySelector("fridge-div ingredient-list");
        //     ingredList.removeChild(this);
        //     // let remove = doclu
        // })
    }
}


   
let addToDoButton = document.getElementById('addIngredient');
let ingredientList = document.getElementById('ingredientList');
let inputField = document.getElementById('inputField');


//Event Listener for creating a ingredient item
addToDoButton.addEventListener('click', function(){
    //initialize custom component
    var ingredient = document.createElement('ingredient-card');
    //set components name attribute to ingredient
    ingredient.setAttribute("name",inputField.value);
    //set inner text to the inputted ingredient
    ingredient.shadowRoot.querySelector("h3").innerText = inputField.value;
    // console.log("Name");
    ingredient.shadowRoot.querySelector(".delete").addEventListener("click",()=>{
        ingredientList.removeChild(ingredient);
    })
    ingredientList.appendChild(ingredient);
    inputField.value = "";
    // ingredient.addEventListener('click', function(){
    //     paragraph.style.textDecoration = "line-through";
    // })
    
})
window.customElements.define(`ingredient-card`,IngredientCard)