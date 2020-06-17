const schema = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    coordinates: {
      type: 'array',
      minItems: 2,
      maxItems: 2,
      items: {
        type: 'number',
      }
    },
  },
  additionalProperties: false,
}


module.exports = schema;
