import { envsafe, str, url } from 'envsafe';

/**
 * Declare all environment variables here and access through this interface.
 */
const env = envsafe({
	NODE_ENV: str({
		choices: ['development', 'test', 'production'],
		devDefault: 'development'
	}),
	DB_CONN_STRING: url({
		devDefault: 'mongodb://localhost'
	}),
	DB_NAME: str({
		default: 'govote'
	})
});

export default env;
