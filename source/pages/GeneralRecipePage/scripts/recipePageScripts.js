window.addEventListener('DOMContentLoaded', init);

function init() {
  // eslint-disable-next-line no-console
    console.log('Called');

    // populate page with JSON data
    const dataKey = sessionStorage.getItem('curr');
    const recipeData = JSON.parse(sessionStorage.getItem(dataKey));
    console.log(recipeData)

    const recipeExpand = document.createElement('recipe-expand');
    recipeExpand.data = recipeData
    //console.log(recipeExpand.data)
    document.querySelector('body').appendChild(recipeExpand);
    // document.querySelector('recipe-expand').data = recipeData;
    
  // Making div display time selected from slider
    recipeExpand.shadowRoot.querySelector('.notes-button').addEventListener('click', openNotes);
    //document.querySelector('.notes-button').addEventListener('click', openNotes);
    recipeExpand.shadowRoot.querySelector('.image-button').addEventListener('click', openImage);
    //document.querySelector('.image-button').addEventListener('click', openImage);

    // Return to search results when "Back to search" is clicked
    recipeExpand.shadowRoot.getElementById('back-button').addEventListener('click', backToSearch);
}

function openNotes(){   
    const recipeExpand = document.querySelector('recipe-expand');
    recipeExpand.shadowRoot.querySelector('.photo').classList.add('hide');
    recipeExpand.shadowRoot.querySelector('.notes').classList.remove('hide');
}



// Set notes div display:none and remove display
function openImage(){
  const recipeExpand = document.querySelector('recipe-expand');
  recipeExpand.shadowRoot.querySelector('.notes').classList.add('hide');
  recipeExpand.shadowRoot.querySelector('.photo').classList.remove('hide');
}

function backToSearch() {
  window.history.back();
}

