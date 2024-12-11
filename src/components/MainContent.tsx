"use client";

import { Box, HStack, Button } from "native-base";
import ClosetComponent from "./ClosetComponent";
import OutfitMakerComponent from "./OutfitMakerComponent";
import EcoAdviceComponent from "./eco-advice/EcoAdviceComponent";
import { useState, useCallback } from "react";

interface MainContentProps {
  activeComponent: string;
  setActiveComponent: (component: string) => void;
}

export default function MainContent({
  activeComponent,
  setActiveComponent,
}: MainContentProps) {
  const [registeredBackHandler, setRegisteredBackHandler] = useState(
    () => () => false
  );

  const handleBack = () => {
    if (activeComponent === "Component3") {
      // Try the registered back handler first
      const wasHandled = registeredBackHandler();
      // Only go back to main menu if not handled by child
      if (!wasHandled) {
        setActiveComponent("");
      }
    } else if (activeComponent) {
      setActiveComponent("");
    }
  };

  const handleRegisterBack = useCallback((backFn: () => boolean) => {
    setRegisteredBackHandler(() => backFn);
  }, []);

  const handleComponentChange = (componentName: string) => {
    setActiveComponent(componentName);
  };

  return (
    <Box w="100%" h="100vh" bg="primary.200" safeArea>
      <Box flex={1} bg="primary.200" pb={20}>
        {activeComponent === "Component1" && <ClosetComponent />}
        {activeComponent === "Component2" && <OutfitMakerComponent />}
        {activeComponent === "Component3" && (
          <EcoAdviceComponent
            setActiveComponent={setActiveComponent}
            onRegisterBack={handleRegisterBack}
          />
        )}
      </Box>

      {/* Navbar at the bottom */}
      <HStack
        w="100%"
        position="fixed"
        bottom={0}
        bg="primary.200"
        justifyContent="space-around"
        p={4}
        borderTopWidth={1}
        borderTopColor="primary.100"
        zIndex={1}
      >
        {/* Back Button */}
        <Button
          onPress={handleBack}
          variant="outline"
          _icon={{
            color: "primary.100",
          }}
          _disabled={{
            opacity: 1,
            borderColor: "primary.100"
          }}
          isDisabled={!activeComponent}
        >
          <svg
            width="59"
            height="39"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>

        {/* Closet Button */}
        <Button
          onPress={() => handleComponentChange("Component1")}
          variant="outline"
          _icon={{
            color: "primary.100",
          }}
          opacity={activeComponent === "Component1" ? 1 : 0.7}
        >
          <svg
            width="59"
            height="39"
            viewBox="0 0 30 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16 3H27V45H16V3Z" fill="currentColor" />
            <path d="M3 3H14V45H3V3Z" fill="currentColor" />
            <path
              d="M21 23.5C21 24.3284 20.3284 25 19.5 25C18.6716 25 18 24.3284 18 23.5C18 22.6716 18.6716 22 19.5 22C20.3284 22 21 22.6716 21 23.5Z"
              fill="currentColor"
            />
            <path
              d="M12 23.5C12 24.3284 11.3284 25 10.5 25C9.67157 25 9 24.3284 9 23.5C9 22.6716 9.67157 22 10.5 22C11.3284 22 12 22.6716 12 23.5Z"
              fill="currentColor"
            />
          </svg>
        </Button>

        {/* Outfit Maker Button */}
        <Button
          onPress={() => handleComponentChange("Component2")}
          variant="outline"
          _icon={{
            color: "primary.100",
          }}
          opacity={activeComponent === "Component2" ? 1 : 0.7}
        >
          <svg
            width="59"
            height="39"
            viewBox="0 0 33 47"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M31.5719 5.8136C31.5719 5.8136 25.8686 0.83288 20.5597 1.0257C17.891 5.38489 15.9589 5.10209 11.9414 1.0257C8.13725 0.705028 4.50711 3.41966 2 7.24998L4.50711 10.9998L9.54749 9.64394V22.2206H23.9112V9.64394L29.1779 10.9998L31.5719 5.8136Z"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M5.42845 45.5533L9.54749 26.4016H23.9112L29.2142 45.5533H19.6384L17.2081 33.1047L14.778 45.5533H5.42845Z"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </Button>

        {/* Eco Advice Button */}
        <Button
          onPress={() => handleComponentChange("Component3")}
          variant="outline"
          _icon={{
            color: "primary.100",
          }}
          opacity={activeComponent === "Component3" ? 1 : 0.7}
        >
          <svg
            width="59"
            height="39"
            viewBox="0 0 29 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.7263 37.0903C23.7263 37.0903 22.775 28.5892 21.9457 22.3204C21.1163 16.0516 6.51722 8.81612 2.34806 1.90321C-1.82109 -5.00971 4.65531 29.984 8.56836 31.3779C12.4814 32.7717 23.7263 37.0903 23.7263 37.0903ZM23.7263 37.0903L28 41M23.7263 37.0903C15.6017 24.0237 14.8894 31.3779 10.9719 21.4172"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </Button>
      </HStack>
    </Box>
  );
}
