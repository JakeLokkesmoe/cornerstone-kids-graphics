"use client";

import { useEffect, useState } from "react";
import PagerInput from "./PagerInput";
import Chips from "./Chips";

const ROTATE_SPEED = 6500;

export default function Pager() {
  const [pagingList, setPagingList] = useState<string[]>([]);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (pagingList.length > 0) {
      setActive((active) => active || pagingList[0]);
      const id = setInterval(() => {
        setActive((a) =>
          a != null
            ? pagingList[(pagingList.indexOf(a) + 1) % pagingList.length]
            : null
        );
      }, ROTATE_SPEED);
      return () => clearInterval(id);
    }
    setActive(null);
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
    };
    const hideGraphic = async () => {
      await fetch(`/api/atem`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ clear: true }),
      });
    };
    if (active) {
      showGraphic();
    } else {
      const id = setTimeout(() => {
        hideGraphic();
      }, 1000);
      return () => clearTimeout(id);
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
