import {Box, Button, Container, Flex, Text} from "@chakra-ui/react";
import {createFileRoute, Link} from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/quiz-start")({
  component: QuizStart,
});

function QuizStart() {
  const dots = [
    "Квизот содржи 15 прашања.",
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
          </Box>

          <Text fontSize="lg" mb={6}>
            Кога сте подготвени, кликнете на копчето за започнување и да почнеме! 🎉
          </Text>

          <Flex alignItems="center" justifyContent="center" mb={8}>
            <Box height="2px" width="80%" bg="gray.600" mr={3}/>
          </Flex>

          <Flex alignSelf="center">
            <Link to="/quiz">
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
