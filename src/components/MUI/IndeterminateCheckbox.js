// @flow
import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

const INDETERMINATE = 'indeterminate';

type Props = {|
  +checked: true | false | null,
  +onChange: (Object) => (void),
|};
type State = {|
  checked: true | false | 'indeterminate',
|};
export default class IndeterminateCheckbox extends React.Component<Props, State> {
  state = {
    checked: INDETERMINATE,
  };

  componentDidMount = () => this.reset();

  reset = () => this.setState({
    checked: this.props.checked === null ? INDETERMINATE : this.props.checked,
  });

  handleChange = () => {
    const next = () => (
      this.props.onChange({
        target: {
          checked: this.state.checked === INDETERMINATE ? null : this.state.checked,
          type: 'checkbox',
        },
      })
    );
    if (this.state.checked === INDETERMINATE) {
      this.setState({ checked: false }, next);
    } else if (this.state.checked === true) {
      this.setState({ checked: INDETERMINATE }, next);
    } else {
      this.setState({ checked: !this.state.checked }, next);
    }
  };

  render() {
    return (
      <Checkbox
        indeterminate={this.state.checked === INDETERMINATE}
        checked={this.state.checked}
        onChange={this.handleChange}
        color="primary"
      />
    );
  }
}
