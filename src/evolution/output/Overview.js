// @flow
import React from 'react';
import { default as DescriptionOverview } from '../../description/output/Overview';

type Props = {|
  +evolution: Object,
|};
const Overview = ({ evolution }: Props) => (
  <DescriptionOverview description={evolution} />
);

export default Overview;
