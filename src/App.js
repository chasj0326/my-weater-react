import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import axios from 'axios';
import useGeoLocation from 'react-hook-geolocation'
import { Reset } from 'styled-reset';
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  
  const location = useGeoLocation();
  const API_KEY = '2a042b74912ce5cacc0b90fa7000e555';
  const loc = { lat: location.latitude, lon:location.longitude }
  const [city, setCity] = useState('');
  const loc_url = `https://api.openweathermap.org/data/2.5/weather?lat=${loc.lat}&lon=${loc.lon}&lang=kr&units=metric&appid=${API_KEY}`;
  const city_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=kr&units=metric&appid=${API_KEY}`;
  const [result, setResult] = useState({});
  const [time, setTime] = useState('');
  const locWeather = async() => {
    try{
      const object = await axios({
        method: 'get',
        url: loc_url
      })
      setResult(object.data);
      setTime(object.data.weather[0].icon[2]);
    }
    catch(err){
      alert(err);
    }
  }
  const cityWeather = async(e) => {
    if(e.key==='Enter'){
      try{
        const object = await axios({
          method: 'get',
          url: city_url
        })
        setResult(object.data);
        setTime(object.data.weather[0].icon[2]);
      }
      catch(err){
        alert(err);
      }
    }
  }
  const resultShow = (result) => {
    if(Object.keys(result).length!==0){
      return(
        <div>
          <div className="city"> {result.name}</div>
          <div className="sky"> {result.weather[0].main} </div>
          <div className="temperature"> 
            {Math.round(result.main.temp)}<span>°</span>
          </div>
          <div className="highlowtemp">
            최고:{Math.round(result.main.temp_max)}°
            최저:{Math.round(result.main.temp_min)}°
          </div>
          <div className='icon'>
            <img src={`/icons/${result.weather[0].icon}.svg`}/>
          </div>
        </div>
      )
    }else{
      return(
        <div>
          <div className='_icons'>☁️⛅🌤️🌥️🌦️🌨️🌧️🌪️</div>
          <div className='_text'>
          도시를 입력하거나,<br/><br/>현재위치 날씨보기 버튼을 클릭하세요<br/><br/>날씨를 알려드립니다
          </div>
          <div className='_arrow'>▼</div>
        </div>
      )
    }
  }
  return (
    <>
      <Reset/>
      <Background 
        style={time===''?{color:'black'}:
        (time==='n'?
        {background:'black',color:'white',textShadow:'0px 0px 20px rgba(255,255,255,.8)'}
        :{background:'royalblue',color:'white',textShadow:'0px 0px 20px rgba(0,0,0,.2)'})}>
        <Frame>
          <ResultWrapper>
            {resultShow(result)}
          </ResultWrapper>
          <InputWrapper>
            <input
              placeholder='도시를 입력하세요'
              value={city}
              onChange={(e)=>setCity(e.target.value)}
              type='text'
              onKeyDown={cityWeather}
            />
            <button onClick={()=>{locWeather()}}>현재위치 날씨보기</button>
          </InputWrapper>
        </Frame>
      </Background>
    </>
  );
}

export default App;

const Background = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  transition: .5s;
`

const Frame = styled.div`
  position: absolute;
  width: 600px;
  height: 800px;
  top:0; bottom:0; left:0; right:0;
  transform: translateY(-50px);
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 20px;
  box-sizing: border-box;
`

const ResultWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  div{
    text-align: center;
  }
  .city{
    font-size: 40px;
    margin-bottom: 16px;
  }
  .sky{
    font-size: 20px;
  }
  .temperature{
    font-size:90px;
    margin: 20px;
  }
  .highlowtemp{
    font-size: 18px;
    letter-spacing: 1px;
    margin-bottom: 30px;
  }
  .icon{
    img{
      height: 320px;
    }
  }
  ._icons{
    font-size: 20px;
    letter-spacing: 5px;
    margin-bottom: 30px;
  }
  ._text{
    margin-bottom: 20px;
  }
  ._arrow{
    font-size: 20px;
  }
`

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  input{
    display: block;
    height: 50px;
    width: 300px;
    text-align: center;
    background-color: transparent;
    color: inherit;
    margin-bottom: 32px;
    border: none;
    border-bottom: 2px solid;
    font-size: 18px;
    &:focus{
      outline: none;
    }
    &::placeholder{
      color: inherit;
      opacity: .5;
    }
  }
  button{
    display: block;
    width: max-content;
    font-size: 16px;
    padding: 10px 20px;
    cursor: pointer;
    background-color: rgba(255,255,255,.35);
    color: inherit;
    border: 4px solid;
    border-color: inherit;
  }
`