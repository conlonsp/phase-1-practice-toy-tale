let addToy = false;
const form = document.querySelector('.add-toy-form')

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

  form.addEventListener('submit', addToys)
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  fetchToys()
});

function createCard(toy) {
  const toyDiv = document.getElementById('toy-collection')
  const div = document.createElement('div')
  div.classList.add('card')
  const h2 = document.createElement('h2')
    h2.textContent = toy.name
    div.appendChild(h2)
  const img = document.createElement('img')
    img.classList.add('toy-avatar')
    img.src = toy.image
    div.appendChild(img)
  const p = document.createElement('p')
    p.textContent = `${toy.likes} likes`
    div.appendChild(p)
  let btn = document.createElement('button')
    btn.classList.add('like-btn')
    btn.id = toy.id
    btn.textContent = 'Like ❤️'
    btn.addEventListener('click', (event) => {
      event.preventDefault()
      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          likes: toy.likes++
        })
      })
      .then(resp => resp.json())
      .then(data => {
        p.innerText = `${toy.likes} likes`
      })
    })
    div.appendChild(btn)
  toyDiv.append(div)
}


function fetchToys() {
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(data => data.forEach(toy => createCard(toy)))
}

function addToys(event) {
  event.preventDefault()
  const [name, image] = event.target
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      name: name.value,
      image: image.value,
      likes: 0
    })
  })
  .then(resp => resp.json())
  .then(data => createCard(data))
  form.reset()
}