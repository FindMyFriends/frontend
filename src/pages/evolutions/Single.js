import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import * as R from 'ramda';
import Tabs from './menu/Tabs';
import { getPrettyEvolution } from './../../evolution/reducers';
import { single, options } from './../../evolution/endpoints';
import Overview from './../../description/output/Overview';
import SolidCard from './../../description/output/SolidCard';
import { TextRow } from './../../description/output/Table';
import { ActionItems } from './menu/Single/Items';

class Single extends React.Component {
  componentDidMount() {
    const {
      dispatch, handleMenu, history, match: { params: { id } },
    } = this.props;
    dispatch(options());
    dispatch(single(id));
    handleMenu({
      filter: {
        title: 'Evolution',
      },
      action: <ActionItems history={history} id={id} dispatch={dispatch} />,
    });
  }

  render() {
    const { evolution } = this.props;
    if (R.isEmpty(evolution)) {
      return <h1>Loading...</h1>;
    }
    return (
      <Tabs {...this.props}>
        <Overview
          description={evolution}
          cards={
            <SolidCard
              title="Location"
              rows={[
                <TextRow
                  key="Coordinates"
                  title="Coordinates"
                  text={`${evolution.location.coordinates.latitude}, ${evolution.location.coordinates.longitude}`}
                />,
                <TextRow
                  key="Met at"
                  title="Met at"
                  text={moment(evolution.location.met_at.moment).format('YYYY-MM-DD HH:mm')}
                />,
              ]}
            />
          }
        />
      </Tabs>
    );
  }
}

Single.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.shape({ params: PropTypes.shape({ }) }).isRequired,
  evolution: PropTypes.object.isRequired,
  handleMenu: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default connect(state => ({
  evolution: getPrettyEvolution(state.evolution.single || { }, state.evolution.options || { }),
  soulmate: state.soulmate,
}))(Single);
