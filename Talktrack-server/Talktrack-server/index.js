const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const User = require('./models/User');
const Post = require('./models/Post');
const Visitor =require('./models/Visitor');
const bcrypt = require('bcryptjs');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');
const { log } = require('console');


const salt = bcrypt.genSaltSync(10);
const secret = 'asdfe45we45w345wegw345werjktjwertkj';
mongoose.set('strictQuery', false);
//http://localhost:3000
// app.use(cors({credentials:true,origin:'https://talktrack.onrender.com'}));
app.use(cors({credentials:true,origin:true}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
console.log("Server started !")
//jmVysfqprY5XZZ0m
mongoose.connect('mongodb+srv://intrexp:jmVysfqprY5XZZ0m@cluster0.xghge9i.mongodb.net/?retryWrites=true&w=majority');
// mongodb+srv://sanketmakhsrm:<password>@cluster0.ksnmpyc.mongodb.net/?retryWrites=true&w=majority
console.log("Database connected!")
app.post('/register', async (req,res) => {
  const {username,password,batch} = req.body;
  
  try{
    const Doc = await User.findOne({username});
    
    if (Doc!==null){
      console.log("kkkk");
      res.status(401).json('Username Already Present!');
    
    }
    else{
      const userDoc = await User.create({
        username,
        password:bcrypt.hashSync(password,salt),
        batch,

      });
      res.status(200).json(userDoc);
    }
    
  } catch(e) {
    console.log(e);
    res.status(400).json(e);
  }
});
app.get('/visitor',async(req,res)=>{
  const visitor1 = await Visitor.find({});
  var k=(parseInt(visitor1[0].count)+1).toString();
  await Visitor.updateOne({},{$set:{count:k}});
  const visitor2 = await Visitor.find({});
  res.json(visitor2[0].count);
});



app.post('/login', async (req,res) => {
  const {username,password} = req.body;
  const userDoc = await User.findOne({username});
  if (userDoc===null){
    res.status(400).json('Username Not Found!');
    return ;
  }

  
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    // logged in
    jwt.sign({username,id:userDoc._id}, secret, {}, (err,token) => {
      console.log("server");
      if (err) throw err;
      console.log(token);
      res
      // .cookie('token', token)
      .json({
        id:userDoc._id,
        token,
        username,
      });
    });
  } 
  else {
    res.status(400).json('wrong Password!');
  }
});

//this api find the post for each user when admin access it
app.get('/profile/:id',async(req,res)=>{
  const {id}=req.params;
  const userdoc =await User.findById(id);
  const postDoc = await Post.find({author:id});
  console.log(userdoc);
  console.log(postDoc);
  res.json(postDoc)
})

app.get('/profile', (req,res) => {
  const {token} = req.cookies;
  console.log(token);
  jwt.verify(token, secret, {}, (err,info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post('/logout', (req,res) => {
  res.cookie('token', '').json('ok');
});

app.get('/admin',async(req,res)=>{

  res.json(
    await User.find({})
  )

})

app.get('/admin/post',async(req,res)=>{

  res.json(
    await Post.find({})
  )

})
app.post('/post', uploadMiddleware.single('file'), async (req,res) => {
  // console.log("oen");
  // const {originalname,path} = req.file;
  // const parts = originalname.split('.');
  // const ext = parts[parts.length - 1];
  // const newPath = path+'.'+ext;
  // fs.renameSync(path, newPath);

  console.log(req.body)
  console.log(req.body.cookie);
  // const {token} = req.cookies.token1;
  jwt.verify(req.body.cookie, secret, {}, async (err,info) => {
    if (err) throw err;
    const {title,summary,content} = req.body;
    console.log(title);
    const postDoc = await Post.create({
      title,
      summary,
      content,
      // cover:newPath,
      author:info.id,
    });
    res.json(postDoc).status(200);
  });

});

// app.post('/post', uploadMiddleware.single('file'), async (req,res) => {
//   console.log("oen");
//   const {originalname,path} = req.file;
//   const parts = originalname.split('.');
//   const ext = parts[parts.length - 1];
//   const newPath = path+'.'+ext;
//   fs.renameSync(path, newPath);

//   const {token} = req.cookies;
//   jwt.verify(token, secret, {}, async (err,info) => {
//     if (err) throw err;
//     const {title,summary,content} = req.body;
//     const postDoc = await Post.create({
//       title,
//       summary,
//       content,
//       cover:newPath,
//       author:info.id,
//     });
//     res.json(postDoc).status(200);
//   });

// });

app.put('/post',uploadMiddleware.single('file'), async (req,res) => {
  // let newPath = null;
  // if (req.file) {
  //   const {originalname,path} = req.file;
  //   const parts = originalname.split('.');
  //   const ext = parts[parts.length - 1];
  //   newPath = path+'.'+ext;
  //   fs.renameSync(path, newPath);
  // }

  // const {token} = req.cookies;
 
  jwt.verify(req.body.cookie, secret, {}, async (err,info) => {
    if (err) throw err;
    const {id,title,summary,content} = req.body;
  
    const postDoc = await Post.findById(id);
    console.log(postDoc);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json('you are not the author');
    }
    // await postDoc.update({
    //   title,
    //   summary,
    //   content,
    //   cover: newPath ? newPath : postDoc.cover,
    // });
    await Post.updateOne({ _id: postDoc._id }, {
      title,
      summary,
      content,
    });

    res.json(postDoc);
  });

});


// app.put('/post',uploadMiddleware.single('file'), async (req,res) => {
//   let newPath = null;
//   if (req.file) {
//     const {originalname,path} = req.file;
//     const parts = originalname.split('.');
//     const ext = parts[parts.length - 1];
//     newPath = path+'.'+ext;
//     fs.renameSync(path, newPath);
//   }

//   const {token} = req.cookies;
//   jwt.verify(token, secret, {}, async (err,info) => {
//     if (err) throw err;
//     const {id,title,summary,content} = req.body;
//     const postDoc = await Post.findById(id);
//     const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
//     if (!isAuthor) {
//       return res.status(400).json('you are not the author');
//     }
//     await postDoc.update({
//       title,
//       summary,
//       content,
//       cover: newPath ? newPath : postDoc.cover,
//     });

//     res.json(postDoc);
//   });

// });
app.get('/post/:id', async (req, res) => {
  const {id} = req.params;
  const postDoc = await Post.findById(id).populate('author', ['username']);
  console.log(postDoc);
  res.json(postDoc);
})
app.get('/post', async (req,res) => {
  console.log("Post Found");
  res.json(
    await Post.find()
      .populate('author', ['username'])
      .sort({createdAt: -1})
      .limit(20)
  );
});





app.listen(4000);
