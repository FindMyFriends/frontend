// @flow
import React from 'react';
import YesNoMaybe from '../../components/Card/YesNoMaybe';
import * as Row from '../../components/Card/Row';
import * as Card from '../../components/Card';
import { formattedAge } from '../formats';

const isEmpty = (items: Array<string>) => (
  items.filter(item => item).map(item => item.toString().trim()).filter(item => item).length === 0
);

type Props = {|
  +description: Object,
  +cards?: mixed,
|};
const Overview = ({ description, cards = null }: Props) => {
  return (
    <Card.Container>
      <Card.Solid
        title="General"
        rows={[
          <Row.Text key="Age" title="Age" text={formattedAge(description.general.age)} />,
          <Row.Text key="Ethnic group" title="Ethnic group" text={description.general.ethnic_group} />,
          <Row.Text key="Sex" title="Sex" text={description.general.sex} />,
          <Row.Text key="Firstname" title="Firstname" text={description.general.firstname} />,
        ]}
      />
      <Card.Solid
        title="Body"
        isEmpty={isEmpty([
          description.body.build,
          description.body.breast_size,
        ])}
        rows={[
          <Row.Text key="Build" title="Build" text={description.body.build} />,
          <Row.Text key="Breast size" title="Breast size" text={description.body.breast_size} />,
        ]}
      />
      <Card.Solid
        title="Hair"
        isEmpty={isEmpty([
          description.hair.style,
          description.hair.color,
          description.hair.length,
        ])}
        rows={[
          <Row.Text key="Style" title="Style" text={description.hair.style} />,
          <Row.Text key="Color" title="Color" text={description.hair.color} />,
          <Row.Text key="Length" title="Length" text={description.hair.length} />,
          <Row.Text key="Nature" title="Nature" text={<YesNoMaybe>{description.hair.nature}</YesNoMaybe>} />,
        ]}
      />
      <Card.Solid
        title="Face"
        isEmpty={isEmpty([
          description.face.care,
          description.face.shape,
          description.face.freckles,
        ])}
        rows={[
          <Row.Progress key="Care" title="Care" value={description.face.care} />,
          <Row.Text key="Freckles" title="Freckles" text={<YesNoMaybe>{description.face.freckles}</YesNoMaybe>} />,
          <Row.Text key="Shape" title="Shape" text={description.face.shape} />,
        ]}
      />
      <Card.Solid
        title="Eyebrow"
        isEmpty={isEmpty([
          description.eyebrow.care,
          description.eyebrow.color,
        ])}
        rows={[
          <Row.Progress key="Care" title="Care" value={description.eyebrow.care} />,
          <Row.Text key="Color" title="Color" text={description.eyebrow.color} />,
        ]}
      />
      <Card.Solid
        title="Eyes"
        isEmpty={isEmpty([
          description.eye.left.color,
          description.eye.left.lenses,
        ])}
        rows={[
          <Row.Text key="Color" title="Color" text={description.eye.left.color} />,
          <Row.Text key="Lenses" title="Lenses" text={<YesNoMaybe>{description.eye.left.lenses}</YesNoMaybe>} />,
        ]}
      />
      <Card.Solid
        isEmpty={isEmpty([
          description.teeth.care,
          description.teeth.braces,
        ])}
        title="Teeth"
        rows={[
          <Row.Progress key="Care" title="Care" value={description.teeth.care} />,
          <Row.Text key="Braces" title="Braces" text={<YesNoMaybe>{description.teeth.braces}</YesNoMaybe>} />,
        ]}
      />
      <Card.Solid
        title="Hands"
        isEmpty={isEmpty([
          description.hands.care,
          description.hands.visible_veins,
        ])}
        rows={[
          <Row.Progress key="Care" title="Care" value={description.hands.care} />,
          <Row.Text key="Vein visibility" title="Vein visibility" text={<YesNoMaybe>{description.hands.visible_veins}</YesNoMaybe>} />,
        ]}
      />
      <Card.Solid
        title="Nails"
        isEmpty={isEmpty([
          description.hands.nails.color,
          description.hands.nails.length,
        ])}
        rows={[
          <Row.Text key="Color" title="Color" text={description.hands.nails.color} />,
          <Row.Text key="Length" title="Length" text={description.hands.nails.length} />,
        ]}
      />
      {cards}
    </Card.Container>
  );
};

export default Overview;
