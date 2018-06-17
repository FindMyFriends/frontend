// @flow
import { withStyles } from '@material-ui/core/styles';

const styles = (inherit: Object) => (theme: Object) => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 230,
    maxWidth: 300,
  },
  ...inherit,
});

export const withFormStyles = (inherit: Object = {}) => (component: Object) => (
  withStyles(styles(inherit))(component)
);
