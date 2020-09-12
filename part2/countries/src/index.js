import React, { Component, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
const api_key = process.env.REACT_APP_API_KEY

const App = ()=>{
  const [result,setResult] = useState([])
  const [keyword,setKeyword] = useState('')

  const handleSearch = (e)=>{
    setKeyword(e.target.value)
  }
  useEffect(()=>{
    if (keyword!==""){
      axios.get("https://restcountries.eu/rest/v2/name/"+keyword).then((res)=>{
        console.log(res.data)
        setResult(res.data)
      })
    }
  },[keyword])
  return (
    <div>
       <div>find countries <input onChange={handleSearch}/></div>
       <div>
          <Result result={result}/>
       </div>
    </div>
  )
}

const Result = (props)=>{
  var result = props.result
  const [display,setDisplay] = useState(Array.apply(null, new Array(result.length)).map(()=>false));
  const handleDisplay = (e)=>{
    console.log(display,e.target.id)
    const copy = [...display]
    copy[e.target.id] = !copy[e.target.id]
    setDisplay(copy)
  }
  if (result){
    if (result.length>10){
      return <div>Too many matches, specify another filter</div>
    }
    else if (result.length>1){
      return (<div>
        {result.map((country,index)=>
          <div key={index}>{country.name} 
            <button onClick={handleDisplay} id={index}>show</button>
            {display[index] ? <Country country={country}/> : ''}
          </div>)
        }
      </div>)
    }else if (result.length ===1 ){
      return <Country country={result[0]}/>}
    else return <div></div>
  }
  // return <div>Too many matches, specify another filter</div>
}

class Country extends Component{
  constructor(props) {
    super(props);
    this.state = {
      weather : null
    };
  }
  componentWillMount(){
    const country = this.props.country
    axios.get("http://api.weatherstack.com/current?access_key="+api_key+"&query="+country.capital).then((res)=>{
      console.log(res.data)
      this.setState({weather:res.data})
      // return res.data.current
    })
  }
  
  // useEffect(() => {
  //   axios.get("http://api.weatherstack.com/current?access_key="+access.key+"&query="+country.capital).then((res)=>{
  //     console.log(res.data.current)
  //     setWeather(res.data.current)
  //     // return res.data.current
  //   })
  // },[])

  render(){
    const country = this.props.country
    return (<div>  
      <h2>{country.name}</h2>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h3>languages</h3>
      <ul>
        {
          country.languages.map((lang,idx)=><li key={idx}>{lang.name}</li>)
        }
      </ul>
      <img src={country.flag} style={{height:"80px"}}/>
      <Weather weather={this.state.weather}/>
      </div>
      )
  }
}

const Weather = (props)=>{
  let weather = props.weather
  if (weather)
    return (
      <div>
        <h2>Weather in {weather.location.name}</h2>
        <div><b>temperature:</b>{weather? weather.current["temperature"]:''} Celcius</div>
        {weather ?  weather.current["weather_icons"].map((icon,idx)=><img key={idx} src={icon}/>) :''}
        <div><b>wind:</b>{`${weather.current.wind_speed} mph direction ${weather.current.wind_dir}`}</div>
      </div>
    )
  else return <div>Fetching data ...</div>
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

