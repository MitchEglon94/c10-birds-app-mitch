import mongoose from "mongoose";
// const logger = require("./logger");

// TODO! change localDBName name to match your local db!!
const localDBName = "birds";
const { MONGODB_URI = `mongodb://127.0.0.1/${localDBName}` } = process.env;
console.log(MONGODB_URI);

// logger.info(`MONGODB_URI ${MONGODB_URI}`);

const promise = mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true, // Googled
  })
  .then(function (db) {
    console.log(`Database Connected: ${MONGODB_URI}`);
  })
  .catch(function (err) {
    console.log(`CONNECTION ERROR ${err}`);
  });
