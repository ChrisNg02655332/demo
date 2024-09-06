"use client";
import { useState, useEffect } from "react";
import * as _ from 'lodash'
import { Card, CardHeader, CardBody, CardFooter, Image, Spinner } from "@nextui-org/react";

import { getPokemons } from "$lib/actions/get-pokemons";
import { useInView } from "react-intersection-observer";

type PokemonListProps = {
  pokemons: { name: string, id: string }[];
  next?: string;
};

export default function PokemonList(props: PokemonListProps) {
  const [nextUrl, setNextUrl] = useState(props.next);
  const [offset, setOffset] = useState(0);
  const [list, setList] = useState(props.pokemons || []);
  const [fetching, setFetching] = useState(false)
  const [ref, inView] = useInView()

  const onFetchMore = async () => {
    if (nextUrl) {
      const _offset = offset + 12
      setFetching(true)
      const res = await getPokemons({ limit: 12, offset: _offset });

      if (res) {
        setList((prev) => [...prev, ...res.results]);
        setNextUrl(res.next);
        setOffset(_offset);
      }

      setFetching(false)
    }
  };

  useEffect(() => {
    if (inView && !fetching) {
      onFetchMore()
    }

  }, [inView, fetching]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:w-4/5 m-auto">
        {list.map((item) => (
          <div key={item.id} className="flex-1 transition group cursor-pointer">
            <div className="flex items-center justify-center rounded-md bg-default-100">
              <Image
                key={item.name}
                width={0}
                height={0}
                className="w-full h-auto ease-in-out group-hover:-translate-y-1 group-hover:scale-110"
                alt="NextUI hero Image with delay"
                src={`https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/${item.id}.png`}
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
  );
}


