// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

type ListItemLinkProps = {|
  +children: string,
  +href: string,
  +icon: Object,
|};
const ListItemLink = ({ children, href, icon }: ListItemLinkProps) => (
  <ListItem button>
    <Link to={href}>
      <ListItemIcon>{icon}</ListItemIcon>
    </Link>
    <ListItemText primary={<NormalLink to={href}>{children}</NormalLink>} />
  </ListItem>
);

const NormalLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export default ListItemLink;