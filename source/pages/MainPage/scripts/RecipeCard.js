const template = document.createElement('template')

template.innerHTML = `
<script src="https://kit.fontawesome.com/16e1426982.js" crossorigin="anonymous"></script>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
<style>
  .grey{
    filter: grayscale(100%);
  }
</style>
<div class = "recipe-card card h-100 shadow-sm" style="border-radius: 12px;">
  <img src="" class="card-img-top" style="border-radius: 12px 12px 0 0;">
  <div class = "card-body h-100 recipe-title text-center" style="display: flex; justify-content: center; align-items: center;">
  </div>
</div>
`

class RecipeCard extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.shadowRoot.querySelector('.recipe-title').innerText = this.getAttribute('name')
    this.shadowRoot.querySelector('.card-img-top').src = `url(${this.getAttribute('image')})`
  }
}

window.customElements.define('recipe-card', RecipeCard)
