import React from "react";
import { GeoAltFill, Search } from "react-bootstrap-icons";
//import logo from '../logo.svg';


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
            <div className="today_info-cont">
                <div className="weather_condition">
                    <div className="weather">
                        <img src={``} alt="Weather condition" />
                    </div>
                    <div className="temperature">
                        <span>20°C</span>
                    </div>
                </div>
                <div className="extra_condition">
                    <div className="humidity">
                        <span>Humidity</span>
                        <span>50%</span>
                    </div>
                    <div className="windSpeed">
                        <span>Wind speed</span>
                        <span>30 km/h</span>
                    </div>
                </div>
            </div>
        </div>
    );
}