const toRequest = (demand) => {
  return {
    general: {
      race: demand.general_race,
      age: `[${demand.general_age_from},${demand.general_age_to})`,
      gender: demand.general_gender,
    },
  };
};
export default toRequest;
