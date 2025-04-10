function categoryBtn() {
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
        .then(res => res.json())
        .then(data => handelCategory(data.categories))
        .catch(error => console.log(error))

}

function handelCategory(categories) {
    const categoryContainer = document.getElementById('category-container');
    for (const category of categories) {
        const categoryBtn = document.createElement('div');
        categoryBtn.classList.add("flex","justify-center")
        categoryBtn.innerHTML = `
             <button class="btn w-36 py-7 px-10 border-2 border-[#0e7a8126] bg-white">
                <img class="w-8" src="${category.category_icon}">
                <h1 class="font-bold text-base fon">${category.category}</h1>
             </button>
        
        `
        categoryContainer.appendChild(categoryBtn)
    }
}



categoryBtn()