"use client";
import { useState } from "react";

export const useLocalStorage = <T,>(key: string, defaultValue: T) => {
  const [value, setValue] = useState(() => {
    try {
      const value = localStorage.getItem(key);

      if (value) {
        return JSON.parse(value);
      } else {
        localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (error) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
  });

  // this method update our localStorage and our state
  const setLocalStorage = (_value: T) => {
    const json = JSON.stringify(_value);
    localStorage.setItem(key, JSON.stringify(json));
    setValue(_value);
  };

  return [value, setLocalStorage];
};
