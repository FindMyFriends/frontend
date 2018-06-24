// @flow
import React from 'react';
import moment from 'moment';
import { default as DescriptionOverview } from '../../description/output/Overview';
import SolidCard from '../../description/output/SolidCard';
import TextRow from '../../description/output/TextRow';

type Props = {|
  +evolution: Object,
|};
const Overview = ({ evolution }: Props) => (
  <DescriptionOverview
    description={evolution}
    cards={
      <SolidCard
        title="Location"
        rows={[
          <TextRow
            key="Coordinates"
            title="Coordinates"
            text={`${evolution.location.coordinates.latitude}, ${evolution.location.coordinates.longitude}`}
          />,
          <TextRow
            key="Met at"
            title="Met at"
            text={moment(evolution.location.met_at.moment).format('YYYY-MM-DD HH:mm')}
          />,
        ]}
      />
    }
  />
);

export default Overview;
