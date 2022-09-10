import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

type ChipsProps = {
  pagingList: string[];
  handleDelete: (a: string) => void;
  handleClear: () => void;
};

export default function Chips({
  pagingList,
  handleDelete,
  handleClear,
}: ChipsProps) {
  if (pagingList.length == 0) return null;

  return (
    <Paper
      sx={(theme) => ({
        my: 4,
      })}
    >
      <Typography
        variant="caption"
        color="primary"
        component="div"
        sx={{
          mx: 2,
          mt: 1,
          mb: -1,
          fontWeight: "bold",
          fontSize: "0.9em",
        }}
      >
        PAGING
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          my: 1,
          mx: 2,
          flexWrap: "wrap",
        }}
      >
        {pagingList.map((a) => (
          <Chip
            key={a}
            sx={{
              mr: 2,
              my: 1,
              fontSize: "1.6em",
              backgroundColor: "rgba(255,255,255,0.3)",
            }}
            label={a}
            onDelete={() => handleDelete(a)}
          />
        ))}

        <Button
          variant="contained"
          onClick={handleClear}
          sx={{
            my: 1,
          }}
        >
          {pagingList.length > 1 ? "Clear All" : "Clear"}
        </Button>
      </Box>
    </Paper>
  );
}
