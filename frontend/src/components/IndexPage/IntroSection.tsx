import {Box, Button, Flex, Heading, Image, Text} from "@chakra-ui/react";
import questionMarkImage from '../../../public/assets/images/pngtree-graduation-hat-png-image_11476784.png'
import {Link} from "@tanstack/react-router";
import useAuth from "@/hooks/useAuth.ts";

export const IntroSection = () => {

  const {user} = useAuth();

  return (
    <>
      <Flex flexDirection="column" minH="min-content">
        <Flex flexDirection="row" justifyContent="space-between" px={16} mb={10}>
          <Box p={4} alignItems="center" justifyContent="center" display="flex">
            <Flex flexDirection="column" gap={6}>
              <Flex flexDirection="column">
                <Heading size="5xl">Патека до</Heading>
                <Heading size="5xl">вистинскиот</Heading>
                <Heading size="5xl">факултет</Heading>
              </Flex>
              <Flex align="center">
                <Box height="40px" width="2px" bg="gray.600" mr={3}/>
                <Text fontSize="lg">
                  Да ти помогнеме да ја донесеш правилната одлука
                </Text>
              </Flex>
              <Flex gap={8} alignItems="center" justifyContent="space-between">
                <Link to={user ? "/quiz-start" : "/login"}>
                  <Button colorPalette="yellow" size="xl" width="3xs">
                    <Text>Започни</Text>
                  </Button>
                </Link>
                <Text fontSize="md" fontWeight="bold">Дознај повеќе</Text>
              </Flex>
            </Flex>
          </Box>

          <Box p={4} display="flex" alignItems="center">
            <Image
              src={questionMarkImage}
              objectFit="contain"
              maxH="500px"
              h="100%"
            />
          </Box>
        </Flex>
        <Flex gap={16} justifyContent="center">
          <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center">
            <Text color="orange" fontWeight="bold" fontSize="5xl">10,000+</Text>
            <Text fontSize="xl">Студенти добија помош</Text>
          </Box>
          <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center">
            <Text color="orange" fontWeight="bold" fontSize="5xl">500+</Text>
            <Text fontSize="xl">Факултети</Text>
          </Box>
          <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center">
            <Text color="orange" fontWeight="bold" fontSize="5xl">95%</Text>
            <Text fontSize="xl">Задоволство</Text>
          </Box>
          <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center">
            <Text color="orange" fontWeight="bold" fontSize="5xl">50+</Text>
            <Text fontSize="xl">Насоки</Text>
          </Box>
        </Flex>
      </Flex>
    </>
  )
}