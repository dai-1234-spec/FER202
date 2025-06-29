import React from 'react';
import { Carousel, Image, Container, Row, Col } from 'react-bootstrap';
import slideImg1 from '../images/slide1.jpg';
import slideImg2 from '../images/slide2.jpg';
import slideImg3 from '../images/slide3.jpg';
import pic1 from '../images/menu-01.jpg';
import pic2 from '../images/menu-02.jpg';
import pic3 from '../images/menu-03.jpg';
import pic4 from '../images/menu-04.jpg';
import pic5 from '../images/menu-05.jpg';
import pic6 from '../images/menu-06.jpg';

const Home = () => {
  return (
    <div>
      <Carousel id="carouselExampleCaptions" className="mt-1" variant="light" interval={2000}>
        <Carousel.Item>
          <Image src={slideImg1} className="d-block w-100" alt="First slide" />
        </Carousel.Item>
        <Carousel.Item>
          <Image src={slideImg2} className="d-block w-100" alt="First slide" />
        </Carousel.Item>
        <Carousel.Item>
          <Image src={slideImg3} className="d-block w-100" alt="First slide" />
        </Carousel.Item>
      </Carousel>
      <Container className='mt-3'>
        <Row>
          <Col>
            <Image src={pic1} roundedCircle />
          </Col>
          <Col>
            <Image src={pic2} roundedCircle />
          </Col>
          <Col>
            <Image src={pic3} roundedCircle />
          </Col>
          <Col>
            <Image src={pic4} roundedCircle />
          </Col>
          <Col>
            <Image src={pic5} roundedCircle />
          </Col>
          <Col>
            <Image src={pic6} roundedCircle />
          </Col>
        </Row>
        <h2 className='text-danger mt-3'>This is home page</h2>
      </Container>
    </div>
  );
}

export default Home;