import mongoose from 'mongoose';

const navbarSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
},
{
  timestamps: true
});

const Navbar = mongoose.model('Navbar', navbarSchema);

export default Navbar;
