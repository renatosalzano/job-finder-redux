import React, { useCallback, useEffect, useRef, useState } from "react";
import "../styles/input-location.scss";
import { VscArrowLeft } from "react-icons/vsc";
import InputAutoComplete from "./InputAutoComplete";
import DropDown from "./partial/DropDown";

interface Props {
  countries: any;
  cities: any;
}

const InputLocation: React.FunctionComponent<Props> = ({
  countries,
  cities,
}) => {
  const [inputIsVisible, setInputIsVisible] = useState<Boolean>(false);
  const [inputIsDisabled, setInputIsDisabled] = useState<Boolean>(false);
  const [input, setInput] = useState<string>("Italy");
  const [countryCode, setCountryCode] = useState<string>("IT");
  const [suggestionsCities, setSuggestionsCities] = useState<any[]>([]);

  const set_country_code = (country_name: string) => {
    let value = country_name.toLowerCase();
    let code = countries.filter((country: any) =>
      country.name.toLowerCase().includes(value)
    )[0].code;
    setCountryCode(code);
    setInputIsVisible(false);
  };

  const filter_cities = useCallback(
    (code_value) => {
      let res = [];
      if (code_value === "remote" || code_value === "all") {
        setInputIsDisabled(true);
        return console.log("REMOTE OR ALL");
      }
      if (code_value) {
        setInputIsDisabled(false);
        res = cities.filter((city: any) => city.country.includes(code_value));
      }
      setSuggestionsCities(res);
    },
    [cities]
  );

  const reset_country_input = useCallback(() => {
    if (!inputIsVisible && !input) {
      // restore input value if empty
      let input = countries.filter((country: any) => {
        return country.code.includes(countryCode);
      })[0].name;
      setInput(input);
    }
  }, [input, inputIsVisible, setInput, countries, countryCode]);
  useEffect(() => {
    filter_cities(countryCode);
  }, [filter_cities, countryCode]);

  useEffect(() => {
    reset_country_input();
  }, [inputIsVisible, reset_country_input]);

  return (
    <>
      <div className={`_input_location ${inputIsVisible ? "focus" : ""}`}>
        <InputAutoComplete
          suggestions={suggestionsCities}
          isDisabled={inputIsDisabled}
          placeholder="Where?"
          min_length={3}
          sort={true}
        />
        <InputCountry
          suggestions={countries}
          input={input}
          setInput={setInput}
          set_country_code={set_country_code}
          is_visible={inputIsVisible}
        />
        <span
          className={`country_btn`}
          onClick={() => setInputIsVisible((state) => !state)}
        >
          {inputIsVisible ? (
            <VscArrowLeft />
          ) : (
            <span className="_cc">{countryCode}</span>
          )}
        </span>
      </div>
      {inputIsVisible && (
        <div className="_trigger" onClick={() => setInputIsVisible(false)} />
      )}
    </>
  );
};

export default InputLocation;

interface ChildProps {
  suggestions: any;
  input: string;
  setInput: any;
  set_country_code: any;
  is_visible: Boolean;
}

const InputCountry: React.FunctionComponent<ChildProps> = ({
  suggestions = [],
  input = "",
  setInput,
  set_country_code,
  is_visible = false,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [CurrentIndex, setCurrentIndex] = useState<number>(0);
  const [endIndex, setEndIndex] = useState<number>(suggestions.length);
  const [filteredSuggestions, setFilteredSuggestions] = useState<any[]>([]);
  const [isKeyDown, setIsKeyDown] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);

  const handle_click_outside = (evt: any) => {
    if (ref.current && !ref.current.contains(evt.target)) {
      setIsVisible(false);
    }
  };

  const filter_suggestions = useCallback(
    (input: string) => {
      let value = input.toLowerCase();

      let filtered_suggestions = suggestions.filter((item: any) =>
        item.name.toLowerCase().includes(value)
      );

      setFilteredSuggestions(filtered_suggestions);
      setEndIndex(filtered_suggestions.length - 1);
    },
    [suggestions]
  );

  const input_handler = (evt: any) => {
    evt.preventDefault();

    setInput(evt.target.value);
    setCurrentIndex(0);
    setIsVisible(true);
  };

  const set_input = (value: string) => {
    setInput(value);
    set_country_code(value);
    setIsVisible(false);
  };

  const handle_key = (evt: any) => {
    evt.stopPropagation();
    if (evt.key === "ArrowUp") {
      /* ARROW UP */
      setIsKeyDown(true);
      if (CurrentIndex === 0) {
        return setCurrentIndex(endIndex);
      }
      setCurrentIndex((index) => index - 1);
    }
    if (evt.key === "ArrowDown") {
      /* ARROW DOWN */
      setIsKeyDown(true);
      if (CurrentIndex === endIndex) {
        return setCurrentIndex(0);
      }
      setCurrentIndex((index) => index + 1);
    }
    if (evt.key === "Enter") {
      /* ENTER */
      if (isVisible) {
        evt.preventDefault(); // prevent form SUBMIT
        let selected = document.querySelector("._active")?.textContent;
        console.log(selected);
        setInput(selected || "");
        set_country_code(selected);
        setIsVisible(false);
      }
    }
  };

  const enable_hover = () => {
    if (isKeyDown) {
      setIsKeyDown(false);
    }
  };

  useEffect(() => {
    filter_suggestions(input);
  }, [input, filter_suggestions]);

  useEffect(() => {
    if (!isVisible) {
      setCurrentIndex(0);
    }
    document.addEventListener("click", handle_click_outside);
    return () => {
      document.removeEventListener("click", handle_click_outside);
    };
  }, [ref, isVisible]);

  return (
    <div
      className={`_autocomplete_container _absolute ${
        is_visible ? "extend" : ""
      }`}
      ref={ref}
      onMouseMove={enable_hover}
    >
      <input
        onFocus={() => setIsVisible(true)}
        onChange={(e) => input_handler(e)}
        onKeyDown={(e) => handle_key(e)}
        type="text"
        value={input}
      />
      {isVisible && (
        <DropDown
          suggestions={filteredSuggestions}
          set_input={set_input}
          current_index={CurrentIndex}
          set_current_index={setCurrentIndex}
          is_key_down={isKeyDown}
        />
      )}
    </div>
  );
};
