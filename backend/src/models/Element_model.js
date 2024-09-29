import mongoose from 'mongoose';

const pageSchema = new mongoose.Schema({
  elements: {
    type: Array, // JSON format elements
    required: true,
  },
  htmlCode: {
    type: String, // Custom HTML code
  },
});

const Page = mongoose.model('Page', pageSchema);

export default Page;
