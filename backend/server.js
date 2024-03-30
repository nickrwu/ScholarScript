const express = require('express');
const { uploadEssayHandler } = require('./essay');
const app = express();
app.use(express.json());

app.post('/uploadEssay', uploadEssayHandler);

app.get('/', (req, res) => {
    res.send("Hello World!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
