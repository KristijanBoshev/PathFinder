import {Box, Button, Container, Flex, Input, Text} from "@chakra-ui/react";
import {createFileRoute, Link} from "@tanstack/react-router";
import {useState} from "react";

export const Route = createFileRoute("/_layout/quiz-start")({
  component: QuizStart,
});

function QuizStart() {
  const [nItems, setNItems] = useState(3);
  const dots = [
    "Времето за решавање е неограничено.",
    "Пред да внесете одговор, внимателно размислете за прашањето и обидете се да не користите помошни материјали."
  ];

  return (
    <>
      <Container maxW="7xl">
        <Flex flexDirection="column" gap={8}>
          <Text fontSize="xl" fontWeight="semibold" mb={4}>
            Пред да започнете со решавање, ве молиме обрнете внимание на следниве упатства:
          </Text>

          <Box as="ul" pl={6} fontSize="lg" lineHeight="tall" color="gray.700" listStyleType="disc">
            {dots.map((dot, index) => (
              <Box as="li" key={index} mb={3}>
                {dot}
              </Box>
            ))}
            <Text>Изберете колку прашања од секоја тема би сакале да имате?</Text>
            <Input
              type="number"
              value={nItems === 0 ? "" : nItems}
              onChange={(e) => {
                const raw = e.target.value
                const value = Number(raw)

                if (raw === "") {
                  setNItems(0)
                } else if (value >= 1 && value <= 5) {
                  setNItems(value)
                }
              }} placeholder="Број на прашања"
              maxW="200px"
              min={1} max={5}
              onBlur={() => {
                if (nItems < 1) {
                  setNItems(1)
                }
              }}
            />
          </Box>

          <Text fontSize="lg" mb={6}>
            Кога сте подготвени, кликнете на копчето за започнување и да почнеме! 🎉
          </Text>

          <Flex alignItems="center" justifyContent="center" mb={8}>
            <Box height="2px" width="80%" bg="gray.600" mr={3}/>
          </Flex>

          <Flex alignSelf="center">
            <Link to="/quiz" search={{nItems}}>
              <Button size="lg" alignSelf="center" colorPalette="yellow">
                Започни со решавање
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Container>
    </>
  );
}
