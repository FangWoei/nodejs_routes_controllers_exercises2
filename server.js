const express = require('express');
const app = express();

let parks = [
  { id: 1, name: 'Yellowstone National Park', facilities: ['campgrounds', 'visitor-center', 'trails'] },
  { id: 2, name: 'Zion National Park', facilities: ['trails', 'visitor-center'] },
];

let visitors = [
  { id: 1, name: 'John Doe', pastReservations: [1], upcomingReservations: [2] },
  { id: 2, name: 'Jane Smith', pastReservations: [], upcomingReservations: [] },
];

let reservations = [
  { id: 1, parkId: 1, visitorId: 1, date: '2023-09-01' },
  { id: 2, parkId: 2, visitorId: 1, date: '2023-10-01' },
];

// Your routing, authentication, and controller code goes here
app.get("/parks", (req, res) => {
  
    res.json(parks);
  });
  
  app.get("/parks/:id", (req, res) => {
    const park = parks.find(
      (p) => parseInt(p.id) === parseInt(req.params.id)
    );
    if (park) {
      res.status(200).json(park);
    } else {
      res.status(400).json("ID provided is not available");
    }
  });


app.get("/visitors", (req, res) => {
    res.json(visitors);
  });
  
  app.get("/visitors/:id", (req, res) => {
    const visitor = visitors.find(
      (p) => parseInt(p.id) === parseInt(req.params.id)
    );
    if (visitor) {
      const reservationPast = reservations.find((reservation) => parseInt(reservation.id) === (parseInt(visitor.pastReservations)));
      const reservationUp = reservations.find((reservation) => parseInt(reservation.id) === parseInt(visitor.pastReservations));
      console.log(reservationPast,reservationUp);
      res.status(200).json({...visitor, name: visitor.name, pastReservations: reservationPast, upcomingReservations: reservationUp});
    } else {
      res.status(400).json("ID provided is not available");
    }
  });

app.get("/reservations", (req, res) => {
    res.json(reservations);
  });
  
  app.get("/reservations/:id", (req, res) => {
    const reservation = reservations.find(
      (p) => parseInt(p.id) === parseInt(req.params.id)
    );
    if (reservation) {
      res.status(200).json(reservation);
    } else {
      res.status(400).json("ID provided is not available");
    }
  });
  

app.get("/", (req, res) => {
    res.send(
      '<div><button><a href="/parks">Parks</a></button></div><div><button><a href="/visitors">Visitors</a></button></div><div><button><a href="/reservations">Reservations</a></button></div>'
    );
  });

app.listen(1111, () => {
    console.log("Server is running at http://localhost:1111");
  });
