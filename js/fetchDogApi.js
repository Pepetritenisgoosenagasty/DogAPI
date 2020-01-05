const select = document.querySelector("#breeds");
const form = document.querySelector("form");
const card = document.querySelector("#img");



// Fetch Functions

function fetchData(url) {
    return   fetch(url)
    .then(checkStatus)
       .then(res => res.json())
       .catch(error => console.log('Looks like something went wront', error))
}

Promise.all([
    fetchData('https://dog.ceo/api/breeds/list'),
    fetchData('https://dog.ceo/api/breeds/image/random'),
])
.then(data => {
    const breedList = data[0].message;
    const randomImage = data[1].message;

    generateBreeds(breedList);
    generateImage(randomImage);
})

// fetchData('https://dog.ceo/api/breeds/list')
// .then(data => generateBreeds(data.message));

// fetchData('https://dog.ceo/api/breeds/image/random')
// .then(data => generateImage(data.message));




// Helper Functions

function checkStatus(response) {
   if (response.ok) {
       return Promise.resolve(response);
       
   }else {
       return Promise.reject(new Error(response.statusText));
   }
}


function generateImage(data) {
  const output = `<img src="${data}" class="rounded" alt="">
                   <p>Click to to view images of ${select.value}s</p>`;
           
                   card.innerHTML = output;
   
}


function generateBreeds(data) {
    const options = data.map(item => `<option class="${item}">${item}</option>`).join('');
    select.innerHTML = options;
}

function fetchBreed() {
    const breed = select.value;
    const img = card.querySelector('img');
    const p = card.querySelector('p');

    fetchData(`https://dog.ceo/api/breed/${breed}/images/random`)
    .then(data => {
        img.src = data.message;
        img.alt = breed;
        p.textContent = `Click to view more of ${breed}s`;
    });
}

// Event Listeners

select.addEventListener('change', fetchBreed);
card.addEventListener('click', fetchBreed);
form.addEventListener('submit', postData);

// Post with fetch
function postData(e) {

    e.preventDefault();
    const name  = document.querySelector('#name').value;
    const comment = document.querySelector('#comment').value;
   
    const config = {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({name: name, comment:comment})
    };

fetch('https://jsonplaceholder.typicode.com/comments', config)
.then(checkStatus)
.then(res => res.json())
.then(data => {
    console.log(data)
})

}