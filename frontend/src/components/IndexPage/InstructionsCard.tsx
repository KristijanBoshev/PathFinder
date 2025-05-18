import {Avatar, Card, Flex, Heading} from "@chakra-ui/react";

type InstructionsCardProps = {
  title: string
  body: string
  number: number
}

export const InstructionsCard = ({title, body, number}: InstructionsCardProps) => {
  return (
    <>
      <Card.Root size="sm">
        <Card.Header>
          <Flex alignItems="center" gap={2}>
            <Avatar.Root variant="solid" justifyContent="center" alignItems="center" backgroundColor="orange">
              <Avatar.Fallback fontWeight="bold">{number}</Avatar.Fallback>
            </Avatar.Root>
            <Heading size="md">{title}</Heading>
          </Flex>
        </Card.Header>
        <Card.Body color="fg.muted">
          {body}
        </Card.Body>
      </Card.Root>
    </>
  )
}