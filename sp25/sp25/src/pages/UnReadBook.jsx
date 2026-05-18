import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/esm/Container';
import Table from 'react-bootstrap/Table';
import { axiosInstance } from '../api/axios';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';

const UnReadBook = () => {
    const [dataBook, setDataBook] = useState([])
    const navigate = useNavigate();

    const fetchReadingBooks = async () => {
        try {
            const response = await axiosInstance.get('');
            const sortDesc = response.data.sort((a, b) => b.id - a.id);
            setDataBook(sortDesc);
        } catch (error) {
            console.error("Error fetching reading books:", error);
        }
    }

    useEffect(() => {
        fetchReadingBooks();
    }, [])

    return (
        <Container>
            <Table striped bordered hover variant="dark" className='mt-3'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>BookName</th>
                        <th>BookImage</th>
                        <th>BookType</th>
                        <th>BookReadingStatus</th>

                    </tr>
                </thead>
                <tbody>
                    {dataBook.filter(item => item.bookReadingStatus === 1 || item.isUnread === true).map((item, index) => (
                        <tr key={item.id} onClick={() => navigate(`/bookDetail/${item.id}`)} style={{ cursor: 'pointer' }}>
                            <td>{index + 1} </td>
                            <td>{item.bookName}</td>
                            <td>
                                <img
                                    style={{ width: '100px', height: '150px', objectFit: 'cover' }}
                                    src={item.bookImage}
                                    alt={item.bookName}
                                />
                            </td>
                            <td>
                                {item.bookType}
                            </td>
                            <td>
                                {item.bookReadingStatus === 1 ? 'UnRead' : item.bookReadingStatus === 2 ? 'Reading' : 'Read'}
                            </td>
                            {/* <td>
                                <Button type='primary' className='me-2'>
                                    Edit
                                </Button>
                                <Button variant='danger'>
                                    Delete
                                </Button>
                            </td> */}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}

export default UnReadBook
