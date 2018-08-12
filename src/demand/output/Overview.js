// @flow
import React from 'react';
import { default as DescriptionOverview } from '../../description/output/Overview';

type Props = {|
  +demand: Object,
|};
const Overview = ({ demand }: Props) => (
  <DescriptionOverview description={demand} />
);

export default Overview;
