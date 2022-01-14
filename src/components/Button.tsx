import { useState } from "react";

export const Button = ({ text, onClick }: any) => {
  return (
    <button id="send" className="button submit" onClick={onClick}>
      {text}
    </button>
  );
};
