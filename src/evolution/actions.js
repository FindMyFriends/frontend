import parse from 'parse-link-header';

export const RECEIVED_ALL_EVOLUTIONS = 'RECEIVED_ALL_EVOLUTIONS';
export const RECEIVED_PAGINATION_FOR_ALL_EVOLUTIONS = 'RECEIVED_PAGINATION_FOR_ALL_EVOLUTIONS';
export const RECEIVED_SINGLE_EVOLUTION = 'RECEIVED_SINGLE_EVOLUTION';
export const EXTENDED_EVOLUTION = 'EXTENDED_EVOLUTION';
export const RECEIVED_EVOLUTION_OPTIONS = 'RECEIVED_EVOLUTION_OPTIONS';
export const RECEIVED_EVOLUTION_SCHEMA = 'RECEIVED_EVOLUTION_SCHEMA';

export const receivedSchema = schema => ({
  type: RECEIVED_EVOLUTION_SCHEMA,
  schema,
});

export const receivedOptions = options => ({
  type: RECEIVED_EVOLUTION_OPTIONS,
  options,
});

export const receivedAll = evolutions => ({
  type: RECEIVED_ALL_EVOLUTIONS,
  evolutions,
});

export const receivedPaginationForAll = pages => ({
  type: RECEIVED_PAGINATION_FOR_ALL_EVOLUTIONS,
  pages: parse(pages),
});

export const receivedSingle = (id, evolution, etag) => {
  const progress = evolution;
  delete progress.general.age;
  delete progress.id;
  delete progress.seeker_id;
  return {
    type: RECEIVED_SINGLE_EVOLUTION,
    id,
    progress,
    etag,
  };
};

export const extendedEvolution = (progress, location) => ({
  type: EXTENDED_EVOLUTION,
  evolution: progress,
  id: location.substring(location.lastIndexOf('/') + 1),
});
