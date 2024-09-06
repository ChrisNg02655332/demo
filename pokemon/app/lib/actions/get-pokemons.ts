"use server";

import { handleError } from "$lib/utils/handle-response-error";

// NOTE: can use process.env.BASE_URL
const BASE_URL = "https://pokeapi.co/api/v2"

export const getPokemons = async (
	params: { limit: number; offset: number },
	opts?: any
) => {
	const endpoint = `${BASE_URL}/pokemon/?limit=${params.limit}&offset=${params?.offset}`;

	try {
		const response = await fetch(endpoint, opts || {});

		if (!response.ok) {
			throw await handleError(response);
		}

		const data = await response.json();
		const results = data.results.map((item: { name: string; url: string, id: string }) => {
			const arr = item.url.split('/').filter(item => item)
			item.id = arr[arr.length - 1].padStart(3, '0')
			return item
		})
		return { ...data, results };
	} catch (error) {
		console.error(error);
		throw new Error(error as string);
	}
};
