const addToCartHandler =(event)=>{
    console.log(event.toElement);
}

for(let btn of document.getElementsByClassName('addToCartBtn')){
    btn.addEventListener('click', addToCartHandler)
}