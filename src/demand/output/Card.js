// @flow
import React from 'react';
import styled from 'styled-components';
import LinearProgress from 'material-ui/LinearProgress';
import { Card, CardHeader, CardText } from 'material-ui/Card';

export const Cards = styled.div`
  flex-wrap: wrap;
  display: flex;
  justify-content: space-around;
`;

const ResizedCard = styled(Card)`
  width: 300px;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const Row = styled.tr`
  text-align: left;
`;

const ProgressTd = styled.td`
  min-width: 40px;
`;

type TextRowProps = {
  title: string,
  text: string,
};
export const TextRow = ({ title, text }: TextRowProps) => {
  if (text) {
    return (
      // $FlowFixMe
      <React.Fragment>
        <Row>
          <th>{title}</th>
          <td>{text}</td>
        </Row>
      </React.Fragment>
    );
  }
  return null;
};

type ProgressRowProps = {
  title: string,
  value: number,
};
export const ProgressRow = ({ title, value }: ProgressRowProps) => (
  // $FlowFixMe
  <React.Fragment>
    <Row>
      <th>{title}</th>
      <ProgressTd><LinearProgress mode="determinate" value={value * 10} /></ProgressTd>
    </Row>
  </React.Fragment>
);

export const yesNo = (value: mixed) => (value ? 'Yes' : 'No');

type SolidCardProps = {
  title: string,
  rows: Array<Object>,
};
export const SolidCard = ({ title, rows }: SolidCardProps) => {
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
