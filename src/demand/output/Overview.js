// @flow
import React from 'react';
import { default as DescriptionOverview } from '../../description/output/Overview';

type Props = {|
  +demand: Object,
|};
export default ({ demand }: Props) => (
  <DescriptionOverview description={demand} />
);
