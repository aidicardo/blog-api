import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blog API',
      version: '1.0.0',
      description: 'A scalable blog REST API using Express and MongoDB',
    },
    tags: [
      { name: 'Posts' },
      { name: 'Auth' },
      { name: 'Users' },
    ],
    components: {
      schemas: {
        Post: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            content: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        User: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            email: { type: 'string', format: 'email' },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

export const swaggerSpec = swaggerJSDoc(options);

