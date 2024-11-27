import mongoose from "mongoose";
import bcrypt from 'bcrypt';

//User schema
const adminSchema = new mongoose.Schema({
    dbUsername: { type: String, unique: true, required: true },
    dbEmail: { type: String, unique: true, required: true },
    dbPassword: { type: String, required: true },
    dbRole: { type: String, required: true }
})

const Admin = mongoose.model('admindetails', adminSchema)

mongoose.connect('mongodb://localhost:27017/TriviaHub')

const createAdmin = async () => {
    try {
      const adminExists = await Admin.findOne({ role: 'admin' });
      if (adminExists) {
        console.log('Admin already exists!');
        return;
      }

      const Password = 'Pass123'
      const hashPword = await bcrypt.hash(Password, 10)
  
      const admin = new Admin({
        dbUsername: 'admin',
        dbEmail: 'admin@example.com',
        dbPassword: hashPword, // Replace with a secure password
        dbRole: 'admin',
      });
  
      await admin.save();
      console.log('Admin profile created successfully!');
    } catch (err) {
      console.error('Error creating admin:', err.message);
    } finally {
      mongoose.connection.close();
    }
  };
  
  createAdmin();