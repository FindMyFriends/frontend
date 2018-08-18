// @flow
import React from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

const ResizedCard = styled(Card)`
  width: 300px;
  margin-top: 10px;
`;

type Props = {|
  +title: string | Object,
  +rows: Array<Object>,
  +isEmpty?: boolean,
|};
const SolidCard = ({ title, rows, isEmpty = false }: Props) => {
  if (!isEmpty) {
    return (
      <ResizedCard>
        <CardHeader title={title} />
        <CardContent>
          <table>
            <tbody>
              {rows}
            </tbody>
          </table>
        </CardContent>
      </ResizedCard>
    );
  }
  return null;
};

export default SolidCard;
