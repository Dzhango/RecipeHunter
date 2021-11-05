const template = document.createElement('template');
template.innerHTML=`

<style>
h3{
    color: coral;
    color: #6B6B6B;
    margin: .5rem;
    // margin-left: 1rem;
    // font-size: .2rem;
    // text-align: left;
}
.ingredient-card{
    background-color: #C4C4C4;
    border-radius: 1rem;
    width:12rem;
    height:1.6rem;
    // display:flex;
    // justify-content: spaceBetween;


}
.delete{
    cursor: pointer;
}
</style>

<div class="ingredient-card">
    <h3></h3>
    
</div>


`
class IngredientCard extends HTMLElement{
    constructor(){
        super();

        this.attachShadow({mode:'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        // this.innerHTML = `<h1>${this.getAttribute('name')}</h1>`;
        this.shadowRoot.querySelector("h3").innerText = this.getAttribute('name');
    }
}
window.customElements.define(`ingredient-card`,IngredientCard)