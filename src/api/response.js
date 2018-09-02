// @flow
export const extractedLocationId = (location: string): string | number => location.substring(location.lastIndexOf('/') + 1);
export const extractedTotalCount = (headers: Array<Object>): number => parseInt(headers['x-total-count'], 10);
