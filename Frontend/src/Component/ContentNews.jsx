import React, { useContext, useState } from "react";
import { ContentNewsContext } from "./ContentNewsContext";
import ContentNewsArticle from "./ContentNewsArticle";

function ContentNews(props) {
  const { data } = useContext(ContentNewsContext);
  console.log(data);

  const [startIndex, setStartIndex] = useState(0);
  const newsPerPage = 4;

  const visibleData = data ? data.slice(startIndex, startIndex + newsPerPage) : [];

  const handleNext = () => {
    if (startIndex + newsPerPage < data.length) {
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
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        padding: "20px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        width: "fit-content", // Adjusted width to fit the content
      }}
    >
      <h1 style={{ fontSize: "24px", color: "#333", marginBottom: "10px" }}>
        Apna Bank News 👨‍🌾
      </h1>
      <div style={{ marginTop: "10px", display: "flex", flexDirection: "row" }}>
        {visibleData.length > 0 ? (
          visibleData.map((news) => (
            <ContentNewsArticle data={news} key={news.link} />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
      {data && (
        <div style={{ marginTop: "10px", display: "flex", justifyContent: "center" }}>
          <button
            onClick={handlePrevious}
            style={{
              marginRight: "10px",
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            disabled={startIndex === 0}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            style={{
              marginLeft: "10px",
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            disabled={startIndex + newsPerPage >= data.length}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default ContentNews;
