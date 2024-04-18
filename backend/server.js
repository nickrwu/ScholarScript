import express from 'express';
import mongoose from "mongoose";
import cors from "cors";
import scholarships from "./routes/scholarship.js";
import essays from "./routes/essay.mjs";
import Scholarship from './models/scholarshipSchema.mjs';
// import { getUser, createUser, deleteUser, updateUser } from './user';
// import { uploadEssayHandler, deleteEssayHandler, combineEssays, getEssaysHandler } from './essayController.mjs';
// import { deleteApplicationHandler, finishApplicationHandler, startApplicationHandler } from './applications';
// import { getAllScholarshipsHandler, getScholarshipDetailsHandler } from './scholarships';


const app = express();

app.use(express.json());
app.use(cors());

const uri = "mongodb+srv://pz2036:dVr6BowLoJLAffEQ@hackprinceton.fcnjegw.mongodb.net/hackprinceton?retryWrites=true&w=majority&appName=hackprinceton";
mongoose.set("strictQuery", false);

main()
    .catch((err) => console.error(err));
    async function main() {
        await mongoose.connect(uri);
    }

// Session Configuration using MongoStore to store sessions in MongoDB
const db = mongoose.connection;

db.once("open", () => {
    app.use("/scholarships", scholarships);
    app.use("/e/", essays);
});

db.on("error", (err) => {
    console.error(err);
});

// app.get('/getAllScholarships/:userId', getAllScholarshipsHandler);
// app.get('/getScholarshipDetails', getScholarshipDetailsHandler);

// app.get('/getUser', getUser);
// app.post('/createUser', createUser);
// app.post('/deleteUser', deleteUser);
// app.post('/updateUser', updateUser);

app.get('/', (req, res) => {
        res.send("Hello World!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
});
