"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import PagerInput from "./PagerInput";
import Chips from "./Chips";
import { Button } from "@mui/material";

const ROTATE_SPEED = 6500;

export default function Pager() {
  const [pagingList, setPagingList] = useState<string[]>([]);
  const [active, setActive] = useState("");

  useEffect(() => {
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

  useEffect(() => {
    const showGraphic = async () => {
      await fetch(`/api/atem`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: active }),
      });
      // await axios.post(`${server}/api/${project}/clear`);
      // await delay(300);
      // await axios.post(`${server}/api/${project}/graphic/${graphicId}/update`, {
      //   body: active,
      // });
      // await axios.post(`${server}/api/${project}/graphic/${graphicId}/show`);
    };
    if (active) {
      showGraphic();
    } else {
      fetch(`/api/atem`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ clear: true }),
      });
      //axios.post(`${server}/api/${project}/clear`);
    }
  }, [active]);

  function handleDelete(value: string) {
    setPagingList(pagingList.filter((a) => a !== value));
  }

  function handleClear() {
    setPagingList([]);
  }

  async function handleSubmit(text: string) {
    setPagingList([...pagingList.filter((a) => a !== text), text]);
  }

  function genImage() {}

  return (
    <>
      <PagerInput onSubmit={handleSubmit} />
      <Chips
        pagingList={pagingList}
        handleDelete={handleDelete}
        handleClear={handleClear}
      />
    </>
  );
}
