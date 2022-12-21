import React, { useState, useCallback } from "react";
// import classnames from "classnames";
// you should import `lodash` as a whole module
import { debounce } from "lodash";
import axios from "axios";

const ITEMS_API_URL = "https://example.com/api/items";
const DEBOUNCE_DELAY = 500;

// the exported component can be either a function or a class
const autoSuggest = (items) => {
  console.log("ITEMS:", items);

  return (
    <div className="list">
      {items.length &&
        items.map((elem, index) => (
          <a className="list-item" key={index}>
            {elem.id}
          </a>
        ))}
    </div>
  );
};

export default function Autocomplete() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState({});

  const onChange = ({ target: { value } }) => {
    // setSearch(value);
    onSearch(value);
  };

  const onSearch = debounce(async (value) => {
    const { data } = await axios.get("/images/search", {
      params: {
        page: 0,
        limit: 10,
        breed_id: "aege",
      },
    });

    console.log("DATA:", data);
    setData(data);
  }, 500);

  return (
    <div className="wrapper">
      <div className="control">
        <input type="text" className="input" onChange={onChange} />
        {autoSuggest(data)}
      </div>
      <div className="list is-hoverable" />
    </div>
  );
}
