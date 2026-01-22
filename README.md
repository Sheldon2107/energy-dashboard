# 🏭 Industrial Energy Monitoring Dashboard

A real-time web-based dashboard for monitoring energy consumption, carbon emissions, and operational costs across industrial equipment.

### Dashboard Overview
<img width="1127" height="866" alt="image" src="https://github.com/user-attachments/assets/4d28f698-f860-492b-9f9b-6661e4b9daec" />

<img width="1152" height="867" alt="image" src="https://github.com/user-attachments/assets/843b8e4a-4348-4662-bf2e-c977dd28a3f2" />

<img width="1135" height="865" alt="image" src="https://github.com/user-attachments/assets/0e418739-5ce0-4442-8757-7de96ad73180" />


---

## 🎯 Project Overview

This project demonstrates a full-stack web application designed to help facility managers and operations teams monitor industrial equipment performance in real-time. The dashboard provides:

- **Real-time Metrics**: Track energy consumption (kWh), carbon emissions (kg CO₂), and operational costs (RM)
- **Equipment Filtering**: View data for specific equipment (pumps, compressors, generators)
- **Time-Series Analysis**: Interactive charts showing energy usage patterns over time
- **Scalable Architecture**: Ready for integration with IoT sensors and industrial monitoring systems

### 💡 Business Value

- Enables data-driven decision-making for energy optimization
- Supports carbon footprint reduction initiatives
- Facilitates predictive maintenance through usage pattern analysis
- Provides cost visibility for operational budgeting

---

## 🚀 Features

✅ **Dynamic Equipment Selection** - Filter data by equipment type  
✅ **Real-Time Calculations** - Automatic aggregation of total energy, CO₂, and costs  
✅ **Interactive Charting** - Powered by Chart.js with time-series support  
✅ **RESTful API** - Clean JSON endpoints for data access  
✅ **Responsive Design** - Works on desktop and mobile devices  
✅ **Data Processing** - Efficient handling with Pandas  

---

## 🛠️ Tech Stack

### Backend
- **Python 3.11** - Core programming language
- **Flask 3.0** - Web framework for RESTful API
- **Pandas 2.1** - Data processing and CSV handling
- **Gunicorn** - Production WSGI server

### Frontend
- **JavaScript (ES6)** - Interactive functionality
- **Chart.js 4.0** - Data visualization
- **chartjs-adapter-date-fns** - Time-series support
- **HTML5/CSS3** - Structure and styling

### Deployment
- **Render** - Cloud hosting platform
- **Git/GitHub** - Version control

---

## 📋 Installation & Setup

### Prerequisites
- Python 3.11+
- pip (Python package manager)
- Git

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/energy-monitoring-dashboard.git
cd energy-monitoring-dashboard
```

2. **Create virtual environment**
```bash
python -m venv venv

# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Generate sample data**
```bash
python data_generator.py
```

5. **Run the application**
```bash
python app.py
```

6. **Open in browser**
```
http://localhost:5000
```

---

## 📁 Project Structure

```
energy-monitoring-dashboard/
│
├── app.py                      # Flask application & API endpoints
├── data_generator.py           # Script to generate sample sensor data
├── requirements.txt            # Python dependencies
├── README.md                   # Project documentation
│
├── data/
│   └── sensor_data.csv        # Time-series equipment data
│
├── templates/
│   └── index.html             # Dashboard HTML template
│
├── static/
│   ├── dashboard.js           # Frontend JavaScript logic
│   └── style.css              # (Optional) Custom styles
│
└── screenshots/               # Dashboard screenshots for README
    ├── dashboard-main.png
    ├── equipment-metrics.png
    └── chart-view.png
```

---

## 🔌 API Endpoints

### `GET /api/data`

Returns all equipment sensor data in JSON format.

**Response:**
```json
[
  {
    "timestamp": "2025-01-22 10:30:00",
    "equipment": "PUMP-01",
    "energy": 145.67,
    "carbon": 43.70,
    "cost": 72.84
  },
  ...
]
```

**Status Codes:**
- `200` - Success
- `404` - CSV file not found
- `500` - Server error (missing columns or processing error)

---

## 📊 Data Format

The CSV file (`sensor_data.csv`) contains the following columns:

| Column       | Type     | Description                          |
|-------------|----------|--------------------------------------|
| timestamp   | datetime | Reading time (YYYY-MM-DD HH:MM:SS)  |
| equipment_id| string   | Equipment identifier (e.g., PUMP-01)|
| energy      | float    | Energy consumption in kWh            |
| carbon      | float    | CO₂ emissions in kg                  |
| cost        | float    | Operational cost in RM               |

### Sample Data
```csv
timestamp,equipment_id,energy,carbon,cost
2025-01-22 10:30:00,PUMP-01,145.67,43.70,72.84
2025-01-22 10:31:00,COMP-01,234.12,93.65,117.06
2025-01-22 10:32:00,GEN-01,189.45,56.84,94.73
```

---

## 🎨 Features in Detail

### 1. Equipment Selection
Users can select from available equipment types:
- **PUMP-01** - Industrial water pump
- **COMP-01** - Air compressor
- **GEN-01** - Backup generator

### 2. Metric Cards
Three key metrics displayed in real-time:
- **Total Energy (kWh)** - Cumulative energy consumption
- **Total CO₂ (kg)** - Carbon emissions generated
- **Total Cost (RM)** - Operational expenses

### 3. Time-Series Chart
Interactive line chart showing:
- Energy consumption over time
- Minute-level granularity
- Hover tooltips with exact values
- Responsive scaling

---

## 🚀 Deployment

### Deploy to Render

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Create Render Account**
   - Visit https://render.com
   - Sign up with GitHub

3. **Create Web Service**
   - Click "New +" → "Web Service"
   - Connect your repository
   - Configure settings:
     - **Build Command:** `pip install -r requirements.txt`
     - **Start Command:** `gunicorn app:app`
     - **Environment:** Python 3

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (~2-3 minutes)
   - Access via provided URL

---

## 🔮 Future Enhancements

### Planned Features
- [ ] **IoT Integration** - Connect to real industrial sensors (MQTT, OPC-UA)
- [ ] **Database Storage** - Migrate from CSV to PostgreSQL/MongoDB
- [ ] **User Authentication** - Multi-user support with role-based access
- [ ] **Alert System** - Email/SMS notifications for threshold breaches
- [ ] **Predictive Analytics** - ML models for failure prediction
- [ ] **Export Functionality** - Download reports as PDF/Excel
- [ ] **Multi-site Support** - Monitor equipment across multiple facilities
- [ ] **Mobile App** - Native iOS/Android applications
- [ ] **Real-time Streaming** - WebSocket integration for live updates
- [ ] **Custom Dashboards** - User-configurable widgets and layouts

### Technical Improvements
- [ ] Unit testing with pytest
- [ ] CI/CD pipeline with GitHub Actions
- [ ] Docker containerization
- [ ] API rate limiting and caching
- [ ] Logging and monitoring (e.g., Sentry)

---
## 🙏 Acknowledgments

- Chart.js team for the excellent visualization library
- Flask community for comprehensive documentation
- Render for free hosting platform
- All open-source contributors

