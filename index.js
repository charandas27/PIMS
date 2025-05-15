
import express from 'express';
import mongoose from 'mongoose';
import { getAllUsers,getCompanyDetails,findUser } from './services/service.js';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';

const app = express();
//app.use(bodyParser.json());
app.set('view engine','ejs');
app.set('views','./StudentPage');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin:'http://127.0.0.1:5500'
}))

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

mongoose.connect("mongodb://localhost:27017/Pims")
    .then(() => {
        console.log("Connected to database");
    })
    .catch(err => console.error('Could not connect to MongoDB', err));





    app.post('/login', async (req, res) => {
        try {
            const { username, password } = req.body;
    
            // Basic validation
            if (!username || !password) {
                console.log('Missing username or password');
                return res.status(400).json({ message: 'Username and password are required' });
            }
    
            // Simplified admin check for demonstration purposes
            if (username === 'company' && password === 'company') {
                const filePath = path.join(__dirname, './CompanyPage/Company.html');
                console.log('Admin login successful');
                return res.sendFile(filePath);
            }
            if (username === 'admin' && password === 'admin') {
                const filePath = path.join(__dirname, './Admin/admin.html');
                console.log('Admin login successful');
                return res.sendFile(filePath);
            }
    
            // Finding user in the database
            const user = await findUser(username, password);
            console.log('User found:', user);
    
            if (user) {
                const { name: uname, id: userid, gpa: ugpa } = user;
                return res.render('StudentPage', { uname, userid, ugpa });
            } else {
                console.log('Invalid username or password');
                return res.status(401).json({ message: 'Invalid username or password' });
            }
        } catch (err) {
            console.error('Error during login:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
    });

app.get('/', (req, res) => {
    const filePath = path.join(__dirname, './LandingPage/LandingPage.html');
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Error sending file:', err);
            res.status(500).send('An error occurred while sending the file.');
        }
    });
});

app.get('/login_page', function(req, res) {
    const filePath = path.join(__dirname, './Login/Login.html');
    res.sendFile(filePath,(err)=>{
        if(err) {
            console.error('Error sending file:', err);
            res.status(500).send('An error occurred while sending the file.');
        }
    });
})

app.get('/users', async (req, res) => {
    try {
        const users = await getAllUsers();
        res.send(JSON.stringify(users));
        
    } catch (err) {
        res.status(500).send("Server error: " + err.message);
    }
});

app.get('/company',async (req, res) => {
    try {
        const companydets = await getCompanyDetails();
        res.send(JSON.stringify(companydets));

    }catch(err) {
        res.status(500).send("Server error: " + err.message);
    }
})
app.get('/admin',(req,res)=>{
    const filePath = path.join(__dirname, './Admin/admin.html');
    res.sendFile(filePath,(err)=>{
        if(err) {
            console.error('Error sending file:', err);
            res.status(500).send('An error occurred while sending the file.');
        }
    });   
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
