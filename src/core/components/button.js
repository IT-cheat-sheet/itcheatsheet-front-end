import classNames from "classnames";
import React from "react";

export default function Button(props) {
  return (
    <div
      className={classNames(
        "w-full button-base cursor-pointer transition duration-100 flex justify-center items-center",
        {
          [`bg-${props.color}-button`]: true, [`hover:bg-${props.color}-hover`]: true
        },
        {
          "text-white":
            props.color !== "lightblue",
        },
        {
          "text-lightblue-hover hover:text-white":
            props.color === "lightblue",
        },
        {
          "h-12": props.size === "sm",
        },
        {
          "h-16": props.size === "md",
        },
        {
          "h-18": props.size === "lg",
        }
      )}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
}
