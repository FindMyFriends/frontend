import React from 'react';
import { Pagination } from 'react-bootstrap';

class PaginationBasic extends React.Component {
  render() {
    return (
      <Pagination
        bsSize="medium"
        items={10}
        activePage={3}
        onSelect={() => {}} />
    );
  }
};

export default PaginationBasic;
