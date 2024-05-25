//(list products, add, update, remove)

import { Request, Response, NextFunction } from 'express';

import Product, { IProduct } from '../models/Product';


export const createProduct = async (req:Request , res:Response, next:NextFunction): Promise<void> =>{
    try{
        const { id_Prod, Name, Description, Price, Category, Brand, Stock, Images } = req.body;
        const newProduct: IProduct = new Product({
            id_Prod,
            Name,
            Description,
            Price,
            Category,
            Brand,
            Stock,
            Images,
        });
        await newProduct.save();
        res.status(201).json({message : 'Product created succefully', product : newProduct})
    }catch(error){
        console.error('Error creating product', error);
        res.status(500).json({message : 'Failed to create product'})
    }
}


export const getAllProduct = async (req:Request , res:Response, next:NextFunction): Promise<void> =>{
    try {
        const products: IProduct[] = await Product.find();
        res.status(200).json(products);

    }catch(error){
        console.error('Error fetching products', error);
        res.status(500).json({message:'Failed fetching products '});
    }
}

export const getProductById = async (req:Request , res:Response, next:NextFunction): Promise<void> =>{
    try{
        const productId: String = req.params.id;
        const product: IProduct|null = await Product.findById(productId);
        if(!product){
            res.status(500).json({message : 'Product not found'});
            return;
        }
        res.status(200).json(product);
    }catch(err){
        console.error('Error fetching product:', err );
        res.status(500).json({ message: 'Failed to fetch product' });

    }
}

export const updateProductById = async (req:Request , res:Response, next:NextFunction): Promise<void> =>{
    try{
        const productId: String = req.params.id;
        const updatedProductData: Partial<IProduct> =req.body;
        const updatedProduct : IProduct | null = await Product.findByIdAndUpdate(
            productId,
            updatedProductData,
            {new : true}
        );
        if(!updatedProduct){
            res.status(500).json({message : 'product not updated'});
        }
        res.status(200).json({message : 'Product updated successfully', product: updatedProduct});
    }
    catch(err){
        console.error('Error fetching id or data :', err);
        res.status(500).json({message : 'Failed updating or fethcing IDproduct'});
    }
}
export const deleteProductById = async ( req:Request , res: Response): Promise<void> =>{
    try{
        const productId: String = req.params.id;
        const deletedProduct: IProduct|null = await Product.findByIdAndDelete(productId);
        if(!deletedProduct){
            res.status(500).json({message : 'product not deleted'});
        }
        res.status(200).json({message: 'Product deleted successfully', product: deletedProduct});

    }catch(err){
        console.error('Error deleting product:', err);
        res.status(500).json({ message: 'Failed to delete product' });  
      }
}