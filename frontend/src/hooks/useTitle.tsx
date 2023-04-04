import { TitleContext } from "../contexts/TitleContext";
import React,{ useContext, useEffect } from "react";

const useTitle = (text: string) => {
  const { title, setTitle } = useContext(TitleContext);

  useEffect(() => setTitle(text), [text, setTitle]);

  return title;
};

export default useTitle;
