import {Box, Container, Flex, Heading, Image, Input, Text} from "@chakra-ui/react"
import {
  Link as RouterLink,
  createFileRoute,
  redirect, Link,
} from "@tanstack/react-router"
import {type SubmitHandler, useForm} from "react-hook-form"
import {FiLock, FiMail} from "react-icons/fi"

import type {Body_login_login_access_token as AccessToken} from "@/client"
import {Button} from "@/components/ui/button"
import {Field} from "@/components/ui/field"
import {InputGroup} from "@/components/ui/input-group"
import {PasswordInput} from "@/components/ui/password-input"
import useAuth, {isLoggedIn} from "@/hooks/useAuth"
import {emailPattern, passwordRules} from "../utils"
import graduationCap from "../../public/assets/images/slika1.png";
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
      <Container maxW="full" minH="100vh">
        <Flex flexDirection="row" justifyContent="space-around" px={16} alignItems="center"
              minH="100vh">
          <Box p={4} alignItems="center" justifyContent="center" display="flex"
               flexDirection="column">
              <Box>
                <Link to="/">
                  <Image src={Logo} alt="Logo" maxW="xs"/>
                </Link>
              </Box>
            <Box justifyContent="center" alignItems="center" display="flex" flexDirection="column">
              <Text fontSize="xl">Добредојдовте назад!</Text>
              <Text fontSize="xl">Најавете се на вашата сметка</Text>
            </Box>
              <Field
                invalid={!!errors.username}
                errorText={errors.username?.message || !!error}
              >
                <InputGroup w="100%" startElement={<FiMail/>}>
                  <Input
                    id="username"
                    {...register("username", {
                      required: "Username is required",
                      pattern: emailPattern,
                    })}
                    placeholder="Е-Адреса"
                    type="email"
                  />
                </InputGroup>
              </Field>
              <PasswordInput
                type="password"
                startElement={<FiLock/>}
                {...register("password", passwordRules())}
                placeholder="Лозинка"
                errors={errors}
              />
              <RouterLink to="/recover-password" className="main-link">
                Заборавена лозинка?
              </RouterLink>
              <Button variant="solid" type="submit" loading={isSubmitting} size="md">
                Најава
              </Button>
              <Text>
                Сеуште немате сметка?{" "}
                <RouterLink to="/signup" className="main-link">
                  Регистрирајте се
                </RouterLink>
              </Text>
          </Box>

          <Box p={4} display="flex" alignItems="center">
            <Image
              src={graduationCap}
              objectFit="contain"
              maxH="500px"
              h="100%"
            />
          </Box>
        </Flex>
      </Container>

    </>
  )
}
