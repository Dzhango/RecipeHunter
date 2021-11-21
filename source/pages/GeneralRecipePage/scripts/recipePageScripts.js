window.addEventListener('DOMContentLoaded', init);

function init() {
  // eslint-disable-next-line no-console
    console.log('Called');

    // populate page with JSON data
    const dataKey = sessionStorage.getItem('curr');
    const recipeData = JSON.parse(sessionStorage.getItem(dataKey));

    const recipeExpand = document.createElement('recipe-expand')
    recipeExpand.data = recipeData
    //console.log(recipeExpand.data)
    document.querySelector('body').appendChild(recipeExpand)
    // document.querySelector('recipe-expand').data = recipeData;
    
  // Making div display time selected from slider

    document.querySelector('.notes-button').addEventListener('click', openNotes);

    document.querySelector('.image-button').addEventListener('click', openImage);
}

function openNotes(){   

    document.querySelector('.photo').classList.add('hide');
    document.querySelector('.notes').classList.remove('hide');
}



// Set notes div display:none and remove display
function openImage(){


    document.querySelector('.notes').classList.add('hide');
    document.querySelector('.photo').classList.remove('hide');

    // document.querySelector('.notes').classList.toggle('hide');
    // document.querySelector('.photo').classList.toggle('hide');
}


