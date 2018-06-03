// @flow
export default function extractedLocationId(location: string): string | number {
  return location.substring(location.lastIndexOf('/') + 1);
};
