import React from "react";

interface Props {
  name: string;
  id: number;
  image: string;
  type: string;
}

function PokemonList(props: Props) {
  const { name, id, image, type } = props;
  return (
    <div className="p-10">
      <p className="flex justify-center"> #{id}</p>
      <p className="flex justify-center">{name}</p>
      <img className="w-fit h-fit" src={image} alt={name} />
      <p> Type : {type} </p>
    </div>
  );
}

export default PokemonList;
