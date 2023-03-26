import React from "react";
import { GeoAltFill, Search, ChevronCompactUp, ChevronCompactDown } from "react-bootstrap-icons";
//import logo from '../logo.svg';
import W_Rain from "../assets/conditions/rain.png";


export const Page_Home = () => {
    return (
        <>
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
                <section className="weekly_weather-desktop">
                    <ul className="weekly_list">
                        <li>
                            <span>Wednesday</span>
                            <img src={W_Rain} alt="Hourly weather condition" />
                            <span>24°</span>
                        </li>
                        <li>
                            <span>Thursday</span>
                            <img src={W_Rain} alt="Hourly weather condition" />
                            <span>28°</span>
                        </li>
                        <li>
                            <span>Friday</span>
                            <img src={W_Rain} alt="Hourly weather condition" />
                            <span>18°</span>
                        </li>
                        <li>
                            <span>Saturday</span>
                            <img src={W_Rain} alt="Hourly weather condition" />
                            <span>16°</span>
                        </li>
                        <li>
                            <span>Sunday</span>
                            <img src={W_Rain} alt="Hourly weather condition" />
                            <span>16°</span>
                        </li>
                        <li>
                            <span>Monday</span>
                            <img src={W_Rain} alt="Hourly weather condition" />
                            <span>16°</span>
                        </li>
                        <li>
                            <span>Tuesday</span>
                            <img src={W_Rain} alt="Hourly weather condition" />
                            <span>16°</span>
                        </li>
                    </ul>
                </section>
            </div>
            <div className="show_weekly-cont">
                <button className="show_weekly-btn">Next 7 days <ChevronCompactUp className="icon" /></button>
            </div>
            <section className="weekly_weather-mobile">
                <div className="weekly_list-cont">
                    <ChevronCompactDown className="icon" />
                    <ul className="weekly_list">
                        <li>
                            <span>Wednesday</span>
                            <img src={W_Rain} alt="Hourly weather condition" />
                            <span>24°</span>
                        </li>
                        <li>
                            <span>Thursday</span>
                            <img src={W_Rain} alt="Hourly weather condition" />
                            <span>28°</span>
                        </li>
                        <li>
                            <span>Friday</span>
                            <img src={W_Rain} alt="Hourly weather condition" />
                            <span>18°</span>
                        </li>
                        <li>
                            <span>Saturday</span>
                            <img src={W_Rain} alt="Hourly weather condition" />
                            <span>16°</span>
                        </li>
                        <li>
                            <span>Sunday</span>
                            <img src={W_Rain} alt="Hourly weather condition" />
                            <span>16°</span>
                        </li>
                        <li>
                            <span>Monday</span>
                            <img src={W_Rain} alt="Hourly weather condition" />
                            <span>16°</span>
                        </li>
                        <li>
                            <span>Tuesday</span>
                            <img src={W_Rain} alt="Hourly weather condition" />
                            <span>16°</span>
                        </li>
                    </ul>
                </div>
            </section>
        </>
    );
}