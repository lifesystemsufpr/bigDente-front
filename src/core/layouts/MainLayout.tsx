import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Box } from "../components/ui";
import { Header } from "../components/Header";

export function MainLayout() {
  return (
    <Box
      type="screen"
      display="flex"
      direction="column"
      className="bg-background"
    >
      <Box display="flex" direction="row" className="bg-muted/50">
        <Header />
      </Box>
      <Box display="flex" direction="column">
        <NavBar />
        <Box display="flex" direction="column" className="flex-1 mx-32">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
