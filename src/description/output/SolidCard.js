// @flow
import React from 'react';
import styled from 'styled-components';
import { Card, CardHeader, CardText } from 'material-ui/Card';

const ResizedCard = styled(Card)`
  width: 300px;
  margin-bottom: 10px;
  margin-top: 10px;
`;

type SolidCardProps = {|
  title: string,
  rows: Array<Object>,
|};
const SolidCard = ({ title, rows }: SolidCardProps) => {
  return (
    <ResizedCard>
      <CardHeader title={title} titleStyle={{ fontSize: '20px' }} />
      <CardText>
        <table>
          <tbody>
            {rows}
          </tbody>
        </table>
      </CardText>
    </ResizedCard>
  );
};

export default SolidCard;
