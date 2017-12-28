import PropTypes from 'prop-types';

const Pagination = ({ pages }) => {
  const { first, last } = pages;
  if (first.page === last.page) {
    return null;
  }
  return null;
};

Pagination.propTypes = {
  pages: PropTypes.object.isRequired,
};

export default Pagination;
