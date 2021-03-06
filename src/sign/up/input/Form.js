// @flow
import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormHelperText from '@material-ui/core/FormHelperText';
import { withFormStyles } from '../../../description/input/parts/withFormStyles';
import type { RegistrationData } from '../../types';
import SexInput from '../../../description/input/parts/SexInput';
import EthnicGroupInput from '../../../description/input/parts/EthnicGroupInput';
import BirthYearInput from '../../../description/input/parts/BirthYearInput';
import { toMessage } from '../../../validation';

type Props = {|
  +classes: Object,
  +onChange: (string) => (Object),
  +onSubmit: () => (void),
  +selects: Object,
  +registrationData: RegistrationData,
  +errors: Object,
|};
const Form = ({
  onChange,
  onSubmit,
  registrationData,
  selects,
  classes,
  errors,
}: Props) => (
  <React.Fragment>
    <Typography variant="title" color="inherit">Credentials</Typography>
    <FormControl error={!!errors.email} className={classes.formControl}>
      <InputLabel>Email</InputLabel>
      <Input
        onChange={onChange('email')}
        value={registrationData.email || ''}
      />
      {errors.email && <FormHelperText id="name-error-text">{toMessage(errors.email)}</FormHelperText>}
    </FormControl>
    <FormControl error={!!errors.password} className={classes.formControl}>
      <InputLabel>Password</InputLabel>
      <Input
        type="password"
        onChange={onChange('password')}
        value={registrationData.password || ''}
      />
      {errors.password && <FormHelperText id="name-error-text">{toMessage(errors.password)}</FormHelperText>}
    </FormControl>
    <Typography variant="title" color="inherit">General</Typography>
    <FormControl error={!!errors.general.firstname} className={classes.formControl}>
      <InputLabel>Firstname</InputLabel>
      <Input
        onChange={onChange('general.firstname')}
        value={registrationData.general.firstname || ''}
      />
      {errors.general.firstname && <FormHelperText id="name-error-text">{toMessage(errors.general.firstname)}</FormHelperText>}
    </FormControl>
    <FormControl error={!!errors.general.lastname} className={classes.formControl}>
      <InputLabel>Lastname</InputLabel>
      <Input
        onChange={onChange('general.lastname')}
        value={registrationData.general.lastname || ''}
      />
      {errors.general.lastname && <FormHelperText id="name-error-text">{toMessage(errors.general.lastname)}</FormHelperText>}
    </FormControl>
    <BirthYearInput
      error={errors.general.birth_year}
      onChange={onChange('general.birth_year')}
      value={registrationData.general.birth_year}
      birthYear={selects.birthYear}
      classes={classes}
    />
    <SexInput
      error={errors.general.sex}
      onChange={onChange('general.sex')}
      value={registrationData.general.sex}
      selects={selects.sex}
      classes={classes}
    />
    <EthnicGroupInput
      error={errors.general.ethnic_group_id}
      onChange={onChange('general.ethnic_group_id')}
      value={registrationData.general.ethnic_group_id}
      selects={selects.ethnicGroups}
      classes={classes}
    />
    <Typography variant="title" color="inherit">Contact</Typography>
    <FormControl error={!!errors.contact.facebook} className={classes.formControl}>
      <InputLabel>Facebook</InputLabel>
      <Input
        onChange={onChange('contact.facebook')}
        value={registrationData.contact.facebook || ''}
      />
      {errors.contact.facebook && <FormHelperText id="name-error-text">{toMessage(errors.contact.facebook)}</FormHelperText>}
    </FormControl>
    <FormControl error={!!errors.contact.instagram} className={classes.formControl}>
      <InputLabel>Instagram</InputLabel>
      <Input
        onChange={onChange('contact.instagram')}
        value={registrationData.contact.instagram || ''}
      />
      {errors.contact.instagram && <FormHelperText id="name-error-text">{toMessage(errors.contact.instagram)}</FormHelperText>}
    </FormControl>
    <FormControl error={!!errors.contact.phone_number} className={classes.formControl}>
      <InputLabel>Phone number</InputLabel>
      <Input
        onChange={onChange('contact.phone_number')}
        value={registrationData.contact.phone_number || ''}
      />
      {errors.contact.phone_number && <FormHelperText id="name-error-text">{toMessage(errors.contact.phone_number)}</FormHelperText>}
    </FormControl>
    <Button variant="raised" onClick={onSubmit} color="primary">
      Sign up
    </Button>
  </React.Fragment>
);

export default withFormStyles()(Form);
