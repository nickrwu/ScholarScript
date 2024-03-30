const express = require('express');
const { uploadEssayHandler, combineEssays } = require('./essay');
const app = express();
app.use(express.json());

app.post('/uploadEssay', uploadEssayHandler);
app.post('/combineEssay', combineEssays);
app.post('/deleteApplication', deleteApplicationHandler); 
app.post('/finishApplication', finishApplicationHandler);

app.get('/', (req, res) => {
    res.send("Hello World!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
