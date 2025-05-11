import {Button, Flex, Image, Text, useBreakpointValue} from "@chakra-ui/react"
import {Link} from "@tanstack/react-router"

import Logo from "/assets/images/logo.png"
import UserMenu from "./UserMenu"
import useAuth from "@/hooks/useAuth.ts";

function Navbar() {
  const display = useBreakpointValue({base: "none", md: "flex"})
  const {user} = useAuth()

  return (
    <Flex
      display={display}
      justify="space-between"
      position="sticky"
      color="white"
      align="center"
      bg="bg.muted"
      w="100%"
      top={0}
      px={10}
    >
      <Link to="/">
        <Image src={Logo} alt="Logo" maxW="3xs" p={2}/>
      </Link>
      <Flex gap={16} alignItems="center">
        <Flex gap={8}>
          <Text fontSize="lg" color="black">Како работи?</Text>
          <Text fontSize="lg" color="black">Карактеристики</Text>
          <Text fontSize="lg" color="black">За нас</Text>
        </Flex>
        {!user?.full_name &&
          <Link to="/login">
            <Button variant="outline" colorPalette="yellow" borderWidth="3px" fontWeight="bold"
                    fontSize="lg">
              Најава
            </Button></Link>}
      </Flex>
    </Flex>
  )
}

export default Navbar
