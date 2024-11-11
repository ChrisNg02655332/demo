const BASE_URL = "https://pokeapi.co/api/v2";

export const list = async (
  params: { limit: number; offset: number },
  opts?: any,
) => {
  const endpoint = `${BASE_URL}/pokemon/?limit=${params.limit}&offset=${params?.offset}`;

  try {
    const response = await fetch(endpoint, opts || {});

    const data = await response.json();
    const results = data.results.map(
      (item: { name: string; url: string; id: string }) => {
        const arr = item.url.split("/").filter((item) => item);
        item.id = arr[arr.length - 1];
        return item;
      },
    );
    return { ...data, results };
  } catch (error) {
    console.error(error);
    throw new Error(error as string);
  }
};

export const getPokemon = async (id: string) => {
  const endpoint = `${BASE_URL}/pokemon/${id}`;
  const endpoint1 = `${BASE_URL}/pokemon-species/${id}`;

  try {
    const response = await fetch(endpoint);
    const response1 = await fetch(endpoint1);

    const data = await response.json();
    const data1 = await response1.json();
    return { ...data, ...data1 };
  } catch (error) {
    console.error(error);
    throw new Error(error as string);
  }
};
