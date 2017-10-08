import React from 'react';
import PropTypes from 'prop-types';

export default class BoxInList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { more: false };
  }

  render() {
    const { demand } = this.props;
    const { more } = this.state;
    return (
      <ul>
        {more ? this.more(demand) : this.less(demand)}
        {
          more
            ? <a onClick={() => this.setState({ more: false })}>Less</a>
            : <a onClick={() => this.setState({ more: true })}>More</a>
        }
      </ul>
    );
  }

  more(demand) {
    return this.less(demand).concat([
      <li key="general.firstname">Firstname: {demand.general.firstname}</li>,
      <li key="general.lastname">Lastname: {demand.general.lastname}</li>,
    ]);
  }

  less(demand) {
    return [
      <li key="general.age">Age: {demand.general.age}</li>,
      <li key="general.gender">Gender: {demand.general.gender}</li>,
      <li key="general.race">Race: {demand.general.race}</li>,
    ];
  }
};

BoxInList.propTypes = {
  demand: PropTypes.object.isRequired,
};
