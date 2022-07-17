const mongoose = require("mongoose");
const MONGO_URI =
  "mongodb+srv://debkanta:7001774989ab%40@goalsetter.p9jk4.mongodb.net/goalsetter?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);

    console.log(
      `Database connecttion successful: ${conn.connection.host}`.bgCyan
    );
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

module.exports = connectDB;
