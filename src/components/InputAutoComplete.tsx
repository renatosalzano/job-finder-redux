import React, { useCallback, useEffect, useRef, useState } from "react";
import "../styles/input-autocomplete.scss";
import DropDown from "./partial/DropDown";

interface Props {
  suggestions?: any;
  isDisabled?: Boolean;
  placeholder?: string;
  min_length?: Number;
  sort?: Boolean;
}

const InputAutoComplete: React.FunctionComponent<Props> = ({
  suggestions = [],
  isDisabled = false,
  placeholder = "",
  min_length = 0,
  sort = false,
}) => {
  const [input, setInput] = useState<string>("");
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
      let filtered_suggestions = [];
      if (value.length >= min_length) {
        filtered_suggestions = suggestions.filter((item: any) =>
          item.name.toLowerCase().includes(value)
        );
        if (sort) {
          filtered_suggestions.sort((x: any, y: any) => {
            return x.name.length - y.name.length;
          });
        }
      }

      setFilteredSuggestions(filtered_suggestions);
      setEndIndex(filtered_suggestions.length - 1);
    },
    [suggestions, min_length, sort]
  );

  const input_handler = (evt: any) => {
    evt.preventDefault();

    setInput(evt.target.value);
    setCurrentIndex(0);
    setIsVisible(true);
  };

  const set_input = (value: string) => {
    setInput(value);
    setIsVisible(false);
  };

  const handle_key = (evt: any) => {
    evt.stopPropagation();
    if (evt.key === "ArrowUp") {
      console.log("arrowup");
      setIsKeyDown(true);
      if (CurrentIndex === 0) {
        return setCurrentIndex(endIndex);
      }
      setCurrentIndex((index) => index - 1);
    }
    if (evt.key === "ArrowDown") {
      console.log("arrowdown");
      setIsKeyDown(true);
      if (CurrentIndex === endIndex) {
        return setCurrentIndex(0);
      }
      setCurrentIndex((index) => index + 1);
    }
    if (evt.key === "Enter") {
      if (isVisible) {
        evt.preventDefault(); // prevent form SUBMIT
        let selected = document.querySelector("._active")?.textContent;
        console.log(selected);
        setInput(selected || "");
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

  useEffect(() => {
    if (isDisabled) {
      setInput("");
    }
  }, [isDisabled]);

  useEffect(() => {
    setInput("");
  }, [suggestions]);

  return (
    <div
      className={`_autocomplete_container ${isVisible ? "is_focus" : ""}`}
      ref={ref}
      onMouseMove={enable_hover}
    >
      <input
        onFocus={() => setIsVisible(true)}
        onChange={(e) => input_handler(e)}
        onKeyDown={(e) => handle_key(e)}
        type="text"
        value={input}
        disabled={isDisabled ? true : false}
        placeholder={placeholder}
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

export default InputAutoComplete;
