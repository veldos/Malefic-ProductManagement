import mongoose, { Schema,Document  } from "mongoose";

interface IReview {
    rating: number;
    comment?: string;
    date: Date;
}

export interface IProduct extends mongoose.Document {
    id_Prod: number;
    Name: string;
    Description?: string;
    Price: number;
    Category: string;
    Brand: string;
    Stock: number;
    Images: string[];
    Reviews: IReview[];
    averageRating: number;
}

const ProductSchema = new Schema<IProduct>({
    id_Prod: {
        type: Number,
        required: true,
        unique: true,
    },
    Name: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
        maxlength: 1000, // Limit description to 1000 characters
    },
    Price: {
        type: Number,
        required: true,
        min: 0, // Price should be a positive number
    },
    Category: {
        type: String,
        required: true,
    },
    Brand: {
        type: String,
        required: true,
    },
    Stock: {
        type: Number,
        default: 0, // Default stock to 0
    },
    Images: [String], // Array of image URLs
    Reviews: [{
        rating: {
            type: Number,
            min: 1,
            max: 5,
        },
        comment: String,
        date: {
            type: Date,
            default: Date.now,
        },
    }],
});

// Virtual property to calculate average rating based on reviews
ProductSchema.virtual('averageRating').get(function(this: IProduct) {
    const totalRatings = this.Reviews.reduce((acc, review) => acc + (review.rating || 0), 0);
    return this.Reviews.length ? totalRatings / this.Reviews.length : 0;
});

const Product = mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
