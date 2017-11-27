import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({ pages, page, onChange }) => {
  const { first, last } = pages;
  if (first.page === last.page) {
    return null;
  }
  return null;
};

Pagination.propTypes = {
  pages: PropTypes.object.isRequired,
  page: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Pagination;
