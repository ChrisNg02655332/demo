import React from "react";
import { useInView } from "framer-motion";

import { Image } from "@nextui-org/image";
import { Spinner } from "@nextui-org/spinner";
import { useQuery } from "@tanstack/react-query";

import * as pokemons from '$/services/pokemons'
import { Pokemon } from "$/types";
import { useNavigate } from "react-router-dom";

export default function PokemonList() {
  const navigate = useNavigate()
  const [offset, setOffset] = React.useState(0);
  const [list, setList] = React.useState<Pokemon[]>([]);
  const [fetching, setFetching] = React.useState(false)
  const { data } = useQuery({ queryKey: ['pokemons'], queryFn: () => pokemons.list({ limit: 12, offset }) })

  const ref = React.useRef(null)
  const inView = useInView(ref)

  const onFetchMore = async () => {
    const _offset = offset + 12
    setFetching(true)
    const res = await pokemons.list({ limit: 12, offset: _offset });

    if (res) {
      setList((prev) => [...prev, ...res.results]);
      setOffset(_offset);
    }

    setFetching(false)
  };

  React.useEffect(() => {
    if (inView && !fetching) {
      onFetchMore()
    }

  }, [inView, fetching]);

  React.useEffect(() => {
    if (data) {
      setList(data.results)
    }
  }, [data])

  return <>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:w-3/5 mx-7 md:m-auto">
      {list.map((item) => (
        <div key={item.id} className="flex-1 transition group cursor-pointer" onClick={() => navigate(`/pokemons/${item.id}`)}>
          <div className="flex items-center justify-center rounded-md bg-default-100">
            <Image
              key={item.name}
              width={0}
              height={0}
              className="w-full h-auto ease-in-out group-hover:-translate-y-1 group-hover:scale-110"
              alt="NextUI hero Image with delay"
              src={`https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/${item.id.padStart(3, "0")}.png`}
            />
          </div>

          <p className="px-4 py-1 text-sm font-semibold text-default-400">#{item.id}</p>

          <div className="px-4 pt-2 pb-5">
            <p className="capitalize text-lg font-semibold">{item.name}</p>
          </div>
        </div>
      ))}
    </div>

    <div
      ref={ref}
      className='flex items-center justify-center w-full'
    >
      <Spinner />
    </div>
  </>
}
