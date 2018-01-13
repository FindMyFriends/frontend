export const validatedRace = (race, ethnicGroups) => {
  if (ethnicGroups.includes(race)) {
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

export const validatedAge = (age, { minimum, maximum }) => {
  if (age < minimum || age > maximum) {
    throw new Error(`Age must be in range from ${minimum} to ${maximum}`);
  }
  return age;
};

export const validatedDemand = (demand, selects) => {
  const { ethnicGroups, genders, ages } = selects;
  const { general } = demand;
  return {
    general: {
      race: validatedRace(general.race, ethnicGroups),
      gender: validatedGender(general.gender, genders),
      age: validatedAge(general.age, ages),
    },
  };
};

export default validatedDemand;
