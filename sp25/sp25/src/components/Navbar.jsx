import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const NavbarComponent = () => {
    return (
        <div>
            <Navbar bg="primary" data-bs-theme="dark">
                <Container>
                    {/* <Navbar.Brand href="/">Navbar</Navbar.Brand> */}
                    <Nav className="me-auto">
                        <Link to="/" className="nav-link">
                            Reading Books
                        </Link>
                        <Link to="/huyse123123/AllBook" className="nav-link">
                            All Books
                        </Link>
                        <Link to="/huyse123123/UnReadbooks" className="nav-link">
                            UnRead Books
                        </Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavbarComponent
