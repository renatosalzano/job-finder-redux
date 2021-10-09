import { useRef, useState } from "react";
import InputAutoComplete from "./InputAutoComplete";
import categories from "../assets/categories.json";
import countries from "../assets/countries.json";
import cities from "cities.json";
import { FiSearch } from "react-icons/fi";

import InputLocation from "./InputLocation";
import { useAppDispatch } from "../app/hooks";
import { updateReq } from "../app/apiSlice";

const SearchBar: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const submit = (evt: any) => {
    evt.preventDefault();
    let category =
      evt.target[0].value &&
      "&category=" + evt.target[0].value.replace(/ /g, "%20");
    let city = evt.target[1].value.trim().replace(/ /g, "%20");
    let country = evt.target[2].value.trim().replace(/ /g, "%20");
    let location = `&location=${country}`;
    if (city) {
      location = `&location=${city}%2C20${country}`;
    }

    dispatch(updateReq({ location: location, category: category }));
  };
  return (
    <form onSubmit={(e) => submit(e)}>
      <InputAutoComplete suggestions={categories} placeholder="Job title" />
      <InputLocation countries={countries} cities={cities} />
      <button type="submit">
        <FiSearch />
      </button>
    </form>
  );
};

export default SearchBar;
