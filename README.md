# 🌍 Wanderlust

**Wanderlust** is a full-stack travel listing web application that allows users to explore, create, edit, and review unique travel stays. Built with **Node.js**, **Express.js**, **MongoDB**, and **EJS**, it offers an intuitive UI and dynamic content rendering.

🔗 **Live Demo**: [https://wanderlust-o3sx.onrender.com](https://wanderlust-o3sx.onrender.com)

---

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, Bootstrap, EJS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Atlas)
- **Authentication**: Passport.js (Local Strategy)
- **Templating**: EJS with ejs-mate layout engine
- **Session Storage**: connect-mongo
- **Validation & Flash Messages**: express-validator, connect-flash
- **Deployment**: Render.com

---

## ✨ Features

- 🏠 **Listings CRUD**: Create, read, update, and delete travel listings.
- 🔐 **Authentication**: Secure login & registration using Passport.js.
- 🌍 **Map Integration**: View listing location using Mapbox.
- ⭐ **User Reviews**: Authenticated users can leave and delete reviews.
- 📂 **Image Uploads**: Upload images for each listing.
- 📱 **Responsive Design**: Optimized for all screen sizes.
- 🔎 **Category Filters**: Easily browse listings by type (Camping, Domes, Boats, etc).

---

## 📷 Screenshots

| Home Page | Listing Detail | Create Listing |
| --------- | -------------- | -------------- |
| ![Home](https://i.postimg.cc/qBLXg7Jf/Screenshot-2025-07-08-163304.png) | ![Detail](https://i.postimg.cc/7hmgRKsP/Screenshot-2025-07-08-163506.png) | ![New](https://i.postimg.cc/zvJCpskP/Screenshot-2025-07-08-163559.png) |

### 🔐 Login Page

![Login](https://i.postimg.cc/Hx148c8m/Screenshot-2025-07-08-163401.png)

---

## ✨ Getting Started

### 🧱 Prerequisites

- Node.js v18+
- MongoDB Atlas account

### ⚙️ Installation

```bash
git clone https://github.com/yourusername/wanderlust.git
cd wanderlust
npm install
```

### 📁 Environment Variables

Create a `.env` file in the root directory:

```env
ATLASDB_URL=your_mongodb_atlas_url
SECRET=your_session_secret
MAP_TOKEN=your_mapbox_token
```

### ▶️ Run the Server

```bash
npm start
```

Visit: `http://localhost:8080`

---

## 🗂️ Project Structure

```
wanderlust/
├── models/              # Mongoose models (User, Listing, Review)
├── routes/              # Express routes
├── views/               # EJS templates
├── public/              # Static assets
├── utils/               # Custom error handling
├── app.js               # Main Express app
├── package.json
└── .env
```

---

## 🧑‍💻 Author

**Your Name**\
📧 [bpal69057@gmail.com](mailto:bpal69057@gmail.com)  
🔗 [GitHub](https://github.com/biswajit-pal1)

---


