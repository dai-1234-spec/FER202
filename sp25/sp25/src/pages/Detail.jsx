import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/esm/Container';
import { useNavigate, useParams } from 'react-router-dom'
import { axiosInstance } from '../api/axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Detail = () => {
    const { id } = useParams();
    const [dataBook, setDataBook] = useState(null);
    const navigate = useNavigate();
    const fetchBookDetail = async () => {
        try {
            const response = await axiosInstance.get(`/${id}`);
            setDataBook(response.data);
        } catch (error) {
            console.error("Error fetching book detail:", error);
        }
    }

    useEffect(() => {
        fetchBookDetail();
    }, [])

    console.log(dataBook);

    return (
        <>
            <Button className='m-3' onClick={() => navigate(-1)}>Back</Button>
            <Container className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={dataBook?.bookImage} />
                    <Card.Body>
                        <Card.Title>{dataBook?.bookName}</Card.Title>
                        <Card.Text>
                            <div>
                                Category: {dataBook?.bookType}
                            </div>
                            <div>
                                Status: {(dataBook?.bookReadingStatus === 1 ? 'UnRead' : dataBook?.bookReadingStatus === 2 ? 'Reading' : 'Read')}
                            </div>
                            <div>
                                {dataBook?.isUnread ? 'Unread' : 'Read'}
                            </div>
                            <div>
                                {dataBook?.isUnread ? 'This book has been read ' : 'This book is unread'}
                            </div>
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}

export default Detail
