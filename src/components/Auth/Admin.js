import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import NewUserCanvas from './NewUserCanvas';
import Dashboard from './Dashboard';
import Users from './Users';
import DownloadCSV from './DownloadCSV';
import { Fragment } from 'react';

const Admin = () => {
  const [downloadShow, setDownloadShow] = useState(false);
  return (
    <Fragment>
      <Row>
        <Col>
          <Button variant='success' onClick={() => setDownloadShow(true)}>
            <FontAwesomeIcon icon={faDownload} /> Download
          </Button>
        </Col>
      </Row>
      <Row className='mt-3'>
        <DownloadCSV show={downloadShow} onHide={() => setDownloadShow(false)} />
        <NewUserCanvas />
        <Dashboard />
      </Row>
      <Row>
        <Users />
      </Row>
    </Fragment>
  );
};

export default Admin;
