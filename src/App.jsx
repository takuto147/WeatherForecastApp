import React, { useEffect, useState } from 'react';

export const App = () => {
  const [location, setLocation] = useState("")
  const [results, setResults] = useState([])
  const [weather, setWeather] = useState("")



  const onChangeLocation = (event) => {
    setLocation(event.target.value)
  }

  const onClickSearchLocation = async () => {
    try {
      const APIKEY = '4de25c05c73d9a289d5c2bbb6dc7f4c3'
      const API_URL_GEO = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${APIKEY}`;
      const response = await fetch(API_URL_GEO);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Data fetched successfully:', data);
      const { lat, lon, name } = data[0]
      setResults({ lat, lon, name })

    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  }


  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const APIKEY = '4de25c05c73d9a289d5c2bbb6dc7f4c3'
        const API_URL_WEATHER = `https://api.openweathermap.org/data/2.5/weather?lat=${results.lat}&lon=${results.lon}&appid=${APIKEY}&lang=ja`;
        const response = await fetch(API_URL_WEATHER);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Data fetched successfully:', data);
        setWeather(data.weather[0].description)
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    }

    fetchWeather()

  }, [results])

  return (
    <>
      <div>
        <input type="text" placeholder='都市名を入力' value={location} onChange={onChangeLocation} />
        <button onClick={onClickSearchLocation}>検索</button>
      </div>
      <div>
        {results.name &&
          <p>{results.name}の緯度、経度は…</p>
        }
        <p>緯度：{results.lat}</p>
        <p>経度：{results.lon}</p>
      </div>
      <div>
        <p>今の天気は{weather}です</p>

      </div>
    </>
  );
};