const express = require('express');

const userRouter = require('./routes/users.js')
const reviewRouter = require('./routes/review.js')
const paymentRouter = require('./routes/payment.js')
const invoiceRouter = require('./routes/invoice.js')
const bagRouter = require('./routes/bag.js')
const dropRouter = require('./routes/droppoint.js')

var app = express();
const bodyparser = require("body-parser");

app.use(bodyparser.json());

app.use(
    express.urlencoded({
        extended: false
    })
);

app.use(express.static('../bagdrop-frontend'));




app.listen(3000, () => {
    console.log("Express server is running at port no : 3000")
})

app.use("/users", userRouter);
app.use("/reviews", reviewRouter);
app.use("/payments", paymentRouter);
app.use("/invoices", invoiceRouter);
app.use("/bags", bagRouter);
app.use("/drops", dropRouter);