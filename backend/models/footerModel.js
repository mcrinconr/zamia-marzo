import mongoose from 'mongoose';

const footerSchema = new mongoose.Schema({
  nosotros: { type: String, required: true },
  nosotrosParrafo: { type: String, required: true },
  enlaces: { type: String, required: true },
  enlace1: { type: String, required: true },
  enlace2:  { type: String },
  social: { type: String, required: true },
  social1: { type: String, required: true },
  social2: { type: String },
  correo: {type: String},
  copyright: {type: String, required: true},
},
{
  timestamps: true
});

const Footer = mongoose.model('Footer', footerSchema);

export default Footer;
