import { Flex } from "@chakra-ui/react"
import { Outlet, createFileRoute } from "@tanstack/react-router"

import Navbar from "@/components/Common/Navbar"
import Sidebar from "@/components/Common/Sidebar"
import useAuth from "@/hooks/useAuth.ts";

export const Route = createFileRoute("/_layout")({
  component: Layout,
})

function Layout() {
  const {user} = useAuth();
  return (
    <Flex direction="column" h="100vh">
      <Navbar />
      <Flex flex="1" overflow="hidden">
        {user?.is_superuser === true && <Sidebar />}
        <Flex flex="1" direction="column" p={4} overflowY="auto">
          <Outlet />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Layout
