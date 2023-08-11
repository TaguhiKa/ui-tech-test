import { useReducer, useEffect } from "react";

type Mode = "preview" | "edit";

function modeReducer(_: Mode, action: Mode): Mode {
  return action;
}

export default function useMode() {
  const searchParams = new URLSearchParams(window.location.search);

  const urlMode = searchParams.get("mode") as Mode | null;
  const initialMode: Mode = urlMode || "preview";

  const [mode, dispatch] = useReducer(modeReducer, initialMode);

  useEffect(() => {
    searchParams.set("mode", mode);
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.replaceState(null, "", newUrl);
  }, [mode, searchParams]);

  return [mode, dispatch] as const;
}

