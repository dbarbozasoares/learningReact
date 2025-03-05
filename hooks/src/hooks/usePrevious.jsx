import { useEffect, useRef, useDebugValue } from "react";

export const usePrevious = (value) => {
  const ref = useRef();

  useDebugValue("-----CUSTOM HOOK E USEDEBUGVALUE -----");
  useDebugValue("O numero anterior e: ", ref);

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};
