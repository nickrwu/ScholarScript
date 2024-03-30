const express = require('express');
const { uploadEssayHandler, deleteEssayHandler, combineEssays, getEssaysHandler } = require('./essay');
const { deleteApplicationHandler, finishApplicationHandler, startApplicationHandler } = require('./applications');
const { getAllScholarshipsHandler, getScholarshipDetailsHandler } = require('./scholarships');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());

app.post('/uploadEssay', uploadEssayHandler);
app.post('/deleteEssay', deleteEssayHandler);
app.post('/combineEssays', combineEssays);
app.post('/getEssays', getEssaysHandler);
app.post('/startApplication', startApplicationHandler);
app.post('/deleteApplication', deleteApplicationHandler); 
app.post('/finishApplication', finishApplicationHandler);
app.post('/getAllScholarships', getAllScholarshipsHandler);
app.post('/getScholarshipDetails', getScholarshipDetailsHandler);

app.get('/', (req, res) => {
    res.send("Hello World!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});