import {Button, Container, Flex, Image, Text, useBreakpointValue} from "@chakra-ui/react"
import {Link} from "@tanstack/react-router"

import Logo from "/assets/images/logo.png"
import useAuth from "@/hooks/useAuth.ts";
import {FiUser} from "react-icons/fi";
import {useColorMode} from "@/components/ui/color-mode.tsx";

function Navbar() {
  const display = useBreakpointValue({base: "none", md: "flex"})
  const {user} = useAuth()
  const {colorMode} = useColorMode()

  return (
    <Container maxW="7xl" justifyContent="center">
      <Flex
        display={display}
        justify="space-between"
        position="sticky"
        align="center"
        bg="transparent"
        top={0}
        px={10}
      >
        <Link to="/">
          <Image src={Logo} alt="Logo" maxW="3xs" p={2}/>
        </Link>
        <Flex gap={8} alignItems="center">
          <Flex gap={8}>
            <Text fontSize="lg">Како работи?</Text>
            <Text fontSize="lg">Карактеристики</Text>
            <Text fontSize="lg">За нас</Text>
          </Flex>
          {!user ?
            <Link to="/login">
              <Button variant="outline" colorPalette="yellow" borderWidth="3px" fontWeight="bold"
                      fontSize="lg">
                Најава
              </Button>
            </Link> : (
              <Link to="/settings">
                <Button
                  bg="transparent"
                  colorPalette="yellow"
                  fontWeight="bold"
                  fontSize="lg"
                  display="flex"
                  alignItems="center"
                  gap={2}
                >
                  <FiUser color={colorMode==="dark" ? "white" : "black"} size={24}/>
                  <Text color={colorMode==="dark" ? "white" : "gray.600"}>{user.full_name}</Text>
                </Button>
              </Link>
            )}
        </Flex>
      </Flex>
    </Container>
  )
}

export default Navbar
