import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./CheckWeather.css";
import L from "leaflet";
import { FiSearch, FiCalendar, FiMapPin, FiChevronDown } from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function ChangeView({ center }) {
  const map = useMap();
  map.setView(center, 10);
  return null;
}

function CheckWeather() {
  // --- States ---
  const [city, setCity] = useState("");                 // User input city name
  const [position, setPosition] = useState([37.7749, -122.4194]); // Default position (San Francisco)
  const [markerPos, setMarkerPos] = useState(null);     // Marker position on map
  const [selectedCity, setSelectedCity] = useState(""); // Selected city name
  const [selectedDate, setSelectedDate] = useState(null); // Selected date from DatePicker
  const [loading, setLoading] = useState(false);        // Loading state for API calls
  const [error, setError] = useState(null);             // Error messages
  const navigate = useNavigate();

  // --- Current date & max date (today + 1 year) ---
  const currentDate = new Date("2025-10-01T20:02:00Z"); 
  const maxDate = new Date(currentDate);
  maxDate.setFullYear(currentDate.getFullYear() + 1);

  // --- Search city by name using Nominatim API ---
  const searchCity = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${city}&accept-language=en`
      );
      if (!res.ok) throw new Error("Failed to fetch location");
      const data = await res.json();

      if (data.length > 0) {
        const { lat, lon, display_name } = data[0];
        const newPos = [parseFloat(lat), parseFloat(lon)];
        setPosition(newPos);      // Update map center
        setMarkerPos(newPos);     // Place marker
        setSelectedCity(display_name); // Store full city name
      } else {
        setError("City not found");
      }
    } catch (error) {
      setError("Error fetching location");
    } finally {
      setLoading(false);
    }
  };

  // --- Reverse geocoding (get city name from map click coordinates) ---
  const getCityName = async (lat, lon) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=en`
      );
      if (!res.ok) throw new Error("Failed to fetch city name");
      const data = await res.json();

      if (data && data.address) {
        const cityName =
          data.address.city ||
          data.address.town ||
          data.address.village ||
          data.address.country;
        setSelectedCity(cityName); // Update selected city
        setCity(cityName);         // Sync city input field
      }
    } catch (error) {
      setError("Error fetching city name");
    } finally {
      setLoading(false);
    }
  };

  // --- Fetch weather data from your backend API ---
  const getWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const apiUrl = 'https://paradeguardapi-production.up.railway.app/api/Weather/predict';
      const method = 'POST';
      const formattedDate = selectedDate.toISOString().split('T')[0]; // YYYY-MM-DD format

      // Determine if using coordinates or location name
      let body;
      if (position[0] !== 37.7749 || position[1] !== -122.4194) { // Not default position
        body = {
          latitude: position[0],
          longitude: position[1],
          date: formattedDate,
        };
      } else {
        // Fallback to location name (first part of selectedCity)
        const locationName = selectedCity.split(',')[0].trim() || selectedCity;
        body = {
          locationName,
          date: formattedDate,
        };
      }

      console.log('API Request at', new Date().toLocaleString('en-US', { timeZone: 'Europe/Athens' }),
                  ':', { url: apiUrl, method, body });

      let response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      console.log('API Response Status:', response.status);
      console.log('API Response Headers:', response.headers);

      if (!response.ok) {
        let errorMsg = `API error: ${response.status} ${response.statusText}`;
        if (response.status === 404) {
          errorMsg = 'API endpoint not found. Check URL/path in backend code and redeploy.';
        } else if (response.status === 400) {
          errorMsg = 'Invalid input: Check location/date format. Ensure locationName is a valid city/country or provide valid latitude/longitude. Backend response:';
          const errorText = await response.text();
          console.error('API Error Details at', new Date().toLocaleString('en-US', { timeZone: 'Europe/Athens' }), ':', errorText);
          errorMsg += ` ${errorText}`;
        } else if (response.status >= 500) {
          errorMsg = 'Server error. Check Railway logs and try again later.';
        }
        throw new Error(errorMsg);
      }

      const data = await response.json();
      console.log('API Raw Response at', new Date().toLocaleString('en-US', { timeZone: 'Europe/Athens' }), ':', data);

      // Map API response to required format
      const weatherData = {
        temperature: data.stats?.avgTemperature ?? 0,
        rainfall: data.stats?.avgPrecipitation ?? 0,
        humidity: data.stats?.avgHumidity ?? 0,
        wind: data.stats?.avgWindSpeed ?? 0,
      };

      // Check if stats object exists and has the required fields, allow 0 as valid
      if (!data.stats || typeof data.stats.avgTemperature === 'undefined' || typeof data.stats.avgPrecipitation === 'undefined' ||
          typeof data.stats.avgHumidity === 'undefined' || typeof data.stats.avgWindSpeed === 'undefined') {
        throw new Error('Incomplete data from API. Ensure backend returns a valid stats object with {avgTemperature, avgPrecipitation, avgHumidity, avgWindSpeed}. Received:', JSON.stringify(data));
      }

      // Calculate weather classification
      let classification = "normal";
      if (weatherData.temperature > 30) {
        classification = "veryhot";
      } else if (weatherData.temperature < 10) {
        classification = "verycold";
      } else if (weatherData.rainfall > 10) {
        classification = "verywet";
      }
      else if (weatherData.wind > 4) {
        classification = "verywindy";
      }

      // Add classification to weatherData
      weatherData.classification = classification;


      return weatherData;
    } catch (error) {
      console.error('API Error at', new Date().toLocaleString('en-US', { timeZone: 'Europe/Athens' }), ':', error);
      setError(error.message || 'Failed to fetch weather data from backend. Check console for details.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // --- Handle button click ---
  const handleCheckNow = async () => {
    if (!selectedCity) {
      setError("Please select a city");
      return;
    }
    if (!selectedDate) {
      setError("Please select a date");
      return;
    }
    try {
      await searchCity(); // Optional: Still call for map update
      const weather = await getWeather();
      if (!weather || Object.keys(weather).length === 0) {
        throw new Error('Invalid weather data received. Check API response.');
      }
      navigate('/checkweather/results', {
        state: {
          city: selectedCity,
          date: selectedDate,
          weatherData: weather, // {temperature, rainfall, humidity, wind, classification}
        },
      });
    } catch (error) {
      console.error('Error in handleCheckNow at', new Date().toLocaleString('en-US', { timeZone: 'Europe/Athens' }), ':', error);
      setError(error.message || 'An error occurred. Please try again.');
    }
  };

  // --- Marker component: places marker when user clicks on the map ---
  function LocationMarker() {
    useMapEvents({
      click(e) {
        const newPos = [e.latlng.lat, e.latlng.lng];
        setMarkerPos(newPos);
        setPosition(newPos);
        getCityName(e.latlng.lat, e.latlng.lng);
      },
    });
    return markerPos ? (
      <Marker position={markerPos}>
        <Popup>{selectedCity || "Selected location"}</Popup>
      </Marker>
    ) : null;
  }

  return (
    <div className="page-container">
      {/* --- Left Form Section --- */}
      <div className="form-section">
        <h2 className="form-title">Set Your Parameters</h2>
        <p className="form-subtitle">
          Choose any day within the next 12 months. RAHLA Cast analyzes 40 years
          of NASA weather data for that same date to show you what the weather
          is likely to be.
        </p>

        {/* --- Location Input --- */}
        <div className="input-group">
          <label htmlFor="location-input" className="input-label">
            Location
          </label>
          <div className="input-wrapper pill">
            <FiSearch className="input-icon" />
            <input
              id="location-input"
              type="text"
              placeholder="Address, City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && searchCity()}
              onBlur={searchCity}
              aria-label="Location"
            />
          </div>
        </div>

        {/* --- Date Input with DatePicker --- */}
        <div className="input-group">
          <label htmlFor="date-input" className="input-label">
            Date
          </label>
          <div className="input-wrapper pill date">
            <FiCalendar className="input-icon" />
            <DatePicker
              id="date-input"
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              placeholderText="Select a date"
              minDate={currentDate}
              maxDate={maxDate}
              className="date-picker"
              aria-label="Date"
            />
            <FiChevronDown className="chev-icon" />
          </div>
        </div>

        {/* --- Loading & Error Messages --- */}
        {loading && <p className="loading">Loading...</p>}
        {error && <p className="error">{error}</p>}
        {/* --- Weather Button --- */}
        <button
          onClick={handleCheckNow}
          className="btn-weather"
          disabled={loading || !selectedCity || !selectedDate}
        >
          Check Now
        </button>

      </div>

      {/* --- Right Map Section --- */}
      <div className="map-section">
        <div className="map-header">
          <FiMapPin className="map-icon" />
          <span>Select an area on the map</span>
        </div>
        <div className="map-wrapper">
          <MapContainer
            center={position}
            zoom={10}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            <ChangeView center={position} />
            <LocationMarker />
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default CheckWeather;