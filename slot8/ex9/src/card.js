import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const cardData = {
  title: "Bui Le Long Dai - FPT DaNang",
  description: "Mobile: 056344334",
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/68/Logo_FPT_Education.png"
};

const Title = ({ text }) => {
  return <h3 className="fw-bold mb-2" style={{ fontSize: "1.75rem" }}>{text}</h3>;
};

const Description = ({ text }) => {
  return <p className="mb-0" style={{ fontSize: "1.25rem" }}>{text}</p>;
};

const Image = ({ url }) => {
  return (
    <img
      src={url}
      alt="FPT Logo"
      className="me-5"
      style={{ width: "150px" }}
    />
  );
};

const Card = ({ item }) => {
  return (
    <div
      className="card border-0 shadow p-4"
      style={{
        borderRadius: "20px",
        backgroundColor: "#ffffff",
        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)"
      }}
    >
      <div className="d-flex align-items-start">
        <Image url={item.imageUrl} />
        <div>
          <Title text={item.title} />
          <Description text={item.description} />
        </div>
      </div>
    </div>
  );
};

const CardFPT = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <div style={{ maxWidth: "1280px", width: "100%", padding: "2rem" }}>
        <Card item={cardData} />
      </div>
    </div>
  );
};

export default CardFPT;