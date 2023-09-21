import mongoose from "mongoose";

export function connectMongoDb() {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDb Connected Successfully"))
    .catch((err) => console.log(`ERROR in db.js : ${err}`));
}
