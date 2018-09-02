// @flow
import React from 'react';
import { default as DescriptionOverview } from '../../description/output/Overview';

type Props = {|
  +evolution: Object,
|};
export default ({ evolution }: Props) => (
  <DescriptionOverview description={evolution} />
);
