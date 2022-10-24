import { fastify } from 'fastify';
import { getEvents } from './getEvents.js';

const api = fastify();

async function startApi() {
	try {
		api.get('/', {}, async (request, reply) => {
			const events = await getEvents();
			reply.send({events})
		})

		await api.listen({port: 500});
		console.log('Server listening at port: 500');
	} catch (e) {
		console.error(e);
	}
}

startApi();