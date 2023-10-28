import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Pager from "@/components/Pager/Pager";

export default function HomePage() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          pt: "25vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Cornerstone Kids Visual Paging
        </Typography>
        <Pager />
      </Box>
    </Container>
  );
}
