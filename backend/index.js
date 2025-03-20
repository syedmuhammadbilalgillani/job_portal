import connectDB from "./src/db/db.js";
import { app } from "./src/app.js";
import dotenv from "dotenv";

dotenv.config();

app.get('/home', (req, res) => {
    res.send('Hello');
});

const PORT = process.env.PORT || 4000;
const HOST = '0.0.0.0';

// Connect to DB when running in development
if (process.env.NODE_ENV !== 'production') {
    connectDB()
        .then(() => {
            app.listen(PORT, HOST, () => {
                console.log(`Server is running on http://${HOST}:${PORT}`);
            });
        })
        .catch((err) => {
            console.log(`DB Connection Failed`, err);
        });
} else {
    // In production, connect to DB but don't start the server (Vercel will handle that)
    connectDB()
        .catch((err) => {
            console.log(`DB Connection Failed`, err);
        });
}

// Export the Express app for Vercel
export default app;