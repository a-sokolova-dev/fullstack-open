const express = require('express');
const app = express();

app.use(express.json());

let persons = [
    { id: "1", name: "Arto Hellas", number: "040-123456" },
    { id: "2", name: "Ada Lovelace", number: "39-44-5323523" },
    { id: "3", name: "Dan Abramov", number: "12-43-234345" },
    { id: "4", name: "Mary Poppendieck", number: "39-23-6423122" }
];

const generateId = () => {
    return String(Math.floor(Math.random() * 1000000));
};

app.get('/api/persons', (req, res) => {
    res.json(persons);
});

app.get('/info', (req, res) => {
    const currentTime = new Date();
    const responseText = `
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${currentTime}</p>
    `;
    res.send(responseText);
});

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const person = persons.find(p => p.id === id);
    if (person) {
        res.json(person);
    } else {
        res.status(404).json({ error: "Person not found" });
    }
});

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    persons = persons.filter(p => p.id !== id);
    res.status(204).end();
});

app.post('/api/persons', (req, res) => {
    const body = req.body;
    
    if (!body.name || !body.number) {
        return res.status(400).json({ error: 'Name or number is missing. Please provide both.' });
    }

    if (persons.find(p => p.name === body.name)) {
        return res.status(400).json({ error: `The name '${body.name}' already exists in the phonebook.` });
    }
    
    const newPerson = {
        id: generateId(),
        name: body.name,
        number: body.number
    };
    
    persons = persons.concat(newPerson);
    res.json(newPerson);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});