// Quick debug script to test order endpoint
const mongoose = require('mongoose');

// Connect to your database
mongoose.connect('mongodb://localhost:27017/phonehub', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const OrderSchema = new mongoose.Schema({
  userEmail: String,
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Phone" },
    quantity: Number,
  }],
  totalPrice: Number,
  status: {
    type: String,
    enum: ["Pending", "Paid", "Shipped", "Completed", "Cancelled"],
    default: "Pending",
  },
  transaction: {
    id: String,
    transactionStatus: String,
    bank_status: String,
    sp_code: String,
    sp_message: String,
    method: String,
    date_time: String,
  },
}, { timestamps: true });

const Order = mongoose.model("Order", OrderSchema);

async function testOrders() {
  try {
    console.log('Testing order retrieval...');
    const orders = await Order.find().lean();
    console.log('Orders found:', orders.length);
    console.log('Sample order:', orders[0]);
    
    if (orders.length === 0) {
      console.log('No orders found in database');
    }
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
    mongoose.connection.close();
  }
}

testOrders();