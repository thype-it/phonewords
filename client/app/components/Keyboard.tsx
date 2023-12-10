import { Grid, Heading, Kbd, Button, GridItem } from "@chakra-ui/react";
import React from "react";

type Props = {};

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
        <Button
          key={text}
          py={"2"}
          width={"20"}
          textAlign="center"
          variant={"outline"}
        >
          <Heading as={"h5"}>{value}</Heading>
          &nbsp;
          {text}
        </Button>
      ))}
    </Grid>
  );
}
