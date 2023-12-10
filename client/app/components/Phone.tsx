"use client";

import {
  Input,
  Button,
  Wrap,
  WrapItem,
  Center,
  VStack,
  Grid,
  Heading,
  Spinner,
  InputGroup,
  InputLeftAddon,
  FormControl,
  FormHelperText,
  FormLabel,
  ButtonGroup,
  Text,
  Switch,
  HStack,
  Divider,
  useBoolean,
} from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";
import { DeviceFrameset } from "react-device-frameset";

const phoneKeysList: PhoneKeys[] = [
  { text: "✆", value: 1 },
  { text: "ABC", value: 2 },
  { text: "DEF", value: 3 },
  { text: "GHI", value: 4 },
  { text: "JKL", value: 5 },
  { text: "MNO", value: 6 },
  { text: "PQRS", value: 7 },
  { text: "TUV", value: 8 },
  { text: "WXYZ", value: 9 },
  { text: "+", value: "*" },
  { text: "␣", value: 0 },
  { text: "⇧", value: "#" },
];

export default function Phone() {
  const [numString, setNumString] = useState<string>("");
  const [wordList, setWordList] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isFilter, setIsFilter] = useBoolean();
  console.log("isFilter :", isFilter);
  return (
    <DeviceFrameset device="iPhone X">
      <VStack
        w={"full"}
        h={"full"}
        pt={"10"}
        pb={"6"}
        display={"flex"}
        bg={"pink.200"}
      >
        <Results
          wordList={wordList}
          isLoading={loading}
          text={isFilter ? "only suitable" : "all"}
        />
        <Divider borderColor={"pink.500"} />
        <FormControl w={"90%"} mx={"auto"} textAlign={"center"}>
          <HStack>
            <FormLabel htmlFor="email-alerts" mb="0">
              Enable word filter?
            </FormLabel>
            <Switch
              id="email-alerts"
              colorScheme={"pink"}
              onChange={setIsFilter.toggle}
            />
          </HStack>
          <FormLabel>Enter your numeric string (max 10 numbers)</FormLabel>
          <Input
            placeholder="Your numeric string"
            size="lg"
            type="text"
            value={numString}
            onChange={(e) => setNumString(e.target.value)}
            maxLength={10}
            colorScheme="pink"
            focusBorderColor="pink.500"
            borderColor={"pink.500"}
          />
        </FormControl>
        <ButtonGroup gap="4">
          <Button onClick={handleConvert} colorScheme="green">
            Submit
          </Button>
          <Button
            colorScheme="red"
            onClick={() => {
              setNumString("");
              setWordList([]);
            }}
          >
            Cancel
          </Button>
        </ButtonGroup>
        <Grid gap={3} templateColumns="repeat(3, 0fr)">
          {phoneKeysList.map(({ text, value }, i) => (
            <Button
              key={text}
              py={"2"}
              width={"20"}
              textAlign="center"
              variant={"outline"}
              onClick={() => addSymbol(value)}
              colorScheme="pink"
            >
              <Heading as={"h5"}>{value}</Heading>
              &nbsp;
              {text}
            </Button>
          ))}
        </Grid>
      </VStack>
    </DeviceFrameset>
  );

  async function handleConvert() {
    setLoading(true);
    setNumString((numString) => numString.replace(/[^0-9]/g, ""));
    try {
      const response = await fetch("http://localhost:3001/convert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ numString, isFilter }),
      });

      const data = await response.json();
      setWordList(data.result);
    } catch (error) {
      console.error("Error converting numeric string:", error);
    } finally {
      setLoading(false);
    }
  }

  function addSymbol(value: number | string) {
    setNumString((numString) => numString + value);
  }
}

type Result = {
  wordList: string[];
  isLoading: boolean;
  text: string;
};

function Results({ wordList, text, isLoading = false }: Result) {
  return (
    <Wrap flex={1} overflow={"auto"} px={"4"}>
      {isLoading ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="pink.500"
          size="xl"
        />
      ) : wordList.length ? (
        <>
          <Text w={"full"}>Showing {text} words :</Text>
          {wordList.map((word) => (
            <WrapItem key={word}>
              <Center
                minW="16"
                h="=30px"
                bg="pink.500"
                px={"4"}
                borderRadius={"4"}
                color={"white"}
              >
                {word}
              </Center>
            </WrapItem>
          ))}
        </>
      ) : (
        <VStack>
          <Image
            src="/telekomLogo.jpg"
            width={300}
            height={300}
            alt="Picture of the author"
          />
          <Heading fontSize={"2xl"}>Telekom Word Convertor</Heading>
        </VStack>
      )}
    </Wrap>
  );
}
