import {
  Box,
  Button, CloseButton,
  Container,
  Dialog,
  Flex,
  HStack,
  Input, Portal,
  Progress,
  Text,
} from "@chakra-ui/react";
import {createFileRoute} from "@tanstack/react-router";
import {useState} from "react";
import {useMutation, useQuery} from "@tanstack/react-query";
import {ItemsService} from "@/client";
import {MarkdownRenderer} from "@/components/ui/markdown";
import {usePDF} from "react-to-pdf";

export const Route = createFileRoute("/_layout/quiz")({
  component: Quiz,
  validateSearch: (search: {nItems?: string}) => {
    return { nItems: Number(search.nItems) || 5 };
  },
});

function Quiz() {
  const { nItems } = Route.useSearch();

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [stage, setStage] = useState<number>(0);
  const [result, setResult] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const { toPDF, targetRef } = usePDF({filename: 'page.pdf'});

  const {data, isLoading} = useQuery({
    queryKey: ["quiz", "start"],
    queryFn: () => ItemsService.startQuizz({nItems}),
  });

  const items = data ?? [];
  const currentItem = items[stage];

  const handleDescriptionChange = (id: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const mutation = useMutation({
    mutationFn: () => {
      const payload = items.map((item) => ({
        question: item.description!,
        answer: answers[item.id as string] || "",
        topic: item.topic,
      }));

      const requestBody = {payload};
      console.log(requestBody);
      return ItemsService.submitQuizz({requestBody});
    },
    onSuccess: (responseText: string) => {
      setResult({type: "success", message: responseText});
    },
    onError: () => {
      setResult({type: "error", message: "Налетавме на проблем при завршување на квизот."});
    },
  });

  const handleNext = () => {
    if (stage < items.length - 1) {
      setStage(stage + 1);
    }
  };

  const handlePrevious = () => {
    if (stage > 0) {
      setStage(stage - 1);
    }
  };

  return (
    <Container maxW="7xl">
      <Flex flexDirection="column" justifyContent="center" alignItems="center" gap={6}>
        {items.length > 0 && (
          <Progress.Root value={stage + 1} colorPalette="yellow" max={items.length} maxW="5xl" style={{width: "100%"}}>
            <HStack gap="5">
              <Progress.Label>{stage + 1}</Progress.Label>
              <Progress.Track flex="1">
                <Progress.Range/>
              </Progress.Track>
              <Progress.ValueText>{items.length}</Progress.ValueText>
            </HStack>
          </Progress.Root>
        )}

        <Box w="100%" minH="70vh">
          {isLoading ? (
            <Text>Прашањата се вчитуваат...</Text>
          ) : currentItem ? (
            <>
              <Flex
                key={currentItem.id}
                direction="column"
                justify="center"
                align="center"
                borderWidth="1px"
                borderRadius="lg"
                p={6}
                shadow="md"
                minH="40vh"
                textAlign="center"
                bg="orange"
              >
                <Text fontSize="3xl" fontWeight="bold">
                  {currentItem.description}
                </Text>
              </Flex>

              <Flex mt={8} direction="column" align="center" gap={4}>
                <Input
                  placeholder="Внесете го вашиот одговор тука"
                  value={answers[currentItem.id as string] || ""}
                  onChange={(e) => handleDescriptionChange(currentItem.id as string, e.target.value)}
                  maxW="3xl"
                />
                <HStack gap={4}>
                  <Button onClick={handlePrevious} disabled={stage === 0} colorPalette="yellow">
                    Претходно
                  </Button>
                  {stage < items.length - 1 ? (
                    <Button colorPalette="yellow" onClick={handleNext}>Следно</Button>
                  ) : (
                    <Button colorPalette="yellow"
                            onClick={() => mutation.mutate()}
                            loading={mutation.isPending}
                            loadingText="Се процесира..."
                    >
                      Заврши го квизот
                    </Button>
                  )}
                </HStack>
              </Flex>
            </>
          ) : (
            <Text>Не се пронајдени прашања.</Text>
          )}
          {result && (
            <Box
              mt={6}
              p={3}
              borderRadius="md"
              bg={result.type === "success" ? "green.100" : "red.100"}
              color={result.type === "success" ? "green.800" : "red.800"}
              fontWeight="medium"
              className="markdown-result"
            >
              <Dialog.Root
                placement="center"
                motionPreset="slide-in-bottom"
              >
                <Dialog.Trigger asChild>
                  {result.type === "success" ? <Button variant="outline">Види ги резултатите</Button> : <Text>{result.message}</Text>}
                </Dialog.Trigger>
                <Portal>
                  <Dialog.Backdrop />
                  <Dialog.Positioner>
                    <Dialog.Content>
                      <Dialog.Header>
                        <Dialog.Title>Ова е нашето мислење според одговорите што ги внесовте</Dialog.Title>
                      </Dialog.Header>
                      <Dialog.Body ref={targetRef}>
                        <MarkdownRenderer>{result.message}</MarkdownRenderer>
                      </Dialog.Body>
                      <Dialog.Footer>
                        <Button onClick={() => toPDF()}>Експортирај во PDF</Button>
                      </Dialog.Footer>
                      <Dialog.CloseTrigger asChild>
                        <CloseButton size="sm" />
                      </Dialog.CloseTrigger>
                    </Dialog.Content>
                  </Dialog.Positioner>
                </Portal>
              </Dialog.Root>
            </Box>
          )}
        </Box>

      </Flex>
    </Container>
  );
}
