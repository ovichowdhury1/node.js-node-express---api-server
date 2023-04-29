const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;


app.get('/',(req,res) => {
    res.send('simple Node Server Running');
});

app.use(cors());
app.use(express.json());

const users = [
   {id: 1, name: 'ovi', email:'ovichowdhury13191@gmail.com'},
   {id: 2, name: 'karim1', email:'ovichowdhury13191@gmail.com'},
   {id: 3, name: 'ovi2', email:'ovichowdhury13191@gmail.com'},
];



// username : dbUser1
// pass: iVsA946v2BfZ2n9r





const uri = "mongodb+srv://dbUser1:iVsA946v2BfZ2n9r@cluster0.wnsnzvm.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run(){
  try{
    const userCollection = client.db('simpleNode').collection('users');
    const user = {name:'ahiyna Mahi', email:'ahiyna13@gmail.com'}
    // const result = await userCollection.insertOne(user);
    // console.log(result);
            app.get('/users', async(req,res)=>{
                 const cursor = userCollection.find({});
                 const  users = await cursor.toArray();
                 res.send(users);
            });
            app.post('/users',async (req,res)=>{
              const user = req.body;
              const result = await userCollection.insertOne(user);
              console.log(result);
              user._id = result.insertedId;
              res.send(user);

            });
  }
  finally{

  } 
}
run().catch(err => console.log(err))















// app.get('/users',(req,res) =>{
//     if(req.query.name){
//       const search = req.query.name;
//       const filtered = users.filter(usr => usr.name.toLowerCase().indexOf(search) >=0);
//       res.send(filtered);
//     }
//     else
//     {
//         res.send(users)
//     }
    
   
// });


app.listen(port, () =>{
    console.log(`Simple not server running on port ${port}`)
})