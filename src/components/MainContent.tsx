"use client";

import { Box, Button, VStack, HStack, Text } from "native-base";
import ClosetComponent from "../components/ClosetComponent";
import WardrobeComponent from "./OutfitMakerComponent";
import EcoAdviceComponent from "../components/EcoAdviceComponent";

export default function MainContent({
  activeComponent,
  setActiveComponent,
}: {
  activeComponent: string;
  setActiveComponent: (component: string) => void;
}) {
  // Components to render conditionally
  const renderComponent = () =>
    activeComponent === "Component1" ? (
      <ClosetComponent />
    ) : activeComponent === "Component2" ? (
      <WardrobeComponent />
    ) : activeComponent === "Component3" ? (
      <EcoAdviceComponent />
    ) : (
      <Text>Component 1</Text>
    );

  return (
    <Box w="100%" h="100vh" bg="white" safeArea>
      <VStack space={4} flex={1} justifyContent="center" alignItems="center">
        {renderComponent()}
      </VStack>

      {/* Navbar at the bottom */}
      <HStack
        w="100%"
        position="absolute"
        bottom={0}
        bg="#67635E"
        justifyContent="space-around"
        p={2}
      >
        <Button
          onPress={() => setActiveComponent("Component1")}
          colorScheme="light"
          _text={{ color: "#333333" }}
          bg="transparent"
          _hover={{ bg: "transparent" }}
        >
          <svg width="59" height="39" viewBox="0 0 30 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 3H27V45H16V3Z" fill={activeComponent === "Component1" ? "white" : "#D9D9D9"}/>
            <path d="M3 3H14V45H3V3Z" fill={activeComponent === "Component1" ? "white" : "#D9D9D9"}/>
            <path d="M21 23.5C21 24.3284 20.3284 25 19.5 25C18.6716 25 18 24.3284 18 23.5C18 22.6716 18.6716 22 19.5 22C20.3284 22 21 22.6716 21 23.5Z" fill={!activeComponent === "Component1" ? "white" : "#67635E"}/>
            <path d="M12 23.5C12 24.3284 11.3284 25 10.5 25C9.67157 25 9 24.3284 9 23.5C9 22.6716 9.67157 22 10.5 22C11.3284 22 12 22.6716 12 23.5Z" fill={!activeComponent === "Component1" ? "white" : "#67635E"}/>
          </svg>
        </Button>
        <Button
          onPress={() => setActiveComponent("Component2")}
          colorScheme="light"
          borderColor="white"
          bg="transparent"
          _text={{ color: "#333333" }}
        >
          <svg width="59" height="39" viewBox="0 0 33 47" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M31.5719 5.8136C31.5719 5.8136 25.8686 0.83288 20.5597 1.0257C17.891 5.38489 15.9589 5.10209 11.9414 1.0257C8.13725 0.705028 4.50711 3.41966 2 7.24998L4.50711 10.9998L9.54749 9.64394V22.2206H23.9112V9.64394L29.1779 10.9998L31.5719 5.8136Z" stroke={activeComponent === "Component2" ? "white" : "#D9D9D9"} stroke-width="2"/>
            <path d="M5.42845 45.5533L9.54749 26.4016H23.9112L29.2142 45.5533H19.6384L17.2081 33.1047L14.778 45.5533H5.42845Z" stroke={activeComponent === "Component2" ? "white" : "#D9D9D9"} stroke-width="2"/>
          </svg>
        </Button>
        <Button
          onPress={() => setActiveComponent("Component3")}
          colorScheme="light"
          bg="transparent"
          _text={{ color: "#333333" }}
        >
          <svg width="59" height="39" viewBox="0 0 29 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M23.7263 37.0903C23.7263 37.0903 22.775 28.5892 21.9457 22.3204C21.1163 16.0516 6.51722 8.81612 2.34806 1.90321C-1.82109 -5.00971 4.65531 29.984 8.56836 31.3779C12.4814 32.7717 23.7263 37.0903 23.7263 37.0903ZM23.7263 37.0903L28 41M23.7263 37.0903C15.6017 24.0237 14.8894 31.3779 10.9719 21.4172" 
              stroke={activeComponent === "Component3" ? "white" : "#D9D9D9"}
              strokeWidth="2"
            />
          </svg>
        </Button>
      </HStack>
    </Box>
  );
}
