function categoryBtn() {
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
        .then(res => res.json())
        .then(data => handelCategory(data.categories))
        .catch(error => console.log(error))
}

function lodeAllData() {
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
        .then(res => res.json())
        .then(data => handelPets(data.pets))
        .catch(error => console.log(error))
}



function handelCategory(categories) {
    const categoryContainer = document.getElementById('category-container');
    for (const category of categories) {
        const categoryBtn = document.createElement('div');
        categoryBtn.classList.add("flex", "justify-center")
        categoryBtn.innerHTML = `
             <button class="btn w-36 py-7 px-10 border-2 border-[#0e7a8126] bg-white">
                <img class="w-8" src="${category.category_icon}">
                <h1 class="font-bold text-base fon">${category.category}</h1>
             </button>
        `
        categoryContainer.appendChild(categoryBtn)
    }
}

function handelPets(pets) {
    const cardContainer = document.getElementById('card-container');
    for (const pet of pets) {
        console.log(pet)
        const card = document.createElement('div');
        card.innerHTML = `
            <div class="card bg-base-100 shadow-slate-300 shadow-lg">
                <figure class="h-[200px]">
                        <img class="w-full h-full object-cover" src="${pet.image}">
                </figure>
                <div class="pl-4 pt-2 font-normal">
                    <h1 class="text-2xl font-bold">${pet.pet_name}</h1>
                    <div class="flex gap-2 my-2">
                        <i class="bi bi-grid"></i>
                        <p>Breed: ${pet.breed ? `<span>${pet.breed}</span>`:'No found'}</p>      
                    </div>
                    <div>
                         <i class="bi bi-calendar4"></i>
                         
                    </div>
                </div>
           </div>
           
           `
        cardContainer.appendChild(card)
    }
}



categoryBtn()
lodeAllData()