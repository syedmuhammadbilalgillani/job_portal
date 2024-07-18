import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from 'body-parser';

dotenv.config();




// api routes
import contactRoutes from './routes/contact&CompanyRoutes.js';
import companyRoutes from './routes/companyRoutes.js';





const app = express();

// // Define the list of allowed origins
// const allowedOrigins = [
//     process.env.ALLOWED_ORIGIN_1,
//     process.env.ALLOWED_ORIGIN_2,
//     process.env.ALLOWED_ORIGIN_3,
//     process.env.ALLOWED_ORIGIN_4
// ];

// const corsOptions = {
//     origin: (origin, callback) => {
//         if (!origin || allowedOrigins.includes(origin)) {
//             callback(null, true);
//         } else {
//             console.error(`CORS error: Origin ${origin} not allowed`);
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'], // Allowed methods
//     credentials: true,
//     optionsSuccessStatus: 204,
//     allowedHeaders: '*', // Allow all headers
//     preflightContinue: false,
// };

// // Apply CORS middleware
// app.use(cors(corsOptions));

// // Handle preflight requests
// app.options('*', cors(corsOptions));
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.use(cookieParser());

app.use('/api/v1/createContactAndCompany', contactRoutes);
app.use('/api/v1/company', companyRoutes);




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