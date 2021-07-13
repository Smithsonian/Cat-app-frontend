import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { AuthContext } from '../../context/AuthContext';

const NavigationBar = () => {
  const { signOut } = useContext(AuthContext);
  const [expanded, setExpanded] = useState(false);
  return (
    <Navbar
      bg='light'
      expand='md'
      onToggle={() => setExpanded(prev => !prev)}
      expanded={expanded}
      onSelect={() => setExpanded(false)}
    >
      <Container fluid>
        <Navbar.Brand as={Link} to='/'>
          Count cats 🐾
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse id='navbarScroll'>
          <Nav className='ml-auto'>
            <Nav.Link as={Link} to='/'>
              Observations
            </Nav.Link>
            <Nav.Link as={Link} to='/admin'>
              Admin
            </Nav.Link>
            <Nav.Link onClick={signOut}>Sign out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
