const div = document.getElementById('myDiv') 
const btn = document.getElementById('btn')
let page = 1
let limit = 4

async function getProducts() {
    try{
        const response = await axios.get(`https://655c81de25b76d9884fd6913.mockapi.io/products?page=${page}&limit=${limit}`)
        const data = response.data
        db = data
        db.forEach(item => {
            const box = document.createElement('div')
            box.className = 'myBox col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12'
            box.innerHTML = `
                <img src="${item.image}" alt="">
                <h5>${item.name}</h5>
                <h6>$${item.price}</h6>
                <button onclick="addToCart(${item.id})">Add To Basket -></button>
            `;
            div.appendChild(box);
        });
        page++;
    }catch(error){
        console.error('xeta:',error);
    };    
};
btn.addEventListener('click',getProducts)

function addToCart(id) {
    const cart = JSON.parse(localStorage.getItem('cart')) || []
    cart.push(db.find(item => item.id == id))
    localStorage.setItem('cart',JSON.stringify(cart))
}

const inp = document.getElementById('inp') 
const search = document.getElementById('search') 


function getSearch() {
    div.innerHTML = ''
    axios.get('https://655c81de25b76d9884fd6913.mockapi.io/products')
    .then(res =>{
        db = res.data
        let filterData = db.filter(item => item.title.toLowerCase().startsWith(inp.value.toLowerCase()))
        console.log(filterData);
        filterData.map(item =>{
            const box = document.createElement('div')
            box.className = 'myBox col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12'
            box.innerHTML = `
                <img src="${item.image}" alt="">
                <h5>${item.name}</h5>
                <h6>$${item.price}</h6>
                <button onclick="addToCart(${item.id})">Add To Basket -></button>
            `;
            div.appendChild(box);
        });
    });
};
search.addEventListener('click',getSearch)


const sortbtn = document.getElementById('sortbtn')
const sortDiv = document.getElementById('sortDiv')

function getSort() {
    div.style.display = 'none'
    sortDiv.style.display = 'block'

    axios.get('https://655c81de25b76d9884fd6913.mockapi.io/products')
    .then(res =>{
        db = res.data
        const sortData = db.sort((a,b) => a.price - b.price)
        sortData.map(item =>{
            const box = document.createElement('div')
            box.className = 'myBox col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'
            box.innerHTML = `
            <div class="boxDiv">
            <img src="${item.image}" alt="">
            <div>
            <h4>${item.title}</h4>
            <h4>${item.price}</h4>
            </div>
            </div>
        
        `;
        sortDiv.appendChild(box)
        });
    });
};

sortbtn.addEventListener('click',getSort)

const exampleFormControlInput1 = document.getElementById('exampleFormControlInput1')
const exampleFormControlInput2 = document.getElementById('exampleFormControlInput2')
const exampleFormControlInput3 = document.getElementById('exampleFormControlInput3')
const exampleFormControlTextarea1 = document.getElementById('exampleFormControlTextarea1')
const form = document.getElementById('form')

function getPost(e) {
    e.preventDefault()
    axios.post('https://65685f8d9927836bd974aa4c.mockapi.io/pradacts',{
        email: exampleFormControlInput1.value,
        name: exampleFormControlInput2.value,
        surname: exampleFormControlInput3.value,
        Text: exampleFormControlTextarea1.value,
    }).then(res =>{
        console.log(res);
        form.reset()
    });

}

form.addEventListener('submit',getPost)

window.onload = () =>{
    getProducts()
}