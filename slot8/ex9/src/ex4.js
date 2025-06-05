import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const cardData = {
  title: "Bui Le Long Dai- FPT DaNang",
  description: "Mobile: 056344334",
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/68/Logo_FPT_Education.png"
};

const Title = ({ text }) => {
  return <h5 className="fw-bold">{text}</h5>;
};

const Description = ({ text }) => {
  return <p className="mb-0">{text}</p>;
};

const Image = ({ url }) => {
  return <img src={url} alt="FPT Logo" className="me-3" style={{ width: "120px" }} />;
};

const Card = ({ item }) => {
  return (
    <div className="card shadow-sm border rounded p-3" style={{ maxWidth: "600px" }}>
      <div className="d-flex align-items-center">
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
  return(
    <div>
      <Card item={cardData}/>
    </div>
  )
}
export default CardFPT;