import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, Switch, Route, Redirect } from "react-router-dom";
import { Box, Flex, chakra } from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import { AppContext } from "../../contexts";
import { useGetUser } from "../../store";
import { Sidebar, Message, Nav, Loader } from "../../components";
import { useRenderPages } from "./pages";
import { capitalize } from "../../utilities";
import { GiHamburgerMenu } from "react-icons/gi";

export const Admin = () => {
  const [{ me, browserWidth, loading: contextLoading, onScroll }] =
    useContext(AppContext);
  const getUser = useGetUser();
  const renderPages = useRenderPages();
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(false);
  const HamburgerIcon = chakra(GiHamburgerMenu);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!me) getUser();
  }, []);

  if (!me) {
    return <Loader />;
  }

  if (!me.default_service) return <Message />;

  const toggleSidebar = () => {
    if (browserWidth && browserWidth > 1024) return;
    setShowSidebar(!showSidebar);
  };

  const handleScroll = () => {
    if (!scrollRef?.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const currentHeight = Math.round(scrollTop + clientHeight);
    if (scrollHeight - currentHeight < 50) {
      !contextLoading && onScroll?.();
    }
  };

  return (
    <Box>
      <Helmet>
        <title>Dome | {capitalize(location.pathname)}</title>
      </Helmet>
      <Flex bg="white">
        <Box
          pos="fixed"
          left={{
            base: showSidebar ? 0 : "-65%",
            sm: showSidebar ? 0 : "-40%",
            lg: "0",
          }}
          w={{ base: "65%", sm: "40%", lg: "14.3%" }}
          transition="left 0.5s ease-in"
          onClick={(e) => e.stopPropagation()}
          zIndex={999}
        >
          <Sidebar />
        </Box>
        <Box
          ref={scrollRef}
          onScroll={handleScroll}
          ml={{ base: "0", lg: "14.3%" }}
          w={{ base: "100%", lg: "85.7%" }}
          bg="#FBFBFB"
          h="100vh"
          minH={"100vh"}
          overflowY="auto"
        >
          <Nav />
          <Box py={10} px={{ base: 8, sm: 12, lg: 16 }}>
            <Switch>
              <Route exact path="/">
                <Redirect to="/resources" />
              </Route>
              {renderPages()}
            </Switch>
          </Box>
        </Box>
      </Flex>
      <Box
        pos="fixed"
        left={{ base: 5, sm: 7, md: 10 }}
        bottom={10}
        w="62px"
        h="62px"
        d={{ base: "flex", lg: "none" }}
        justifyContent="center"
        alignItems="center"
        borderRadius="full"
        bg="charlestonGreen"
        cursor="pointer"
        onClick={toggleSidebar}
      >
        <HamburgerIcon color="white" fontSize="lg" />
      </Box>
      <Box
        pos="fixed"
        display={{ lg: "none" }}
        top="0"
        left="0"
        height="100vh"
        width="100vw"
        bg={"rgba(0,0,0,0.06)"}
        opacity={showSidebar ? 1 : 0}
        zIndex={showSidebar ? 99 : -999}
        transition="opacity 0.5s ease-in"
        onClick={toggleSidebar}
      />
    </Box>
  );
};
