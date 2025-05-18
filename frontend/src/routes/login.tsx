import {Box, Container, Flex, Image, Input, Text} from "@chakra-ui/react"
import {
  Link as RouterLink,
  createFileRoute, Link,
} from "@tanstack/react-router"
import {type SubmitHandler, useForm} from "react-hook-form"
import {FiLock, FiMail} from "react-icons/fi"

import type {Body_login_login_access_token as AccessToken} from "@/client"
import {Button} from "@/components/ui/button"
import {Field} from "@/components/ui/field"
import {InputGroup} from "@/components/ui/input-group"
import {PasswordInput} from "@/components/ui/password-input"
import useAuth from "@/hooks/useAuth"
import {emailPattern, passwordRules} from "../utils"
import graduationCap from "../../public/assets/images/pngtree-graduation-hat-png-image_11476784.png";
import Logo from "../../public/assets/images/logo.png"


export const Route = createFileRoute("/login")({
  component: Login,
})

function Login() {
  const {loginMutation, error, resetError} = useAuth()
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<AccessToken>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const onSubmit: SubmitHandler<AccessToken> = async (data) => {
    if (isSubmitting) return
    resetError()
    try {
      await loginMutation.mutateAsync(data)
    } catch {
      // error is handled by useAuth hook
    }
  }

  return (
    <>
      <Container maxW="7xl" minH="100vh">
        <Flex flexDirection="row" justifyContent="space-around" alignItems="center"
              minH="100vh">
          <Box alignItems="center" justifyContent="center" display="flex"
               flexDirection="column" gap={2} w="60%">
            <Box>
              <Link to="/">
                <Image src={Logo} alt="Logo" maxW="xs"/>
              </Link>
            </Box>
            <Flex flexDirection="column" gap={4} w="80%">
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box mb={4} justifyContent="center" alignItems="center" display="flex" flexDirection="column">
                  <Text fontSize="xl">Добредојдовте назад!</Text>
                  <Text fontSize="xl">Најавете се на вашата сметка</Text>
                </Box>

                <Field
                  invalid={!!errors.username}
                  errorText={errors.username?.message || !!error}
                >
                  <InputGroup w="100%" startElement={<FiMail/>}>
                    <Input
                      size="xl"
                      id="username"
                      {...register("username", {
                        required: "Корисничкото име е задолжително",
                        pattern: emailPattern,
                      })}
                      placeholder="Е-Адреса"
                      type="email"
                    />
                  </InputGroup>
                </Field>
                <PasswordInput
                  size="xl"
                  type="password"
                  startElement={<FiLock/>}
                  {...register("password", passwordRules())}
                  placeholder="Лозинка"
                  errors={errors}
                />
                <Flex justifyContent="flex-end">
                  <RouterLink to="/recover-password" className="main-link">
                    <Text fontWeight="normal">Заборавена лозинка?</Text>
                  </RouterLink>
                </Flex>
                <Flex gap={6}>
                  <Button colorPalette="yellow" variant="solid" type="submit" loading={isSubmitting} size="md">
                    Најава
                  </Button>
                  <RouterLink to="/signup">
                    <Button colorPalette="yellow" variant="outline" loading={isSubmitting} size="md">
                      Регистрирај се
                    </Button>
                  </RouterLink>
                </Flex>
              </form>
            </Flex>
          </Box>

          <Box display="flex" alignItems="center" w="40%">
            <Image
              src={graduationCap}
              objectFit="contain"
              maxH="700px"
              h="200%"
              w="200%"
            />
          </Box>
        </Flex>
      </Container>
    </>
  )
}
