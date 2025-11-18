echo "# Linkly - Modern URL Shortener

A full-stack URL shortening service built with Node.js, Express, MongoDB, and React. Features AI-powered slug generation, real-time analytics, QR codes, user authentication, and an admin panel.

![Linkly Banner](https://via.placeholder.com/800x200/1f2937/ffffff?text=Linkly+URL+Shortener)

## ✨ Features

### 🚀 Core Functionality
- **URL Shortening**: Create branded short links with custom slugs
- **AI-Powered Slugs**: Generate meaningful, SEO-friendly slugs using Groq AI
- **QR Codes**: Instant QR code generation for every short link
- **Expiry Management**: Set automatic expiration dates for time-sensitive links
- **Real-time Analytics**: Track clicks, browser, OS, and geographic data

### 👤 User Management
- **Authentication**: Secure user registration and login
- **Credits System**: Pay-as-you-go model with Razorpay integration
- **Profile Management**: Update name, change password, delete account
- **Dashboard**: Manage all your shortened URLs

### 🔧 Admin Panel
- **Global URL Management**: View, toggle, and delete any URL
- **User Oversight**: Monitor all users and their activities
- **Status Control**: Enable/disable URLs system-wide

### 🛡️ Security & Performance
- **Rate Limiting**: Arcjet-powered request throttling
- **Secure Redirects**: Fast, privacy-focused URL redirection
- **Data Encryption**: Secure password hashing and JWT tokens
- **Input Validation**: Comprehensive validation and error handling

## 🏗️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **AI**: Groq API (Llama model)
- **Payments**: Razorpay
- **Security**: Arcjet, bcrypt
- **QR Generation**: qrcode npm package

### Frontend
- **Framework**: React 18
- **Routing**: React Router
- **Styling**: Tailwind CSS
- **Animations**: GSAP
- **UI Components**: Radix UI (via shadcn/ui)
- **HTTP Client**: Axios
- **Notifications**: Sonner

### DevOps & Tools
- **Process Management**: PM2
- **Environment**: dotenv
- **Email**: Nodemailer with SendGrid
- **Validation**: Custom middleware
- **CORS**: Configured for cross-origin requests

## 📁 Project Structure

url-shortner/ ├── Backend/ │ ├── src/ │ │ ├── config/ # Configuration files │ │ │ ├── arcjet.config.js │ │ │ ├── config.js │ │ │ └── razorpay.js │ │ ├── controllers/ # Route controllers │ │ │ ├── admin.controller.js │ │ │ ├── ai.controller.js │ │ │ ├── analytics.controller.js │ │ │ ├── auth.controller.js │ │ │ ├── payment.controller.js │ │ │ ├── qr.controller.js │ │ │ ├── short_url.controller.js │ │ │ └── user.controller.js │ │ ├── dao/ # Data Access Objects │ │ │ ├── short_url.dao.js │ │ │ └── user.dao.js │ │ ├── middlewares/ # Custom middleware │ │ │ ├── auth.middleware.js │ │ │ └── rateLimit.middleware.js │ │ ├── models/ # MongoDB models │ │ │ ├── analytics.model.js │ │ │ ├── short_url.model.js │ │ │ └── user.model.js │ │ ├── routes/ # API routes │ │ │ ├── admin.route.js │ │ │ ├── ai.route.js │ │ │ ├── analytics.route.js │ │ │ ├── auth.routes.js │ │ │ ├── payment.routes.js │ │ │ ├── qr.route.js │ │ │ ├── short_url.route.js │ │ │ └── user.routes.js │ │ ├── services/ # Business logic │ │ │ ├── ai.service.js │ │ │ ├── auth.service.js │ │ │ └── short_url.service.js │ │ └── utils/ # Utility functions │ │ ├── errorHandler.js │ │ ├── helper.js │ │ ├── sendEmail.js │ │ └── tryCatchWrapper.js │ └── index.js # Server entry point ├── Frontend/ │ ├── public/ # Static assets │ ├── src/ │ │ ├── api/ # API client │ │ │ └── axiosClient.js │ │ ├── components/ # Reusable components │ │ │ ├── animation/ │ │ │ │ └── FloatingParticles.tsx │ │ │ ├── common/ # Common components │ │ │ │ ├── AdminRoute.jsx │ │ │ │ ├── Loader.jsx │ │ │ │ ├── ProtectedRoute.jsx │ │ │ │ └── QRCodeModal.jsx │ │ │ ├── layout/ # Layout components │ │ │ │ ├── Footer.jsx │ │ │ │ └── Navbar.jsx │ │ │ └── ui/ # UI components (shadcn) │ │ ├── lib/ # Library configurations │ │ │ └── gsap.js │ │ ├── pages/ # Page components │ │ │ ├── AdminPanel.jsx │ │ │ ├── Analytics.jsx │ │ │ ├── CreateURL.jsx │ │ │ ├── Dashboard.jsx │ │ │ ├── Home.jsx │ │ │ ├── Login.jsx │ │ │ ├── Pricing.jsx │ │ │ ├── Profile.jsx │ │ │ ├── Register.jsx │ │ │ └── NotFound.jsx │ │ └── App.jsx # Main app component │ └── index.js # React entry point ├── package.json ├── README.md └── .env.example


## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/linkly.git
   cd linkly
Backend Setup

cd Backend
npm install

# Copy environment variables
cp .env.example .env

# Configure your .env file with:
# - MongoDB connection string
# - JWT secret
# - Razorpay keys
# - Groq API key
# - Email service credentials
# - App URL and port
Frontend Setup

cd ../Frontend
npm install

# Configure environment variables in .env
# - VITE_APP_URL (your backend URL)
Database Setup

Ensure MongoDB is running
The app will create collections automatically
Running the Application
Start Backend

cd Backend
npm start
# or for development with auto-reload:
npm run dev
Start Frontend

cd Frontend
npm run dev
Access the application

Frontend: http://localhost:3000
Backend API: http://localhost:5000
🔧 Configuration
Environment Variables
Backend (.env)
# Database
MONGODB_URI=mongodb://localhost:27017/linkly

# JWT
JWT_SECRET=your-super-secret-jwt-key

# App
APP_URL=http://localhost:3000
PORT=5000

# Razorpay (Payments)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# AI (Groq)
GROQ_API_KEY=your_groq_api_key
AI_MODEL=llama3-8b-8192

# Email (SendGrid)
EMAIL_USER=your_email@domain.com
EMAIL_PASS=your_email_password
SENDGRID_API_KEY=your_sendgrid_api_key

# Arcjet (Security)
ARCJET_KEY=your_arcjet_key
Frontend (.env)
VITE_APP_URL=http://localhost:5000
📡 API Endpoints
Authentication
POST /api/auth/register - User registration
POST /api/auth/login - User login
POST /api/auth/logout - User logout
GET /api/auth/me - Get current user
PUT /api/auth/update-name - Update user name
PUT /api/auth/change-password - Change password
DELETE /api/auth/delete-account - Delete account
URL Management
POST /api/create - Create short URL
GET /:slug - Redirect to original URL
POST /api/user/urls - Get user's URLs
DELETE /api/user/url/:id - Delete user's URL
Analytics
GET /api/analytics/:slug - Get URL analytics
AI Features
POST /api/ai/slug - Generate AI slug
Admin
GET /api/admin/all-urls - Get all URLs
DELETE /api/admin/url/:slug - Delete any URL
PATCH /api/admin/url/:slug/toggle - Toggle URL status
Payments
POST /api/payment/create-order - Create payment order
POST /api/payment/verify - Verify payment
🎨 UI/UX Features
Dark Theme: Modern dark design with gradient accents
Responsive: Mobile-first design that works on all devices
Animations: Smooth GSAP-powered animations
Real-time Updates: Live data updates without page refresh
Toast Notifications: User-friendly feedback system
Loading States: Skeleton loaders and progress indicators
🔒 Security Features
JWT Authentication: Secure token-based auth
Password Hashing: bcrypt for secure password storage
Rate Limiting: Arcjet-powered request throttling
Input Validation: Comprehensive validation middleware
CORS Protection: Configured cross-origin policies
SQL Injection Protection: MongoDB/Mongoose built-in protection
📊 Analytics
Track detailed metrics for each short URL:

Click Count: Total clicks over time
Geographic Data: Country-based click distribution
Device Analytics: Browser and OS breakdown
Time-based Trends: Hourly/daily click patterns
💰 Monetization
Credits System: Users purchase URL credits
Tiered Pricing: Pro (100 credits) and Business (1000 credits) plans
Razorpay Integration: Secure Indian payment processing
Usage Tracking: Real-time credit consumption
🤖 AI Features
Smart Slug Generation: AI creates meaningful, brand-safe slugs
Context Awareness: Slugs based on URL content and purpose
SEO Friendly: Hyphenated, lowercase slugs for better search visibility
🧪 Testing
# Backend tests
cd Backend
npm test

# Frontend tests
cd Frontend
npm test
📦 Deployment
Backend Deployment
# Build for production
npm run build

# Start with PM2
pm2 start ecosystem.config.js
Frontend Deployment
# Build for production
npm run build

# Serve static files
npm run preview
🤝 Contributing
Fork the repository
Create a feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request
📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

🙏 Acknowledgments
Express.js - Web framework
React - UI library
MongoDB - Database
Tailwind CSS - Styling
GSAP - Animations
Razorpay - Payments
Groq - AI API
📞 Support
For support, email support@linkly.com or join our Discord community.

Made with ❤️ by the Linkly team" > README.md

