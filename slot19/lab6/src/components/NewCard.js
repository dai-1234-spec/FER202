import React from 'react';
import { Card } from 'react-bootstrap';

const NewsCard = ({ news }) => {
    return (
        <Card className='h-100'>
            <Card.Img variant="top" src={news.images} />
            <Card.Body>
                <Card.Title>{news.title}</Card.Title>
                <Card.Text>{news.description}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default NewsCard;