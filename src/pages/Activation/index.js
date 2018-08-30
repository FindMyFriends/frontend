// @flow
import React from 'react';
import { connect } from 'react-redux';
import { activate } from '../../activation/endpoints';

type Props = {|
  +activate: (string, () => (void)) => (void),
  +history: Object,
  +match: Object,
|};
class Activation extends React.Component<Props> {
  componentWillMount() {
    const { match: { params: { code } } } = this.props;
    this.props.activate(code, () => this.props.history.push('/sign/in'));
  }

  render() {
    return null;
  }
}

const mapDispatchToProps = dispatch => ({
  activate: (code: string, next: () => (void)) => dispatch(activate(code, next)),
});
export default connect(null, mapDispatchToProps)(Activation);
