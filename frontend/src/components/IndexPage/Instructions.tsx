import {Flex, Text} from "@chakra-ui/react";
import {InstructionsCard} from "./InstructionsCard";

export const Instructions = () => {

  const instructions = [
    {
      title: "Почеток",
      body: "Започнете го вашето академско патување со FindPath."
    }, {
      title: "Најава",
      body: "Создадете профил за да го зачувате вашиот напредок."
    }, {
      title: "Започнете го квизот",
      body: "Започнете со проценка за да ни помогнете да ве разбереме подобро."
    }, {
      title: "Комплетирајте ја проценката",
      body: "Одговорете на прашања за вашите интереси, силни страни и цели."
    }, {
      title: "Анализа на резултатите",
      body: "Нашата вештачка интелигенција ги анализира вашите одговори за да создаде персонализирани препораки"
    }, {
      title: "Добијте препораки",
      body: "Прегледајте ги универзитетските програми приспособени на вашиот профил"
    },
  ]

  return (
    <>
      <Flex flexDirection="column" justifyContent="center" alignItems="center" gap={6} mb={10}>
        <Text fontSize="5xl" fontWeight="semibold" letterSpacing="tight">Како работи FindPath?</Text>
        <Flex gap={6} flexDirection="column">
          {instructions.map((card, index) => <InstructionsCard title={card.title} body={card.body}
                                                               number={index + 1}/>)}
        </Flex>
      </Flex>
    </>
  )
}