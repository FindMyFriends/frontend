import React from 'react';
import PropTypes from 'prop-types';
import { Pagination as BootstrapPagination } from 'react-bootstrap';

const Pagination = ({ pages, current, onChange }) => {
  const { first, last } = pages;
  if (first.page === last.page) {
    return null;
  }
  return (
    <BootstrapPagination
        prev
        next
        first
        last
        ellipsis
        boundaryLinks
        items={parseInt(last.page)}
        maxButtons={3}
        activePage={current}
        onSelect={onChange} />
  );
};

Pagination.propTypes = {
  pages: PropTypes.object,
  current: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

export default Pagination;
