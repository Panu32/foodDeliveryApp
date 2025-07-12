import express from 'express';
import  authMiddleware from '../middleware/auth.js';
import { placeOrder, verifyOrder ,userOrders,listOrders} from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/place', authMiddleware, placeOrder);
orderRouter.post('/verify', verifyOrder);
orderRouter.post('/userOrders', authMiddleware, userOrders);
orderRouter.get('/list', listOrders);
// New route for user orders
export default orderRouter;