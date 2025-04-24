// import React from 'react'
// import Footer from '../components/Footer';
// import Navbar from '../components/Navbar';
// import { useState, useEffect } from 'react';


// export default function MyOrders() {
//     const [orderData, setorderData] = useState([]);
//     const fetchMyOrder = async ()=>{
//         console.log(localStorage.getItem('userEmail'))
//         await fetch ("http://localhost:5000/api/myOrderData", {


//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body:JSON.stringify({
//                 email:localStorage.getItem('userEmail')
//             })
//         }).then(async (res) => {
//             let response = await res.json()
//             await setorderData(response);
//         })

//     }

//     useEffect(() => {
//         fetchMyOrder()
//     }, [])

//     return (
//         <>
//             <div>
//                 <Navbar />
//             </div>

//             <div div className='container'>
//                 <div className='row'>

//                     {orderData !== {} ? Array(orderData).map(data => {
//                         return (
//                             data.orderData ?
//                                 data.orderData.order_data.slice(0).reverse().map((item) => {
//                                     return (
//                                         item.map((arrayData) => {
//                                             return (
//                                                 <div>
//                                                     {arrayData.Order_date ? <div className='m-auto mt-5'>

//                                                         {data = arrayData.Order_date}
//                                                         <hr />
//                                                     </div> :

//                                                         <div className='col-12 col-md-6 col-lg-3' >
//                                                             <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
//                                                                 <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
//                                                                 <div className="card-body">
//                                                                     <h5 className="card-title">{arrayData.name}</h5>
//                                                                     <div className='container w-100 p-0' style={{ height: "38px" }}>
//                                                                         <span className='m-1'>{arrayData.qty}</span>
//                                                                         <span className='m-1'>{arrayData.size}</span>
//                                                                         <span className='m-1'>{data}</span>
//                                                                         <div className=' d-inline ms-2 h-100 w-20 fs-5' >
//                                                                             ₹{arrayData.price}/-
//                                                                         </div>
//                                                                     </div>
//                                                                 </div>
//                                                             </div>

//                                                         </div>

//                                                     }
//                                                 </div>

//                                             )

//                                         })

//                                     )
//                                 }) : ""
//                         )
//                     }) : ""}
//                 </div>
//             </div>

//             <div>
//                 <Footer />
//             </div>

//         </>
//     )
// }






























import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrders() {
    const [orderData, setOrderData] = useState([]);

    const fetchMyOrder = async () => {
        let response = await fetch("http://localhost:5000/api/myOrderData", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: localStorage.getItem('userEmail') })
        });

        let data = await response.json();
        setOrderData(data.orderData || []);
    };

    useEffect(() => { fetchMyOrder(); }, []);

    return (
        <>
            <Navbar />
            <div className='container'>
                <h2 className='text-center mt-3'>My Orders</h2>
                <div className='row'>
                    {orderData.length > 0 ? orderData.map((order, index) => (
                        <div key={index} className='col-12'>
                            <h4 className='mt-4 text-primary'>Order Date: {order[0]?.order_date}</h4>
                            <h5>Total Amount: ₹{order[0]?.totalAmount}</h5>
                            {/* <h5>Payment Method: {order[0]?.paymentMethod}</h5>
                            <h5>Transaction ID: {order[0]?.transactionId}</h5> */}
                            
                            <hr />
                            <div className='row'>
                                {order.slice(1).map((item, i) => (
                                    <div key={i} className='col-12 col-md-6 col-lg-3'>
                                        <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                            {/* <img src={item.img} className="card-img-top" alt={item.name} style={{ height: "120px", objectFit: "fill" }} /> */}
                                            <div className="card-body">
                                                <h5 className="card-title">{item.name}</h5>
                                                <p>Quantity: {item.qty}</p>
                                                <p>Size: {item.size}</p>
                                                <p>Price: ₹{item.price}/-</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )) : <h4 className="text-center mt-5 text-danger">No orders found</h4>}
                </div>
            </div>
            <Footer />
        </>
    );
}




















