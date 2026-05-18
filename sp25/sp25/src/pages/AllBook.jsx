import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/esm/Container';
import Table from 'react-bootstrap/Table';
import { axiosInstance } from '../api/axios';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { API_URL } from '../const';

const AllBook = () => {
    const [show, setShow] = useState(false);

    const [dataBook, setDataBook] = useState([])
    const [selectedBook, setSelectedBook] = useState(null);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        bookName: '',
        bookImage: '',
        bookType: '',
        bookReadingStatus: 1,
        isUnread: true
    })
    const [newErrors, setNewErrors] = useState({})

    const handleClose = () => {
        setShow(false);
        resetForm(); // Reset form when closing the modal
        setSelectedBook(null); // Clear selected book
    }

    const handleShow = () => setShow(true);

    const fetchReadingBooks = async () => {
        try {
            const response = await axiosInstance.get('');
            console.log(response.data);
            const sortDesc = response.data.sort((a, b) => b.id - a.id);
            setDataBook(sortDesc);
        } catch (error) {
            console.error("Error fetching reading books:", error);
        }
    }


    const validateFormBook = () => {
        let error = {};
        // trim() dùng để loại bỏ khoảng trắng ở đầu và cuối chuỗi
        if (!formData.bookName.trim()) {
            error.bookName = 'Book name is required';
        } else if (formData.bookImage.trim().split(" ").length > 1) {
            error.bookImage = 'Tên sách lớn hơn 1 ký tự';
        } else if (formData.bookName !== formData.bookName.toUpperCase()) {
            error.bookName = 'Tên sách phải viết hoa';
        }

        if (!formData.bookImage.trim()) {
            error.bookImage = 'Book image is required';
        } else if (!/^https?:\/\//.test(formData.bookImage)) {
            newErrors.bookImage = "URL ảnh không hợp lệ";
        }

        if (!formData.bookReadingStatus || formData.bookReadingStatus < 1 || formData.bookReadingStatus > 3) {
            error.bookReadingStatus = 'Book reading status is required and must be between 1 and 3';
        }

        if (!formData.bookType.trim()) {
            error.bookType = 'Book type is required';
        }

        setNewErrors(error);
        return Object.keys(error).length === 0; // Trả về true nếu không có lỗi
    }


    const resetForm = () => {
        setFormData({
            bookName: '',
            bookImage: '',
            bookType: '',
            bookReadingStatus: 1,
            isUnread: true
        });
        setNewErrors({});
        setSelectedBook(null);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateFormBook()) {
            return; // Dừng nếu có lỗi
        }
        try {
            if (selectedBook) {
                await axiosInstance.put(`/${selectedBook.id}`, formData);
                toast.success("Book added successfully!");
            } else {
                await axios.post(`${API_URL}`, formData);
                toast.success("Book updated successfully!");
            }
            resetForm(); // Reset form after submission
            handleClose(); // Close the modal after submission
            fetchReadingBooks(); // Refresh the book list after submission
        } catch (error) {
            console.error("Error adding book:", error);
            toast.error("Failed to add book. Please try again.");
        }
    }

    const handleEdit = (book) => {
        setSelectedBook(book);
        setFormData({
            bookName: book.bookName,
            bookImage: book.bookImage,
            bookType: book.bookType,
            bookReadingStatus: book.bookReadingStatus
        });
        handleShow();
    }

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/${id}`);
            toast.success("Book deleted successfully!");
            fetchReadingBooks(); // Refresh the book list after deletion
        } catch (error) {
            console.error("Error deleting book:", error);
            toast.error("Failed to delete book. Please try again.");
        }
    }

    useEffect(() => {
        fetchReadingBooks();
    }, [])

    return (
        <>
            <ToastContainer position="top-right"
                autoClose={5000}
            />
            <Container>

                <div className='mt-3 text-end'>
                    <Button variant="primary" onClick={handleShow}>
                        Add Book
                    </Button>
                </div>

                <Table striped bordered hover variant="dark" className='mt-3'>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>BookName</th>
                            <th>BookImage</th>
                            <th>BookType</th>
                            <th>BookReadingStatus</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataBook.map((item, index) => (
                            <tr key={item.id} style={{ cursor: 'pointer' }}>
                                <td>{index + 1} </td>
                                <td>{item.bookName}</td>
                                <td>
                                    <img
                                        onClick={() => navigate(`/bookDetail/${item.id}`)}
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
                                <td>
                                    <Button type='primary' className='me-2' onClick={() => handleEdit(item)}>
                                        Edit
                                    </Button>
                                    <Button variant='danger' onClick={() => handleDelete(item.id)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>


            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedBook ? "Update" : "Add"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="bookName" className="form-label">Book Name</label>
                            <input
                                type="text"
                                className={`form-control ${newErrors.bookName ? 'is-invalid' : ''}`}
                                id="bookName"
                                value={formData.bookName}
                                onChange={(e) => setFormData({ ...formData, bookName: e.target.value })}
                            />
                            {newErrors.bookName && <div className="invalid-feedback">{newErrors.bookName}</div>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="bookImage" className="form-label">Book Image URL</label>
                            <input
                                type="text"
                                className={`form-control ${newErrors.bookImage ? 'is-invalid' : ''}`}
                                id="bookImage"
                                value={formData.bookImage}
                                onChange={(e) => setFormData({ ...formData, bookImage: e.target.value })}
                            />
                            {newErrors.bookImage && <div className="invalid-feedback">{newErrors.bookImage}</div>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="bookType" className="form-label">Book Type</label>
                            <input
                                type="text"
                                className={`form-control ${newErrors.bookType ? 'is-invalid' : ''}`}
                                id="bookType"
                                value={formData.bookType}
                                onChange={(e) => setFormData({ ...formData, bookType: e.target.value })}
                            />
                            {newErrors.bookType && <div className="invalid-feedback">{newErrors.bookType}</div>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="bookReadingStatus" className="form-label">Book Reading Status</label>
                            <select
                                className={`form-select ${newErrors.bookReadingStatus ? 'is-invalid' : ''}`}
                                id="bookReadingStatus"
                                value={formData.bookReadingStatus}
                                onChange={(e) => setFormData({ ...formData, bookReadingStatus: e.target.value })}
                            >
                                <option value="">Select status</option>
                                <option value={1}>UnRead</option>
                                <option value={2}>Reading</option>
                                <option value={3}>Read</option>
                            </select>
                            {newErrors.bookReadingStatus && <div className="invalid-feedback">{newErrors.bookReadingStatus}</div>}
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>

    )
}

export default AllBook
