"use client";

import {
  Box,
  Input,
  Button,
  Wrap,
  WrapItem,
  Center,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { DeviceFrameset } from "react-device-frameset";
import Keyboard from "./Keyboard";

type Props = {};

const sampleWordList = ["ad", "abc", "jokssssssssssssssse", "ss", "sss"];

export default function Phone({}: Props) {
  const [numString, setNumString] = useState<string>("");
  const [wordList, setWordList] = useState<string[]>(sampleWordList);

  return (
    <DeviceFrameset device="iPhone X">
      <VStack w={"full"} h={"full"} pt={"20"} pb={"10"} display={"flex"}>
        <Results wordList={wordList} />
        <Input
          placeholder="large size"
          size="lg"
          type="text"
          value={numString}
          onChange={(e) => setNumString(e.target.value)}
        />
        <Button onClick={handleConvert}>Submit</Button>
        <Keyboard />
      </VStack>
    </DeviceFrameset>
  );

  async function handleConvert() {
    try {
      const response = await fetch("http://localhost:3001/convert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ numString }),
      });

      const data = await response.json();
      console.log("data :", data);
      setWordList(data.result);
    } catch (error) {
      console.error("Error converting numeric string:", error);
    }
  }
}

type Result = {
  wordList: string[];
};

function Results({ wordList }: Result) {
  return (
    <Wrap flex={1} overflow={"auto"}>
      {wordList.map((word) => (
        <WrapItem key={word}>
          <Center minW="16" h="=30px" bg="red.200" px={"4"}>
            {word}
          </Center>
        </WrapItem>
      ))}
    </Wrap>
  );
}
