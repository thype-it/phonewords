import { HStack, Container } from "@chakra-ui/react";
import "react-device-frameset/styles/marvel-devices.min.css";
import Phone from "./components/Phone";

export default function page() {
  return (
    <HStack h={"100vh"} background={"gray.900"} justify={"center"} w="full">
      <Container>
        <Phone />
      </Container>
    </HStack>
  );
}
