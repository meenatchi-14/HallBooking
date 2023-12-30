import express from 'express';
import rooms from './data.js';
import { bookings } from './data.js';
import { customers } from './data.js';
const app = express();
app.use(express.json());
const PORT =process.env.PORT||8500;

// view all Rooms and its details
app.get('/rooms/all', (req, res)=> {
    res.status(200).json({RoomsList : rooms});
    console.log(rooms)
  })

//API endpoint for creating room
app.post('/rooms/create',(req,res) => {
    const room = req.body;
    const idExists = rooms.find((el)=> el.roomId === room.roomId)
    console.log(idExists)
    if(idExists == undefined){
      rooms.push(room);
      res.status(201).json({message:"room created"});
      console.log(room)
    }
    else{
      return res.status(400).json({message:"room already exists."});
    
}
   

    
});
// api endpoint for booking room
app.post("/booking/create/:id", (req,res)=>{
    try{
      const {id} = req.params;
      console.log(id)
      let bookRoom = req.body; 
      console.log(bookRoom)
      let date = new Date();
      let dateFormat = date.toLocaleDateString();
      console.log(dateFormat)
      let idExists = rooms.find((el)=> el.roomId === id)
      if(idExists === undefined){
          return res.status(400).json(
            {message:"room does not exist.",
             RoomsList:rooms});
  
      }
//verifying the booked date      
      let matchID = bookings.filter((b)=> b.roomId===id) 
      console.log("Array",matchID)
      if(matchID.length > 0){
          let dateCheck = matchID.filter((m)=>{ return m.bookingDate === bookRoom.bookingDate});
          if(dateCheck.length===0){
              let newID = "B"+(bookings.length + 1);
              let newbooking = {...bookRoom, bookingID: newID, roomId:id, status:"booked", booked_On: dateFormat}
              bookings.push(newbooking);
              return res.status(201).json({message:"hall booked", Bookings:bookings, added:newbooking});
          }
          else{
              return res.status(400).json({message:"hall already booked for this date, choose another hall", Bookings:bookings});
          }
      }
      else{
              let newID = "B"+(bookings.length + 1);
              let newbooking = {...bookRoom, bookingID: newID, roomId:id, status:"booked",booked_On: dateFormat}
              bookings.push(newbooking);
              const customerdetails = customers.find(cust => 
                cust.name === newbooking.customer);
                if (customerdetails) {
                    customerdetails.bookings.push(newbooking);
                } else {
                    customers.push({ name:newbooking.customer,bookings:[newbooking]});
                }
              return res.status(201).json({message:"hall booked", Bookings:bookings, added:newbooking});
  
      }
    }
    catch(error){
        res.status(400).json({message:"error booking room", error: error, data:bookings});
    }
})

// api endpoint for viewing all the booked room
app.get('/viewbooking',(req,res) => {
    const bookedRooms = bookings.map(booking => {
        const {roomId ,Status,customer,bookingDate,startTime,endTime} = booking;
        return {roomId ,Status,customer,bookingDate,startTime,endTime} 
    });
    res.status(201).json(bookedRooms);
});

//api to list all the customers with booked data
app.get('/customers', (req, res) => {
    const customerBookings = customers.map(customer => {
      const { name, bookings } = customer;
      const customerDetails = bookings.map(booking => {
        const { roomId,roomName, bookingDate, startTime, endTime } = booking;
        return { name, roomId,roomName, bookingDate, startTime, endTime };
      });
     
      return customerDetails;
    })
   
    res.json(customerBookings);
  });

// api to list how many times the user booked the room
  app.get('/customer/:name', (req, res) => {
    const { name } = req.params;
    const customer = customers.find(cust => cust.name === name);
    if (!customer) {
      res.status(404).json({ error: 'Customer not found' });
      return;
    }
    const customerBookings = customer.bookings.map(booking => {
      const { customer,roomId,roomName, startTime, endTime, bookingID, status, bookingDate,booked_On } = booking;
      return { customer, roomId, roomName,startTime, endTime, bookingID, status, bookingDate,booked_On };
    });
    res.json(customerBookings);
  });


  app.listen(PORT,()=>{
    console.log(`Server listening port ${PORT} `)
})