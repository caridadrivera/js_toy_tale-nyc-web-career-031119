
document.addEventListener('DOMContentLoaded',function(){
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const realForm = document.querySelector('.add-toy-form')
  const toyCollection = document.querySelector('#toy-collection')
  const toyLikeBtn = document.querySelector('.like-btn')


  let addToy = false
  let allToys;

  fetch(`http://localhost:3000/toys`)
  .then(resp => resp.json())
  .then(toys => {
    allToys = toys

    renderToys()
  }) //end of fetch



function renderToys() {
    allToys.forEach(toy => {
    const toyCard = document.createElement('div')
    toyCard.className = 'card';
    toyCollection.appendChild(toyCard)
    toyCard.innerHTML = ` <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes} </p>
      <button class="like-btn">Like <3</button>`
    })
  }


 realForm.addEventListener("submit", function(e) {
    e.preventDefault()
    const nameInput = document.querySelector('#name')
    const imageInput = document.querySelector('#image')
  });


  toyCollection.addEventListener('click', function(e) {
    e.preventDefault();
    if (e.target.className === 'like-btn') {
    console.log(e)
    let like = e.target.previousElementSibling
    let toyId = e.target.parentNode.id
    let likeCount = parseInt(like.innerText)
    like.innerText = `${++likeCount}`
    fetch(`http://localhost:3000/toys/${toyId}`,{
      method: "PATCH",
      headers: {
          'Content-Type': 'application/json'
        },
      body: JSON.stringify({
      likes: likeCount
        })
      })
     }
    })







      addBtn.addEventListener('click', () => {
        // hide & seek with the form
        addToy = !addToy
        if (addToy) {
          toyForm.style.display = 'block'
          // submit listener here
        } else {
          toyForm.style.display = 'none'
        }
      })//end of btn event listener





})//end of DOMContentLoaded
