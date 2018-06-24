// @flow
import React from 'react';
import { connect } from 'react-redux';
import { exit } from '../../../sign/endpoints';

type Props = {|
  +exit: (() => (void)) => (void),
  +history: Object,
|};
class Out extends React.Component<Props> {
  componentWillMount() {
    this.props.exit(() => this.props.history.push('/sign/in'));
  }

  render() {
    return null;
  }
}

const mapDispatchToProps = dispatch => ({
  exit: (next: () => (void)) => dispatch(exit(next)),
});
export default connect(null, mapDispatchToProps)(Out);
