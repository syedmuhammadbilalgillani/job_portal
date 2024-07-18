// models/EditorContent.js
import mongoose from 'mongoose';

const editorContentSchema = new mongoose.Schema({
    content: { type: String, required: true }
});

const EditorContent = mongoose.model('EditorContent', editorContentSchema);

export default EditorContent;
