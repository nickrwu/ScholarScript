const express = require('express');
const { uploadEssayHandler, deleteEssayHandler, combineEssays } = require('./essay');
const { deleteApplicationHandler, finishApplicationHandler, startApplicationHandler } = require('./applications');
const app = express();
app.use(express.json());

app.post('/uploadEssay', uploadEssayHandler);
app.post('/deleteEssay', deleteEssayHandler);
app.post('/combineEssays', combineEssays);
app.post('/startApplication', startApplicationHandler);
app.post('/deleteApplication', deleteApplicationHandler); 
app.post('/finishApplication', finishApplicationHandler);

app.get('/', (req, res) => {
    res.send("Hello World!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
