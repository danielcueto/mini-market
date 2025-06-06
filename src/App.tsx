import { useDispatch } from "react-redux";
import { AppRoutes } from "./routes/AppRoutes";
import { useEffect } from "react";
import { seedInitialData } from "./utils/seedInitialData";

export function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const isFirstLoad = !localStorage.getItem("seeded");
    if (isFirstLoad) {
      seedInitialData(dispatch);
      localStorage.setItem("seeded", "true");
    }
  }, [dispatch]);

  return <AppRoutes />;
}
