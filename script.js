  const products=[
{id: 1,name: "Doll",Image:"https://m.media-amazon.com/images/I/71HwfrmwpWL._AC_SY145_.jpg",price: 300},
{id: 2,name: "Phone",Image:"https://m.media-amazon.com/images/I/61sU8OqBs4L._AC_SY200_.jpg",price: 40000},
{id: 3,name: "Saree",Image:"https://m.media-amazon.com/images/I/613H-82kjkL._AC_SY200_.jpg",price: 3456},
{id: 4,name: "chocolate",Image:"https://images-eu.ssl-images-amazon.com/images/I/61nzp7jt+hL._AC_UL165_SR165,165_.jpg",price: 4940},
{id: 5,name: "Top",Image:"https://m.media-amazon.com/images/I/61xQevdtdYL._AC_SY200_.jpg",price: 423},
{id: 6,name: "Bike",Image:"https://m.media-amazon.com/images/I/71evfqBbcRL._AC_SY200_.jpg",price: 3000},
{id: 7,name: "Nokia",Image:"https://m.media-amazon.com/images/I/61SKFLoO8JL._AC_SY145_.jpg",price: 3000},
{id: 8,name: "Earbuds",Image:"https://m.media-amazon.com/images/I/41nuqDNy9mL._AC_SY200_.jpg",price: 2000},
{id: 9,name: "Watch",Image:"https://images-eu.ssl-images-amazon.com/images/G/31/img22/Fashion/Gateway/BAU/BTF-Refresh/May/PC_WF/WF4-186-116._SY116_CB636048992_.jpg",price: 1000},

  ]
  function renderProducts(products,productList){
    const container=document.getElementById(productList);
    container.innerHTML="";
    products.forEach(product =>{
        const productDiv=document.createElement("div");
        productDiv.classList.add("product-item");
        productDiv.innerHTML=`
        <img src="${product.Image}"/>
        <h3>${product.name}</h3>
        <h2>${product.price}</h2> 
        <button onClick = "addToCart(${product.id})">Add to cart</button>
        
        `
        container.appendChild(productDiv);

        
    })
} 
function searchProducts(query){
    const filterProducts = products.filter(product=>
        product.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    )
    renderProducts(filterProducts,"productList");

}
document.getElementById("serchButton")?.addEventListener("click",() => {
    const query=document.getElementById("productSearch").value;
    searchProducts(query);

})
function sortProducts(criteria){
    if(criteria === "price"){
        return products.sort((a,b)=> a.price-b.price);
}
return products;
}
document.getElementById("sortOptions")?.addEventListener("change",(event)=>{
    const sortedProducts=sortProducts(event.target.values);
    renderProducts(sortedProducts,"productList");

})

function addToCart(productId){
    const product = products.find(p=> p.id === productId);
    let cart =JSON.parse(localStorage.getItem("cart"))||[];
    cart.push(product);
    localStorage.setItem("cart",JSON.stringify(cart));
    alert(`${product.name}is added to cart`)
    renderCart();
}
function renderCart(){
    const cart=JSON.parse(localStorage.getItem("cart"))||[];
    const container = document.getElementById("cartItems");
    container.innerHTML="";
    if(cart.length == 0){
        container.innerHTML="<h1>Your Cart is Empty</h1>"
    }
    cart.forEach(item => {
        const cartDiv = document.createElement("div");
        cartDiv.classList.add("cart-item");
        cartDiv.innerHTML=`
        <img src="${item.Image}"/>
        <h3>${item.name}</h3>
        <h2>${item.price}</h2>
        <button onclick="removeFromCart(${item.id})">Remove</button>
        `
        container.appendChild(cartDiv);
    })
    renderSubtotal(cart);
}
function removeFromCart(productId){
    let cart=JSON.parse(localStorage.getItem("cart"))||[];
    cart =cart.filter(item => item.id !== productId);
    localStorage.setItem("cart",JSON.stringify(cart));
    alert("product is removed successfully");
    renderCart();


}
function renderSubtotal(cart){
    const subtotal = cart.reduce((total,item) => total + item.price,0);
    const subtotalContainer = document.getElementById("subtotal");
    if(cart.length > 0){
        subtotalContainer.innerHTML = `Subtotal : Rs. ${subtotal}`
    
} else{
    subtotalContainer.innerHTML = `NO items in the cart`
    
}
}

if(document.getElementById("productList"))renderProducts(products,"productList");
if(document.getElementById("cartItems"))renderCart();   

        
    
  