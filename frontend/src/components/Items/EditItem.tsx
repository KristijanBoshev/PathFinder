import {
  Button,
  ButtonGroup,
  DialogActionTrigger,
  Input,
  Portal,
  Select,
  Text,
  VStack,
  createListCollection,
} from "@chakra-ui/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { Controller, type SubmitHandler, useForm } from "react-hook-form"
import { FaExchangeAlt } from "react-icons/fa"

import { type ApiError, type ItemPublic, ItemsService, TopicType } from "@/client"
import useCustomToast from "@/hooks/useCustomToast"
import { handleError } from "@/utils"
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Field } from "../ui/field"

interface EditItemProps {
  item: ItemPublic
}

interface ItemUpdateForm {
  title: string
  description?: string
  topic?: TopicType
}

const EditItem = ({ item }: EditItemProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()
  const { showSuccessToast } = useCustomToast()
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ItemUpdateForm>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      title: item.title,
      description: item.description ?? undefined,
      topic: item.topic,
    },
  })

  const mutation = useMutation({
    mutationFn: (data: ItemUpdateForm) =>
      ItemsService.updateItem({ id: item.id, requestBody: data }),
    onSuccess: () => {
      showSuccessToast("Item updated successfully.")
      reset({
        title: item.title,
        description: item.description ?? undefined,
        topic: item.topic,
      })
      setIsOpen(false)
    },
    onError: (err: ApiError) => {
      handleError(err)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] })
    },
  })

  const onSubmit: SubmitHandler<ItemUpdateForm> = async (data) => {
    mutation.mutate(data)
  }

  const topicOptions: { value: TopicType; label: string }[] = [
    { value: "history" as TopicType, label: "History" },
    { value: "geography" as TopicType, label: "Geography" },
    { value: "technology" as TopicType, label: "Technology" },
    { value: "general" as TopicType, label: "General" },
    { value: "art" as TopicType, label: "Art" },
    { value: "music" as TopicType, label: "Music" },
    { value: "literature" as TopicType, label: "Literature" },
    { value: "sociology" as TopicType, label: "Sociology" },
    { value: "philosophy" as TopicType, label: "Philosophy" },
    { value: "physics" as TopicType, label: "Physics" },
    { value: "chemistry" as TopicType, label: "Chemistry" },
    { value: "biology" as TopicType, label: "Biology" },
    { value: "mathematics" as TopicType, label: "Mathematics" },
  ];

  const topics = createListCollection({ items: topicOptions });


  return (
    <DialogRoot
      size={{ base: "xs", md: "md" }}
      placement="center"
      open={isOpen}
      onOpenChange={({ open }) => setIsOpen(open)}
    >
      <DialogTrigger asChild>
        <Button variant="ghost">
          <FaExchangeAlt fontSize="16px" />
          Edit Item
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Edit Item</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Text mb={4}>Update the item details below.</Text>
            <VStack gap={4}>
              <Field
                required
                invalid={!!errors.title}
                errorText={errors.title?.message}
                label="Title"
              >
                <Input
                  id="title"
                  {...register("title", {
                    required: "Title is required",
                  })}
                  placeholder="Title"
                  type="text"
                />
              </Field>

              <Field
                invalid={!!errors.description}
                errorText={errors.description?.message}
                label="Description"
              >
                <Input
                  id="description"
                  {...register("description")}
                  placeholder="Description"
                  type="text"
                />
              </Field>
               <Field
                invalid={!!errors.topic} 
                errorText={errors.topic?.message}
                label="Topic"
              >
                <Controller
                  name="topic"
                  control={control}
                  render={({ field }) => (
                    <Select.Root
                      collection={topics} 
                      value={field.value ? [field.value] : []} 
                      onValueChange={(details) => {
                        const selectedValue = details.value[0] as TopicType | undefined;
                        field.onChange(selectedValue ?? undefined); 
                      }}
                      width="100%"
                    >
                      <Select.HiddenSelect id={`edit-item-topic-select-hidden-${item.id}`} aria-label="Topic" />
                      <Select.Control>
                        <Select.Trigger onBlur={field.onBlur}>
                          <Select.ValueText placeholder="Select a topic (optional)" />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                          <Select.Indicator />
                        </Select.IndicatorGroup>
                      </Select.Control>
                      <Portal>
                        <Select.Positioner style={{ zIndex: 5500 }}>
                          <Select.Content>
                            {topics.items.map((topicItem) => ( 
                              <Select.Item item={topicItem} key={topicItem.value}>
                                {topicItem.label}
                                <Select.ItemIndicator />
                              </Select.Item>
                            ))}
                          </Select.Content>
                        </Select.Positioner>
                      </Portal>
                    </Select.Root>
                  )}
                />
              </Field>
            </VStack>
          </DialogBody>

          <DialogFooter gap={2}>
            <ButtonGroup>
              <DialogActionTrigger asChild>
                <Button
                  variant="subtle"
                  colorPalette="gray"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </DialogActionTrigger>
              <Button variant="solid" type="submit" loading={isSubmitting}>
                Save
              </Button>
            </ButtonGroup>
          </DialogFooter>
        </form>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}

export default EditItem
