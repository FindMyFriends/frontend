// @flow
import React from 'react';
import styled from 'styled-components';
import { TextRow, ProgressRow } from './Table';
import SolidCard from './SolidCard';

const yesNo = (value: mixed) => (value ? 'Yes' : 'No');

export const Cards = styled.div`
  flex-wrap: wrap;
  display: flex;
  justify-content: space-around;
`;

type OverviewType = {|
  description: Object,
  cards: any,
|};
const Overview = ({ description, cards = null }: OverviewType) => {
  return (
    <Cards>
      <SolidCard
        title="General"
        rows={[
          <TextRow key="Age" title="Age" text={`${description.general.age.from} - ${description.general.age.to}`} />,
          <TextRow key="Ethnic group" title="Ethnic group" text={description.general.ethnic_group} />,
          <TextRow key="Sex" title="Sex" text={description.general.sex} />,
          <TextRow key="Firstname" title="Firstname" text={description.general.firstname} />,
        ]}
      />
      <SolidCard
        title="Body"
        rows={[
          <TextRow key="Build" title="Build" text={description.body.build} />,
          <TextRow key="Weight" title="Weight" text={description.body.weight} />,
          <TextRow key="Height" title="Height" text={description.body.height} />,
          <TextRow key="Breast size" title="Breast size" text={description.body.breast_size} />,
        ]}
      />
      <SolidCard
        title="Hair"
        rows={[
          <TextRow key="Style" title="Style" text={description.hair.style} />,
          <TextRow key="Color" title="Color" text={description.hair.color} />,
          <TextRow key="Length" title="Length" text={description.hair.length} />,
          <TextRow key="Nature" title="Nature" text={yesNo(description.hair.nature)} />,
        ]}
      />
      <SolidCard
        title="Face"
        rows={[
          <ProgressRow key="Care" title="Care" value={description.face.care} />,
          <TextRow key="Freckles" title="Freckles" text={yesNo(description.face.freckles)} />,
          <TextRow key="Shape" title="Shape" text={description.face.shape} />,
        ]}
      />
      <SolidCard
        title="Eyebrow"
        rows={[
          <ProgressRow key="Care" title="Care" value={description.eyebrow.care} />,
          <TextRow key="Color" title="Color" text={description.eyebrow.color} />,
        ]}
      />
      <SolidCard
        title="Eyes"
        rows={[
          <TextRow key="Color" title="Color" text={description.eye.left.color} />,
          <TextRow key="Lenses" title="Lenses" text={yesNo(description.eye.left.lenses)} />,
        ]}
      />
      <SolidCard
        title="Teeth"
        rows={[
          <ProgressRow key="Care" title="Care" value={description.teeth.care} />,
          <TextRow key="Braces" title="Braces" text={yesNo(description.teeth.braces)} />,
        ]}
      />
      <SolidCard
        title="Hands"
        rows={[
          <ProgressRow key="Care" title="Care" value={description.hands.care} />,
          <ProgressRow key="Vein visibility" title="Vein visibility" value={description.hands.vein_visibility} />,
          <ProgressRow key="Joint visibility" title="Joint visibility" value={description.hands.joint_visibility} />,
        ]}
      />
      <SolidCard
        title="Nails"
        rows={[
          <ProgressRow key="Care" title="Care" value={description.hands.nails.care} />,
          <TextRow key="Color" title="Color" text={description.hands.nails.color} />,
          <TextRow key="Length" title="Length" text={description.hands.nails.length} />,
        ]}
      />
      <SolidCard
        title="Hand hair"
        rows={[
          <ProgressRow key="Amount" title="Amount" value={description.hands.hair.amount} />,
          <TextRow key="Color" title="Color" text={description.hands.hair.color} />,
        ]}
      />
      {cards}
    </Cards>
  );
};

export default Overview;
