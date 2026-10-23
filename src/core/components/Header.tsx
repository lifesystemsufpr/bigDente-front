import { Box, Typography } from "./ui";

export function Header() {
  return (
    <Box>
      <Typography variant="h1" className="text-2xl font-bold">
        Sistema de Odontologia e Gestão Acadêmica
      </Typography>
      <Typography variant="h4" className="text-sm text-muted-foreground">
        Gerencie as coisas
      </Typography>
    </Box>
  );
}
