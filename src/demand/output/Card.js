// @flow
import React from 'react';
import styled from 'styled-components';
import range from 'lodash/range';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { OutputRating } from './../../components/Rating';

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

const Dot = styled.div`
  height: 8px;
  margin-right: 1px;
  width: 8px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
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
    <ProgressTd title={value}>
      <OutputRating current={value} max={10} />
    </ProgressTd>
  </Row>
);

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
