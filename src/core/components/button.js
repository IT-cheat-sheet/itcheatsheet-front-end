import classNames from "classnames";
import React from "react";

export default function Button(props) {
  return (
    <div
      className={classNames(
        "w-full rounded-button",
        {
          "bg-violet-button hover:bg-violet-hover": props.color === "purple",
        },
        {
          "bg-purple-button hover:bg-purple-hover": props.color === "violet",
        },
        {
          "bg-lightblue-button text-lightblue-hover hover:bg-lightblue-hover hover:text-white":
            props.color === "blue",
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
