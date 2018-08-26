// @flow
import React from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

const Resized = styled(Card)`
  width: 300px;
  margin-top: 10px;
`;
export const Container = styled.div`
  flex-wrap: wrap;
  display: flex;
  justify-content: space-around;
`;

type Props = {|
  +title: string | Object,
  +rows: Array<Object>,
  +isEmpty?: boolean,
|};
export const Solid = ({ title, rows, isEmpty = false }: Props) => {
  if (!isEmpty) {
    return (
      <Resized>
        <CardHeader title={title} />
        <CardContent>
          <table>
            <tbody>
              {rows}
            </tbody>
          </table>
        </CardContent>
      </Resized>
    );
  }
  return null;
};
