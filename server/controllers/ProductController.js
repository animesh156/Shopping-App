


const getProducts = (req,res) => {
    fetch('https://fakestoreapi.com/products')  // Extract all products
            .then(res=>res.json())
            .then(data=> res.json(data))
}





  
  

module.exports = {
    getProducts,
   
 
}