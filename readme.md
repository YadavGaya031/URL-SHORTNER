# Linkly - Modern URL Shortener

A full-stack URL shortening service built with Node.js, Express, MongoDB, and React. Features AI-powered slug generation, real-time analytics, QR codes, user authentication, credits system, payments integration, and an admin panel.

## ✨ Features

### 🚀 Core Functionality
- **URL Shortening**: Create branded short links with custom or auto-generated slugs
- **AI-Powered Slugs**: Generate meaningful, SEO-friendly slugs using Groq AI (Llama model)
- **QR Codes**: Instant QR code generation for every short link
- **Expiry Management**: Set automatic expiration dates or days for time-sensitive links
- **Credits System**: Pay-as-you-go with initial 5 credits, purchase more via Razorpay
- **Real-time Analytics**: Track clicks, browser, OS, device, referrer, geographic data, and timestamps

### 👤 User Management
- **Authentication**: Secure user registration and login with JWT tokens
- **Profile Management**: Update name, change password (with email notification), delete account
- **Dashboard**: Manage all your shortened URLs, view credits, and analytics

### 🔧 Admin Panel
- **Global URL Management**: View, toggle active status, and delete any URL
- **User Oversight**: Monitor all users and their activities
- **System Control**: Enable/disable URLs system-wide

### 🛡️ Security & Performance
- **Secure Redirects**: Fast, privacy-focused URL redirection with analytics tracking
- **Data Encryption**: Secure password hashing with bcrypt and JWT tokens
- **Input Validation**: Comprehensive validation and error handling with custom middleware
- **CORS Protection**: Configured for cross-origin requests

## 🏗️ Tech Stack

### Backend
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **AI**: Groq API with LangChain (Llama 3 model)
- **Payments**: Razorpay
- **Security**: Arcjet, bcrypt, bcryptjs
- **QR Generation**: qrcode npm package
- **Geo Analytics**: geoip-lite, ua-parser-js
- **Validation**: Custom middleware and try-catch wrappers

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **Animations**: GSAP, Framer Motion
- **UI Components**: Radix UI (via shadcn/ui)
- **HTTP Client**: Axios
- **Notifications**: Sonner
- **Icons**: Lucide React
- **Charts**: React CountUp

### DevOps & Tools
- **Process Management**: Nodemon for development
- **Environment**: dotenv
- **Linting**: ESLint
- **Build**: Vite for frontend, Node for backend

## 📁 Project Structure

```
url-shortner/
├── Backend/
│   ├── .env
│   ├── .gitignore
│   ├── index.js                    # Server entry point
│   ├── package-lock.json
│   ├── package.json
│   └── src/
│       ├── config/
│       │   ├── arcjet.config.js    # Arcjet security config
│       │   ├── config.js           # Cookie options
│       │   ├── db.js               # MongoDB connection
│       │   └── razorpay.js         # Razorpay payment config
│       ├── controllers/
│       │   ├── admin.controller.js # Admin operations
│       │   ├── ai.controller.js    # AI slug generation
│       │   ├── analytics.controller.js # Analytics fetching
│       │   ├── auth.controller.js  # Authentication
│       │   ├── payment.controller.js # Payment processing
│       │   ├── qr.controller.js    # QR code generation
│       │   ├── short_url.controller.js # URL shortening & redirects
│       │   └── user.controller.js  # User operations
│       ├── dao/
│       │   ├── short_url.dao.js    # URL data access
│       │   └── user.dao.js         # User data access
│       ├── middlewares/
│       │   ├── auth.middleware.js  # JWT authentication
│       │   ├── rateLimit.middleware.js # Rate limiting
│       │   └── role.middleware.js  # Role-based access
│       ├── models/
│       │   ├── analytics.model.js  # Analytics schema
│       │   ├── short_url.model.js  # Short URL schema
│       │   └── user.model.js       # User schema
│       ├── routes/
│       │   ├── admin.route.js      # Admin routes
│       │   ├── ai.route.js         # AI routes
│       │   ├── analytics.route.js  # Analytics routes
│       │   ├── auth.routes.js      # Auth routes
│       │   ├── payment.routes.js   # Payment routes
│       │   ├── qr.routes.js        # QR routes
│       │   ├── short_url.route.js  # URL creation routes
│       │   └── user.routes.js      # User routes
│       ├── services/
│       │   ├── ai.service.js       # AI slug generation
│       │   ├── auth.service.js     # Auth logic
│       │   └── short_url.service.js # URL creation logic
│       └── utils/
│           ├── attachUser.js       # User attachment middleware
│           ├── errorHandler.js     # Error handling
│           ├── helper.js           # JWT signing, NanoID generation
│           ├── sendEmail.js        # Email utility
│           └── tryCatchWrapper.js  # Async error wrapper
├── Frontend/
│   ├── .gitignore
│   ├── components.json
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.js
│   ├── public/
│   │   └── vite.svg
│   └── src/
│       ├── api/
│       │   └── axiosClient.js      # API client
│       ├── assets/
│       │   ├── login.png
│       │   ├── logo.png
│       │   ├── qr.jpg
│       │   └── react.svg
│       ├── components/
│       │   ├── Magnet.jsx
│       │   ├── PayButton.jsx
│       │   ├── Socialicon.jsx
│       │   ├── animation/
│       │   │   ├── FloatingParticles.tsx
│       │   │   └── Magnet.jsx
│       │   ├── common/
│       │   │   ├── AdminRoute.jsx
│       │   │   ├── Loader.jsx
│       │   │   ├── ProtectedRoute.jsx
│       │   │   └── QRCodeModal.jsx
│       │   ├── layout/
│       │   │   ├── Footer.jsx
│       │   │   └── Navbar.jsx
│       │   └── ui/                  # shadcn/ui components
│       ├── context/
│       │   └── AuthContext.jsx     # Auth context
│       ├── lib/
│       │   ├── gsap.js
│       │   └── utils.ts
│       ├── pages/
│       │   ├── About.jsx
│       │   ├── AdminPanel.jsx
│       │   ├── Analytics.jsx
│       │   ├── Contact.jsx
│       │   ├── CreateURL.jsx
│       │   ├── Dashboard.jsx
│       │   ├── Home.jsx
│       │   ├── Login.jsx
│       │   ├── NotFound.jsx
│       │   ├── Pricing.jsx
│       │   ├── Profile.jsx
│       │   ├── Register.jsx
│       │   └── rough.jsx
│       ├── App.css
│       ├── App.jsx
│       ├── index.css
│       └── main.jsx
├── readme.md
└── .env.example (if exists)
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or Atlas)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/url-shortner.git
   cd url-shortner
   ```

2. **Backend Setup**
   ```bash
   cd Backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd ../Frontend
   npm install
   ```

4. **Environment Configuration**
   - Copy `.env.example` to `.env` in Backend directory
   - Configure the following variables in `Backend/.env`:
     ```
     MONGO_URI=mongodb://localhost:27017/linkly
     JWT_SECRET=your-super-secret-jwt-key
     APP_URL=http://localhost:3000
     RAZORPAY_KEY_ID=your_razorpay_key_id
     RAZORPAY_KEY_SECRET=your_razorpay_key_secret
     GROQ_API_KEY=your_groq_api_key
     AI_MODEL=llama3-8b-8192
     ```
   - For Frontend, create `.env` in Frontend directory:
     ```
     VITE_APP_URL=http://localhost:3000
     ```

5. **Database Setup**
   - Ensure MongoDB is running locally or update `MONGO_URI` for Atlas
   - The application will create collections automatically

### Running the Application

1. **Start Backend**
   ```bash
   cd Backend
   npm run dev  # For development with auto-reload
   # or
   npm start    # For production
   ```
   Backend runs on: http://localhost:3000

2. **Start Frontend**
   ```bash
   cd Frontend
   npm run dev
   ```
   Frontend runs on: http://localhost:5173

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token signing
- `APP_URL`: Base URL for the application (http://localhost:3000)
- `RAZORPAY_KEY_ID`: Razorpay public key
- `RAZORPAY_KEY_SECRET`: Razorpay secret key
- `GROQ_API_KEY`: API key for Groq AI
- `AI_MODEL`: AI model to use (llama3-8b-8192)

#### Frontend (.env)
- `VITE_APP_URL`: Backend API URL (http://localhost:3000)

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user info
- `PUT /api/auth/update-name` - Update user name
- `PUT /api/auth/change-password` - Change password
- `DELETE /api/auth/delete-account` - Delete account

### URL Management
- `POST /api/create` - Create short URL (authenticated or anonymous)
- `GET /:slug` - Redirect to original URL
- `POST /api/user/urls` - Get user's URLs (authenticated)
- `DELETE /api/user/url/:id` - Delete user's URL (authenticated)

### Analytics
- `GET /api/analytics/:slug` - Get analytics for a short URL (authenticated)

### AI Features
- `POST /api/ai/slug` - Generate AI-powered slug (authenticated)

### QR Codes
- `GET /api/qr/:slug` - Get QR code for short URL

### Payments
- `POST /api/payment/create-order` - Create Razorpay payment order (authenticated)
- `POST /api/payment/verify` - Verify payment (authenticated)

### Admin (Admin role required)
- `GET /api/admin/all-urls` - Get all URLs in system
- `DELETE /api/admin/url/:slug` - Delete any URL
- `PATCH /api/admin/url/:slug/toggle` - Toggle URL active status

## 🎨 UI/UX Features
- **Dark Theme**: Modern dark design with gradient accents
- **Responsive Design**: Mobile-first approach, works on all devices
- **Animations**: Smooth GSAP and Framer Motion animations
- **Real-time Updates**: Live data updates without page refresh
- **Toast Notifications**: User-friendly feedback with Sonner
- **Loading States**: Skeleton loaders and progress indicators
- **Interactive Elements**: Hover effects, transitions, and micro-interactions

## 🔒 Security Features
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Rate Limiting**: Arcjet-powered request throttling
- **Input Validation**: Comprehensive validation middleware
- **CORS Protection**: Configured cross-origin policies
- **SQL Injection Protection**: MongoDB/Mongoose built-in protection
- **Secure Cookies**: HttpOnly, Secure, SameSite cookies

## 📊 Analytics
Track detailed metrics for each short URL:
- **Click Count**: Total clicks over time
- **Geographic Data**: Country-based click distribution using geoip-lite
- **Device Analytics**: Browser, OS, and device type breakdown using ua-parser-js
- **Referrer Tracking**: Source of traffic
- **Time-based Trends**: Timestamped click data
- **IP Tracking**: Anonymized IP addresses

## 💰 Monetization
- **Credits System**: Users start with 10 credits, consume 1 per URL creation
- **Tiered Pricing**: 
  - Pro Plan: 100 credits
  - Business Plan: 1000 credits
- **Razorpay Integration**: Secure Indian payment processing
- **Usage Tracking**: Real-time credit consumption monitoring

## 🤖 AI Features
- **Smart Slug Generation**: AI creates meaningful, brand-safe slugs using Groq API
- **Context Awareness**: Slugs based on URL content and purpose
- **SEO Friendly**: Hyphenated, lowercase slugs for better search visibility
- **Prompt Engineering**: Custom prompts for consistent, high-quality results

## 📦 Deployment

### Backend Deployment
```bash
cd Backend
npm run build  # If build script exists
# Use PM2 or similar for production
pm2 start index.js --name "linkly-backend"
```

### Frontend Deployment
```bash
cd Frontend
npm run build
npm run preview  # For preview
# Deploy dist/ folder to static hosting
```

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments
- **Express.js** - Web framework
- **React** - UI library
- **MongoDB** - Database
- **Tailwind CSS** - Styling
- **GSAP** - Animations
- **Razorpay** - Payments
- **Groq** - AI API
- **Arcjet** - Security
- **Radix UI** - UI components

## 📞 Support
For support, email support@linkly.com or create an issue in the repository.

Made with ❤️ by the Linkly team

