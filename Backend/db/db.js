const mongoose = require("mongoose");

function connectToDb() {
    if (!process.env.DB_CONNECT) {
        console.error("❌ Error: DB_CONNECT environment variable is not set.");
        return;
    }

    mongoose.connect(process.env.DB_CONNECT, {
        serverSelectionTimeoutMS: 5000, // Stop trying after 5 seconds if no response
    })
    .then(() => console.log("✅ Connection to Database is Successful"))
    .catch((err) => console.error("❌ Connection to Database Failed:", err));
}

// Export function for external usage
module.exports = connectToDb;
