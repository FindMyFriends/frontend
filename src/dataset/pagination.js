// @flow
import parse from 'parse-link-header';
import { PaginationType } from './PaginationType';

export const fromHeader = (link: string): PaginationType => {
  const links = parse(link);
  return {
    page: parseInt(links.first.page, 10),
    perPage: parseInt(links.first.per_page, 10),
  };
};