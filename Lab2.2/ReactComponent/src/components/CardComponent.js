import { Card, Button } from "react-bootstrap";
import menu1 from "../assets/images/menu1.jpg";
import menu2 from "../assets/images/menu2.jpg";
import menu3 from "../assets/images/menu3.jpg";
import menu4 from "../assets/images/menu4.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
function CardComponent() {
  return (
    <div className="container p-5">
      <h1 className="text-left p-3" style={{ fontFamily: "serif" }}>
        Our Menu
      </h1>
      <div className="d-flex">
        <Card style={{ width: "18rem" }} className="mx-3">
          <div style={{ position: "relative" }}>
            <Card.Img variant="top" src={menu1} />
            <span
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                background: "yellow",
                color: "#222",
                fontWeight: "bold",
                padding: "2px 12px",
                fontSize: "0.95rem",
                borderRadius: "5px"
              }}
            >
              SALE
            </span>
          </div>
          <Card.Body>
            <Card.Title className="fw-bold" style={{ fontFamily: "serif" }}>
              Margherita Pizza
            </Card.Title>
            <Card.Text>
              <span style={{ textDecoration: "line-through", color: "#888" }}>
                $40.00
              </span>
              <span
                className="ms-2"
                style={{ color: "#ffb300", fontWeight: "bold" }}
              >
                $24.00
              </span>
            </Card.Text>
            <Button variant="dark" className="w-100 text-center border border-light rounded-pill">
              Buy
            </Button>
          </Card.Body>
        </Card>
        {/* Card 2 */}
        <Card style={{ width: "18rem" }} className="mx-3">
          <Card.Img variant="top" src={menu2} />
          <Card.Body>
            <Card.Title className="fw-bold" style={{ fontFamily: "serif" }}>
              Mushroom Pizza
            </Card.Title>
            <Card.Text>$19.99</Card.Text>
            <Button variant="dark" className="w-100 text-center border border-light rounded-pill">
              Buy
            </Button>
          </Card.Body>
        </Card>
        {/* Card 3 */}
        <Card style={{ width: "18rem" }} className="mx-3">
          <div style={{ position: "relative" }}>
            <Card.Img variant="top" src={menu3} />
            <span
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                background: "yellow",
                color: "#222",
                fontWeight: "bold",
                padding: "2px 12px",
                fontSize: "0.95rem",
                borderRadius: "5px"
              }}
            >
              NEW
            </span>
          </div>
          <Card.Body>
            <Card.Title className="fw-bold" style={{ fontFamily: "serif" }}>
              Hawaiian Pizza
            </Card.Title>
            <Card.Text>
              <span>$30.00</span>
            </Card.Text>
            <Button variant="dark" className="w-100 text-center border border-light rounded-pill">
              Buy
            </Button>
          </Card.Body>
        </Card>
        {/* Card 4 */}
        <Card style={{ width: "18rem" }} className="mx-3">
          <div style={{ position: "relative" }}>
            <Card.Img variant="top" src={menu4} />
            <span
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                background: "yellow",
                color: "#222",
                fontWeight: "bold",
                padding: "2px 12px",
                fontSize: "0.95rem",
                borderRadius: "5px"
              }}
            >
              SALE
            </span>
          </div>
          <Card.Body>
            <Card.Title className="fw-bold" style={{ fontFamily: "serif" }}>
              Pesto Pizza
            </Card.Title>
            <Card.Text>
              <span style={{ textDecoration: "line-through", color: "#888" }}>
                $50.00
              </span>
              <span
                className="ms-2"
                style={{ color: "#ffb300", fontWeight: "bold" }}
              >
                $16.00
              </span>
            </Card.Text>
            <Button variant="dark" className="w-100 text-center border border-light rounded-pill">
              Buy
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
export default CardComponent;
