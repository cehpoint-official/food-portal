import React, { useState, useEffect } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../../firebaseConfig'; // Import your configured Firebase database
import RestaOne from "../../assets/masterAdmin/restReuqest1.png";
import { Link } from 'react-router-dom';

// Helper function to format Firestore timestamp
const formatDate = (timestamp) => {
    if (timestamp) {
        const date = timestamp.toDate(); // Convert Firestore timestamp to JavaScript Date
        return date.toLocaleDateString(); // Format the date as needed
    }
    return '';
};

const RestRequests = () => {
    const [toggle, setToggle] = useState(true); // true for active requests, false for rejected requests
    const [activeOrders, setActiveOrders] = useState([]);
    const [rejectedOrders, setRejectedOrders] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (toggle) {
                    // Fetch active requests from restroRequests
                    const q = query(collection(db, "restroRequests"));
                    const querySnapshot = await getDocs(q);
                    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setActiveOrders(data);
                } else {
                    // Fetch rejected requests from rejectedRestaurants
                    const q = query(collection(db, "rejectedRestaurants"));
                    const querySnapshot = await getDocs(q);
                    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setRejectedOrders(data);
                }
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, [toggle]);

    const ordersToDisplay = toggle ? activeOrders : rejectedOrders;

    return (
        <div className='bg-slate-100 px-6 pt-10 pb-20'>
            <div>
                <p className="lg:text-3xl md:text-2xl font-bold text-blue-600">
                    Restaurant Requests
                </p>
            </div>

            <div className='bg-white p-4 py-10 mt-10 rounded-lg'>
                <div className='mb-10'>
                    <button 
                        type="button" 
                        onClick={() => setToggle(true)} 
                        className={`focus:text-white hover:text-white ring-1 ring-slate-100 focus:bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2 text-center me-2 mb-2 ${toggle ? 'bg-blue-600 text-white' : 'text-blue-600'}`}
                    >
                        Restaurants Requests
                    </button>
                    <button 
                        type="button" 
                        onClick={() => setToggle(false)} 
                        className={`focus:text-white hover:text-white ring-1 ring-slate-100 focus:bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2 text-center me-2 mb-2 ${!toggle ? 'bg-blue-600 text-white' : 'text-blue-600'}`}
                    >
                        Rejected Restaurants
                    </button>
                </div>

                <div>
                    {ordersToDisplay.map((item) => (
                        <div key={item.id} className='grid grid-cols-12 mt-6 shadow-xl p-1 py-2 rounded-lg'>
                            <div className='lg:col-span-4 md:col-span-6 col-span-8'>
                                <div className='flex items-center gap-4'>
                                    <img src={item.photo || RestaOne} className='h-20 rounded-lg' alt={item.name || "Restaurant"} />
                                    <div>
                                        <p className='text-xl mb-1 text-slate-700'>{item.name}</p>
                                        <span className='text-sm'>{item.address}</span>
                                    </div>
                                </div>
                            </div>
                            <div className='lg:col-span-1 md:col-span-3 col-span-4'>
                                <div className="px-6 py-4">
                                    <p className='text-black text-sm font-bold'>{item.id}</p>
                                    ID
                                </div>
                            </div>
                            <div className='lg:col-span-2 md:col-span-3 col-span-4'>
                                <div className="px-6 py-4">
                                    <p className="font-bold text-sm">
                                        {formatDate(item.date)}
                                    </p>
                                    Date
                                </div>
                            </div>
                            <div className='lg:col-span-3 md:col-span-3 col-span-4'>
                                <div className="md:ps-6 lg:px-6 py-4">
                                    <p className='text-black font-bold text-sm'>
                                        {item.email}
                                    </p>
                                    Email
                                </div>
                            </div>
                            <div className='lg:col-span-2 md:col-span-4 col-span-4 md:col-start-10'>
                                <div className="py-4 mt-3">
                                    <Link 
                                        to={`/foodAdmin/restaReuest/restaurantReqDet/${item.id}`} 
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline border-blue-400 border p-1 px-2 rounded-lg"
                                    >
                                        <i className="bi bi-eye-fill"></i>View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RestRequests;
