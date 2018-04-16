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

const Header = styled.th`
  min-width: 100px;
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
      <Row>
        <Header>{title}</Header>
        <td>{text}</td>
      </Row>
    );
  }
  return null;
};

type ProgressRowProps = {
  title: string,
  value: number,
};
export const ProgressRow = ({ title, value }: ProgressRowProps) => (
  <Row>
    <Header>{title}</Header>
    <ProgressTd><LinearProgress mode="determinate" value={value * 10} /></ProgressTd>
  </Row>
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
