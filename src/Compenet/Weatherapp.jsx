import React, { useEffect, useRef, useState } from 'react'
import serach from '../assets/search.png'
import './weather.css'
import clear from '../assets/clear.png'
import cloud from '../assets/cloud.png'
import drizzle from '../assets/drizzle.png'
import rain from '../assets/rain.png'
import snow from '../assets/snow.png'
import wind from '../assets/wind.png'
import humidity from '../assets/humidity.png'
import axios from 'axios'

function Weatherapp() {
    const apikey="7674c261a5380a9bf4865a0e72c2cadc"
    const inpuref=useRef()
    const [weather,setweather]=useState(false)
    const allicon={
        "01d":clear,
        "01n":clear,
        "02d":clear,
        "02n":cloud,
        "03n":cloud,
        "04d":drizzle,
        "04n":drizzle,
        "09d":rain,
        "09n":rain,
        "10d":rain,
        "10n":rain,
        "13d":snow,
        "13n":snow,
        

    }

     
    const search=(city)=>{
        if(!city){
            alert("Enter the place")
        }
        
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`).
        then((Response)=>{
            
            console.log(Response.data)
            const icon=allicon[Response.data.weather[0].icon]|| clear
            setweather({
            humidity:Response.data.main.humidity,
            temp:Math.floor(Response.data.main.temp),
            winspeed:Response.data.wind.speed,
            location:Response.data.name,
            icon:icon

        })
        
    })
        .catch((error)=>{
            alert(error.message)
            console.log(error)
        })
        inpuref.current.value=""
        
        

    }
    
    
    return (
    <div className='weather'>
        <div className='search-bar'>
            <input ref={inpuref} type="text" placeholder='search' />
            <img src={serach} onClick={()=>search(inpuref.current.value)} alt="" />
        </div>
        {weather?<><img src={weather.icon} alt="" className='weather-icon' />
        <p className='temperture'>{weather.temp}°C</p>
        <p className='location'>{weather.location}</p>
        <div className="weather-data">
            <div className="col">
                <img src={humidity} alt="" />
                <p>{weather.humidity}</p>
                <span>humidity</span>
            </div>
            <div className="col">
                <img src={wind} alt="" />
                <p>{weather.winspeed}km/h</p>
                <span>wind speed</span>
            </div>
            
        </div>
</>:<></>}
        
    </div>
        
    )
}

export default Weatherapp
