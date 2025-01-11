import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
});

// Placing user order from frontend
const placeOrder = async (req, res) => {
    const frontend_url = "https://food-del-frontendddd.onrender.com/";

    try {
        // Create a new order in the database
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });

        // Save the order in the database
        await newOrder.save();

        // Clear user cart
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // Create a Razorpay order
        const options = {
            amount: req.body.amount * 100, // Convert amount to paise
            currency: "INR",
            receipt: `order_${newOrder._id}`,
        };

        const razorpayOrder = await razorpay.orders.create(options);
        if (!razorpayOrder) {
            throw new Error("Razorpay order creation failed");
        }

        // Save Razorpay Order ID in the database
        newOrder.razorpayOrderId = razorpayOrder.id;
        await newOrder.save();

        // Respond with the Razorpay session URL
        res.json({
            success: true,
            order_id: razorpayOrder.id,
            session_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });
    } catch (error) {
        console.error("Error in placeOrder:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// user orders frontend
const userOrders = async (req,res) =>{
try {
    const orders = await orderModel.find({userId:req.body.userId});
    res.json({success:true,data:orders})

    
} catch (error) {

    console.log(error);
    res.json({success:false,message:"Error"});
    
}
}

// listing order from admin ppane
const listOrders = async(req,res)=>{

    try {
        const orders = await orderModel.find({});
        res.json({success:true,data:orders})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
        
    }

}

// api for updating order status
const updateStatus = async (req,res) =>{
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
        res.json({success:true,message:"Status updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
        
    }

}

export { placeOrder,userOrders,listOrders ,updateStatus};
