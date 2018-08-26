// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { default as Icon } from '@material-ui/icons/Note';
import grey from '@material-ui/core/colors/grey';

const styles = () => ({
  iconHover: {
    '&:hover': {
      color: grey[700],
    },
  },
});

type Props = {|
  +children: ?string,
  +onClick: () => (void),
  +classes: Object,
|};
const Note = ({ children, onClick, classes }: Props) => (
  <Icon
    onClick={onClick}
    className={children ? classes.iconHover : null}
    color={children ? 'action' : 'disabled'}
    style={{ cursor: 'pointer' }}
  />
);

export default withStyles(styles)(Note);
