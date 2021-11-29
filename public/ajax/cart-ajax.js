const deleteProdBtns= document.getElementsByClassName("delete-product-btn");

const url = "http://localhost:3000/api/cart"
const deleteProductHandler =async (event)=>{
    let product ={
        id:event.toElement.id,
    };
    await fetch(url,{
        method:"POST",
        body: JSON.stringify(product),
        headers:{
            'Content-type':'application/json; charset=utf-8'
        }
    }).then(response=>{
        if (response.status>= 200 && response.status<300){
            return response.json().then(item=>{
                const itemRow = document.getElementById(`row-${item._id}`);
                itemRow.innerHTML='';
            });
        }else{
            response.json().then(error=>{
                console.log('ERROR: '+error);
            });
        }
    }).catch(error=>{
        console.log(error);
    })
}

for(let btn of deleteProdBtns){
    btn.addEventListener('click', deleteProductHandler);
}
