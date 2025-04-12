// lode all categories

function categoryBtn() {
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
        .then(res => res.json())
        .then(data => handelCategory(data.categories))
        .catch(error => console.log(error))
}

// fetch all pets

function lodeAllData() {
    showSpinner();
    setTimeout(() => {
        removeSpinner();
        fetch('https://openapi.programming-hero.com/api/peddy/pets')
            .then(res => res.json())
            .then(data => handelPetsCard(data.pets))
            .catch(error => console.log(error))
    }, 2000)
}

// lode category

function lodeCategoryData(category, id) {
    
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
        .then(res => res.json())
        .then(data => {
            const categoryBtn = document.getElementById(`btn-${id}`)
            removeActive();
            categoryBtn.classList.add('active')
            handelPetsCard(data.data)

        })
}

// lode Details

function lodeDetails(id) {
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
        .then(res => res.json())
        .then(data => {
            const modalContainer = document.getElementById('modal-container');
            modalContainer.innerHTML = `
                <img class="w-full"  src="${data.petData.image}">
                <h1 class="text-2xl font-bold pl-4 mt-3">${data.petData.pet_name}</h1>
                <div class="md:flex" >
                    <div>
                        <div class="flex gap-2 my-1 pl-4">
                            <i class="bi bi-grid"></i>
                            <p>Breed: ${data.petData.breed ? `<span>${data.petData.breed}</span>` : 'No found'}</p>      
                        </div>
                        <div class="flex gap-2 pl-4">
                            <i class="bi bi-calendar4"></i>
                            <p>Birth: ${data.petData.date_of_birth ? `<span>${data.petData.date_of_birth}</span>` : 'No found'}</p>
                        </div>
                    </div>
                    <div>
                        <div class="flex gap-2 my-1 pl-4">
                            <i class="bi bi-gender-trans"></i>
                            <p>Gender: ${data.petData.gender ? `<span>${data.petData.gender}</span>` : "No found"} </p>
                        </div>
                        <div class="flex gap-2 pb-2 pl-4">
                            <i class="bi bi-currency-dollar text-lg"></i>
                            <p>Price: ${data.petData.price ? `<span>${data.petData.price}</span>` : "No found"}<i class="bi bi-currency-dollar"></i></p>
                        </div>
                    </div>
                </div>
                <hr class="text-slate-200">
                 <h1 class="text-lg font-bold my-2">Details Information<h1>
                 <p>${data.petData.pet_details}</p>
               `
        })
        .catch(error => console.log(error))
    document.getElementById('customModal').showModal();
}


function handelCategory(categories) {
    const categoryContainer = document.getElementById('category-container');
    for (const category of categories) {
        const categoryBtn = document.createElement('div');
        categoryBtn.classList.add("flex", "justify-center")
        categoryBtn.innerHTML = `
             <button id="btn-${category.id}" onclick="lodeCategoryData('${category.category}',${category.id})" class="btn w-36 py-7 px-10 border-2 border-[#0e7a8126] bg-white rounded-lg remove-active">
                <img class="w-8" src="${category.category_icon}">
                <h1 class="font-bold text-base fon">${category.category}</h1>
             </button>
        `
        categoryContainer.appendChild(categoryBtn)
    }
}

function removeActive() {
    const buttons = document.getElementsByClassName('remove-active');
    for (let button of buttons) {
        button.classList.remove('active')
    }
}



function handelPetsCard(pets) {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    if (pets.length == 0) {
        cardContainer.classList.remove('grid')
        cardContainer.classList.add('text-center', 'font-normal')
        cardContainer.innerHTML = `
        <img class="w-40 mx-auto" src="images/error.webp" alt="">
        <h1>No Information Available</h1>
        <p class="lg:w-4/6 md:5/6 mx-auto">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
        its layout. The point of using Lorem Ipsum is that it has a.</p>
        `
    }
    for (const pet of pets) {
        const card = document.createElement('div');
        cardContainer.classList.add('grid')
        card.innerHTML = `
            <div class="card bg-base-100 shadow-slate-300 shadow-lg">
                <figure class="h-[200px]">
                        <img class="w-full h-full object-cover" src="${pet.image}">
                </figure>
                <div class="pt-2 pb-5 font-normal">
                    <h1 class="text-2xl font-bold pl-4">${pet.pet_name}</h1>
                    <div class="flex gap-2 my-1 pl-4">
                        <i class="bi bi-grid"></i>
                        <p>Breed: ${pet.breed ? `<span>${pet.breed}</span>` : 'No found'}</p>      
                    </div>
                    <div class="flex gap-2 pl-4">
                         <i class="bi bi-calendar4"></i>
                         <p>Birth: ${pet.date_of_birth ? `<span>${pet.date_of_birth}</span>` : 'No found'}</p>
                    </div>
                    <div class="flex gap-2 my-1 pl-4">
                        <i class="bi bi-gender-trans"></i>
                        <p>Gender: ${pet.gender ? `<span>${pet.gender}</span>` : "No found"} </p>
                    </div>
                    <div class="flex gap-2 pb-2 pl-4">
                       <i class="bi bi-currency-dollar text-lg"></i>
                        <p>Price: ${pet.price ? `<span>${pet.price}</span>` : "No found"}<i class="bi bi-currency-dollar"></i></p>
                    </div>
                    <div class="mt-4 flex justify-around">
                        <i id="likeBtn-${pet.petId}" onclick="showimg('${pet.image}',${pet.petId})"  class="bi bi-hand-thumbs-up btn text-lg border-1 border-[#0e7a8126]"></i>
                        <button class="btn text-[#0E7A81] text-base border-1 border-[#0e7a8126]">Adopt</button>
                        <button onclick="lodeDetails(${pet.petId})" class="btn text-[#0E7A81] text-base border-1 border-[#0e7a8126]">Details</button>
                    </div>
                </div>
           </div>
           
           `
        cardContainer.appendChild(card)
    }
}

const showimg = (img, id) => {
    const imgContainer = document.getElementById('image-container')
    const imgCard = document.createElement('div');
    const likeBtn = document.getElementById(`likeBtn-${id}`);
    likeBtn.classList.add('text-red-500')
    imgCard.innerHTML = `
      <img src ="${img}">
   `
    imgContainer.appendChild(imgCard)
}

function showSpinner() {
    const spinner = document.getElementById('spinner');
    spinner.classList.remove('hidden')
}
function removeSpinner() {
    const spinner = document.getElementById('spinner');
    spinner.classList.add('hidden')
}

categoryBtn()
lodeAllData()