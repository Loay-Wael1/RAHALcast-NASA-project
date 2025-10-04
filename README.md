# 🌍 RAHLA Cast - Weather Forecasting Application

<div align="center">
  <img src="public/Logo.png" alt="RAHLA Cast Banner" width="150"/>
</div>


**Predict Weather Conditions Using 40 Years of NASA Earth Observation Data**

[![NASA Space Apps Challenge 2025](https://img.shields.io/badge/NASA-Space%20Apps%20Challenge%202025-blue?style=for-the-badge&logo=nasa)](https://www.spaceappschallenge.org/)
[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge&logo=vercel)](https://raha-lcast-nasa-project.vercel.app/)
[![Backend API](https://img.shields.io/badge/Backend-Railway-purple?style=for-the-badge&logo=railway)](https://github.com/Loay-Wael1/ParadeGuardApi)

*Built for NASA Space Apps Challenge 2025: "Will It Rain on My Parade?"*

[Live Demo](https://raha-lcast-nasa-project.vercel.app/) • [API Repository](https://github.com/Loay-Wael1/ParadeGuardApi) • [Report Bug](mailto:hossamsalah.cse@gmail.com) • [Request Feature](mailto:hossamsalah.cse@gmail.com)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [The Problem We're Solving](#-the-problem-were-solving)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [Getting Started](#-getting-started)
- [Usage Guide](#-usage-guide)
- [API Documentation](#-api-documentation)
- [Architecture](#-architecture)
- [Data Sources](#-data-sources)
- [Team](#-team)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**RAHLA Cast** is an intelligent weather forecasting application that empowers users to plan outdoor activities with confidence. By leveraging **40 years of NASA Earth observation data**, our platform predicts weather conditions for any location and date within the next 12 months, helping users answer the critical question: *"Will it rain on my parade?"*

### 🎯 Challenge Context

Developed for the **NASA Space Apps Challenge 2025**, RAHLA Cast addresses the challenge of enabling people worldwide to make informed decisions about outdoor events by providing:

- **Historical Climate Analysis**: 40 years of NASA satellite data
- **Location-Specific Predictions**: Anywhere on Earth
- **Forward-Looking Forecasts**: Up to 12 months in advance
- **AI-Powered Recommendations**: Personalized activity suggestions

---

## 🔍 The Problem We're Solving

Planning outdoor activities—whether it's a wedding, parade, hiking trip, or sports event—requires accurate weather predictions. Traditional weather forecasts only cover 7-14 days, leaving event planners uncertain about long-term conditions.

### Our Solution

RAHLA Cast analyzes **historical weather patterns** from NASA's comprehensive Earth observation datasets to provide:

✅ **Long-term predictions** (up to 12 months)  
✅ **Statistical confidence** based on 40 years of data  
✅ **Location-specific insights** via interactive mapping  
✅ **Multi-parameter analysis** (temperature, rainfall, humidity, wind)  
✅ **AI-powered recommendations** for activity planning  

---

## ✨ Key Features

### 🗺️ **Interactive Location Selection**
- **City Search**: Type any city name globally
- **Map Pin-Drop**: Click anywhere on the interactive map
- **Coordinate Display**: Real-time latitude/longitude tracking
- **Powered by Leaflet & OpenStreetMap**

### 📅 **Flexible Date Selection**
- Choose any date up to **12 months in advance**
- Date-specific historical analysis
- Visual calendar picker interface

### 🌤️ **Comprehensive Weather Analysis**
Predictions for four critical parameters:
- 🌡️ **Temperature** (°C) - Average, min, max
- 🌧️ **Rainfall** (mm) - Precipitation probability
- 💧 **Humidity** (%) - Atmospheric moisture
- 💨 **Wind Speed** (m/s) - Wind conditions

### 📊 **Advanced Data Visualization**
Four distinct chart types for deep insights:
- **Bar Charts**: Temperature trends over 40 years
- **Line Charts**: Rainfall patterns and anomalies
- **Scatter Plots**: Humidity distribution analysis
- **Radar Charts**: Multi-parameter wind analysis

### 🤖 **AI-Powered Chatbot**
Intelligent assistant powered by **Groq API (Llama 3.3 70B)**:
- Safety assessments for outdoor activities
- Personalized packing recommendations
- Activity suggestions based on conditions
- Photography and timing tips
- Health and comfort advice

### 💾 **Data Export**
- **JSON Format**: Complete dataset for developers
- **CSV Format**: Spreadsheet-ready for analysis
- One-click download functionality

### 🌓 **Theme Customization**
- Dark mode for nighttime planning
- Light mode for daytime use
- Smooth transition animations
- Persistent user preference

---

## 🛠️ Technology Stack

### **Frontend**
| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework with hooks |
| **Vite** | Fast build tool and dev server |
| **React Router** | Client-side routing |
| **Leaflet** | Interactive mapping |
| **Recharts** | Data visualization |
| **React DatePicker** | Date selection UI |
| **Lucide React** | Modern icon library |
| **Bootstrap 5** | Responsive styling |

### **Backend**
| Technology | Purpose |
|------------|---------|
| **ASP.NET Core** | RESTful API framework |
| **Railway** | Cloud hosting platform |
| **NASA APIs** | Earth observation data |

### **AI Integration**
| Technology | Purpose |
|------------|---------|
| **Groq API** | LLM inference platform |
| **Llama 3.3 70B** | Large language model |

### **Data Sources**
- NASA GES DISC (Goddard Earth Sciences Data)
- NASA POWER (Prediction Of Worldwide Energy Resources)
- MERRA-2 (Modern-Era Retrospective Analysis)
- NASA Giovanni (Data Visualization)
- NASA Earthdata & Worldview

---

## 🚀 Getting Started

### **Prerequisites**

Ensure you have the following installed:
- **Node.js** (v16.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v7.0.0 or higher) - Comes with Node.js
- **Git** (for cloning) - [Download](https://git-scm.com/)
- A modern web browser (Chrome, Firefox, Safari, Edge)

### **Installation**

#### 1️⃣ **Clone the Repository**
```bash
git clone <repository-url>
cd rahla-cast
```

#### 2️⃣ **Install Dependencies**
```bash
npm install
```

This installs all required packages:
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.22.0",
  "leaflet": "^1.9.4",
  "react-leaflet": "^4.2.1",
  "recharts": "^2.12.0",
  "react-datepicker": "^6.1.0",
  "lucide-react": "^0.344.0",
  "react-icons": "^5.0.1",
  "bootstrap": "^5.3.3"
}
```

#### 3️⃣ **Environment Configuration**

Create a `.env` file in the root directory:
```env
# Groq API Configuration
VITE_GROQ_API_KEY=your_groq_api_key_here

# Backend API (Optional - defaults to Railway)
VITE_API_URL=https://paradeguardapi-production.up.railway.app
```

> **⚠️ Security Note**: Never commit `.env` files to version control. Add it to `.gitignore`:
```bash
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore
```

#### 4️⃣ **Start Development Server**
```bash
npm run dev
```

The application will launch at `http://localhost:5173`

#### 5️⃣ **Build for Production**
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

---

## 📖 Usage Guide

### **Step 1: Navigate to Weather Check**
1. Visit the [live demo](https://raha-lcast-nasa-project.vercel.app/)
2. Click **"Check Weather"** from the homepage
3. You'll be redirected to the interactive search page

### **Step 2: Select Your Location**

**Option A: Search by City**
```
1. Type city name in search box
2. Press Enter or click Search
3. Map auto-centers to location
```

**Option B: Pin-Drop on Map**
```
1. Click anywhere on the map
2. A pin marks your selection
3. Coordinates display automatically
```

### **Step 3: Choose Your Date**
```
1. Click the date picker
2. Select any date within next 12 months
3. Date format: MM/DD/YYYY
```

### **Step 4: Analyze Results**
Click **"Check Now"** to:
- Fetch 40 years of historical data
- Calculate statistical predictions
- Generate visualizations
- Enable AI chatbot

### **Step 5: Explore Predictions**

**Weather Statistics Card**
- Average temperature, rainfall, humidity, wind
- Weather classification (Normal/Hot/Cold/Wet/Windy)
- Visual condition indicator

**Historical Charts**
- 📊 Temperature bar chart (40-year trend)
- 📈 Rainfall line chart (precipitation patterns)
- 🔵 Humidity scatter plot (distribution)
- 🕸️ Wind radar chart (directional analysis)

**AI Chatbot Assistance**
Ask questions like:
- *"Is it safe for hiking on this date?"*
- *"What should I pack for this weather?"*
- *"What outdoor activities do you recommend?"*
- *"What time of day is best to visit?"*

**Export Your Data**
- Click **"Download JSON"** for raw data
- Click **"Download CSV"** for spreadsheet analysis

---

## 🔌 API Documentation

### **Endpoint: Weather Prediction**

**URL**: `POST https://paradeguardapi-production.up.railway.app/api/Weather/predict`

**Headers**:
```http
Content-Type: application/json
```

### **Request Format**

**Option 1: Location Name**
```json
{
  "locationName": "Cairo",
  "date": "2025-12-25"
}
```

**Option 2: Coordinates**
```json
{
  "latitude": 30.0444,
  "longitude": 31.2357,
  "date": "2025-12-25"
}
```

### **Response Format**

```json
{
  "stats": {
    "avgTemperature": 28.5,
    "avgPrecipitation": 2.3,
    "avgHumidity": 65,
    "avgWindSpeed": 3.2
  },
  "allDays": [
    {
      "year": 2024,
      "temp": 29.0,
      "precip": 1.5,
      "humidity": 60,
      "windSpeed": 3.0
    },
    {
      "year": 2023,
      "temp": 27.0,
      "precip": 2.0,
      "humidity": 63,
      "windSpeed": 3.5
    }
    // ... 38 more years
  ]
}
```

### **Weather Classification Logic**

| Condition | Criteria |
|-----------|----------|
| **Very Hot** | Temperature > 30°C |
| **Very Cold** | Temperature < 10°C |
| **Very Wet** | Rainfall > 10mm |
| **Very Windy** | Wind Speed > 4 m/s |
| **Normal** | All parameters within range |

---

## 🏗️ Architecture

### **Project Structure**
```
rahla-cast/
├── public/                      # Static assets
│   ├── Logo.png                # Dark theme logo
│   ├── Logo3.png               # Light theme logo
│   ├── vid-1.mp4 to vid-5.mp4  # Background videos
│   ├── weather/                # Weather images
│   │   ├── normal.jpeg
│   │   ├── veryhot.jpeg
│   │   ├── verycold.jpeg
│   │   ├── verywet.jpeg
│   │   └── verywindy.jpeg
│   └── members/                # Team photos
│
├── src/
│   ├── components/
│   │   ├── Nav.jsx            # Navigation + Theme Toggle
│   │   ├── nav.css
│   │   ├── Footer.jsx         # Footer component
│   │   ├── Footer.css
│   │   └── Error.jsx          # 404 page
│   │
│   ├── pages/
│   │   ├── Home.jsx           # Landing page
│   │   ├── Home.css
│   │   ├── About.jsx          # About page
│   │   ├── About.css
│   │   ├── CheckWeather.jsx   # Search page + Map
│   │   ├── CheckWeather.css
│   │   ├── Result.jsx         # Results display
│   │   ├── Results.css
│   │   ├── WeatherChatbot.jsx # AI chatbot
│   │   └── WeatherChatbot.css
│   │
│   ├── App.jsx                # Router configuration
│   ├── App.css                # Global app styles
│   ├── index.css              # CSS variables + themes
│   └── main.jsx               # React entry point
│
├── .env                        # Environment variables (gitignored)
├── .gitignore                  # Git ignore rules
├── package.json                # Dependencies
├── vite.config.js              # Vite configuration
└── README.md                   # This file
```

### **Component Hierarchy**
```
App
├── Nav (Persistent)
├── Routes
│   ├── Home
│   ├── About
│   ├── CheckWeather
│   │   ├── LocationSearch
│   │   ├── MapComponent
│   │   └── DatePicker
│   └── Result
│       ├── WeatherStats
│       ├── Charts (4 types)
│       ├── WeatherChatbot
│       └── ExportButtons
└── Footer (Persistent)
```

### **Data Flow**
```
User Input (Location + Date)
    ↓
Frontend Validation
    ↓
API Request to Railway Backend
    ↓
Backend Queries NASA Data APIs
    ↓
Statistical Analysis (40 years)
    ↓
JSON Response to Frontend
    ↓
State Management (React)
    ↓
UI Rendering (Charts + Stats)
    ↓
AI Chatbot Context Loading
    ↓
User Interaction & Export
```

---

## 🛰️ Data Sources

RAHLA Cast aggregates data from multiple NASA Earth observation programs:

| Source | Description | Usage |
|--------|-------------|-------|
| **NASA GES DISC** | Goddard Earth Sciences Data Center | Historical climate data |
| **NASA POWER** | Prediction Of Worldwide Energy Resources | Solar, temperature, wind data |
| **MERRA-2** | Modern-Era Retrospective Analysis | Atmospheric reanalysis |
| **Giovanni** | NASA's Web-based Data Visualization | Data processing tools |
| **Earthdata** | NASA's Earth Science Data Portal | Satellite observations |
| **Worldview** | NASA's Satellite Imagery Platform | Visual verification |

### **Data Coverage**
- **Temporal**: 1985 - 2025 (40 years)
- **Spatial**: Global coverage
- **Parameters**: Temperature, Precipitation, Humidity, Wind Speed
- **Resolution**: Daily measurements

---



## 🐛 Troubleshooting

### **Common Issues & Solutions**

#### 🔴 **Module Not Found Errors**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### 🔴 **Port Already in Use**
```bash
# Vite will auto-select another port
# Or manually specify:
npm run dev -- --port 3000
```

#### 🔴 **API Connection Failed**
**Symptoms**: "Failed to fetch weather data" error

**Solutions**:
1. ✅ Verify internet connection
2. ✅ Check backend status: [Railway Dashboard](https://railway.app)
3. ✅ Test API directly:
   ```bash
   curl -X POST https://paradeguardapi-production.up.railway.app/api/Weather/predict \
     -H "Content-Type: application/json" \
     -d '{"locationName":"Cairo","date":"2025-12-25"}'
   ```
4. ✅ Check browser console (F12) for CORS errors
5. ✅ Ensure location and date are both selected

#### 🔴 **Map Not Loading**
**Solutions**:
1. ✅ Check Leaflet CSS is imported in `main.jsx`:
   ```javascript
   import 'leaflet/dist/leaflet.css';
   ```
2. ✅ Clear browser cache (Ctrl+Shift+Delete)
3. ✅ Verify network tab for blocked resources

#### 🔴 **Chatbot Not Responding**
**Solutions**:
1. ✅ Verify Groq API key in `.env`:
   ```env
   VITE_GROQ_API_KEY=gsk_...
   ```
2. ✅ Check API rate limits (free tier: 30 requests/min)
3. ✅ Ensure weather data loaded before asking questions
4. ✅ Check console for 401/403 errors

#### 🔴 **Charts Not Displaying**
**Solutions**:
1. ✅ Verify `recharts` installation:
   ```bash
   npm install recharts
   ```
2. ✅ Check if `allDays` array exists in API response
3. ✅ Ensure data has 40 entries (years)

#### 🔴 **Build Errors**
```bash
# Clean build cache
rm -rf dist node_modules/.vite
npm run build
```

#### 🔴 **Environment Variables Not Loading**
**Solutions**:
1. ✅ Restart dev server after changing `.env`
2. ✅ Use `VITE_` prefix for all variables
3. ✅ Access via `import.meta.env.VITE_*`

---

## 🧪 Testing

### **Manual Testing Checklist**

- [ ] Location search works for multiple cities
- [ ] Map pin-drop updates coordinates
- [ ] Date picker accepts future dates only
- [ ] API returns valid response
- [ ] All 4 charts render correctly
- [ ] Chatbot responds to queries
- [ ] JSON export downloads
- [ ] CSV export downloads
- [ ] Theme toggle persists
- [ ] Responsive on mobile devices

### **Browser Compatibility**

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Supported |
| Firefox | 88+ | ✅ Supported |
| Safari | 14+ | ✅ Supported |
| Edge | 90+ | ✅ Supported |

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### **1. Fork the Repository**
```bash
git clone https://github.com/yourusername/rahla-cast.git
cd rahla-cast
git checkout -b feature/your-feature-name
```

### **2. Make Your Changes**
- Follow existing code style
- Add comments for complex logic
- Update documentation if needed

### **3. Test Thoroughly**
```bash
npm run dev    # Test locally
npm run build  # Ensure build succeeds
```

### **4. Submit Pull Request**
- Describe your changes
- Reference related issues
- Wait for code review

### **Coding Standards**
- Use functional React components
- Follow ESLint rules
- Write descriptive commit messages
- Keep components under 300 lines

---

## 📜 License

This project was built for **NASA Space Apps Challenge 2025**.

**Open Source License**: MIT (add LICENSE file if needed)

**NASA Data**: Public domain under NASA's open data policy

**Third-Party Libraries**: See `package.json` for individual licenses

---

## 🙏 Acknowledgments

- **NASA** for providing open Earth observation data
- **NASA Space Apps Challenge** for organizing this global event
- **Groq** for AI infrastructure
- **Vercel** for frontend hosting
- **Railway** for backend hosting
- All open-source contributors whose libraries power this project

---

## 📞 Support

Need help? Reach out:

- **Email**:loayw842@gmail.com
- **Live Demo**: [raha-lcast-nasa-project.vercel.app](https://raha-lcast-nasa-project.vercel.app/)
- **Backend Repo**: [ParadeGuardApi](https://github.com/Loay-Wael1/ParadeGuardApi)
- **NASA Space Apps**: [Challenge Page](https://www.spaceappschallenge.org/)

---

## 🎯 Project Status

🟢 **Active Development** - NASA Space Apps Challenge 2025

**Current Version**: 1.0.0  
**Last Updated**: October 2025  
**Next Milestone**: Challenge Submission Deadline

---

<div align="center">

**Made with ❤️ by Team RAHLA for NASA Space Apps Challenge 2025**

[![NASA](https://img.shields.io/badge/NASA-Space%20Apps-blue?style=flat&logo=nasa)](https://www.spaceappschallenge.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue?style=flat&logo=react)](https://reactjs.org/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat&logo=vercel)](https://vercel.com/)

*Empowering global communities to plan outdoor activities with confidence using NASA Earth observation data*

</div>
