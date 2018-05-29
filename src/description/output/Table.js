// @flow
import React from 'react';
import styled from 'styled-components';
import { OutputRating } from './../../components/Rating';

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
    <ProgressTd title={value}>
      <OutputRating current={value} max={10} />
    </ProgressTd>
  </Row>
);
