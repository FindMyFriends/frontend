const toRequest = (demand) => {
  return {
    general: {
      race: demand.general_race,
      birth_year: `[${demand.general_birth_year_from || ''},${demand.general_birth_year_to || ''})`,
      gender: demand.general_gender,
    },
  };
};
export default toRequest;
