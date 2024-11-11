import { Image } from "@nextui-org/image";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import * as pokemons from "$/services/pokemons";
import { capitalize, getColor } from "$/utils/helper";
import { Chip } from "@nextui-org/chip";
import { Skeleton } from "@nextui-org/skeleton";
import { Card, CardBody } from "@nextui-org/card";

export function PokemonDetail() {
  const params = useParams() as { id: string };
  const { data, isLoading } = useQuery({
    queryKey: [`pokemon_${params.id}`],
    queryFn: () => pokemons.getPokemon(params.id as string),
  });

  return (
    <div className="flex flex-col gap-10">
      <h2 className="text-4xl w-96 m-auto font-medium capitalize text-center">
        {isLoading ? (
          <Skeleton className="rounded-lg">
            <div className="h-10 rounded-lg bg-default-300" />
          </Skeleton>
        ) : (
          <>
            {data?.name}{" "}
            <span className="text-gray-400 text-3xl">
              #{data?.id?.toString().padStart(3, "0")}
            </span>
          </>
        )}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:w-3/5 mx-7 md:m-auto">
        <div className="flex-1 transition group cursor-pointer items-center justify-center flex">
          {isLoading ? (
            <Skeleton className="rounded-lg">
              <div
                className="rounded-lg bg-default-300"
                style={{ height: 300, width: 300 }}
              />
            </Skeleton>
          ) : (
            <Image
              width={300}
              height={300}
              className="ease-in-out group-hover:-translate-y-1 group-hover:scale-110"
              alt="NextUI hero Image with delay"
              src={`https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/${params.id.padStart(3, "0")}.png`}
            />
          )}
        </div>
        <div className="space-y-7">
          {isLoading ? (
            <>
              <Skeleton className="rounded-lg">
                <div className="h-24 rounded-lg bg-default-300" />
              </Skeleton>

              <Skeleton className="rounded-lg">
                <div className="h-44 rounded-lg bg-default-300" />
              </Skeleton>
            </>
          ) : (
            <>
              <p className="text-lg font-medium">
                {data?.flavor_text_entries[0].flavor_text}
              </p>
              <div className="grid grid-cols-1 gap-7 bg-primary-100 rounded p-5">
                <div className="grid grid-cols-2">
                  <div>
                    <p className="font-medium">Height</p>
                    <p>{data?.height}'</p>
                  </div>
                  <div>
                    <p className="font-medium">Habitat</p>
                    <p className="capitalize">{data?.habitat?.name}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div>
                    <p className="font-medium">Weight</p>
                    <p>{((data?.weight / 10) * 2.205).toFixed(1)} lbs</p>
                  </div>
                  <div>
                    <p className="font-medium">Abilities</p>
                    <p>
                      {data?.abilities
                        .map((item: any) => capitalize(item?.ability?.name))
                        .join(", ")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                {data?.types?.map((item: any) => (
                  <Chip
                    key={item?.type?.name}
                    radius="sm"
                    size="lg"
                    variant="flat"
                    color={getColor(item?.type?.name)}
                  >
                    {capitalize(item?.type?.name)}
                  </Chip>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
