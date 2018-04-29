export const test = () => ({
  general: {
    firstname: 'Dominik',
    lastname: null,
    sex: 'woman',
    ethnic_group_id: 1,
    age: {
      from: 15,
      to: 20,
    },
  },
  body: {
    build_id: 1,
    weight: {
      unit: 'kg',
      value: 60,
    },
    height: {
      unit: 'cm',
      value: 180,
    },
    breast_size: null,
  },
  hair: {
    style_id: 1,
    color_id: 8,
    length: {
      value: 5,
      unit: 'cm',
    },
    highlights: false,
    roots: false,
    nature: true,
  },
  beard: {
    style: null,
    color_id: null,
    length: {
      value: null,
      unit: null,
    },
  },
  eyebrow: {
    care: 7,
    color_id: 8,
  },
  eye: {
    left: {
      color_id: 8,
      lenses: true,
    },
    right: {
      color_id: 8,
      lenses: true,
    },
  },
  teeth: {
    care: 6,
    braces: false,
  },
  face: {
    freckles: false,
    care: 8,
    shape_id: 1,
  },
  hands: {
    care: 9,
    vein_visibility: 5,
    joint_visibility: 8,
    nails: {
      color_id: 8,
      length: {
        value: 1,
        unit: 'cm',
      },
      care: 4,
    },
    hair: {
      amount: 3,
      color_id: 8,
    },
  },
  location: {
    coordinates: {
      latitude: 50.5,
      longitude: 50.6,
    },
    met_at: {
      moment: '2017-01-01T13:58:10+00:00',
      timeline_side: 'sooner or later',
      approximation: 'PT10H',
    },
  },
});

export const initial = () => ({
  general: {
    firstname: '',
    lastname: '',
    sex: null,
    ethnic_group_id: null,
    age: {
      from: 15,
      to: 100,
    },
  },
  body: {
    build_id: null,
    weight: {
      unit: 'kg',
      value: '',
    },
    height: {
      unit: 'cm',
      value: '',
    },
    breast_size: null,
  },
  hair: {
    style_id: null,
    color_id: null,
    length: {
      value: '',
      unit: 'cm',
    },
    highlights: null,
    roots: null,
    nature: false,
  },
  beard: {
    style: null,
    color_id: null,
    length: {
      value: '',
      unit: 'mm',
    },
  },
  eyebrow: {
    care: null,
    color_id: null,
  },
  eye: {
    left: {
      color_id: null,
      lenses: null,
    },
    right: {
      color_id: null,
      lenses: null,
    },
  },
  teeth: {
    care: null,
    braces: null,
  },
  face: {
    freckles: false,
    care: 0,
    shape_id: null,
  },
  hands: {
    care: null,
    vein_visibility: null,
    joint_visibility: null,
    nails: {
      color_id: null,
      length: {
        value: '',
        unit: 'cm',
      },
      care: null,
    },
    hair: {
      amount: null,
      color_id: null,
    },
  },
  location: {
    coordinates: {
      latitude: '',
      longitude: '',
    },
    met_at: {
      moment: '',
      timeline_side: 'sooner or later',
      approximation: 'PT1H',
    },
  },
});
