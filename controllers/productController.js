let Product = require("../models/product");
let BigPromise = require("../middlewares/bigPromise");
let cloudinary = require("cloudinary");
let CustomError = require("../utils/customError");
let WhereClause = require("../utils/whereClause");

exports.addProduct = BigPromise(async (req, res, next) => {
  //images

  let imagesArray = [];

  if (!req.files) {
    return next(new CustomError(`Images are required`, 401));
  }

  if (req.files) {
    for (let index = 0; index < req.files.photos.length; index++) {
      let result = await cloudinary.v2.uploader.upload(
        req.files.photos[index].tempFilePath,
        {
          folder: "products",
        }
      );
      imagesArray.push({
        id: result.public_id,
        secure_url: result.secure_url,
      });
    }
  }

  req.body.photos = imagesArray;
  req.body.user = req.user.id;

  let product = await Product.create(req.body);

  res.status(200).json({
    success: true,
    product,
  });
});

exports.getAllProduct = BigPromise(async (req, res, next) => {
  let resultperPage = 6;
  let totalcountProduct = await Product.countDocuments();

  let productsObj = new WhereClause(Product.find(), req.query)
    .search()
    .filter();

  let products = productsObj.base;
  let filterProductNumber = products.length;

  productsObj.pager(resultperPage);
  products = await productsObj.base.clone();

  res.status(200).json({
    success: true,
    products,
    filterProductNumber,
    totalcountProduct,
  });
});

exports.getOneProduct = BigPromise(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new CustomError(`No product found with this id`, 401));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

//admin only controller

exports.adminGetAllProduct = BigPromise(async (req, res, next) => {
  let products = await Product.find({});

  res.status(200).json({
    success: true,
    products,
  });
});

exports.adminUpdateOneProduct = BigPromise(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new CustomError(`No product found with this id`, 401));
  }
  let imagesArray = [];

  if (req.files) {
    //destroy the existing images
    for (let index = 0; index < product.photos.length; index++) {
      let res = await cloudinary.v2.uploader.destroy(
        product.photos[index].id
      );
    }

    //upload and save the images

    for (let index = 0; index < req.files.photos.length; index++) {
      let result = await cloudinary.v2.uploader.upload(
        req.files.photos[index].tempFilePath,
        {
          folder: "products", //folder name -> .env
        }
      );
      imagesArray.push({
        id: result.public_id,
        secure_url: result.secure_url,
      });
    }
  }

  req.body.photos = imagesArray;

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

exports.adminDeleteOneProduct = BigPromise(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new CustomError(`No product found with this id`, 401));
  }


  //destroy the existing images
  for (let index = 0; index < product.photos.length; index++) {
    let res = await cloudinary.v2.uploader.destroy(
      product.photos[index].id
    );
  }

  await product.remove()

  res.status(200).json({
    success: true,
    message: "Product was deleted!",
  });
});
