import { useEffect } from "react";

interface Props {
  suggestions?: any[];
  set_input: any;
  current_index: number;
  set_current_index: any;
  is_key_down: boolean;
}

const DropDown: React.FunctionComponent<Props> = ({
  suggestions = [],
  set_input,
  current_index,
  set_current_index,
  is_key_down,
}) => {
  useEffect(() => {
    document.querySelector("._active")?.scrollIntoView({
      block: "nearest",
    });
  });

  const on_hover = (index: number) => {
    if (is_key_down) return;
    set_current_index(index);
  };
  return (
    <ul className="_drop_down">
      {suggestions.map((item, index) => {
        return (
          <li
            className={`suggestion ${index === current_index ? "_active" : ""}`}
            key={item.name + index}
            onClick={() => set_input(item.name)}
            onMouseEnter={() => on_hover(index)}
          >
            {item.name}
          </li>
        );
      })}
    </ul>
  );
};

export default DropDown;
