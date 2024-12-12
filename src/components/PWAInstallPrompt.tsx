import { Box, useToast, Image, VStack } from 'native-base'
import { useState, useEffect } from 'react'
import ButtonComponent from './common/ButtonComponent'

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
      bg="primary.100"
      borderRadius="md"
      shadow="2"
      zIndex={2}
    >
      <VStack 
        space={4} 
        alignItems="center" 
        bg="primary.100"
        p="4"
      >
        <Image 
          source={{
            uri: "/pwa-512x512.png"
          }}
          alt="Inside My Closet Logo"
          size="md"
          borderRadius="full"
        />
        <ButtonComponent
          onPress={handleInstallClick}
          label="Install App"
        />
      </VStack>
    </Box>
  )
} 