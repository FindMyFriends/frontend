// @flow
import { withStyles } from '@material-ui/core/styles';

const styles = () => (theme: Object) => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 230,
    maxWidth: 300,
  },
});

export const withFormStyles = () => (component: Object) => withStyles(styles())(component);
