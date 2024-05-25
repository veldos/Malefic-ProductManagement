import Product, { IProduct } from '../models/Product';

export const createProductService = async (productData : IProduct): Promise<IProduct> =>{
    const newProduct: IProduct = new Product(productData);
    await newProduct.save();
    return newProduct;
};
export const getAllProductService = async (): Promise <IProduct[]> =>{
    const products: IProduct[] = await Product.find();
    return products;
}
export const getProductByIdService = async (productId : String): Promise<IProduct | null> =>{
    const product: IProduct|null = await Product.findById(productId) ;
    return  product;
}

export const updateProductByIdService = async (
    productId: String,
    updatedProductData: Partial <IProduct>): Promise<IProduct | null> =>{
        const updatedProduct: IProduct |null = await Product.findByIdAndUpdate(productId, updatedProductData, {new : true});
        return updatedProduct;
}
 export const deleteProductByIdService = async (productId : String):Promise<IProduct |null> =>{
    const deletedProduct: IProduct |null = await Product.findByIdAndDelete(productId);
    return deletedProduct;

}