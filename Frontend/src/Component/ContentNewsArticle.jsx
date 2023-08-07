import React, { useState, useRef } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function ContentNewsArticle({ data }) {
  const [showPopup, setShowPopup] = useState(false);
  const cardRef = useRef(null);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleClickOutside = (event) => {
    if (cardRef.current && !cardRef.current.contains(event.target)) {
      setShowPopup(false);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <style>
          {`
          @keyframes blinking {
            0% {
              opacity: 0;
            }
            50% {
              opacity: 1;
            }
            100% {
              opacity: 0;
            }
          }
        `}
        </style>
        <Card
          ref={cardRef}
          sx={{
            backgroundColor: "#f4f4f4",
            padding: "10px",
            width: "345px",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
            cursor: "pointer",
            transition: "box-shadow 0.3s ease",
            marginBottom: "15px",
            marginLeft: "10px",
          }}
          onClick={togglePopup}
        >
          <CardMedia
            component="img"
            height="140"
            image={data.image}
            alt="News Image"
            style={{ width: "100%", height: "auto", marginBottom: "10px" }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "10px", position: "relative" }}>
              {data.title}
              <span
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "-10px",
                  transform: "translateY(-50%)",
                  fontSize: "12px",
                  color: "#F44336",
                  animation: "blinking 1s infinite",
                }}
              >
                new
              </span>
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Read More</Button>
          </CardActions>
        </Card>
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
            overflowY: "auto",
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
              maxHeight: "fit-content",
              overflowY: "auto",
              maxHeight: "calc(100vh - 100px)",
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
            <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "20px" }}>{data.title}</h2>
            <img
              src={data.image}
              alt="News Image"
              className="popup__image"
              style={{ maxWidth: "100%", maxHeight: "300px", marginBottom: "20px" }}
            />
            <p className="popup__description">{data.description}</p>

          </div>
        </div>
      )}
    </div>
  );
}

export default ContentNewsArticle;
