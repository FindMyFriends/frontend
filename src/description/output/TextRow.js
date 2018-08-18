// @flow
import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import CardTitle from './CardTitle';

const Row = styled.tr`
  text-align: left;
`;

type Props = {|
  +title: string | Object,
  +text: string | Object,
|};
export const TextRow = ({ title, text }: Props) => {
  if (typeof text === 'string' && text.trim().length > 0) {
    return (
      <Row>
        <CardTitle>{title}</CardTitle>
        <td>
          <Typography variant="body1">
            {text}
          </Typography>
        </td>
      </Row>
    );
  }
  return null;
};

export default TextRow;
