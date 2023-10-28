"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import PagerInput from "./PagerInput";
import Chips from "./Chips";

const ROTATE_SPEED = 6500;
// const server = "http://127.0.0.1:4001";
const server = "http://192.168.2.25:4001";
const project = "ABCD";
const graphicId = "29CGH";

function delay(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

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
