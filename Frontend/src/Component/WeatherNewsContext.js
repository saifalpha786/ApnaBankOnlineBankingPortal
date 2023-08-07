import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const WeatherNewsContext = createContext();

export const WeatherNewsContextProvider = (props) => {
  const [data, setData] = useState();
  const apiKey = "pub_26141a60af60d4c9d372dac1fef9b8b68168f";
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    axios
      .get(
        `https://newsdata.io/api/1/news?apikey=${apiKey}&q=weather&country=in&language=${language}`
      )
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  }, [language]);

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <WeatherNewsContext.Provider value={{ data }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          // marginBottom: "20px",
        }}
      >
        <label
          htmlFor="languageSelect"
          style={{
            marginRight: "10px",
            fontSize: "16px",
            color: "#333",
          }}
        >
          Select Language:
        </label>
        <select
          id="languageSelect"
          value={language}
          onChange={handleLanguageChange}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            backgroundColor: "#f5f5f5",
            fontSize: "14px",
          }}
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="mr">Marathi</option>
          <option value="te">Telugu</option>
        </select>
      </div>
      {props.children}
    </WeatherNewsContext.Provider>
  );
};
