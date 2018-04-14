import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import moment from 'moment';
import * as R from 'ramda';
import { getPrettyDemand } from './../../demand/reducers';
import { single, options, retract } from './../../demand/endpoints';
import { requestedConfirm, receivedMenuItems } from './../../ui/actions';
import { SolidCard, Cards, TextRow, ProgressRow, yesNo } from './../../demand/output/Card';

const handleRetract = ({ dispatch, history, id }) => {
  dispatch(requestedConfirm(
    'Are you sure, you want to retract demand?',
    () => dispatch(retract(id, history)),
  ));
};

const menuItems = (props) => {
  const { history, match: { params: { id } } } = props;
  return [
    <MenuItem key={1} onClick={() => history.push(`/demands/${id}`)}>Overview</MenuItem>,
    <MenuItem key={2} onClick={() => history.push(`/demands/${id}/soulmates`)}>Soulmates</MenuItem>,
    <MenuItem
      rightIcon={<ArrowDropRight />}
      key={3}
      menuItems={[
        <MenuItem key={4} onClick={() => history.push(`/demands/${id}/edit`)}>Edit</MenuItem>,
        <MenuItem key={5} style={{ color: 'red' }} onClick={() => handleRetract({ ...props, id })}>
          Retract
        </MenuItem>,
    ]}
    >
      Settings
    </MenuItem>,
  ];
};

class Single extends React.Component {
  componentDidMount() {
    const { dispatch, match: { params: { id } } } = this.props;
    dispatch(receivedMenuItems(menuItems(this.props)));
    dispatch(options());
    dispatch(single(id));
  }

  render() {
    const { demand } = this.props;
    if (R.isEmpty(demand)) {
      return <h1>Loading...</h1>;
    }
    return (
      <React.Fragment>
        <Cards>
          <SolidCard
            title="General"
            rows={[
              <TextRow key="Age" title="Age" text={`${demand.general.age.from} - ${demand.general.age.to}`} />,
              <TextRow key="Ethnic group" title="Ethnic group" text={demand.general.ethnic_group} />,
              <TextRow key="Gender" title="Gender" text={demand.general.gender} />,
              <TextRow key="Firstname" title="Firstname" text={demand.general.firstname} />,
            ]}
          />
          <SolidCard
            title="Body"
            rows={[
              <TextRow key="Build" title="Build" text={demand.body.build} />,
              <TextRow key="Weight" title="Weight" text={demand.body.weight} />,
              <TextRow key="Height" title="Height" text={demand.body.height} />,
              <TextRow key="Breast size" title="Breast size" text={demand.body.breast_size} />,
            ]}
          />
          <SolidCard
            title="Hair"
            rows={[
              <TextRow key="Style" title="Style" text={demand.hair.style} />,
              <TextRow key="Color" title="Color" text={demand.hair.color} />,
              <TextRow key="Length" title="Length" text={demand.hair.length} />,
              <TextRow key="Nature" title="Nature" text={yesNo(demand.hair.nature)} />,
            ]}
          />
          <SolidCard
            title="Face"
            rows={[
              <ProgressRow key="Care" title="Care" value={demand.face.care} />,
              <TextRow key="Freckles" title="Freckles" text={yesNo(demand.face.freckles)} />,
              <TextRow key="Shape" title="Shape" text={demand.face.shape} />,
            ]}
          />
          <SolidCard
            title="Eyebrow"
            rows={[
              <ProgressRow key="Care" title="Care" value={demand.eyebrow.care} />,
              <TextRow key="Color" title="Color" text={demand.eyebrow.color} />,
            ]}
          />
          <SolidCard
            title="Eyes"
            rows={[
              <TextRow key="Color" title="Color" text={demand.eye.left.color} />,
              <TextRow key="Lenses" title="Lenses" text={yesNo(demand.eye.left.lenses)} />,
              ]}
          />
          <SolidCard
            title="Teeth"
            rows={[
              <ProgressRow key="Care" title="Care" value={demand.teeth.care} />,
              <TextRow key="Braces" title="Braces" text={yesNo(demand.teeth.braces)} />,
            ]}
          />
          <SolidCard
            title="Hands"
            rows={[
              <ProgressRow key="Care" title="Care" value={demand.hands.care} />,
              <ProgressRow key="Vein visibility" title="Vein visibility" value={demand.hands.vein_visibility} />,
              <ProgressRow key="Joint visibility" title="Joint visibility" value={demand.hands.joint_visibility} />,
            ]}
          />
          <SolidCard
            title="Nails"
            rows={[
              <ProgressRow key="Care" title="Care" value={demand.hands.nails.care} />,
              <TextRow key="Color" title="Color" text={demand.hands.nails.color} />,
              <TextRow key="Length" title="Length" text={demand.hands.nails.length} />,
            ]}
          />
          <SolidCard
            title="Hand hair"
            rows={[
              <ProgressRow key="Amount" title="Amount" value={demand.hands.hair.amount} />,
              <TextRow key="Color" title="Color" text={demand.hands.hair.color} />,
            ]}
          />
          <SolidCard
            title="Location"
            rows={[
              <TextRow key="Coordinates" title="Coordinates" text={`${demand.location.coordinates.latitude}, ${demand.location.coordinates.longitude}`} />,
              <TextRow key="Met at" title="Met at" text={moment(demand.location.met_at.moment).format('YYYY-MM-DD HH:mm')} />,
            ]}
          />
        </Cards>
      </React.Fragment>
    );
  }
}

Single.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.shape({ params: PropTypes.shape({ }) }).isRequired,
  demand: PropTypes.object.isRequired,
};

export default connect(state => ({
  demand: getPrettyDemand(state.demand.single || { }, state.demand.options || { }),
}))(Single);
