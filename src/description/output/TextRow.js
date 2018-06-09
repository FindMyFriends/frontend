// @flow
import React from 'react';
import styled from 'styled-components';

const Row = styled.tr`
  text-align: left;
`;

const Header = styled.th`
  min-width: 100px;
`;

type Props = {|
  +title: string,
  +text: string | Object,
|};
export const TextRow = ({ title, text }: Props) => {
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

export default TextRow;
