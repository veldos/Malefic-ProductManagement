import { Request, Response } from 'express';
import User from '../models/User';
import Order from '../models/Order';
import Cart from '../models/Cart';
import { JwtPayload } from 'jsonwebtoken';

interface CustomRequest extends Request {
    user?: string | JwtPayload;
  }
export const getClientDashboard = async (req: CustomRequest, res: Response) => {
  try { 
    const userId = (req.user as JwtPayload).id;
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    if (error instanceof Error) {
        res.status(500).json({ message: 'Server error', error: error.message });
      } else {
        res.status(500).json({ message: 'Server error', error: 'Unknown error' });
      }  
    }
};

export const getCart = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as JwtPayload).id;
    const cart = await Cart.findOne({ user: userId }).populate('products.product');
    res.status(200).json(cart);
  } catch (error) {
    if (error instanceof Error) {
        res.status(500).json({ message: 'Server error', error: error.message });
      } else {
        res.status(500).json({ message: 'Server error', error: 'Unknown error' });
      }   }
};

export const addToCart = async (req: Request, res: Response) => {
  const { productId, quantity } = req.body;
  const userId = (req.user as JwtPayload).id;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, products: [] });
    }

    const productIndex = cart.products.findIndex((p) => p.product.toString() === productId);
    if (productIndex !== -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    if (error instanceof Error) {
        res.status(500).json({ message: 'Server error', error: error.message });
      } else {
        res.status(500).json({ message: 'Server error', error: 'Unknown error' });
      }   }
};

export const removeFromCart = async (req: Request, res: Response) => {
  const { productId } = req.body;
  const userId = (req.user as JwtPayload).id;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (cart) {
      cart.products = cart.products.filter((p) => p.product.toString() !== productId);
      await cart.save();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: 'Cart not found' });
    }
  } catch (error) {
    if (error instanceof Error) {
        res.status(500).json({ message: 'Server error', error: error.message });
      } else {
        res.status(500).json({ message: 'Server error', error: 'Unknown error' });
      }   }
};

export const placeOrder = async (req: Request, res: Response) => {
  const userId = (req.user as JwtPayload).id;
  const { products } = req.body;

  try {
    const order = new Order({ user: userId, products });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    if (error instanceof Error) {
        res.status(500).json({ message: 'Server error', error: error.message });
      } else {
        res.status(500).json({ message: 'Server error', error: 'Unknown error' });
      }   }
};
