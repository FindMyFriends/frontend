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

export const validatedAge = (age) => {
  const splitted = age.split(',');
  const ranges = { from: splitted[0].slice(1), to: splitted[1].slice(0, -1) };
  if (ranges.from > ranges.to) {
    throw new Error('Ages are swapped');
  }
  return age;
};

export const validatedDemand = (demand, selects) => {
  const { races, genders } = selects;
  const { general } = demand;
  return {
    general: {
      race: validatedRace(general.race, races),
      gender: validatedGender(general.gender, genders),
      age: validatedAge(general.age),
    },
  };
};

export default validatedDemand;
