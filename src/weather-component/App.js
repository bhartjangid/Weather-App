import './App.css';
import Form from './form'
import '../weather-component/FontAwesomeIcon'
import { faSun, faCloudMeatball, faCloudShowersHeavy, faSnowflake, faWind, faRainbow,faCloud } from '@fortawesome/free-solid-svg-icons';
import React from 'react'
import Weather from './weather.component.js'
import 'bootstrap/dist/css/bootstrap.min.css';

// const API_Key = "969fccb0e99c4514b0f125049212408";
const API_Key = "0a071f8b68b623a3ad2391751fcde9ce";
  // api.openweathermap.org/data/2.5/weather?q=London,uk&appid={API key}
  // api.openweathermap.org/data/2.5/weather?q=London&appid={API key}

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      city:undefined,
      country:undefined,
      icon:undefined,
      main:undefined,
      celsius:undefined,
      temp_max:undefined,
      temp_min:undefined,
      description:"",
      error:false
    };
    // this.getWeather();
  }

  getCelsius(temperature){
    const cell = Math.floor(temperature - 273.15);
    return cell;
  }

  get_weatherIcon(rangeID){
    if(rangeID >= 200 && rangeID <=232){
      this.setState({icon:faWind});
    }else if(rangeID >= 300 && rangeID <=321){
      this.setState({icon:faRainbow});
    }else if(rangeID >= 500 && rangeID <= 531){
      this.setState({icon:faCloudShowersHeavy});
    }else if(rangeID >= 600 && rangeID <= 622){
      this.setState({icon:faSnowflake});
    }else if(rangeID >= 701 && rangeID <= 781){
      this.setState({icon:faCloudMeatball});
    }else if(rangeID >= 801 && rangeID <= 804){
      this.setState({icon:faCloud});
    }else if(rangeID === 800){
      this.setState({icon:faSun});
    }
  }

  getWeather = async (e) => {
    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    if(city&&country){
      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_Key}`)
      const resp = await api_call.json();
      console.log(resp);
  
      this.setState({
        city:`${resp.name},${resp.sys.country}`,
        country:resp.sys.country,
        main:resp.main,
        celsius:this.getCelsius(resp.main.temp),
        temp_max:this.getCelsius(resp.main.temp_max),
        temp_min:this.getCelsius(resp.main.temp_min),
        description:resp.weather[0].description,
        error:false
      });
  
      this.get_weatherIcon(resp.weather[0].id);
    }else{
      this.setState({error:true});
    }
   
  };

  render(){
    return(
      <div className="App">
        <Form loadweather={this.getWeather} error={this.state.error}/>
    <Weather city={this.state.city} country={this.state.country} temp={this.state.celsius} temp_min={this.state.temp_min} temp_max={this.state.temp_max} cloud={this.state.description} pic={this.state.icon}/>
    </div>
    )
  }
}


export default App;
