import { Job } from "../models/job.model.js";

export const postJob = async (req, res) => {
  try {
    const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
    if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }
    const job = await Job.create({
      title, description,
      requirements: requirements.split(",").map(r => r.trim()),
      salary: Number(salary), location, jobType,
      experienceLevel: Number(experience),
      position: Number(position),
      company: companyId, created_by: req.id,
    });
    return res.status(201).json({ message: "Job posted successfully!", job, success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = keyword ? {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    } : {};
    const jobs = await Job.find(query).populate({ path: "company" }).sort({ createdAt: -1 });
    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate({ path: "applications" });
    if (!job) return res.status(404).json({ message: "Job not found", success: false });
    return res.status(200).json({ job, success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId }).populate({ path: "company" }).sort({ createdAt: -1 });
    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};
