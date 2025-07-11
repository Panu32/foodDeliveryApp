import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing user model for frontend
const placeOrder = async (req, res) => {
     const frontend_url= "http://localhost:5173"
    try {
        const newOrder= new orderModel({
            userId: req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address,

        })  
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: [] });

        const line_items = req.body.items.map(item => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                    // images: [item.image],
                },
                unit_amount: item.price * 100, // Convert to cents
            },
            quantity: item.quantity,
        }));

        line_items.push({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: 'Delivery Charge',
                },
                unit_amount: 500, // $5.00 delivery charge
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items:line_items,
            mode: 'payment',
            
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,

        });

        res.json({success:true, session_url: session.url});



    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error placing order"});
    }
}

const verifyOrder= async (req, res) =>{
     const {orderId, success} = req.body;
     try {
        if(success){
            await orderModel.findByIdAndUpdate(orderId, {payment: true});
            res.json({success:true, message:"Order verified successfully"});
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false, message:"Order verification failed"});
        }
     } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error verifying order"});
     }
}
// user order for frontend
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });

        res.json({ success: true, data:orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching user orders" });
    }

}

const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching orders" });
    }
}

export {placeOrder, verifyOrder,userOrders,listOrders};