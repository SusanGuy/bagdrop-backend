const express = require("express");
const userRouter = require("./routes/users.js");
const reviewRouter = require("./routes/review.js");
const paymentRouter = require("./routes/payment.js");
const invoiceRouter = require("./routes/invoice.js");
const bagRouter = require("./routes/bag.js");
const dropRouter = require("./routes/droppoint.js");
const passport = require("./passport/index");
const cookieSession = require("cookie-session");
const keys = require("./config/keys");

var app = express();
const bodyparser = require("body-parser");

app.use(bodyparser.json());

app.use(
  express.urlencoded({
    extended: false
  })
);

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

let port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Express server is running at port no :" + port);
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/users", userRouter);
app.use("/reviews", reviewRouter);
app.use("/payments", paymentRouter);
app.use("/invoices", invoiceRouter);
app.use("/bags", bagRouter);
app.use("/drops", dropRouter);
