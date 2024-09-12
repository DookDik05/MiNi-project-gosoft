const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Connect to MongoDB

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB successfully'))
.catch((err) => console.error('Error connecting to MongoDB', err));



// Define the schema and model
const donationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    donation: { type: String, required: true },
    address: { type: String, required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});



const Donation = mongoose.model('Donation', donationSchema);

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public', 'Waste Management code')));

app.post('/submit', async (req, res) => {
    const { name, phone, donation, address, text } = req.body;

    // สร้าง document ใหม่ใน MongoDB
    const newDonation = new Donation({
        name,
        phone,
        donation,
        address,
        text
    });

    try {
        // บันทึกข้อมูลใน MongoDB
        await newDonation.save();
        res.send('Thank you for your donation!');
    } catch (err) {
        console.error('Error saving donation:', err);
        res.status(500).send('Error saving donation');
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
