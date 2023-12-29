//creating variables 
let rooms = [{
    roomId:"R1",
    seatsAvailable:"5",
    amenities:"TV,AC,heater",
    roomName:"Deluxe Room",
    pricePerDay:"100"
}];

export default rooms;
//room name:Luxury rooms,Standard Rooms,Deluxe Room , Superior Room,Executive Room,
let bookings = [{
    customer: "Rathu",
    bookingDate: "20231021",
    startTime: "06:00am",
    endTime: "11:59pm",
    bookingID: "B1",
    roomId: "R1",
    roomName:"Deluxe Room",
    status: "booked",
    booked_On: "15/10/2023"
}
];
export{
    bookings
};
let customers = [
    { name: 'Rathu',
     bookings: [ 
        {
          customer: "Rathu",
          bookingDate: "20231021",
          startTime: "06:00am",
          endTime: "11:59pm",
          bookingID: "B1",
          roomId: "R1",
          roomName:"Deluxe Room",
          status: "booked",
          booked_On: "15/10/2023"
          }
      ] }
];
export {
    customers
}