import { Box, Typography } from "../components/ui";

export default function NotFoundPage() {
  return (
    <Box
      type="screen"
      display="flex"
      direction="column"
      justify="center"
      align="center"
      className="bg-primary"
    >
      <Typography variant="h1" className="text-white">
        404 - Not Found
      </Typography>
    </Box>
  );
}
