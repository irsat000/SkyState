import React, { useState, useRef, useEffect } from "react";
import { GeoAltFill, Search, ChevronCompactUp, ChevronCompactDown } from "react-bootstrap-icons";
import wCodeData from '../data/weatherCodes.json';




export const Page_Home = (props) => {
    const [wdata, setWdata] = useState(null);
    const [locationData, setLocationData] = useState(null);

    function fetchDataByCurrentLocation() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                fetchDataByCoords(position.coords.latitude, position.coords.longitude);

                fetch(`https://ipinfo.io/json?token=d9a9368faea8a6`)
                    .then((res) => res.json())
                    .then((data) => {
                        setLocationData(`${data.city} - ${data.country} - Current location`);
                    })
                    .catch((err) => console.log('Error =>', err));
            }, (err) => {
                console.log("Error:", err.message)
                //console.log("Failed to get current location. Please choose one instead.")
            });
        } else {
            console.log("Failed to get geolocation.")
            //geolocation is not available
        }
    }

    const fetchDataByCoords = (latitude, longitude) => {
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,windspeed_10m_max&forecast_days=8&timezone=Europe%2FBerlin`)
            .then((res) => res.json())
            .then((data) => {
                setWdata(data);
            })
            .catch((err) => console.log('Error =>', err));
    }

    useEffect(() => {
        fetchDataByCurrentLocation();
    }, []);

    const date = new Date();
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const getWeekday = (offset) => weekdays[(date.getDay() + offset) % weekdays.length];

    const [weeklyActive, setWeeklyActive] = useState(false);
    const [weeklyListActive, setWeeklyListActive] = useState(false);

    const [searchSuggestions, setSearchSuggestions] = useState(null);

    const refWeekly = useRef(null);
    const refWeeklyBtn = useRef(null);

    const handleWeeklyActive = () => {
        setWeeklyActive(true);
        setTimeout(() => {
            setWeeklyListActive(true);
        }, 10); //Gotta wait after display change for transition to have an effect
    };

    const clickOutside = (event) => {
        if (refWeekly.current && !refWeekly.current.contains(event.target) && !refWeeklyBtn.current.contains(event.target)) {
            setWeeklyListActive(false);
            setTimeout(() => {
                setWeeklyActive(false);
            }, 100); //100 because transition is 0.1s
        }
    };

    const handleSearchChange = (func, delay) => {
        let timeoutId;
        return function (...args) {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                func.apply(null, args);
            }, delay);
        };
    }

    const fetchSearchSuggestions = (inputVal) => {
        fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=5&q=${inputVal}&autocomplete=1`)
            .then((res) => res.json())
            .then((data) => {
                const suggestionList = data.map((v, i) => v.display_name);
                setSearchSuggestions(suggestionList);
            })
            .catch((err) => console.log("Error =>", err));
    };

    const getLatLng = (city) => {
        const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${city}`;
        fetch(apiUrl)
            .then((res) => res.json())
            .then((data) => {
                const latitude = data[0].lat;
                const longitude = data[0].lon;
                fetchDataByCoords(latitude, longitude);
                setLocationData(data[0].display_name);
            })
            .catch((err) => console.log("Error =>", err));
    }

    useEffect(() => {
        document.addEventListener("mousedown", clickOutside);
        return () => {
            document.removeEventListener("mousedown", clickOutside);
        };
    }, []);

    return (
        <>
            <div className="page_content">
                <header>
                    <div className="searchbar-cont">
                        <input type="text" placeholder="Search by region" onChange={handleSearchChange((event) => {
                            fetchSearchSuggestions(event.target.value);
                        }, 500)} />
                        <Search className="icon" />
                        <ul className="search_suggestions">
                            {searchSuggestions != null &&
                                searchSuggestions.map((value, i) =>
                                    <li key={i} onMouseDown={() => getLatLng(value)}>
                                        {value}
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                    <div className="location-cont">
                        <GeoAltFill className="icon" />
                        <span>{locationData ? `${locationData}` : "No location info"}</span>
                    </div>
                </header>
                <main className="today_info-cont">
                    <div className="weather_condition">
                        <div className="weather">
                            <img src={require(`../assets/conditions/${wCodeData.find(obj => obj.keys.includes(wdata?.daily.weathercode[0]))?.value ?? 'noimage.png'}`)} alt="Weather condition" />
                        </div>
                        <div className="temperature">
                            <span>{wdata != null ? `${((wdata.daily.temperature_2m_min[0] + wdata.daily.temperature_2m_max[0]) / 2).toFixed(1)}°C` : "--"}</span>
                        </div>
                    </div>
                    <div className="extra_condition">
                        <div className="humidity">
                            <span>Humidity</span>
                            <span className="value">
                                {wdata != null ? `${(wdata.hourly.relativehumidity_2m.slice(0, 24).reduce((acc, curr) => acc + curr, 0) / 24).toFixed(1)}%` : "--"}
                            </span>
                        </div>
                        <div className="windSpeed">
                            <span>Wind speed</span>
                            <span className="value">
                                {wdata != null ? `${wdata.daily.windspeed_10m_max[0].toFixed(1)} km/h` : "--"}
                            </span>
                        </div>
                    </div>
                </main>
                <section className="hourly_weather">
                    <h6 className="todays_name">{weekdays[date.getDay()]}</h6>
                    <ul className="hourly_list">
                        <li>
                            <span>8:00</span>
                            <img src={require(`../assets/conditions/${wCodeData.find(obj => obj.keys.includes(wdata?.hourly.weathercode[7]))?.value ?? 'noimage.png'}`)} alt="Hourly weather condition" />
                            <span>{wdata != null ? `${wdata.hourly.temperature_2m[7].toFixed(1)}°` : "-"}</span>
                        </li>
                        <li>
                            <span>12:00</span>
                            <img src={require(`../assets/conditions/${wCodeData.find(obj => obj.keys.includes(wdata?.hourly.weathercode[11]))?.value ?? 'noimage.png'}`)} alt="Hourly weather condition" />
                            <span>{wdata != null ? `${wdata.hourly.temperature_2m[11].toFixed(1)}°` : "-"}</span>
                        </li>
                        <li>
                            <span>17:00</span>
                            <img src={require(`../assets/conditions/${wCodeData.find(obj => obj.keys.includes(wdata?.hourly.weathercode[16]))?.value ?? 'noimage.png'}`)} alt="Hourly weather condition" />
                            <span>{wdata != null ? `${wdata.hourly.temperature_2m[16].toFixed(1)}°` : "-"}</span>
                        </li>
                        <li>
                            <span>21:00</span>
                            <img src={require(`../assets/conditions/${wCodeData.find(obj => obj.keys.includes(wdata?.hourly.weathercode[20]))?.value ?? 'noimage.png'}`)} alt="Hourly weather condition" />
                            <span>{wdata != null ? `${wdata.hourly.temperature_2m[20].toFixed(1)}°` : "-"}</span>
                        </li>
                    </ul>
                </section>
                <section className="weekly_weather-desktop">
                    <ul className="weekly_list">
                        {[...Array(7)].map((x, i) =>
                            <li key={i}>
                                <span>{getWeekday(i + 1)}</span>
                                <img src={require(`../assets/conditions/${wCodeData.find(obj => obj.keys.includes(wdata?.daily.weathercode[i + 1]))?.value ?? 'noimage.png'}`)} alt="Daily weather condition" />
                                <span>{wdata != null ? `${((wdata.daily.temperature_2m_min[i + 1] + wdata.daily.temperature_2m_max[i + 1]) / 2).toFixed(1)}°` : "-"}</span>
                            </li>
                        )}
                    </ul>
                </section>
            </div>
            <div className="show_weekly-cont">
                <button ref={refWeeklyBtn} className="show_weekly-btn" onClick={handleWeeklyActive}>Next 7 days <ChevronCompactUp className="icon" /></button>
            </div>
            <section className={`weekly_weather-mobile ${weeklyActive ? 'active' : ''}`}>
                <div ref={refWeekly} className={`weekly_list-cont ${weeklyListActive ? 'active' : ''}`}>
                    <ChevronCompactDown className="icon" />
                    <ul className="weekly_list">
                        {[...Array(7)].map((x, i) =>
                            <li key={i}>
                                <span>{getWeekday(i + 1)}</span>
                                <img src={require(`../assets/conditions/${wCodeData.find(obj => obj.keys.includes(wdata?.daily.weathercode[i + 1]))?.value ?? 'noimage.png'}`)} alt="Daily weather condition" />
                                <span>{wdata != null ? `${((wdata.daily.temperature_2m_min[i + 1] + wdata.daily.temperature_2m_max[i + 1]) / 2).toFixed(1)}°` : "-"}</span>
                            </li>
                        )}
                    </ul>
                </div>
            </section>
        </>
    );
}