const user = require('../models/Users');
const course = require('../models/Courses');
const jwt = require('jsonwebtoken');
let bcrypt = require('bcrypt');
const Secret_Key = 'secret_key_utags';
const saltRounds = 10; //for production mode set 12 saltRounds

const userController = {};



// /GET all users

userController.getUsers = async (req, res) =>{

   const users =  await user.find();
   res.json(users);

}
// /GET only one user
userController.getUser = async (req , res) =>{
    // verifyToken(req, res);
    const getUs = await user.findById(req.params.id);
    res.json(getUs);
}

userController.profile = async (req, res) =>{
    verifyToken(req, res);
    // res.send(req.userId)
    res.json({UserId: req.userId})
}
// /POST new user
userController.createUser = async (req, res) => {
    // create hash password
    let pass = req.body.password;
    const hash = bcrypt.hashSync(pass, saltRounds);
    // end hash password

    const OneUser = {
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hash,
        matricula: req.body.matricula,
        rol: req.body.rol
    }
    const newUser = new user(OneUser)
    await newUser.save();

    //Create access token
    const accessToken = jwt.sign({_id: newUser._id}, Secret_Key);
    // Function with email settings
    // emailSettings();
    res.json({
        status: "User saved",
        token: accessToken
    });

}


//POST USER NEW (login system)
userController.login = async (req, res) =>{
    console.log(req.body);
    console.log(req.headers.authorization);
    
    const userData = {
        matricula: req.body.numMatricula,
        password: req.body.strPassword
    }

     await user.findOne({matricula: userData.matricula}, (err, user)=>{
         console.log('este es el usuario: '+user);


        if (err) return res.status(400)
        if (!user) {
          res.json({
                status: 'User not found'
            })
        }else{
            const resultPassword = bcrypt.compareSync(userData.password, user.password);
            if (resultPassword) {
                const accessToken = jwt.sign({resp: user}, Secret_Key)
                res.json({
                    status: 'OK User was found',
                    UserMatricula: user.matricula,
                    UserLastname: user.lastname,
                    UserRole: user.rol,
                    token: accessToken
                })
            }else{
                res.json({
                    status: 'Incorrect password'
                })
            }
        }

    });

}
// /PUT update user
userController.editUser = async (req, res) =>{
    const {id} = req.params;
    let pass = req.body.password;
    const hash = bcrypt.hashSync(pass, saltRounds);
    const oneUser = {
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hash,
        matricula: req.body.matricula,
        rol: req.body.rol
    };
    await user.findByIdAndUpdate(id, {$set: oneUser}, {new:true} );
    res.json({
        status: "User Updated"
    })
}

userController.editImage = async (req, res) =>{

  const {id} = req.params;
  const {img} = req.params;
  let pass = req.body.password;
  const hash = bcrypt.hashSync(pass, saltRounds);
  const oneUser = {
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hash,
      matricula: req.body.matricula,
      rol: req.body.rol,
      image:img
  };



    await user.findByIdAndUpdate(id, {$set: oneUser}, {new:true} );
    res.json({
        status: "User Updated With Image"
    })


}
userController.registercourse = async (req, res) =>{

  let id = req.params.id;
  let array = req.params.array;
  await user.update({_id: id},{$set:{Cursos: array}}, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            resp
        });
        for (var i = 0; i < array.length-1; i++) {
             course.update({_id:array[i]},{$set:{estatus:false}});
        }
    });

}

// DELETE user
userController.deleteUser = async (req, res) =>{
    await user.findByIdAndRemove(req.params.id);
    res.json({
        status: "User Deleted"
    })
}


function verifyToken  (req, res , next){

    if(!req.headers.authorization){
        return res.status(401).send('Authorization: falied')
    }
    const token = req.headers.authorization.split(' ')[1]
    if (token === 'null'){
        return res.status(401).send('Authorization: falied')
    }
    const payload = jwt.verify(token, Secret_Key)
    console.log(req.headers.authorization);
    console.log(payload);
    req.userId = payload._id;

    console.log(req.userId);

}




module.exports = userController;
