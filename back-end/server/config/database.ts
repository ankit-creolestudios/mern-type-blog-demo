import mongoose from "mongoose";
const URI = process.env.MONGODBURL;
mongoose.connect(
  `${URI}`,
  //   {
  //     // useCreateIndex: true,
  //     useFindAndModify: false,
  //   },
  (err) => {
    if (err) throw err;
    console.log("database connect");
  }
);
