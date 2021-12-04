/**
 * @jest-environment jsdom
 */

// recipePageScriptBootstrap.test.js

const functions = require('../scripts/recipePageScriptBootstrap');

// Tests for bindFavoriteButton
test('bindFavoriteButton: ', () => {
    document.body.innerHTML = `
  
    <div class = "col-md-3">
        <button class = "btn btn-success rounded-pill float-end add-to-myrecipes">Add to Recipe</button>
    </div>
  `;
  document.querySelector('.add-to-myrecipes').addEventListener('click', functions.bindFavoriteButton)
  document.querySelector('.add-to-myrecipes')
  //$('.add-to-myrecipes').click();
})

// delete window.location
// window.location = new URL('https://www.test.com');

test('backToSearch: ', () => {
  window.onpopstate = function(event) {
    console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
  };
    //location.assign("Testing0")
    console.log('FIRST LOCATION: ' + window.location.href)
    //window.history.pushState({name: 'First'}, 'test2', 'https://www.test2.com');
    history.pushState({page: 1}, "title 1", "?page=1")
    history.pushState({page: 2}, "title 2", "?page=2")
    //window.history.forward()
    console.log('SECOND LOCATION: ' + window.location.href)

    //window.location.href = 'https://www.test2.com';
    console.log("LENGTH BEFORE CALL IS:")
    console.log(window.history.length)
   
    const state1 = window.location.href;

    window.history.back();
    functions.backToSearch();
    
    const state2 = window.location.href;
    console.log(state1)
    console.log(state2)
    
    expect(state1 === state2).toBe(false);
})

window.location = location;
