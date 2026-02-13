import express from "express";
import cors from "cors";
import { connection, dbCollectionName } from "./dbconfig.js";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import cookieparser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
const app = express();

const allowedOrigins = process.env.CLIENT_URL.split(","); // split comma separated

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // curl, Postman, mobile apps
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieparser());

app.post("/signup", async (req, resp) => {
  const userData = req.body;

  if (userData.email && userData.password) {
    const db = await connection();
    const collection = await db.collection("users");
    const result = await collection.insertOne(userData);
    if (result) {
      jwt.sign(
        userData,
        process.env.JWT_SECRET,
        { expiresIn: "5d" },
        (error, token) => {
          resp.send({
            message: "data send ",
            success: true,
            token,
          });
        },
      );
    } else {
      resp.send({
        message: "data failed to send",
        success: false,
      });
    }
  }
});

app.post("/login", async (req, resp) => {
  const userData = req.body;
  if (userData.email && userData.password) {
    const db = await connection();
    const collection = await db.collection("users");
    const result = await collection.findOne({
      email: userData.email,
      password: userData.password,
    });
    if (result) {
      jwt.sign(
        userData,
        process.env.JWT_SECRET,
        { expiresIn: "5d" },
        (error, token) => {
          resp.send({
            success: true,
            msg: "login done",
            token,
          });
        },
      );
    } else {
      resp.send({
        success: false,
        msg: "User not found",
      });
    }
  } else {
    resp.send({
      success: false,
      msg: "login not done",
    });
  }
});

app.post("/add-task", verifyJWTToken, async (req, resp) => {
  const db = await connection();
  const collection = await db.collection(dbCollectionName);
  const result = await collection.insertOne(req.body);

  if (result) {
    resp.send({
      Message: "new task added",
      success: true,
      result,
    });
  } else {
    resp.send({
      Message: "failed to add task",
      success: false,
    });
  }
});

app.get("/tasks", verifyJWTToken, async (req, resp) => {
  const db = await connection();
  const collection = await db.collection(dbCollectionName);
  const result = await collection.find().toArray();

  if (result) {
    resp.send({
      message: "task list fethced",
      success: true,
      result,
    });
  } else {
    resp.send({
      message: "err try after sometime",
      success: false,
    });
  }
});

app.delete("/delete/:id", verifyJWTToken, async (req, resp) => {
  const db = await connection();
  const id = req.params.id;
  const collection = await db.collection(dbCollectionName);
  const result = await collection.deleteOne({ _id: new ObjectId(id) });

  if (result) {
    resp.send({
      message: "data deleted",
      success: true,
      result,
    });
  } else {
    resp.send({
      message: "try after some time ",
      success: false,
    });
  }
});

app.get("/task/:id", verifyJWTToken, async (req, resp) => {
  const db = await connection();
  const id = req.params.id;
  const collection = await db.collection(dbCollectionName);
  const result = await collection.findOne({ _id: new ObjectId(id) });
  if (result) {
    resp.send({
      message: "data fetched successfully",
      success: true,
      result,
    });
  } else {
    resp.send({
      message: "try after some time ",
      success: false,
    });
  }
});

app.put("/update-task", verifyJWTToken, async (req, resp) => {
  const db = await connection();
  const collection = await db.collection(dbCollectionName);
  const { _id, ...fields } = req.body;
  const update = { $set: fields };
  const result = await collection.updateOne({ _id: new ObjectId(_id) }, update);
  if (result) {
    resp.send({
      message: "data updated successfully",
      success: true,
      result,
    });
  } else {
    resp.send({
      message: "try after some time ",
      success: false,
    });
  }
});

app.delete("/delete-multiple", verifyJWTToken, async (req, resp) => {
  const db = await connection();
  const ids = req.body;
  const deleteTaskIds = ids.map((item) => new ObjectId(item));
  const collection = await db.collection(dbCollectionName);
  const result = await collection.deleteMany({ _id: { $in: deleteTaskIds } });
  if (result) {
    resp.send({
      message: "data deleted",
      success: true,
      result,
    });
  } else {
    resp.send({
      message: "try after some time ",
      success: false,
    });
  }
});

function verifyJWTToken(req, resp, next) {
  //  console.log("verifyJWTToken ", req.cookies['token']);
  const token = req.cookies["token"];
  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return resp.send({
        msg: "invalid token",
        success: false,
      });
    }
    next();
  });
}
app.listen(process.env.PORT || 3200);
