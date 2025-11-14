import axios from "axios";

function PayButton() {

  const payNow = async () => {
    const orderRes = await axios.post("http://localhost:3000/api/payment/create-order", {
      amount: 500  // ₹500
    });

    const { id, amount, currency } = orderRes.data;

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: amount,
      currency: currency,
      name: "Your App Name",
      description: "Test Transaction",
      order_id: id,
      handler: async function (response) {
        const verifyRes = await axios.post("http://localhost:3000/api/payment/verify", response.data);

        if (verifyRes.data.success) {
          alert("Payment successful");
        } else {
          alert("Payment failed");
        }
      },
      prefill: {
        name: "Test User",
        email: "test@example.com",
        contact: "9999999999"
      },
      theme: { color: "#3399cc" }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return <button onClick={payNow}>Pay ₹500</button>;
}

export default PayButton;