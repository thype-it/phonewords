import React from "react";
import { HStack, Container } from "@chakra-ui/react";
import "react-device-frameset/styles/marvel-devices.min.css";
import Phone from "./components/Phone";
type Props = {};

export default function page({}: Props) {
  return (
    <HStack h={"100vh"} background={"#01da45"} justify={"center"} w="full">
      <Container>
        <Phone />
      </Container>
    </HStack>
  );
}
