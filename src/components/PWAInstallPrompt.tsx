import { Box, Button, Text, useToast, Image, VStack } from 'native-base'
import { useState, useEffect } from 'react'

interface PWAInstallPromptProps {
  centered: boolean;
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

let deferredPrompt: BeforeInstallPromptEvent | null = null;

export default function PWAInstallPrompt(props: PWAInstallPromptProps) {
  const { centered } = props;
  const [showInstallButton, setShowInstallButton] = useState(false)
  const toast = useToast()

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault()
      deferredPrompt = e
      setShowInstallButton(true)
    }

    const handleAppInstalled = () => {
      toast.show({
        description: 'App installed successfully!',
        placement: 'top'
      })
      setShowInstallButton(false)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [toast])

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === 'accepted') {
        deferredPrompt = null
      }
    }
  }

  if (!showInstallButton) return null

  return (
    <Box 
      position={centered ? "absolute" : "fixed"}
      top={centered ? "50%" : "auto"}
      left={centered ? "50%" : "auto"}
      bottom={centered ? "auto" : "xl"}
      right={centered ? "auto" : "xl"}
      style={{ transform: centered ? 'translate(-50%, -50%)' : 'none' }}
      bg="primary.200"
      zIndex={2}
    >
      <VStack 
        space={4} 
        alignItems="center" 
        bg="primary.200"
        p="xl"
      >
        <Image 
          source={{
            uri: "/pwa-512x512.png"
          }}
          alt="Inside My Closet Logo"
          size="xl"
          borderRadius="full"
        />
        <Text color="primary.100" fontSize="md" textAlign="center">
          Install Inside My Closet app?
        </Text>
        <Button
          onPress={handleInstallClick}
          bg="primary.200"
          borderColor="primary.100"
          borderWidth={1}
          _text={{ color: "primary.100" }}
          _hover={{ borderColor: "black", bg: "primary.200" }}
          w="100%"
        >
          Install
        </Button>
      </VStack>
    </Box>
  )
} 