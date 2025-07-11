import userModel from '../models/userModel.js';

// add items to userFunction
const addToCart = async (req, res) => {
    try {
       let userData = await userModel.findById(req.body.userId); // ✅ returns user object

        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]) {
            cartData[req.body.itemId]=1
        }else{
            cartData[req.body.itemId] += 1;
        }
        // if (!userData) {
        //     return res.json({ success: false, message: "User not found" });
        // }
        await userModel.findByIdAndUpdate(
            req.body.userId,
           {cartData},
        );
        res.json({ success: true, message: "Item added to cart", cartData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error adding item to cart" });
    }
}

const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }  
        let cartData = await userData.cartData;
        if (cartData[req.body.itemId]>0) {

            cartData[req.body.itemId] -= 1;
            await   userModel.findByIdAndUpdate(
                req.body.userId,
                { cartData },
            );      
        } 
        await userModel.findByIdAndUpdate(
            req.body.userId,
            { cartData },
        );
        res.json({ success: true, message: "Item removed from cart", cartData });

    } catch (error) {
       console.log(error);
        res.json({ success: false, message: "Error removing item from cart" });
    }
}

// fetch user cart data

const getCartItems = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({ success: true,  cartData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching cart data" });
    }
}

export {addToCart, removeFromCart, getCartItems };