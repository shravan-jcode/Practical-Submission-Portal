# Practical Submission Portal 🎓

A full-stack MERN web application that provides a secure and organized way for students to submit practical work digitally and for teachers to review, track, approve, or reject submissions.

The platform focuses specifically on practical submission and tracking, providing a simple workflow without unnecessary college-administration complexity.

---

## 🚀 Project Objective

The main objective of the Practical Submission Portal is to provide a secure and efficient digital system for:

* Submitting practical work online.
* Organizing practicals by subject.
* Connecting students to teacher-created subjects using unique subject codes.
* Allowing teachers to review and manage submissions.
* Tracking submission status such as **Pending**, **Approved**, and **Rejected**.
* Protecting student, teacher, subject, and submission data through authentication and authorization.

---

## 🧠 Core Concept

The application follows a controlled subject-based workflow:

1. A teacher creates a subject.
2. The system generates a unique subject code.
3. The teacher shares the code with students.
4. Students join the subject using the code.
5. Joined subjects are linked to the student's account.
6. Students upload practical work under the appropriate subject.
7. Teachers review each submission.
8. Teachers can approve or reject submissions.
9. Students can track the current status of their practicals.

There is no public submission access. Subjects are created by authenticated teachers, and students can access subjects through the teacher-provided subject code.

---

## ✨ Features

### 👨‍🏫 Teacher Features

* Register and log in securely.
* Create and manage subjects.
* Automatically generate unique subject codes.
* Share subject codes with students.
* View students associated with subjects.
* View practical submissions.
* Approve or reject practical submissions.
* Track submissions by date, student, class, and subject.
* Access a protected teacher dashboard.

### 👨‍🎓 Student Features

* Register and log in securely.
* Join subjects using unique subject codes.
* View joined subjects.
* Upload practical work under a selected subject.
* Track practical submission status.
* View pending, approved, and rejected submissions.
* Access a protected student dashboard.

### 📋 Submission Management

* Subject-based practical organization.
* Submission tracking by student and teacher.
* Submission status management.
* Date-based tracking.
* Structured access to practical files.

---

## 🔐 Security Features

* JWT-based authentication.
* Secure authentication cookies.
* Role-based authorization.
* Protected frontend routes.
* Protected backend APIs.
* Role-based middleware.
* Subject-based access control.
* Private practical visibility.
* Secure handling of authentication and user data.

---

## 🧰 Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* REST API
* JWT Authentication

### Database

* MongoDB

### Cloud Services

* Cloudinary for practical file uploads and media storage.

### Development Tools

* Git
* GitHub
* npm

---

## 📁 Project Structure

```text
Practical-Submission-Portal/
│
├── client/                 # React frontend
│   └── ...
│
├── server/                 # Node.js + Express backend
│   └── ...
│
├── .gitignore
├── README.md
└── ...
```

---

## 🔑 Environment Setup

Environment variables are required for database access, authentication, Cloudinary, and frontend-backend communication.

Create a `.env` file inside the `server/` directory using `server/.env.example` as a reference.

Example:

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
```

Create the required frontend environment file inside `client/` if your frontend configuration requires one.

> **Never commit `.env` files, API keys, passwords, database credentials, or other sensitive information to GitHub.** Use `.env.example` files to document the required variables safely.

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/shravan-jcode/Practical-Submission-Portal.git
```

### 2. Navigate to the Project

```bash
cd Practical-Submission-Portal
```

### 3. Install Frontend Dependencies

```bash
cd client
npm install
```

### 4. Install Backend Dependencies

```bash
cd ../server
npm install
```

### 5. Configure Environment Variables

Create the required `.env` files using the corresponding `.env.example` files as references.

---

## ▶️ Running the Project

### Start the Backend

Open a terminal and run:

```bash
cd server
npm run dev
```

If your server is configured to use Nodemon directly, you can alternatively run:

```bash
nodemon server.js
```

### Start the Frontend

Open another terminal and run:

```bash
cd client
npm run dev
```

The exact commands and ports may vary depending on the project's `package.json` configuration.

---

## 🔄 Project Flow

### 👨‍🏫 Teacher Flow

```text
Register / Login
       ↓
Create Subject
       ↓
System Generates Subject Code
       ↓
Share Code With Students
       ↓
View Student Submissions
       ↓
Approve / Reject Practicals
```

### 👨‍🎓 Student Flow

```text
Register / Login
       ↓
Enter Subject Code
       ↓
Join Subject
       ↓
Upload Practical
       ↓
Track Submission Status
```

---

## 📌 Access Control

| Role    | Access                                                   |
| ------- | -------------------------------------------------------- |
| Student | Joined subjects and own practical submissions            |
| Teacher | Own subjects, associated students, and their submissions |
| Public  | No access to protected application functionality         |

---

## 🧪 Authentication & Authorization

The application uses multiple layers of access control:

* JWT-based authentication.
* Secure cookies for authentication tokens.
* Role-based middleware.
* Protected API endpoints.
* Protected application routes.
* Authorization checks for subjects and practical submissions.

---

## 📸 Screenshots

Screenshots can be added here to provide a visual overview of the application.

Recommended screenshots include:

* Login/Register page.
* Student dashboard.
* Teacher dashboard.
* Subject creation page.
* Subject joining page.
* Practical submission page.
* Submission tracking page.
* Teacher review/approval page.

Example:

```markdown
![Login Page](./screenshots/login.png)
![Student Dashboard](./screenshots/student-dashboard.png)
![Teacher Dashboard](./screenshots/teacher-dashboard.png)
```

---

## 🎯 Project Goals

The project is designed to demonstrate:

* A practical real-world use case for a MERN application.
* Secure authentication and authorization.
* Role-based application workflows.
* REST API development.
* File upload and cloud storage integration.
* Structured MongoDB data management.
* Clean separation between frontend and backend.
* A scalable foundation for future improvements.

---

## 🔮 Future Enhancements

Possible future improvements include:

* Email notifications for submission status changes.
* Admin dashboard.
* Submission analytics and reports.
* Attendance integration.
* PDF report generation.
* AI-assisted plagiarism detection.
* Improved teacher and student analytics.
* Mobile application support.

---

## 📌 Project Status

🚧 **In Development**

The core practical submission, subject management, authentication, authorization, and submission tracking functionality is being developed, with additional improvements planned for future versions.

---

## 👨‍💻 Author

**Shravan Jadhav**

This project was developed as an individual full-stack web application for digitally managing practical submissions and their review workflow.

---

## 🏫 Project Type

* Web Application
* MERN Stack Project
* JWT-Secured System
* Role-Based Access Platform

---

## 📜 License

This project is developed for academic and learning purposes.

---

## ⭐ Support

If you find this project useful or interesting, consider giving the repository a ⭐ on GitHub.
