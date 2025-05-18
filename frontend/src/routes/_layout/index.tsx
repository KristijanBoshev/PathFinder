import {Box, Container, Flex} from "@chakra-ui/react"
import {createFileRoute} from "@tanstack/react-router"
import {IntroSection} from "@/components/IndexPage/IntroSection.tsx";
import {Details} from "@/components/IndexPage/Details.tsx";
import {Instructions} from "@/components/IndexPage/Instructions.tsx";

export const Route = createFileRoute("/_layout/")({
  component: Dashboard,
})

function Dashboard() {
  return (
    <>
      <Container maxW="7xl">
        <Flex flexDirection="column" gap={20}>
          <IntroSection/>
          <Flex alignItems="center" justifyContent="center">
            <Box height="2px" width="80%" bg="gray.600" mr={3}/>
          </Flex>
          <Details/>
          <Flex alignItems="center" justifyContent="center">
            <Box height="2px" width="80%" bg="gray.600" mr={3}/>
          </Flex>
          <Instructions />
        </Flex>
      </Container>
    </>
  )
}
