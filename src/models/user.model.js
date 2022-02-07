import { Schema, model } from 'mongoose';


const userSchema = new Schema(
  {
    FirstName: {
      type: String,
  
      trim: true
    },
    LastName: {
      type: String,
  
      trim: true
    },
    Email: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    Password: {
      type: String,
      required: true,
      trim: true
    },
   
  },
  {
    timestamps: true
  }
);

export default model('User', userSchema);
