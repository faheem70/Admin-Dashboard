const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/dashboard', {

})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

const DataSchema = new mongoose.Schema({
    end_year: Number,
    intensity: Number,
    sector: String,
    topic: String,
    insight: String,
    url: String,
    region: String,
    start_year: String,
    impact: String,
    added: String,
    published: String,
    country: String,
    relevance: Number,
    pestle: String,
    source: String,
    title: String,
    likelihood: Number
});

const DataModel = mongoose.model('Data', DataSchema);

const seedDatabase = async () => {
    try {
        const rawData = fs.readFileSync('jsondata.json');
        const jsonData = JSON.parse(rawData);

        /// console.log('Raw data:', jsonData);

        for (const dataItem of jsonData) {
            const insertedData = await DataModel.create(dataItem);
            // console.log('Inserted data:', insertedData);
        }

        console.log('Dummy data inserted successfully.');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
};

seedDatabase();

app.get('/api/data', async (req, res) => {
    try {
        const data = await DataModel.find();
        res.json(data);
    } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// Modify your '/api/data' endpoint to accept query parameters
app.get('/api/data', async (req, res) => {
    try {
        // Extract query parameters from the request
        const { sector, region, country } = req.query;

        // Build a filter object based on the provided parameters
        const filter = {};
        if (sector) filter.sector = sector;
        if (region) filter.region = region;
        if (country) filter.country = country;

        // Use the filter object in the find query
        const data = await DataModel.find(filter).limit(25);

        res.json(data);
    } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
