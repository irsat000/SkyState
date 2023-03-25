import React from "react";
import { GeoAltFill, Search, ChevronCompactUp } from "react-bootstrap-icons";
//import logo from '../logo.svg';
import W_Rain from "../assets/conditions/rain.png";


export const Page_Home = () => {
    return (
        <div className="page_content">
            <header>
                <div className="searchbar-cont">
                    <input type="text" placeholder="Search by region" />
                    <Search className="icon" />
                </div>
                <div className="location-cont">
                    <GeoAltFill className="icon" />
                    <span>Bursa - Türkiye</span>
                </div>
            </header>
            <main className="today_info-cont">
                <div className="weather_condition">
                    <div className="weather">
                        <img src={W_Rain} alt="Weather condition" />
                    </div>
                    <div className="temperature">
                        <span>20°C</span>
                    </div>
                </div>
                <div className="extra_condition">
                    <div className="humidity">
                        <span>Humidity</span>
                        <span className="value">50%</span>
                    </div>
                    <div className="windSpeed">
                        <span>Wind speed</span>
                        <span className="value">30 km/h</span>
                    </div>
                </div>
            </main>
            <section className="hourly_weather">
                <h6 className="todays_name">Tuesday</h6>
                <ul className="hourly_list">
                    <li>
                        <span>8:00</span>
                        <img src={W_Rain} alt="Hourly weather condition" />
                        <span>24°</span>
                    </li>
                    <li>
                        <span>12:00</span>
                        <img src={W_Rain} alt="Hourly weather condition" />
                        <span>28°</span>
                    </li>
                    <li>
                        <span>17:00</span>
                        <img src={W_Rain} alt="Hourly weather condition" />
                        <span>18°</span>
                    </li>
                    <li>
                        <span>21:00</span>
                        <img src={W_Rain} alt="Hourly weather condition" />
                        <span>16°</span>
                    </li>
                </ul>
            </section>
            <div className="weekly_report-cont">
                <button className="show_weekly_report">Next 7 days <ChevronCompactUp className="icon" /></button>
            </div>
        </div>
    );
}