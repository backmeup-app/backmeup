import {
  Flex,
  Spacer,
  HStack,
  Text,
  Container,
  Box,
  chakra,
} from "@chakra-ui/react";
import { AiOutlineTwitter, AiFillInstagram } from "react-icons/ai";
import { MdMail } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa";

export const Footer = () => {
  const Anchor = chakra("a");
  const MailIcon = chakra(MdMail);
  const FacebookIcon = chakra(FaFacebookF);
  const TwitterIcon = chakra(AiOutlineTwitter);
  const InstagramIcon = chakra(AiFillInstagram);

  return (
    <Box py={{ base: 10, sm: 8, lg: 12 }} bg="charlestonGreen" color="white">
      <Container maxW="1300px" w="90%" margin="0 auto">
        <Flex align="center" direction={{ base: "column-reverse", sm: "row" }}>
          <Text
            fontSize="md"
            // textShadow="0 0.5px navajoWhite"
            ml={{ base: 1, sm: 0 }}
          >
            Dome Tooling &copy; {new Date().getFullYear()}
          </Text>
          <Spacer />
          <HStack mb={{ base: 6, sm: 0 }} spacing={{ base: 5, sm: 0 }}>
            <Anchor
              p={4}
              background="hsla(0, 0%, 100%, 0.02)"
              borderRadius="full"
            >
              <MailIcon />
            </Anchor>
            <Anchor
              p={4}
              background="hsla(0, 0%, 100%, 0.02)"
              borderRadius="full"
            >
              <FacebookIcon />
            </Anchor>
            <Anchor
              p={4}
              background="hsla(0, 0%, 100%, 0.02)"
              borderRadius="full"
            >
              <TwitterIcon />
            </Anchor>
            <Anchor
              p={4}
              background="hsla(0, 0%, 100%, 0.02)"
              borderRadius="full"
            >
              <InstagramIcon />
            </Anchor>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};
