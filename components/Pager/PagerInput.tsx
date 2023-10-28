"use client";

import * as React from "react";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

type PagerInputProps = {
  onSubmit: (text: string) => void;
};

export default function PagerInput({ onSubmit }: PagerInputProps) {
  const [text, setText] = React.useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(text);
    setText("");
  }

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{ p: 1, width: "100%", maxWidth: "70ch" }}
    >
      <FormControl variant="outlined" fullWidth>
        <OutlinedInput
          sx={{
            fontSize: "2em",
          }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                type="submit"
                edge="end"
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </Paper>
  );
}
