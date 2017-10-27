export const validatedRace = (race, races) => {
  if (races.includes(race)) {
    return race;
  }
  throw new Error(`Race ${race} is not allowed`);
};

export const validatedGender = (gender, genders) => {
  if (genders.includes(gender)) {
    return gender;
  }
  throw new Error(`Gender ${gender} is not allowed`);
};

export const validatedBirthYear = (birthYear) => {
  const constraint = { from: 1800, to: (new Date()).getFullYear() };
  const splitted = birthYear.split(',');
  const ranges = { from: splitted[0].slice(1), to: splitted[1].slice(0, -1) };
  if (ranges.from > ranges.to) {
    throw new Error('Years are swapped');
  } else if (ranges.from < constraint.from || ranges.to > constraint.to) {
    throw new Error(`Years must be in range from ${constraint.from} to ${constraint.to}`);
  }
  return birthYear;
};

export const validatedDemand = (demand, selects) => {
  const { races, genders } = selects;
  const { general } = demand;
  return {
    general: {
      race: validatedRace(general.race, races),
      gender: validatedGender(general.gender, genders),
      birth_year: validatedBirthYear(general.birth_year),
    },
  };
};

export default validatedDemand;
