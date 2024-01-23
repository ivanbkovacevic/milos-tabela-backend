import express from 'express';
import { fileURLToPath } from 'url';
import pkg from 'body-parser';
import multer from 'multer';
import { dirname } from 'path';
import path from 'path';
import mongoose from 'mongoose';
import ProjectsModel from './model.js';
import {
    readFile,
    writeFile
} from 'fs/promises';
import dotenv from 'dotenv';

dotenv.config();
const {
    json
} = pkg;
const app = express();
const PORT = 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dataFilePath = './projects.json';

// Middleware to parse JSON requests
app.use(json());

// Initialize data from the JSON file
let data = [];

// async function loadData() {
//     try {
//         const fileContent = await readFile(dataFilePath, 'utf-8');
//         data = JSON.parse(fileContent);
//     } catch (error) {
//         console.error('Error loading data from the file', error);
//     }
// }

// async function saveData() {
//     try {
//         await writeFile(dataFilePath, JSON.stringify(data, null, 2));
//     } catch (error) {
//         console.error('Error saving data to the file', error);
//     }
// }

// // Load initial data
// loadData();

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads'); // specify the upload directory
//     },
//     filename: function (req, file, cb) {
//         const nameImg = file.originalname.replace(/\s/g, '');
//         console.log('REQIDDDDDD', nameImg)

//         cb(null, nameImg);
//     },
// });

// // Initialize Multer with the storage configuration
// const upload = multer({
//     storage: storage
// });

  // Define a MongoDB model (replace 'YourModel' and 'yourcollection' with your actual model and collection names)
const ProjectsMongooseModel = mongoose.model('ProjectsModel', new mongoose.Schema({}), 'Projects');

async function fetchData() {
    try {
      // Connect to MongoDB Atlas
      await mongoose.connect(process.env.MONGO_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      // Find all documents in the collection
      const documents = await ProjectsMongooseModel.find({}).exec();
     return documents;
    } catch (error) {
      console.error('Error:', error);
    } finally {
      // Close the connection
      mongoose.disconnect();
    }
  }
  

  //////////////////////////////////////////////////////////////

// GET: Retrieve all items
app.get('/api/items', (req, res) => {
    res.json(data);
});

// POST: Create a new item
app.post('/api/items', (req, res) => {
    const newItem = req.body;
    data.push(newItem);
    saveData().then(() => res.json(newItem));
});

// PUT: Update an existing item
app.put('/api/items/:id', (req, res) => {
    const itemId = req.params.id;
    const updatedItem = req.body;
    data = data.map(item => (item.id === itemId ? updatedItem : item));
    saveData().then(() => res.json(updatedItem));
});

// DELETE: Delete an item
app.delete('/api/items/:id', (req, res) => {
    const itemId = req.params.id;
    data = data.filter(item => item.id !== itemId);
    saveData().then(() => res.json({
        message: 'Item deleted successfully'
    }));
});



app.get('/', (req, res) => {
    // res.sendFile(__dirname + '/index.html');
    const data = fetchData();
    res.send(data)
});

//Handle image upload
// app.post('/upload', upload.single('productImg'), (req, res) => {
//     if (!req.file) {
//         return res.status(400).send('No file uploaded.');
//     }
//     res.send('File uploaded successfully: ' + req.file.filename);
// });

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});