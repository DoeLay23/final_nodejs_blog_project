require('dotenv').config();

const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DBNAME}`);
const fileupload = require('express-fileupload');
const path = require('path');
const ownerRouter = require('./route/owner');
const userRouter = require('./route/user');
const blogRouter = require('./route/blog');

app.use(express.json());
app.use(fileupload());
app.use('/images',express.static(path.join(__dirname,'images'))); 

app.use('/user',userRouter);
app.use('/owner',ownerRouter);
app.use('/blog',blogRouter);

//owner migration
// const {owner} = require('./migrate/owner');
// owner();
app.listen (process.env.PORT,()=> console.log(`Server is running at ${process.env.PORT}`));