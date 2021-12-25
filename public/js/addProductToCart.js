const addToCartHandler =(event)=>{
    console.log(event.toElement)
    fetch('http://localhost:3000/cart/add', {
        method: 'post',
        body: JSON.stringify({
            id:event.target.id
        }),
        headers:{
            'Content-type':'application/json'
        }
    }).then(response=>{
        if (response.status>= 200 && response.status<300){
            alert('Add product seccessfully');
            return response.json();
        }else{
            response.json().then(error=>{
                console.log('ERROR: '+error);
            });
        }
    }).catch(error=>{
        console.log(error);
    })
}

/*
<script id="scriptAddProductToCart" type="text/javascript">
    const addToCartHandler =(event)=>{
        console.log(event.toElement)
        fetch('http://localhost:3000/cart/add', {
            method: 'post',
            body: JSON.stringify({
                id:event.target.id
            }),
            headers:{
                'Content-type':'application/json'
            }
        }).then(response=>{
            if (response.status>= 200 && response.status<300){
                alert('Add product seccessfully');
                return response.json();
            }else{
                response.json().then(error=>{
                    console.log('ERROR: '+error);
                });
            }
        }).catch(error=>{
            console.log(error);
        })
    }

    for(let btn of document.getElementsByClassName('addToCartBtn')){
        btn.addEventListener('click', addToCartHandler)
    }
</script>
*/