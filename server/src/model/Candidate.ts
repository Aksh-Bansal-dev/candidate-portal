import mongoose, { Date } from "mongoose";

interface CandidateInterface extends mongoose.Document {
  name: string;
  address: string;
  state: string;
  email: string;
  pincode: string;
  dob: Date;
  result: string;
}

const candidateSchema: mongoose.Schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  result: {
    type: String,
    required: true,
  },
});

const Candidate: mongoose.Model<CandidateInterface> = mongoose.model(
  "Candidate",
  candidateSchema
);

export { Candidate, CandidateInterface };
