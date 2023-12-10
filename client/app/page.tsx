import React from "react";
import { Kbd, HStack, Input, Container, Box } from "@chakra-ui/react";
import Keyboard from "./components/Keyboard";
import "react-device-frameset/styles/marvel-devices.min.css";
import { DeviceFrameset } from "react-device-frameset";
type Props = {};

export default function page({}: Props) {
  return (
    <HStack h={"100vh"} background={"#01da45"} justify={"center"} w="full">
      <Container>
        <DeviceFrameset device="iPhone X">
          {
            <Box w={"full"} h={"full"}>
              <Input placeholder="large size" size="lg" mt={"30px"} />
              <Keyboard />
            </Box>
          }
        </DeviceFrameset>
      </Container>
    </HStack>
  );
}
