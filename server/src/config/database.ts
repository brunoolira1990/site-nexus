import knex from 'knex';
import config from '../../knexfile';

// Use the 'development' configuration from the knexfile
const db = knex(config.development);

export default db; 