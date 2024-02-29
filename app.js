const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const ObjectId = require("mongodb").ObjectId;
const morgan = require("morgan");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());

//passport initialize
// const uri = "mongodb://0.0.0.0:27017/local";
// Database connection mongodb://localhost:27017/69street
mongoose.set('strictQuery', false);
mongoose.connect("mongodb://0.0.0.0:27017/local",{
			useNewUrlParser: true,
			useUnifiedTopology: false
		}
	)
	.then(() => console.log("Database connection established"))
	.catch((err) => console.log(err));

// import routes

const propertiesRouter = require("./routers/propertiesRouter");
const agentRouter = require("./routers/agentRouter");
const reviewRouter = require("./routers/userReviewRouter");
const userAuthRouter = require("./routers/userAuthRouter");
const homeLoanRouter = require("./routers/homeLoanRouter");
const requirementRouter = require("./routers/requirementRouter");
const hireAgentRouter = require("./routers/hireAgentRouter");
const { MongoClient } = require("mongodb");

//app middleware

//middleware
app.use("/api", propertiesRouter);
app.use("/api", agentRouter);
app.use("/api", reviewRouter);
app.use("/api", userAuthRouter);
app.use("/api", homeLoanRouter);
app.use("/api", requirementRouter);
app.use("/api", hireAgentRouter);

//testing heroku deployment

app.get("/", (req, res) => {
	res.send("System working properly");
});

//default error handler

const errorHandler = (err, req, res, next) => {
	if (res.headersSent) {
		return next(err);
	}
	res.status(500).json({ error: err });
};

app.use(errorHandler);

const port = 5000;
app.listen(process.env.PORT || port);
