// backend/models/Page.js
import mongoose from 'mongoose';

const pageSchema = new mongoose.Schema({
    title: { type: String, required: true },
    elements: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Element'
        }
    ]
});

export default mongoose.model('Page', pageSchema);
