import React, { useContext, useState } from "react";
import { NewsContext } from "./NewsContext";
import NewsArticle from "./NewsArticle";

function News(props) {
  const { data } = useContext(NewsContext);
  console.log(data);

  const [startIndex, setStartIndex] = useState(0);
  const newsPerPage = 4;

  const visibleData = data && data.results ? data.results.slice(startIndex, startIndex + newsPerPage) : [];

  const handleNext = () => {
    if (startIndex + newsPerPage < data.results.length) {
      setStartIndex(startIndex + newsPerPage);
    }
  };

  const handlePrevious = () => {
    if (startIndex - newsPerPage >= 0) {
      setStartIndex(startIndex - newsPerPage);
    }
  };

  return (
    <div
      style={{
        width: '550px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h1 style={{ fontSize: '24px', color: '#333', marginBottom: '10px' }}>
        Rural Development News 👨‍🌾
      </h1>
      <div style={{ marginTop: '10px' }}>
        {visibleData.length > 0 ? (
          visibleData.map((news) => (
            <NewsArticle data={news} key={news.link} />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
      {data && data.results && (
        <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
          <button
            onClick={handlePrevious}
            style={{
              marginRight: '10px',
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
            disabled={startIndex === 0}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            style={{
              marginLeft: '10px',
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
            disabled={startIndex + newsPerPage >= data.results.length}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default News;
