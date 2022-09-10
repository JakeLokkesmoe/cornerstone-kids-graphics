import * as React from "react";
import axios from "axios";
import type { NextPage } from "next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chips from "../src/Chips";
import Pager from "../src/Pager";

const ROTATE_SPEED = 6500;
const server = "http://127.0.0.1:4001";
// const server = "http://192.168.2.25:4001";
const project = "ABCD";
const graphicId = "29CGH";

function delay(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

const Home: NextPage = () => {
  const [pagingList, setPagingList] = React.useState<string[]>([]);
  const [active, setActive] = React.useState("");

  React.useEffect(() => {
    if (pagingList.length > 0) {
      setActive((active) => active || pagingList[0]);
      const id = setInterval(() => {
        setActive(
          (a) => pagingList[(pagingList.indexOf(a) + 1) % pagingList.length]
        );
      }, ROTATE_SPEED);
      return () => clearInterval(id);
    }
    setActive("");
    return () => {};
  }, [pagingList]);

  React.useEffect(() => {
    const showGraphic = async () => {
      await axios.post(`${server}/api/${project}/clear`);
      await delay(300);
      await axios.post(`${server}/api/${project}/graphic/${graphicId}/update`, {
        body: active,
      });
      await axios.post(`${server}/api/${project}/graphic/${graphicId}/show`);
    };
    if (active) {
      showGraphic();
    } else {
      axios.post(`${server}/api/${project}/clear`);
    }
  }, [active]);

  function handleDelete(value: string) {
    setPagingList(pagingList.filter((a) => a !== value));
  }

  function handleClear() {
    setPagingList([]);
  }

  function handleSubmit(text: string) {
    setPagingList([...pagingList.filter((a) => a !== text), text]);
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
          pagingList={pagingList}
          handleDelete={handleDelete}
          handleClear={handleClear}
        />
        {/* <Box
          sx={{
            mt: 4,
          }}
        >
          <Typography variant="h5">Preview:</Typography>
          <iframe
            src={`${server}/output/${project}/?bg=%23000`}
            style={{
              width: 600,
              height: (9 * 600) / 16,
            }}
          ></iframe>
        </Box> */}
      </Box>
    </Container>
  );
};

export default Home;
