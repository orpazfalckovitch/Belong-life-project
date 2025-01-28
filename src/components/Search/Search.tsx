import React from "react";
import "./Search.scss";

interface Props {
  onKeyUp: (value: string) => void;
}

function Search({ onKeyUp }: Props) {
  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const inputValue = (event.target as HTMLInputElement).value;
    onKeyUp(inputValue);
  };

  return (
    <div className="search">
      <input
        type="text"
        name="search"
        placeholder="Search by country name"
        onKeyUp={handleKeyUp}
      />
    </div>
  );
}

export default Search;
