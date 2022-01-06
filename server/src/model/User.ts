import mongoose from "mongoose";

interface UserInterface extends mongoose.Document {
  email: string;
  phone: string;
  password: string;
}

const userSchema: mongoose.Schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

const User: mongoose.Model<UserInterface> = mongoose.model("User", userSchema);

export { User, UserInterface };
