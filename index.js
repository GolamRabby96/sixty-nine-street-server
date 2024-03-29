// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const port = 5000;
// const { MongoClient } = require("mongodb");
// require("dotenv").config();
// const fileUpload = require("express-fileupload");

// const uri = `mongodb+srv://${process.env.DbUser}:${process.env.DbPass}@cluster0.dibao.mongodb.net/${process.env.DbName}?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// });

// // update your .env
// // DbUser = TeamIt
// // DbPass = TeamItPass0102
// // DbName = SixtyNinethStreet

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.static("properties"));
// app.use(fileUpload());

// client.connect((err) => {
// 	const PropertyDB = client.db("local").collection("Property");
// 	const UserReviewsDB = client
// 		.db("local")
// 		.collection("UserReviews");
// 	const AgentDB = client
// 		.db("local")
// 		.collection("Agents");

// 	app.post("/addProperties", (req, res) => {
// 		let number = Math.random() * 10000000000;
// 		let floorNumber = Math.floor(number);

// 		const property_for = req.body.property_for;
// 		const property_type = req.body.property_type;
// 		const city = req.body.city;
// 		const property_name = req.body.property_name;
// 		const title = req.body.title;
// 		const property_description = req.body.property_description;
// 		const facing = req.body.facing;
// 		const property_size = req.body.property_size;
// 		const price = req.body.price;
// 		const price_is = req.body.price_is;
// 		const bedroom = req.body.bedroom;
// 		const garages = req.body.garages;
// 		const balconies = req.body.balconies;
// 		const bathroom = req.body.bathroom;
// 		const owner_name = req.body.owner_name;
// 		const owner_number = req.body.owner_number;
// 		const owner_gmail = req.body.owner_gmail;
// 		const image_one = req.files.image_one;
// 		const image_two = req.files.image_two;
// 		const image_three = req.files.image_three;


// 		const setName1  = image_one.name.replace(/\s/g, "");
// 		const setName2  = image_two.name.replace(/\s/g, "");
// 		const setName3  = image_three.name.replace(/\s/g, "");

// 		const key = `${property_for}_${floorNumber}`;
// 		const imgOne = setName1;
// 		const imgTwo = setName2;
// 		const imgThree = setName3;
// 		const create_date = new Date();

// 		image_one.mv(`${__dirname}/properties/${setName1}`);
// 		image_two.mv(`${__dirname}/properties/${setName2}`);
// 		image_three.mv(
// 			`${__dirname}/properties/${setName3}`
// 		);


// 		PropertyDB.insertOne({
// 			key,
// 			property_for,
// 			property_type,
// 			city,
// 			property_name,
// 			title,
// 			property_description,
// 			facing,
// 			property_size,
// 			price,
// 			price_is,
// 			bedroom,
// 			garages,
// 			balconies,
// 			bathroom,
// 			owner_name,
// 			owner_gmail,
// 			owner_number,
// 			imgOne,
// 			imgTwo,
// 			imgThree,
// 			create_date
// 		})
// 			.then((result) => {
// 				res.send(result.insertedCount > 0);
// 			})
// 			.then((err) => {
// 				console.log(err);
// 			});
// 	});

// 	app.get("/allProperty", (req, res) => {
// 		PropertyDB.find({}).toArray((err, documents) => {
// 			res.send(documents);
// 		});
// 	});

// 	app.post("/addUserReview", (req, res) => {
// 		const review = req.body;

// 		UserReviewsDB.insertOne(review)
// 			.then((result) => {
// 				res.send(result.insertedCount > 0);
// 			})
// 			.then((err) => {
// 				console.log(err);
// 			});
// 	});

// 	app.get("/getReviews", (req, res) => {
// 		UserReviewsDB.find({}).toArray((err, documents) => {
// 			res.send(documents);
// 		});
// 	});

// 	app.post("/addAgent", (req, res) => {
// 		let number = Math.random() * 10000000000;
// 		let floorNumber = Math.floor(number);

// 		const agent_name = req.body.agent_name;
// 		const agent_title = req.body.agent_title;
// 		const agent_number = req.body.agent_number;
// 		const agent_email = req.body.agent_email;
// 		const agent_facebook = req.body.agent_facebook;
// 		const agent_linkend = req.body.agent_linkend;
// 		const agent_twitter = req.body.agent_twitter;
// 		const agent_instagram = req.body.agent_instagram;
// 		const agent_skype = req.body.agent_skype;
// 		const agent_description = req.body.agent_description;
// 		const experience = req.body.experience;
// 		const fees = req.body.fees;

// 		const agent_image = req.files.agent_image;

// 		const setName  = agent_image.name.replace(/\s/g, "");

// 		const key = `${agent_number}_${floorNumber}`;
// 		const agent_img = setName;

// 		const create_date = new Date();

// 		agent_image.mv(`${__dirname}/properties/${setName}`);

// 		AgentDB.insertOne({
// 			key,
// 			agent_name,
// 			agent_title,
// 			agent_number,
// 			agent_email,
// 			agent_facebook,
// 			agent_linkend,
// 			agent_twitter,
// 			agent_instagram,
// 			agent_skype,
// 			agent_description,
// 			experience,
// 			fees,
// 			agent_img,
// 			create_date,
// 		})
// 		.then( result =>{
// 			res.send(result.insertedCount > 0);
// 		})
// 		.then((err)=>{
// 			console.log(err)
// 		})
// 	});

// 	app.get("/getAgent", (req, res) => {
// 		AgentDB.find({}).toArray((err, documents) => {
// 			res.send(documents);
// 		});
// 	});

// 	app.get('/search/:name',(req, res) => {
// 		const collect = req.params.name;
// 		const regex = new RegExp(collect,'i');
// 		PropertyDB.find( { name: regex } ).toArray((err, documents) => {
// 			res.send(documents);
// 		})
// 	})

// 	app.get('/findProperties/:id',(req, res) => {
// 		PropertyDB.find({key: req.params.id}).toArray((err, documents) => {
// 			res.send(documents);
// 		})
// 	})

// 	app.get('/findAgent/:id',(req, res) => {
// 		AgentDB.find({key: req.params.id}).toArray((err, documents) => {
// 			res.send(documents);
// 		})
// 	})

// 	console.log("Database Connected bro");
// });

// app.get("/", (req, res) => {
// 	res.send("hello 69");
// });

// app.listen(process.env.PORT || port);
