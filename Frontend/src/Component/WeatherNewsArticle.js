import React, { useState, useEffect, useRef } from "react";

function WeatherNewsArticle({ data }) {
  const [showPopup, setShowPopup] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div>
      <div
        className="card"
        ref={cardRef}
        style={{
          backgroundColor: "#f4f4f4",
          padding: "10px",
          width: "450px",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
          cursor: "pointer",
          transition: "box-shadow 0.3s ease",
          marginBottom: "15px"
        }}
        onClick={togglePopup}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2
            className="card__title"
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              marginBottom: "10px",
              textDecoration: "none",

            }}
          >
            {data.title}
          </h2>
          <p
            className="card__pubDate"
            style={{ fontSize: "14px", color: "#888888", marginBottom: "0" }}
          >
            {data.pubDate}
          </p>
        </div>
      </div>
      {showPopup && (
        <div
          className="popup"
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
          }}
        >
          <div
            className="popup__content"
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "5px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              maxWidth: "800px",
              maxHeight: "600px",
              overflowY: "auto",
            }}
          >
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                className="close-button"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "20px",
                }}
                onClick={togglePopup}
              >
                &times;
              </button>
            </div>
            <p
              className="popup__pubDate"
              style={{ fontSize: "14px", color: "#888888", marginBottom: "20px" }}
            >
              {data.pubDate}
            </p>
            <img
              src={data.image_url}
              alt="News Image"
              className="popup__image"
              style={{ maxWidth: "100%", maxHeight: "300px", marginBottom: "20px" }}
            />
            <h2
              className="popup__title"
              style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "20px" }}
            >
              {data.title}
            </h2>
            <p className="popup__description">{data.description}</p>
            <a
              className="read-more-link"
              href={data.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#4CAF50" }}
            >
              Read More
            </a>
          </div>
        </div>
      )}

    </div>
  );
}

export default WeatherNewsArticle;
