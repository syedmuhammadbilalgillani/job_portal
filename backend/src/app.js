import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from 'body-parser';

dotenv.config();




// api routes
import contactRoutes from './routes/contact&CompanyRoutes.js';
import companyRoutes from './routes/companyRoutes.js';
import userRoutes from './routes/userRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import jobApplicationRoutes from './routes/jobApplicationRoutes.js';
import cvRoutes from './routes/cvRoutes.js';





const app = express();

// Define the list of allowed origins
const allowedOrigins = [
    'http://localhost:5173',
    'https://battertalent.vercel.app'
];

const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl, etc)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.error(`CORS error: Origin ${origin} not allowed`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
    optionsSuccessStatus: 204,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.use(cookieParser());

app.use('/api/v1/createContactAndCompany', contactRoutes);
app.use('/api/v1/company', companyRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/gallery', galleryRoutes);
app.use('/api/v1/job', jobRoutes);
app.use('/api/v1/jobApplication', jobApplicationRoutes);
app.use('/api/v1/cv', cvRoutes);




export { app };



// // Define the list of allowed origins
// const allowedOrigins = ['http://localhost:5173/', 'https://sub.example.com'];

// const corsOptions = {
//     origin: (origin, callback) => {
//         if (!origin || allowedOrigins.includes(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'], // Use an array of methods
//     credentials: true,
//     optionsSuccessStatus: 204,
// };

// app.use(cors(corsOptions));