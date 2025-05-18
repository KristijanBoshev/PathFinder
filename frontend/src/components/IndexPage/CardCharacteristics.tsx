import {Card, Icon} from "@chakra-ui/react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

type CardProps = {
  title: string,
  description: string
}

export const CardCharacteristics = ({title, description}: CardProps) => {
  return (
    <>
      <Card.Root width="320px" variant="outline">
        <Card.Body gap="2">
          <Icon size="2xl" color="orange">
            <IoMdCheckmarkCircleOutline/>
          </Icon>
          <Card.Title mb="2" fontSize="xl">{title}</Card.Title>
          <Card.Description fontSize="md">
            {description}
          </Card.Description>
        </Card.Body>
      </Card.Root>
    </>
  )
}