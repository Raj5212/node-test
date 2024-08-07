const ProductModel = require("../Schema/ProductSchema");

exports.addProducts = async(req, res) => {
  try {
    const { name, price, size, rating } = req.body;

    console.log({size})
    const Product = await new ProductModel({
      name,
      price,
      size,
      rating,
    });

    await Product.save()
    res.status(201).json({message : "product added successfully"})

  } catch (e) {
    console.log(e);
    res.status(500).json({message : "Something wen wrong!!!"})

  }
};


exports.getProductsStartswithH = async(req, res) => {
    try {
     const Product = await ProductModel.find({ name : /^H/i})
     res.status(201).json({message : "product found  successfully" , data : Product})

    } catch (e) {
      console.log(e);
      res.status(500).json({data : "Somthing went wrong!!!"})
  
    }
  };


  exports.getRating = async(req, res) => {
    try {
     const Product = await ProductModel.find({ price :{$gt : 90}})
     const avgRating = Product.reduce((acc , prod)=>
        acc + prod.rating, 0) / Product.length
     
     res.status(201).json({message : "product found  successfully" , averageRating  : avgRating})

    } catch (e) {
      console.log(e);
      res.status(500).json({data : "Somthing went wrong!!!"})
  
    }
  };
  

  exports.getRating = async(req, res) => {
    try {
     const Product = await ProductModel.find({ price :{$gt : 90}})
     const avgRating = Product.reduce((acc , prod)=>
        acc + prod.rating, 0) / Product.length
     
     res.status(201).json({message : "product found  successfully" , averageRating  : avgRating})

    } catch (e) {
      console.log(e);
      res.status(500).json({data : "Somthing went wrong!!!"})
  
    }
  };


  exports.deleteDuplicateProduct = async(req, res) => {
    try {
     const Products = await ProductModel.aggregate([
        {
            $group:{
                _id: {name : '$name'},
                uniqueId : {
                 $addToSet: "$ _id"
                },
                count : {$sum : 1}
            }
        },
        {
            $match : {count : {$gt : 1}}
        }
     ])

     for( const product of Products){
        product.uniqueId.shift();
        await ProductModel.deleteMany({ _id : { $in : product.uniqueId}})
     }

     res.status(201).json({message : "Duplicate Delete"})

    
    } catch (e) {
      console.log(e);
      res.status(500).json({data : "Somthing went wrong!!!"})
  
    }
  };



  

