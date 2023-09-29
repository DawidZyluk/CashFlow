import { useState, useEffect, useRef } from "react";

export default function useDialog(initialIsVisible) {
  const [isDialogOpen, setIsDialogOpen] = useState(initialIsVisible);
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsDialogOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return [ref, isDialogOpen, setIsDialogOpen];
}
