import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [booking, setBooking] = useState([])
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
useEffect(()=>{
 fetch('http://localhost:3200/bookings?email='+loggedInUser.email, {
     method: 'GET',
     headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${sessionStorage.getItem('token')}`
     }
 })
 .then(res => res.json())
 .then(data => setBooking(data));
 
}, [])
console.log(booking);
    return (
        <div>
            <h3> You have booked: {booking.length}</h3>
            {
                booking.map(book => <li >{book.name} from: {(new Date(book.checkIn).toDateString('dd/MM/yyyy'))} to: {book.checkOut}</li>)
            }
        </div>
    );
};

export default Bookings;