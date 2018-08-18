// @flow
import React from 'react';
import styled from 'styled-components';
import YesIcon from '@material-ui/icons/Check';
import NoIcon from '@material-ui/icons/Close';
import TextRow from './TextRow';
import ProgressRow from './ProgressRow';
import SolidCard from './SolidCard';
import { formattedAge } from '../selects';

const yesNoMaybe = (value: ?boolean) => {
  const props = {
    style: {
      fontSize: 15,
    },
  };
  if (value === true) {
    return <YesIcon {...props} />;
  } else if (value === false) {
    return <NoIcon {...props} />;
  }
  return <i>-</i>;
};

const Cards = styled.div`
  flex-wrap: wrap;
  display: flex;
  justify-content: space-around;
`;

const isEmpty = (items: Array<string>) => (
  items.filter(item => item).map(item => item.toString().trim()).filter(item => item).length === 0
);

type Props = {|
  +description: Object,
  +cards?: mixed,
|};
const Overview = ({ description, cards = null }: Props) => {
  return (
    <Cards>
      <SolidCard
        title="General"
        rows={[
          <TextRow key="Age" title="Age" text={formattedAge(description.general.age)} />,
          <TextRow key="Ethnic group" title="Ethnic group" text={description.general.ethnic_group} />,
          <TextRow key="Sex" title="Sex" text={description.general.sex} />,
          <TextRow key="Firstname" title="Firstname" text={description.general.firstname} />,
        ]}
      />
      <SolidCard
        title="Body"
        isEmpty={isEmpty([
          description.body.build,
          description.body.weight,
          description.body.height,
          description.body.breast_size,
        ])}
        rows={[
          <TextRow key="Build" title="Build" text={description.body.build} />,
          <TextRow key="Weight" title="Weight" text={description.body.weight} />,
          <TextRow key="Height" title="Height" text={description.body.height} />,
          <TextRow key="Breast size" title="Breast size" text={description.body.breast_size} />,
        ]}
      />
      <SolidCard
        title="Hair"
        isEmpty={isEmpty([
          description.hair.style,
          description.hair.color,
          description.hair.length,
        ])}
        rows={[
          <TextRow key="Style" title="Style" text={description.hair.style} />,
          <TextRow key="Color" title="Color" text={description.hair.color} />,
          <TextRow key="Length" title="Length" text={description.hair.length} />,
          <TextRow key="Nature" title="Nature" text={yesNoMaybe(description.hair.nature)} />,
        ]}
      />
      <SolidCard
        title="Face"
        isEmpty={isEmpty([
          description.face.care,
          description.face.shape,
          description.face.freckles,
        ])}
        rows={[
          <ProgressRow key="Care" title="Care" value={description.face.care} />,
          <TextRow key="Freckles" title="Freckles" text={yesNoMaybe(description.face.freckles)} />,
          <TextRow key="Shape" title="Shape" text={description.face.shape} />,
        ]}
      />
      <SolidCard
        title="Eyebrow"
        isEmpty={isEmpty([
          description.eyebrow.care,
          description.eyebrow.color,
        ])}
        rows={[
          <ProgressRow key="Care" title="Care" value={description.eyebrow.care} />,
          <TextRow key="Color" title="Color" text={description.eyebrow.color} />,
        ]}
      />
      <SolidCard
        title="Eyes"
        isEmpty={isEmpty([
          description.eye.left.color,
          description.eye.left.lenses,
        ])}
        rows={[
          <TextRow key="Color" title="Color" text={description.eye.left.color} />,
          <TextRow key="Lenses" title="Lenses" text={yesNoMaybe(description.eye.left.lenses)} />,
        ]}
      />
      <SolidCard
        isEmpty={isEmpty([
          description.teeth.care,
          description.teeth.braces,
        ])}
        title="Teeth"
        rows={[
          <ProgressRow key="Care" title="Care" value={description.teeth.care} />,
          <TextRow key="Braces" title="Braces" text={yesNoMaybe(description.teeth.braces)} />,
        ]}
      />
      <SolidCard
        title="Hands"
        isEmpty={isEmpty([
          description.hands.care,
          description.hands.vein_visibility,
          description.hands.joint_visibility,
        ])}
        rows={[
          <ProgressRow key="Care" title="Care" value={description.hands.care} />,
          <ProgressRow key="Vein visibility" title="Vein visibility" value={description.hands.vein_visibility} />,
          <ProgressRow key="Joint visibility" title="Joint visibility" value={description.hands.joint_visibility} />,
        ]}
      />
      <SolidCard
        title="Nails"
        isEmpty={isEmpty([
          description.hands.nails.care,
          description.hands.nails.color,
          description.hands.nails.length,
        ])}
        rows={[
          <ProgressRow key="Care" title="Care" value={description.hands.nails.care} />,
          <TextRow key="Color" title="Color" text={description.hands.nails.color} />,
          <TextRow key="Length" title="Length" text={description.hands.nails.length} />,
        ]}
      />
      <SolidCard
        title="Hand hair"
        isEmpty={isEmpty([
          description.hands.hair.amount,
          description.hands.hair.color,
        ])}
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
