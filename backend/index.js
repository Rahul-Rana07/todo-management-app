import express from "express";
import jwt from "jsonwebtoken"
import {userModel , todoModel ,collectionModel} from "./db.js"
import mongoose from "mongoose";
import bcrypt from "bcrypt"
import z from "zod"
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_URL)
const app = express(); 
app.use(express.json());
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://your-app.vercel.app",
    ],
    credentials: true,
  }));
const JWT_SECRET = process.env.JWT_SECRET


 const todoSchema = z.object({
    title: z
        .string()
        .min(1, "Title is required")
        .max(100, "Title cannot exceed 100 characters"),

    done: z.boolean().optional().default(false),
    collectionId: z.string()
    });

const collectionSchema = z.object({
    name: z.string().min(1).max(50),

    icon: z.string().optional()
});


app.get('/' ,(req , res) => {
    res.send("<h1> TODO APP WITH DATABASE </h1>")
})

// auth middleware

function auth (req , res , next) {
const authHeader = req.headers.authorization;

if (!authHeader) {
  return res.status(403).json({
    message: "Unauthorized",
  });
}

const token = authHeader.split(" ")[1];
    try {
        const decodedData = jwt.verify(token , JWT_SECRET);
         req.userId = decodedData.id;
         next();
        
    } catch (error) {
        return res.status(403).json({
            success: false,
            message: "Invalid or Expired Token"
        });
    }
}

// signup route

app.post('/signup' ,async (req , res)=>{

    const requiredBody = z.object({
        email : z.string().email().min(3).max(100),
        password : z.string().min(3).max(100) . regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
        name : z.string().min(3).max(30).regex(/[A-Z]/, "Name must start with a capital letter")
    })

    const parseDatawithSuccess = requiredBody.safeParse(req.body);

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    if(!parseDatawithSuccess.success){
        return res.status(400).json({
            message : "Invalid request body",
            errors : parseDatawithSuccess.error.errors
        })
    } 

    try{

        // if (!email || !password || !name) {
        //     return res.status(400).json({
        //         message: "All fields are required"
        //     });
        // }

        const hashPassword = await bcrypt.hash(password , 10);
        console.log(hashPassword);
    

        await userModel.create({
            email,
            password : hashPassword,
            name
        })

        return res.json({
            "message" : " Sign up successfully "
        })

    }
    catch(err){
        console.error("Signup Error:", err);

        return res.status(500).json({
            message: "Something went wrong while signing up"
        });
    }

})

// signin route
app.post('/signin' ,async (req , res)=>{

    const email = req.body.email;
    const password = req.body.password;

     const user = await userModel.findOne({
        email : email
    })

    if(!user){
        res.status(403).send({
            message : "user doest not exist in db"
        })
        return;
    }

    const passwordMatch = await bcrypt.compare(password , user.password)

    if(passwordMatch){
        const token = jwt.sign({
            id : user._id.toString()
        }, JWT_SECRET ,{expiresIn: "1d"})

        res.json({
            token : token
        })
    }
    else{
        res.status(403).send({
            message : "incorrect username and password"
        })
    }
})

app.get("/me", auth, async (req, res) => {
  try {
    const user = await userModel
      .findById(req.userId)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// craete a collection

app.post("/collection", auth, async (req, res) => {

    const parsedData = collectionSchema.safeParse(req.body);

    if (!parsedData.success) {
        return res.status(400).json({
            message: "Invalid data"
        });
    }

    const collection = await collectionModel.create({

        userId: req.userId,

        name: parsedData.data.name,

        icon: parsedData.data.icon
    });

    res.json({
        message: "Collection created",
        collection
    });

});

// get all collection

app.get("/collections", auth, async (req, res) => {

    const collections = await collectionModel.find({
        userId: req.userId
    });

    res.json(collections);

});

//get todo collection by id like work / fittness / personal

app.get("/collection/:id/todos", auth, async (req, res) => {

    const todos = await todoModel.find({

        userId: req.userId,

        collectionId: req.params.id

    });

    res.json(todos);

});

// delete collection 

app.delete("/collection/:id", auth, async (req, res) => {

    await collectionModel.findOneAndDelete({

        _id: req.params.id,

        userId: req.userId

    });

    await todoModel.deleteMany({

        collectionId: req.params.id,

        userId: req.userId

    });

    res.json({

        message: "Collection deleted"

    });

});

// create todo route
app.post('/todo' , auth ,async (req , res)=>{
    try {
    const userId = req. userId;
    const title = req.body.title;
    const done = req.body.done;
    const collectionId = req.body.collectionId;

    const parsedData = todoSchema.safeParse(req.body);
    if (!parsedData.success) {
            return res.status(400).json({
            message: "Invalid data",
            errors: parsedData.error.issues
        });
    }

    await todoModel.create({
        userId,
        collectionId,
        title,
        done
    })

    res.json({
        "message" : "Todo created"
    })
    } catch (err) {
        console.log(err);
        res.json({
            "message" : "internal server error"
        })
    }
    
})

// get all todos route
app.get('/todos', auth ,async (req , res)=>{

    try {
        const userId = req.userId
        const todos = await todoModel.find({
        userId
    })
    
    res.json({
        todos,
        count: todos.length
    })
        
    } catch (err) {
        console.log(err);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }

})

// update the todo 

app.put('/todo/:id' ,auth ,async (req, res)=>{

    try{
        const id = req.params .id;
         const parsedData = todoSchema.safeParse(req.body);

        if (!parsedData.success) {
            return res.status(400).json({
            message: "Invalid data",
            errors: parsedData.error.issues
        });
        }

        const updateTodo =await todoModel.findOneAndUpdate({
            _id: id,
            userId: req.userId
        },
        parsedData.data,
        {
            new : true
        })

        if(!updateTodo){
            return res.status(404).json({
                success: false,
                message: "Todo not found"
            });
        }

        res.json({
            "message" : "Todo updated successfully",
            todo : updateTodo,
        })

    }
    catch(err){
        console.log(err);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
})

//mark as. completed 
app.patch('/todo/:id/complete' , auth , async(req , res)=> {

    try{
        const id = req.params.id;

        const todo =await todoModel.findOneAndUpdate({
            _id: id,
            userId: req.userId
        },
        {
            done : true
        }, 
        {
            new : true
        })

        if(!todo){
            return res.status(404).json({
                success: false,
                message: "Todo not found"
            });
        }

        return res.json({
            "message" : "todo marked as completed",
            todo : todo
        })
    }
    catch(err){
        console.log(err);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
    
})

//delete todo 

app.delete('/todo/:id' , auth , async(req ,res)=>{

    try{

        const id = req.params.id;

        const deleteTodo = await todoModel.findOneAndDelete({
            _id: id,
            userId: req.userId
        })

        if(!deleteTodo){
            return res.status(404).json({
                success: false,
                message: "Todo not found"
            });
        }

        return res.json({
            "message" : "todo deleted successfully",
            todo : deleteTodo
        })
    

    }catch(err){
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
})

// get completed todos
app.get("/todos/completed", auth, async (req, res) => {

    try {

        const todos = await todoModel.find({
            userId: req.userId,
            done: true
        });

        res.json({
            success: true,
            count: todos.length,
            todos
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

});


// Get Pending Todos
app.get("/todos/pending", auth, async (req, res) => {

    try {

        const todos = await todoModel.find({
            userId: req.userId,
            done: false
        });

        return res.json({
            success: true,
            count: todos.length,
            todos
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

});

//delete completed todos
app.delete("/todos/completed", auth, async (req, res) => {

    try {

        const result = await todoModel.deleteMany({
            userId: req.userId,
            done: true
        });

        return res.json({
            success: true,
            message: `${result.deletedCount} completed todos deleted`
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});