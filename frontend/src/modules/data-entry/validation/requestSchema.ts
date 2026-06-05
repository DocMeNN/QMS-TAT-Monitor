// src/modules/data-entry/validation/requestSchema.ts

export const requestSchema = {
  title: {
    required: true,
    minLength: 5,
  },
  requester: {
    required: true,
    minLength: 3,
  },
  department: {
    required: true,
  },
  description: {
    required: true,
    minLength: 15,
  },
  category: {
    required: true,
  },
};