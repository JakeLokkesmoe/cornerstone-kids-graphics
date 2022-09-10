import * as React from "react";
import axios from "axios";
import type { NextPage } from "next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chips from "../src/Chips";
import Pager from "../src/Pager";

const ROTATE_SPEED = 10000;
const server = "http://192.168.2.25:4001";
const project = "ABCD";
const graphicId = "29CGH";

function delay(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

const Home: NextPage = () => {
  const [active, setActive] = React.useState<string[]>([]);

  React.useEffect(() => {
    const clearGraphic = async () => {
      await axios.post(`${server}/api/${project}/clear`);
    };

    const showGraphic = async (text: string) => {
      await clearGraphic();
      await delay(300);
      await axios.post(`${server}/api/${project}/graphic/${graphicId}/update`, {
        body: text,
      });
      await delay(10);
      await axios.post(`${server}/api/${project}/graphic/${graphicId}/show`);
    };

    let interval: number | null = null;

    if (active.length > 1) {
      showGraphic(active[0]);
      let index = 1;
      interval = window.setInterval(() => {
        showGraphic(active[index]);
        index = (index + 1) % active.length;
      }, ROTATE_SPEED);
    } else if (active.length === 1) {
      showGraphic(active[0]);
    }

    return () => {
      if (interval != null) {
        window.clearInterval(interval);
      }
      clearGraphic();
    };
  }, [active]);

  function handleDelete(value: string) {
    setActive(active.filter((a) => a !== value));
  }

  function handleClear() {
    setActive([]);
  }

  function handleSubmit(text: string) {
    setActive([...active.filter((a) => a !== text), text]);
  }

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

        <Pager onSubmit={handleSubmit} />

        <Chips
          active={active}
          handleDelete={handleDelete}
          handleClear={handleClear}
        />
      </Box>
    </Container>
  );
};

export default Home;

// async function handleSubmit() {

// }
