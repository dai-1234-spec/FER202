import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../api/axios'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
const ReadingBook = () => {

    const [dataBook, setDataBook] = useState([])
    const navigate = useNavigate();

    const fetchReadingBooks = async () => {
        try {
            const response = await axiosInstance.get('');
            setDataBook(response.data);
        } catch (error) {
            console.error("Error fetching reading books:", error);
        }
    }

    useEffect(() => {
        fetchReadingBooks();
    }, [])

    console.log(dataBook);

    return (
        <Container>
            <h1>Reading Books</h1>
            <div>
                <Row>
                    {dataBook.filter(item => item.bookReadingStatus === 2).map((item) => (
                        <Col md={4} key={item.id}>
                            <Card style={{ width: '20rem', height: '32rem' }}>
                                <Card.Img
                                    onClick={() => navigate(`/bookDetail/${item.id}`)}
                                    style={{
                                        height: '20rem',
                                        objectFit: 'cover',
                                        cursor: 'pointer'
                                    }} variant="top" src={item.bookImage} />
                                <Card.Body>
                                    <Card.Title>{item.bookName}</Card.Title>
                                    <Card.Text>
                                        <div>
                                            Category: {item.bookType}
                                        </div>
                                        <div>
                                            Status: {item.bookReadingStatus}
                                        </div>
                                    </Card.Text>
                                    <Button
                                        onClick={() => navigate(`/bookDetail/${item.id}`)}
                                        variant="primary">View
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </Container>
    )
}

export default ReadingBook
