const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONOGODB_URL, {
    dbName: process.env.DATABASE,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err.message));

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to database");
});

mongoose.connection.on("error", (err) => {
  console.log(err.message);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose connection is disconnected");
});

//whenever we close the server either by cltr+c
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});
