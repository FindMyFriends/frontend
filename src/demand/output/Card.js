import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
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

export const TextRow = ({ title, text }) => (
  <React.Fragment>
    <Row>
      <th>{title}</th>
      <td>{text}</td>
    </Row>
  </React.Fragment>
);

export const ProgressRow = ({ title, value }) => (
  <React.Fragment>
    <Row>
      <th>{title}</th>
      <td><LinearProgress mode="determinate" value={value * 10} /></td>
    </Row>
  </React.Fragment>
);

export const yesNo = value => (value ? 'Yes' : 'no');

export const SolidCard = ({ title, rows }) => {
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


TextRow.propTypes = {
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

ProgressRow.propTypes = {
  value: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

SolidCard.propTypes = {
  rows: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};
