// BUILD YOUR SERVER HERE
const users = require("./users/model")
const express = require("express");


const server = express();

server.use(express.json());



// get all users
server.get('/api/users', (req, res)=>{
    users.find()
    .then(users =>{
        res.json(users)
    }).catch( err =>{
        console.log(err);
    })
});

// get single users
server.get('/api/users/:id', (req, res) => {
let {id} = req.params;


users.findById(id)

.then( user =>{
   
    if(user == null){
        res.status(404).json({ message: `user ${id} is not found`})
    } else {
        res.json(user)
    }
}).catch( () =>{
    res.status(5000).json({ message: "could not find the user"})
})

});

// add user

server.post('/api/users', (req, res) => {
    let body = req.body;
    if(!body.name || body.bio){
        res.status(5000).json({  message: "name and bio is required !"})
    } else{
        users.insert(body)
        .then( user => {
            res.status(200).json(user);
        }).catch( () =>{
           res.status(5000).json({ message: "can not create user !"})
        });
    }
})


// delete user

server.delete('/api/users/:id', (req, res) =>{
    let {id} = req.params;
users.remove(id)
.then( user => {
    res.status(200).json(user);
}).catch( () =>{
    console.log("could't delete the user")
})
});


// updating user

server.put('/api/users/:id', async (req, res) => {

    let {id} = req.params;
   try {
     
    
    let body = req.body;

    const newUSer = await users.update(id, body);

    if( newUSer === null){
        res.status(404).json({ message: " user is not found "})
        return
    } else{
        res.status(200).json(newUSer)
    }
   } catch (error) {
      res.status(500).json({ message: "cant updete user"})
   }

    
});



module.exports = server; // EXPORT YOUR SERVER instead of {}
