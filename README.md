# 🦇 Ekesta Portfolio - Dark Knight Developer

A dark-themed, minimalistic, Ekesta-inspired portfolio web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## ✨ Features

### 🎨 Design & Theme
- **Dark Mode Only** with Ekesta-inspired color palette
- **Responsive Design** - Mobile-first approach
- **Smooth Animations** using Framer Motion
- **Modern UI Components** with Material-UI (MUI)
- **Ekesta-inspired Elements** - Silhouettes, Gotham city skyline, yellow accents

### 📱 Pages & Sections
1. **Home** - Hero section with Ekesta silhouette and call-to-action
2. **whoami** - Personal bio with social media links
3. **Blog** - Full markdown support with live editor and syntax highlighting
4. **Experience** - Professional timeline/card layout
5. **Contact** - Form with validation and email integration

### 🔧 Technical Features
- **Blog System** with markdown editor and live preview
- **MongoDB Integration** for blog posts and contact messages
- **Email Notifications** via Nodemailer
- **Responsive Navigation** with hamburger menu
- **SEO Optimized** with React Helmet
- **Form Validation** and error handling
- **Real-time Notifications** with React Hot Toast

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Git

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd ekesta-portfolio
```

2. **Install Backend Dependencies**
```bash
cd backend
npm install
```

3. **Install Frontend Dependencies**
```bash
cd ../frontend
npm install
```

4. **Set up Environment Variables**

Create `.env` file in the backend directory:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ekesta-portfolio
FRONTEND_URL=http://localhost:3000

# Email configuration (for contact form)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com
EMAIL_TO=your-email@gmail.com

# JWT Secret (for future authentication if needed)
JWT_SECRET=your-super-secret-ekesta-key-change-this-in-production
```

5. **Start MongoDB**
Make sure MongoDB is running on your system:
```bash
# For local MongoDB installation
mongod

# Or use MongoDB Atlas (cloud) and update MONGODB_URI in .env
```

6. **Start the Backend**
```bash
cd backend
npm run dev
```

7. **Start the Frontend** (in a new terminal)
```bash
cd frontend
npm start
```

8. **Access the Application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🛠️ Project Structure

```
ekesta-portfolio/
├── backend/
│   ├── models/
│   │   ├── BlogPost.js
│   │   └── Contact.js
│   ├── routes/
│   │   ├── blog.js
│   │   └── contact.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   └── layout/
│   │   │       ├── Navbar.js
│   │   │       └── Footer.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── WhoAmI.js
│   │   │   ├── Blog.js
│   │   │   ├── BlogPost.js
│   │   │   ├── BlogEditor.js
│   │   │   ├── Experience.js
│   │   │   ├── Contact.js
│   │   │   └── NotFound.js
│   │   ├── theme/
│   │   │   └── theme.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
└── README.md
```

## 🎨 Color Palette

- **Background**: `#0D0D0D` (Deep Black)
- **Secondary Background**: `#1A1A1A` (Slightly lighter)
- **Primary Accent**: `#FFD700` (Ekesta Yellow)
- **Secondary Accent**: `#FFEB3B` (Lighter Yellow)
- **Text Primary**: `#E0E0E0` (Light Gray)
- **Text Secondary**: `#BDBDBD` (Medium Gray)

## 📝 Typography

- **Primary Font**: Montserrat (Headers, body text)
- **Monospace Font**: Roboto Mono (Code, captions)

## 🔧 API Endpoints

### Blog Routes (`/api/blog`)
- `GET /` - Get all published blog posts
- `GET /featured` - Get featured posts
- `GET /tags` - Get all tags
- `GET /:slug` - Get single blog post
- `POST /` - Create new blog post
- `PUT /:slug` - Update blog post
- `DELETE /:slug` - Delete blog post

### Contact Routes (`/api/contact`)
- `POST /` - Submit contact form
- `GET /` - Get all contact messages (admin)
- `PUT /:id/status` - Update contact status

## 🌟 Customization

### Adding Your Information
1. Update social media links in `Footer.js`
2. Replace placeholder content in page components
3. Add your profile image to the public folder
4. Update meta tags in `index.html` and page components

### Blog Management
- Use the `/blog/new` route to create new posts
- Edit posts at `/blog/edit/:slug`
- Posts support full markdown with syntax highlighting

### Email Configuration
1. Set up Gmail App Password
2. Update email credentials in `.env`
3. Configure SMTP settings for other email providers

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
```

### Backend (Heroku/Railway)
```bash
cd backend
# Set environment variables on your platform
# Deploy using your platform's CLI
```

### Database (MongoDB Atlas)
1. Create MongoDB Atlas account
2. Set up cluster
3. Update `MONGODB_URI` in environment variables

## 🔒 Security Features

- Rate limiting on API routes
- Input validation and sanitization
- CORS configuration
- Helmet.js security headers
- Environment variable protection

## 🛠️ Built With

### Frontend
- React.js 18
- Material-UI (MUI)
- Framer Motion
- React Router
- React Markdown
- React Syntax Highlighter
- React Hook Form
- React Hot Toast
- Axios

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Nodemailer
- Express Rate Limit
- Helmet.js
- CORS
- Joi Validation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🦇 About

This portfolio showcases the power of modern web development with a unique Ekesta-inspired twist. It demonstrates full-stack development skills, responsive design, and attention to user experience.

**"I am the Dark Knight Developer. I protect Gotham's digital infrastructure."**

---

Made with 🦇 and ⚡ in Gotham City 