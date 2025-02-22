import { useEffect, useState } from "react";

export const UseTheme = () => {
  const [mode, setMode] = useState("light");

  const changeTheme = () => {
    const html = document.documentElement;
    const newMode = mode === "light" ? "dark" : "light";

    html.classList.remove(mode); // Remove current theme
    html.classList.add(newMode); // Add new theme
    setMode(newMode); // Update state
    localStorage.setItem("mode", newMode); // Save mode in localStorage
  };

  useEffect(() => {
    const storedMode = localStorage.getItem("mode") || "light";
    document.documentElement.classList.add(storedMode); // Apply stored mode
    setMode(storedMode); // Set the mode in state
  }, []);

  return { changeTheme, mode };
};
