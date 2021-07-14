import { Fragment } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ObservationItem from './ObservationItem';

const ObservationList = ({ title, observations, setQuery, pagination }) => {
  return (
    <Fragment>
      <Row className='justify-content-center'>
        <h3>{title}</h3>
      </Row>
      <Row style={{ height: 'calc(100vh - 100px)', overflowX: 'hidden' }}>
        <InfiniteScroll
          dataLength={observations.length}
          next={() => setQuery(prev => ({ ...prev, page: pagination.next.page }))}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {
            <Col>
              {observations.map(observation => (
                <ObservationItem key={observation._id} observation={observation} />
              ))}
            </Col>
          }
        </InfiniteScroll>
      </Row>
    </Fragment>
  );
};

export default ObservationList;
