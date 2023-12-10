import { Grid, Heading, Kbd, Text, GridItem } from "@chakra-ui/react";
import React from "react";

type Props = {};

type PhoneKeys = {
  text: string;
  value: number;
};

const phoneKeysList: PhoneKeys[] = [
  { text: "1", value: 1 },
  { text: "ABC", value: 2 },
  { text: "DEF", value: 3 },
  { text: "GHI", value: 4 },
  { text: "JKL", value: 5 },
  { text: "MNO", value: 6 },
  { text: "PQRS", value: 7 },
  { text: "TUV", value: 8 },
  { text: "WXYZ", value: 9 },
];

export default function Keyboard({}: Props) {
  return (
    <Grid gap={3} templateColumns="repeat(3, 0fr)">
      {phoneKeysList.map(({ text, value }, i) => (
        <GridItem key={text}>
          <Kbd
            py={"2"}
            width={"16"}
            display={"inline-block"}
            textAlign="center"
          >
            {value}
            &nbsp;
            {text}
          </Kbd>
        </GridItem>
      ))}
    </Grid>
  );
}
