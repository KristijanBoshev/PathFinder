import {Flex, Text} from "@chakra-ui/react";
import {CardCharacteristics} from "@/components/IndexPage/CardCharacteristics.tsx";

export const Details = () => {

  const cardDetails = [
    {
      title: "Персонализирани препораки",
      description: "Добијте препораки за факултети прилагодени на вашиот уникатен профил, интереси и академски достигнувања."
    }, {
      title: "Интерактивна проценка",
      description: "Завршете интересни квизови кои точно ги идентификуваат вашите академски силни страни и кариерни аспирации."
    }, {
      title: "Анализа со ВИ",
      description: "Користете напредна вештачка интелигенција која ги процесира вашите одговори за да предложи оптимални академски патеки."
    }, {
      title: "Увид во кариерни патеки",
      description: "Откријте потенцијални кариерни траектории поврзани со различни академски програми."
    },
  ]
  return (
    <>
      <Flex flexDirection="column" justifyContent="center" alignItems="center" gap={6} mb={10}>
        <Text fontSize="5xl" fontWeight="semibold" letterSpacing="tight">Карактеристики на FindPath</Text>
        <Flex gap={6}>
          {cardDetails.map((card) => <CardCharacteristics title={card.title} description={card.description}/>)}
        </Flex>
      </Flex>
    </>
  )
}