# Practical Submission Portal 🎓

A full-stack MERN web application where students can submit their practicals digitally and teachers can manage, track, approve, or reject them in a structured and secure way.

This platform provides a **simple user experience with robust features**, focusing only on practical submission and tracking — without unnecessary college administrative complexity.

--------------------------------------------------------------------

## 🚀 Project Objective

To create a **secure, simple, and efficient digital system** for:
- Practical submission  
- Subject-based grouping  
- Teacher verification  
- Student tracking  
- Status monitoring (Pending / Approved / Rejected)  
- Secure access using authentication and authorization  

--------------------------------------------------------------------
## 🧠 Core Concept

- Teachers create subjects  
- Each subject gets a **unique subject code**  
- Teacher shares the code with students  
- Students join the subject using the code  
- Once joined, the subject is permanently linked to the student  
- Students upload practicals under that subject  
- Teachers review, approve, or reject  
- Practicals are:
  - Tracked by date  
  - Sorted by class  
  - Filtered by subject  
  - Linked to student & teacher  

No fake subjects, no public access — only **teacher-created subjects** and **teacher-shared codes**.

---

## ✨ Features

### 👨‍🏫 Teacher Features
- Create subjects  
- Auto-generate unique subject code  
- Share subject code with students  
- View student submissions  
- Approve / Reject practicals  
- Track practicals by:
  - Date  
  - Student  
  - Class  
  - Subject  
- Secure teacher dashboard  

### 👨‍🎓 Student Features
- Register & login  
- Join subject using subject code  
- Auto-save joined subjects  
- Upload practicals per subject  
- Track practical status:
  - Pending  
  - Approved  
  - Rejected  
- Secure student dashboard  

---

## 🔐 Security Features

- JWT Authentication  
- Secure Routes  
- Role-based Authorization  
- Protected APIs  
- Token-based login system  
- Private practical visibility  
- Subject-based access control  

---

## 🧰 Tech Stack

### Frontend
- React  
- Tailwind CSS  
- Axios  

### Backend
- Node.js  
- Express.js  
- JWT Authentication  
- REST API  

### Database
- MongoDB  

### Cloud Services
- Cloudinary (for file uploads)  

---

## 📁 Project Structure
PSPm/
│
├── client/ # Frontend (React + Tailwind)
├── server/ # Backend (Node + Express)
├── .gitignore
├── README.md


---

## 🔑 Environment Setup

Create a `.env` file inside `server/` using `.env.example`

```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
JWT_COOKIE_EXPIRE=7
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLIENT_URL=http://localhost:3000


## ⚙️ Installation & Setup**
1️⃣ Clone Repository
git clone https://github.com/shravan-jcode/psp.git

2️⃣ Frontend Setup
cd client
npm install
npm run dev

3️⃣ Backend Setup
cd server
npm install
nodemon server.js


--------------------------------------------------------------------
🔄 Project Flow
👨‍🏫 Teacher Flow

Register/Login

Create Subject

System generates subject code

Share code with students

View submissions

Approve/Reject practicals

👨‍🎓 Student Flow

Register/Login

Enter subject code

Join subject

Upload practicals

Track status

--------------------------------------------------------------------

📌 Access Control Logic
Role	Access
Student	Own subjects & practicals
Teacher	Own subjects & students
Public	No access
--------------------------------------------------------------------

🧪 Authentication System

JWT Token

Secure cookies

Role-based middleware

Protected APIs

Authorization layers

--------------------------------------------------------------------

🎯 Project Goal

To provide:

Simple UI

Secure backend

Scalable architecture

Clean code structure

Real-world project experience

Production-ready structure

--------------------------------------------------------------------

👥 Team Name

Code Crafters

👨‍💻 Team Members

Sakshi Kurup

Siddhi Kadam

Purva Patole

Sagar Ramane

Amey Salvi

Shravan Jadhav

Siddesh Mane

--------------------------------------------------------------------

🏫 Project Type

Web Application

MERN Stack Project

JWT Secured System

Role-Based Access Platform

--------------------------------------------------------------------

📜 License

This project is developed for academic and learning purposes.

--------------------------------------------------------------------

⭐ Future Enhancements

Email notifications

Admin dashboard

Analytics

Attendance integration

PDF reports

AI plagiarism detection

Mobile app version