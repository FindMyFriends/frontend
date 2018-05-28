import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import * as R from 'ramda';
import Tabs from './menu/Tabs';
import { getPrettyDemand } from './../../demand/reducers';
import { single, options } from './../../demand/endpoints';
import { info as soulmateInfo } from './../../soulmate/endpoints';
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
    dispatch(soulmateInfo(id));
    handleMenu({
      filter: {
        title: 'Demand',
      },
      action: <ActionItems history={history} id={id} dispatch={dispatch} />,
    });
  }

  render() {
    const { demand, soulmate } = this.props;
    if (R.isEmpty(demand)) {
      return <h1>Loading...</h1>;
    }
    return (
      <Tabs {...this.props} soulmateMatches={soulmate.info ? soulmate.info.total : 0}>
        <Overview
          description={demand}
          cards={
            <SolidCard
              title="Location"
              rows={[
                <TextRow
                  key="Coordinates"
                  title="Coordinates"
                  text={`${demand.location.coordinates.latitude}, ${demand.location.coordinates.longitude}`}
                />,
                <TextRow
                  key="Met at"
                  title="Met at"
                  text={moment(demand.location.met_at.moment).format('YYYY-MM-DD HH:mm')}
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
  demand: PropTypes.object.isRequired,
  soulmate: PropTypes.object.isRequired,
  handleMenu: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default connect(state => ({
  demand: getPrettyDemand(state.demand.single || { }, state.demand.options || { }),
  soulmate: state.soulmate,
}))(Single);
