import mongoose from 'mongoose';

const highlightSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  image: { type: String, required: true },
},
{
  timestamps: true
});

const Highlight = mongoose.model('Highlight', highlightSchema);

export default Highlight;
