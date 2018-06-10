// @flow
import { withStyles } from '@material-ui/core/styles';

const styles = (additionalStyles: (Object) => (Object) = () => {}) => (theme: Object) => ({
  ...additionalStyles(theme),
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 230,
    maxWidth: 300,
  },
});

export const withFormStyles = (additionalStyles: Object) => (component: Object) => (
  withStyles(styles(additionalStyles))(component)
);
