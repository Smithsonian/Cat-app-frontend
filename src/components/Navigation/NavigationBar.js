import { useState, useContext, Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCat } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../context/AuthContext';

const NavigationBar = () => {
  const {
    signOut,
    user: { name, role }
  } = useContext(AuthContext);
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
          Count cats
          <FontAwesomeIcon icon={faCat} />
        </Navbar.Brand>
        {name && (
          <Fragment>
            <Navbar.Toggle aria-controls='navbarScroll' />
            <Navbar.Collapse id='navbarScroll'>
              <Nav className='ms-auto align-items-center'>
                <Nav.Item className='text-muted'>Welcome back, {name}</Nav.Item>
                <Nav.Link as={NavLink} to='/' exact>
                  Observations
                </Nav.Link>
                {role !== 'user' && (
                  <Fragment>
                    <Nav.Link as={NavLink} to='/review' exact>
                      Review observations
                    </Nav.Link>
                    <Nav.Link as={NavLink} to='/admin' exact>
                      Admin
                    </Nav.Link>
                  </Fragment>
                )}
                <Nav.Link onClick={signOut}>Sign out</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Fragment>
        )}
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
