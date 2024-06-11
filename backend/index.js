const express = require('express');
const fs = require('fs');
const cors = require('cors'); // Import the cors package

const app = express();
const port = 9000;

// Enable CORS for all origins
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Route to get all questions
app.get('/questions', (req, res) => {
  fs.readFile('questions.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading questions file');
      return;
    }
    const questions = JSON.parse(data);
    questions.questions.pop()
    res.json(questions);
  });
});

// Route to get a specific question by id
app.get('/questions/:id', (req, res) => {
  const id = parseInt(req.params.id);
  fs.readFile('questions.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading questions file');
      return;
    }
    const questions = JSON.parse(data);
    const question = questions.find(q => q.id === id);
    if (!question) {
      res.status(404).send('Question not found');
      return;
    }
    res.json(question);
  });
});

app.get('/',(req,res)=>{
  res.send("cnfjcvfemi")
})
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
