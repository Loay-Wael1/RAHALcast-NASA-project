import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaCloudRain, FaTemperatureThreeQuarters, FaWind } from 'react-icons/fa6';
import { WiHumidity } from 'react-icons/wi';
import './Results.css';
import {  
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ScatterChart, Scatter,
  LineChart,
  BarChart,
  ComposedChart,
  Line,
  Bar,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import WeatherChatbot from './WeatherChatbot'; 

export default function Results() {
  const { state } = useLocation();
  const { city, date, weatherData } = state || {};
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fetchTriggered, setFetchTriggered] = useState(false); // Prevent multiple fetches

  // Fallback values for partial data
  const { temperature, rainfall, humidity, wind, classification } = weatherData || {};
  const temp = temperature || 0;
  const rain = rainfall || 0;
  const hum = humidity || 0;
  const windSpeed = wind || 0;
  const classif = classification || 'normal';

  // Determine background image based on classification
  const backgroundStyle = {
    backgroundImage: `url(/weather/${classif.toLowerCase()}.jpeg)`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
  };

  // Determine icon image based on classification
  let iconPath = '/cloud.png'; // Default for normal
  if (classif.toLowerCase() === 'veryhot') {
    iconPath = '/sun.png';
  } else if (classif.toLowerCase() === 'verycold') {
    iconPath = '/snow.png'; 
  } else if (classif.toLowerCase() === 'verywet') {
    iconPath = '/rain.png'; 
  } else if (classif.toLowerCase() === 'verywindy') {
    iconPath = '/wind.png'; 
  }
  

  // Fetch historical data from the API
  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!city || !date || !weatherData || fetchTriggered) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      setFetchTriggered(true); // Mark as triggered to prevent re-fetch
      try {
        const apiUrl = 'https://paradeguardapi-production.up.railway.app/api/Weather/predict';
        const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD

        const body = {
          locationName: city.split(',')[0].trim() || city,
          date: formattedDate,
        };

        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          throw new Error(`API Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        if (data && data.allDays && Array.isArray(data.allDays) && data.allDays.length > 0) {
          // Transform allDays to match expected structure
          const transformedData = data.allDays.map(item => ({
            year: item.year,
            temperature: item.temp || 0,
            rainfall: item.precip || 0, // Use 0 if null
            humidity: item.humidity || 0,
            wind: item.windSpeed || 0,
          }));
          setHistoryData(transformedData);
        } else {
          setHistoryData([]); // Fallback if no allDays or empty
          console.warn('No valid allDays data in API response. Response:', JSON.stringify(data, null, 2));
          // Fallback to current data as a single point
          setHistoryData([{ year: new Date().getFullYear(), temperature: temp, rainfall: rain, humidity: hum, wind: windSpeed }]);
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message || 'Failed to fetch historical data. Check console for details.');
        // Fallback to current data on error
        setHistoryData([{ year: new Date().getFullYear(), temperature: temp, rainfall: rain, humidity: hum, wind: windSpeed }]);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [city, date, weatherData, fetchTriggered, temp, rain, hum, windSpeed]);

  if (!weatherData) {
    return (
      <div className="results">
        <h2>Weather Results</h2>
        <div className="error">No weather data available. Please try again.</div>
      </div>
    );
  }

// Function to download data as JSON (selected date + 40 years history)
const downloadJSON = () => {
  if (!historyData || historyData.length === 0) {
    alert("Historical data is not loaded yet. Please try again later.");
    return;
  }

  const jsonData = JSON.stringify(
    {
      selectedDate: {
        city,
        date: date.toISOString().split("T")[0],
        temperature: temp,
        rainfall: rain,
        humidity: hum,
        wind: windSpeed,
        classification: classif,
      },
      history: historyData, 
    },
    null,
    2
  );

  const blob = new Blob([jsonData], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `weather_${city}_${date.toISOString().split("T")[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
};


// Function to download data as CSV (selected date + 40 years history)
const downloadCSV = () => {
  let csvRows = [];

  // Selected date first
  csvRows.push("Type,Date,Temperature (°C),Rainfall (mm),Humidity (%),Wind (m/s),Classification");
  csvRows.push(
    `Selected,${date.toISOString().split("T")[0]},${temp},${rain},${hum},${windSpeed},${classif}`
  );

  // Historical data
  if (historyData && historyData.length) {
    historyData.forEach((entry) => {
      csvRows.push(
        `History,${entry.year},${entry.temperature || ""},${entry.rainfall || ""},${entry.humidity || ""},${entry.wind || ""},`
      );
    });
  }

  const csvData = csvRows.join("\n");
  const blob = new Blob([csvData], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `weather_${city}_${date.toISOString().split("T")[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};


  return (
    <div className="results" style={backgroundStyle}>
      <div className="results-content">
        <h2 className='h2'>Weather Forecast for {city} on {date ? date.toLocaleDateString() : 'Selected Date'}</h2>
        <div className="main">
          <div className="cards">
            <div className="cardd">
              <div className="up">
                <h3>Temperature</h3>
                <FaTemperatureThreeQuarters size={35} />
              </div>
              <div className="down">
                <h1>{temp}°C {temperature === undefined ? '(Not available)' : ''}</h1>
              </div>
            </div>
            <div className="cardd">
              <div className="up">
                <h3>Rainfall</h3>
                <FaCloudRain size={35} />
              </div>
              <div className="down">
                <h1>{rain}mm {rainfall === undefined ? '(Not available)' : ''}</h1>
              </div>
            </div>
            <div className="cardd">
              <div className="up">
                <h3>Humidity</h3>
                <WiHumidity size={45} />
              </div>
              <div className="down">
                <h1>{hum}% {humidity === undefined ? '(Not available)' : ''}</h1>
              </div>
            </div>
            <div className="cardd">
              <div className="up">
                <h3>Wind</h3>
                <FaWind size={35} />
              </div>
              <div className="down">
                <h1>{windSpeed} m/s {wind === undefined ? '(Not available)' : ''}</h1>
              </div>
            </div>
          </div>
          <div className="imgg" style={{ backgroundImage: `url(${iconPath})` }}>
            <h1>{classif}</h1>
          </div>

        </div>
        <div className="charts-section">

          <div className="charts-grid">
            <div className="chart-box">
              <h3>Temperature analysis</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={historyData.length ? historyData : [{ year: new Date().getFullYear(), temperature: temp }]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="temperature" fill="#00C4B4" barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-box">
              <h3>Rainfall analysis</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={historyData.length ? historyData : [{ year: new Date().getFullYear(), rainfall: rain }]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="rainfall" stroke="#00C4B4" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-box">
              <h3>Humidity analysis</h3>
              <ResponsiveContainer width="100%" height={300}>
                <ScatterChart
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid />
                  <XAxis dataKey="year" name="Year" />
                  <YAxis dataKey="humidity" name="Humidity (%)" />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Legend />
                  <Scatter name="Humidity" data={historyData} fill="#00C4B4" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-box">
              <h3>Wind analysis</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={historyData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="year" />
                  <PolarRadiusAxis />
                  <Tooltip />
                  <Legend />
                  <Radar
                    name="Wind"
                    dataKey="wind"
                    stroke="#00C4B4"
                    fill="#00C4B4"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        
        </div>

        <div className="chatbot-section">
          <WeatherChatbot 
            initialWeatherData={weatherData} 
            location={city} 
            date={date} 
          />
        </div>

        <div className="download-buttons">
          <h2>Download Full Report</h2>
          <h5 style={{ marginTop: '-15px' }}>Get the complete dataset for your records</h5>
          <button className="download-btn" onClick={downloadJSON} disabled={loading || !weatherData}>Download JSON</button>
          <button className="download-btn" onClick={downloadCSV} disabled={loading || !weatherData}>Download CSV</button>
        </div>
      </div>
    </div>
  );
}