import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";

let server: Server;

const port = process.env.PORT || 5000;

require("dotenv").config();

// console.log(process.env.DB_PASS);

async function main() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cwzf5.mongodb.net/libraryManagementAPI?retryWrites=true&w=majority&appName=Cluster0`
    );
    server = app.listen(port, () => {
      console.log(`Server is running on ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
