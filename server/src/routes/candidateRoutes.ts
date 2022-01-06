import express, { Request, Response } from "express";
import { Candidate } from "../model/Candidate";
const Router = express.Router();
import authValidation from "../middleware/authValidation";

// Create candidate
Router.post("/create", authValidation, async (req: Request, res: Response) => {
  try {
    const { email, name, dob, address, state, result, pincode } = req.body;
    const newCandidate = {
      email,
      name,
      dob,
      address,
      state,
      result,
      pincode,
    };
    await Candidate.create(newCandidate);
    res.status(201).json({ done: true });
  } catch (err) {
    console.log("[ERROR] " + err);
    res.status(401).json({
      done: false,
      error: err,
    });
  }
});

// Update candidate
Router.put("/update", authValidation, async (req: Request, res: Response) => {
  try {
    const { _id, email, name, dob, address, state, result, pincode } = req.body;
    if (!_id) {
      throw new Error("Bad request");
    }
    const updatedCandidate = {
      email,
      name,
      dob,
      address,
      state,
      result,
      pincode,
    };
    await Candidate.findByIdAndUpdate(_id, updatedCandidate);
    res.status(200).json({ done: true });
  } catch (err) {
    console.log("[ERROR] " + err);
    res.status(401).json({
      done: false,
      error: err,
    });
  }
});

// Get all candidates
Router.get("/", authValidation, async (_req: Request, res: Response) => {
  try {
    const candidates = await Candidate.find({});
    res.status(200).json({ done: true, data: candidates });
  } catch (err) {
    console.log("[ERROR]: " + err);
    res.json({ done: false, error: err });
  }
});

// Get one candidates
Router.get("/:id", authValidation, async (req: Request, res: Response) => {
  try {
    const cid = req.params.id;
    const candidate = await Candidate.findOne({ _id: cid });
    res.status(200).json({ done: true, data: candidate });
  } catch (err) {
    console.log("[ERROR]: " + err);
    res.json({ done: false, error: err });
  }
});

export default Router;
