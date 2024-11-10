import { getPokemons } from "$lib/actions/get-pokemons";
import PokemonList from "$lib/ui/pokemon-list";

export default async function Page() {
  const data = await getPokemons({ limit: 12, offset: 0 });

  return (
    <div className="mx-10">
      <PokemonList pokemons={data?.results} next={data?.next} />
    </div>
  );
}
