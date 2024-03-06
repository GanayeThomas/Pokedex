import React from "react";
import Link from "next/link";

interface Props {
  name: string;
  id: number;
  image: string;
  type: string;
}

function PokemonList(props: Props) {
  const { name, id, image, type } = props;
  return (
    <Link href={`/pokemon/${name}`}>
      <div>
        <p className="flex justify-center"> #{id}</p>
        <p className="flex justify-center">{name}</p>
        <img className="p-10 w-fit h-fit" src={image} alt={name} />
        <p className="flex justify-center"> Type : {type} </p>
      </div>
    </Link>
  );
}

export default PokemonList;
