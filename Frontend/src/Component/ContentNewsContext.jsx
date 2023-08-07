import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const ContentNewsContext = createContext();

export const ContentContextProvider = (props) => {
  const [data, setData] = useState();
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    axios

      .get(
        `http://localhost:9091/content/getListOfContent/${language}`
      )
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  }, [language]);

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <ContentNewsContext.Provider value={{ data }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <label htmlFor="languageSelect" style={{ marginRight: '10px', fontSize: '16px' }}>
          Select Language:
        </label>
        <select
          id="languageSelect"
          value={language}
          onChange={handleLanguageChange}
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            backgroundColor: '#f5f5f5',
            fontSize: '14px',
          }}
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="mr">Marathi</option>
          <option value="te">Telugu</option>
        </select>
      </div>

      {props.children}
    </ContentNewsContext.Provider>
  );
};
