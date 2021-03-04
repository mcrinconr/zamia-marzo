import mongoose from 'mongoose';

const insightSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  image: { type: String, required: true },
},
{
  timestamps: true
});

const Insight = mongoose.model('Insight', insightSchema);

export default Insight;
