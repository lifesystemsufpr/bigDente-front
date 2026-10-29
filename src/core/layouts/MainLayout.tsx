import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Box } from "../components/ui";

export function MainLayout() {
  return (
    <Box
      type="screen"
      display="flex"
      direction="column"
      className="bg-background"
    >
      <Box display="flex" direction="column" className="min-h-0 flex-1 pt-header">
        <NavBar />
        <Box display="flex" direction="column" className="min-h-0 flex-1 mx-32">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
