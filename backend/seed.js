/**
 * ============================================================
 *  JOBHUNT — Database Seed Script
 *  File: backend/seed.js
 *
 *  Run: node seed.js
 *  This creates dummy companies, jobs and a test recruiter
 *  so you can see data on the website immediately.
 * ============================================================
 */

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

/* ── Models ── */
import { User }    from "./models/user.model.js";
import { Company } from "./models/company.model.js";
import { Job }     from "./models/job.model.js";

/* ── Connect DB ── */
await mongoose.connect(process.env.MONGO_URI);
console.log("✅ Connected to MongoDB");

/* ── Clear existing seed data ── */
await Job.deleteMany({});
await Company.deleteMany({});
console.log("🗑  Cleared old data");

/* ── Create a recruiter user (or reuse if exists) ── */
let recruiter = await User.findOne({ email: "recruiter@jobhunt.com" });
if (!recruiter) {
  recruiter = await User.create({
    fullname:    "JobHunt Admin",
    email:       "recruiter@jobhunt.com",
    phoneNumber: 9876543210,
    password:    await bcrypt.hash("password123", 10),
    role:        "recruiter",
    profile:     { profilePhoto: "https://ui-avatars.com/api/?name=JobHunt+Admin&background=ff2d8d&color=fff" },
  });
  console.log("👤 Recruiter created → recruiter@jobhunt.com / password123");
} else {
  console.log("👤 Recruiter already exists → recruiter@jobhunt.com / password123");
}

/* ── Companies ── */
const companiesData = [
  {
    name:        "Google",
    description: "Google LLC is an American multinational technology company focusing on AI, online advertising, search engine technology, cloud computing, and computer software.",
    website:     "https://google.com",
    location:    "Bangalore, India",
    logo:        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png",
  },
  {
    name:        "Microsoft",
    description: "Microsoft Corporation is an American multinational technology company producing computer software, consumer electronics, personal computers, and related services.",
    website:     "https://microsoft.com",
    location:    "Hyderabad, India",
    logo:        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1200px-Microsoft_logo.svg.png",
  },
  {
    name:        "Amazon",
    description: "Amazon.com Inc. is an American multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
    website:     "https://amazon.com",
    location:    "Mumbai, India",
    logo:        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png",
  },
  {
    name:        "Flipkart",
    description: "Flipkart is an Indian e-commerce company, headquartered in Bangalore. It is one of India's leading e-commerce marketplaces.",
    website:     "https://flipkart.com",
    location:    "Bangalore, India",
    logo:        "https://logos-world.net/wp-content/uploads/2020/11/Flipkart-Logo.png",
  },
  {
    name:        "Infosys",
    description: "Infosys Limited is an Indian multinational information technology company that provides business consulting, information technology and outsourcing services.",
    website:     "https://infosys.com",
    location:    "Pune, India",
    logo:        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/1200px-Infosys_logo.svg.png",
  },
  {
    name:        "Razorpay",
    description: "Razorpay is an Indian fintech company that allows businesses to accept, process, and disburse payments with its product suite.",
    website:     "https://razorpay.com",
    location:    "Bangalore, India",
    logo:        "https://razorpay.com/assets/razorpay-glyph.svg",
  },
];

const companies = await Company.insertMany(
  companiesData.map(c => ({ ...c, userId: recruiter._id }))
);
console.log(`🏢 Created ${companies.length} companies`);

/* ── Jobs ── */
const jobsData = [
  {
    title:           "Senior Frontend Developer",
    description:     "We are looking for a Senior Frontend Developer to join our team. You will be responsible for building and maintaining high-quality web applications using React and modern JavaScript. You'll work closely with our design and backend teams to deliver exceptional user experiences.",
    requirements:    ["React", "TypeScript", "CSS", "Redux", "REST APIs", "Git"],
    salary:          25,
    experienceLevel: 3,
    location:        "Bangalore, India",
    jobType:         "Full Time",
    position:        3,
    company:         companies[0]._id, // Google
  },
  {
    title:           "Backend Engineer - Node.js",
    description:     "Join our backend team to build scalable APIs and microservices. You will design and implement RESTful APIs, work with databases, and ensure high availability of our services.",
    requirements:    ["Node.js", "Express", "MongoDB", "Docker", "AWS", "REST APIs"],
    salary:          22,
    experienceLevel: 2,
    location:        "Hyderabad, India",
    jobType:         "Full Time",
    position:        5,
    company:         companies[1]._id, // Microsoft
  },
  {
    title:           "Full Stack Developer",
    description:     "We need a passionate Full Stack Developer who can work on both frontend and backend. You will build features end-to-end, from UI to database design.",
    requirements:    ["React", "Node.js", "MongoDB", "Express", "JavaScript", "HTML/CSS"],
    salary:          18,
    experienceLevel: 2,
    location:        "Mumbai, India",
    jobType:         "Full Time",
    position:        4,
    company:         companies[2]._id, // Amazon
  },
  {
    title:           "React Developer Intern",
    description:     "Exciting internship opportunity for students passionate about frontend development. You will work on real projects alongside senior developers and gain hands-on experience.",
    requirements:    ["React", "JavaScript", "HTML", "CSS", "Git"],
    salary:          5,
    experienceLevel: 0,
    location:        "Bangalore, India",
    jobType:         "Internship",
    position:        10,
    company:         companies[3]._id, // Flipkart
  },
  {
    title:           "UI/UX Designer",
    description:     "We are seeking a creative UI/UX Designer to join our product team. You will design beautiful and intuitive interfaces, conduct user research, and create wireframes and prototypes.",
    requirements:    ["Figma", "Adobe XD", "User Research", "Wireframing", "Prototyping"],
    salary:          15,
    experienceLevel: 1,
    location:        "Pune, India",
    jobType:         "Full Time",
    position:        2,
    company:         companies[4]._id, // Infosys
  },
  {
    title:           "DevOps Engineer",
    description:     "Looking for a DevOps Engineer to manage our cloud infrastructure and CI/CD pipelines. You will work with AWS, Docker, Kubernetes and ensure smooth deployments.",
    requirements:    ["AWS", "Docker", "Kubernetes", "CI/CD", "Linux", "Terraform"],
    salary:          28,
    experienceLevel: 3,
    location:        "Bangalore, India",
    jobType:         "Full Time",
    position:        2,
    company:         companies[5]._id, // Razorpay
  },
  {
    title:           "Data Scientist",
    description:     "Join our AI/ML team to build machine learning models and data pipelines. You will analyze large datasets and create predictive models to drive business decisions.",
    requirements:    ["Python", "Machine Learning", "TensorFlow", "SQL", "Statistics", "Pandas"],
    salary:          30,
    experienceLevel: 2,
    location:        "Hyderabad, India",
    jobType:         "Full Time",
    position:        3,
    company:         companies[0]._id, // Google
  },
  {
    title:           "Product Manager",
    description:     "We are looking for an experienced Product Manager to lead our product roadmap. You will work with engineering, design, and business teams to define and ship products.",
    requirements:    ["Product Strategy", "Agile", "Jira", "Data Analysis", "Communication"],
    salary:          35,
    experienceLevel: 4,
    location:        "Mumbai, India",
    jobType:         "Full Time",
    position:        1,
    company:         companies[2]._id, // Amazon
  },
  {
    title:           "Mobile Developer - React Native",
    description:     "Build cross-platform mobile apps using React Native. You will work on our consumer-facing apps used by millions of users.",
    requirements:    ["React Native", "JavaScript", "iOS", "Android", "Redux", "REST APIs"],
    salary:          20,
    experienceLevel: 2,
    location:        "Remote",
    jobType:         "Remote",
    position:        3,
    company:         companies[3]._id, // Flipkart
  },
  {
    title:           "Cybersecurity Analyst",
    description:     "Protect our systems and data from cyber threats. You will conduct security audits, implement security measures, and respond to incidents.",
    requirements:    ["Network Security", "SIEM", "Penetration Testing", "Firewalls", "Linux"],
    salary:          24,
    experienceLevel: 2,
    location:        "Pune, India",
    jobType:         "Full Time",
    position:        2,
    company:         companies[4]._id, // Infosys
  },
  {
    title:           "Cloud Architect",
    description:     "Design and implement cloud solutions on AWS and Azure. You will define cloud strategy, architecture patterns, and best practices for the organization.",
    requirements:    ["AWS", "Azure", "Cloud Architecture", "Microservices", "Security", "Cost Optimization"],
    salary:          40,
    experienceLevel: 5,
    location:        "Bangalore, India",
    jobType:         "Full Time",
    position:        1,
    company:         companies[1]._id, // Microsoft
  },
  {
    title:           "Content Writer - Tech",
    description:     "Create engaging technical content including blog posts, documentation, and marketing copy. You should have a passion for technology and excellent writing skills.",
    requirements:    ["Technical Writing", "SEO", "Content Strategy", "Research", "Communication"],
    salary:          8,
    experienceLevel: 1,
    location:        "Remote",
    jobType:         "Part Time",
    position:        5,
    company:         companies[5]._id, // Razorpay
  },
];

const jobs = await Job.insertMany(
  jobsData.map(j => ({ ...j, created_by: recruiter._id }))
);
console.log(`💼 Created ${jobs.length} jobs`);

console.log("\n🎉 Seed complete! Here's your test account:");
console.log("   Recruiter → recruiter@jobhunt.com / password123");
console.log("   Create a job seeker account to browse and apply!\n");

await mongoose.disconnect();
process.exit(0);