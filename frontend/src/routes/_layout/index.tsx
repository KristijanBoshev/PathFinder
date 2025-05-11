import {Box, Button, Container, Flex, Heading, Image, Text} from "@chakra-ui/react"
import {createFileRoute} from "@tanstack/react-router"
import questionMarkImage from '../../../public/assets/images/slika2.png'

export const Route = createFileRoute("/_layout/")({
  component: Dashboard,
})

function Dashboard() {
  return (
    <>
      <Container maxW="full">
        <Flex flexDirection="row" justifyContent="space-between" px={16}>
          <Box p={4} alignItems="center" justifyContent="center" display="flex">
            <Flex flexDirection="column" gap={6}>
              <Flex flexDirection="column" color="#333333">
                <Heading size="5xl">Патека до</Heading>
                <Heading size="5xl">вистинскиот</Heading>
                <Heading size="5xl">факултет</Heading>
              </Flex>
              <Flex align="center">
                <Box height="40px" width="2px" bg="gray.600" mr={3}/>
                <Text color="gray.600" fontSize="lg">
                  Да ти помогнеме да ја донесеш правилната одлука
                </Text>
              </Flex>
              <Flex gap={8} alignItems="center" justifyContent="space-between">
                <Button colorPalette="yellow" size="xl" width="3xs">
                  <Text color="black">Започни</Text>
                </Button>
                <Text fontSize="md" color="black" fontWeight="bold">Дознај повеќе</Text>
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
      </Container>
    </>
  )
}
