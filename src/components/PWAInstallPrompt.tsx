import { Box, HStack, Icon, Text, VStack } from 'native-base'
import { useState, useEffect } from 'react'
import ButtonComponent from './common/ButtonComponent'
import { IoShare } from 'react-icons/io5'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

let deferredPrompt: BeforeInstallPromptEvent | null = null;

export default function PWAInstallPrompt() {
  const [showInstallButton, setShowInstallButton] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [buttonText, setButtonText] = useState<string | JSX.Element>('')

  useEffect(() => {
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as Window & typeof globalThis & { MSStream?: unknown }).MSStream;
    
    if (isIOSDevice) {
      setIsIOS(true);
      setShowInstallButton(true);
      setButtonText(
        <HStack space={1} alignItems="center" justifyContent="center">
          <Text>Tap</Text>
          <Icon as={IoShare} size="sm" />
          <Text>to install</Text>
        </HStack>
      );
      return;
    }

    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault()
      deferredPrompt = e
      setShowInstallButton(true)
      setButtonText("Install App")
    }

    const handleAppInstalled = () => {
      setShowInstallButton(false)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const handleInstallClick = async () => {
    if (isIOS) {
      setButtonText(
        <VStack space={1} alignItems="center" justifyContent="center">
          <HStack space={1} alignItems="center">
            <Text>Tap</Text>
            <Icon as={IoShare} size="sm" />
            <Text>then "Add</Text>
          </HStack>
          <Text>to Home Screen"</Text>
        </VStack>
      )

      const timer = setTimeout(() => {
        setButtonText(
          <HStack space={1} alignItems="center" justifyContent="center">
            <Text>Tap</Text>
            <Icon as={IoShare} size="sm" />
            <Text>to install</Text>
          </HStack>
        )
      }, 3000)

      return () => clearTimeout(timer);
    }

    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      deferredPrompt = null;
    }
  }

  if (!showInstallButton) return null;

  return (
    <Box 
      position="fixed"
      bottom="120px"
      left="50%"
      style={{ transform: 'translateX(-50%)' }}
      width="auto"
      maxW="350px"
      zIndex={999}
      mb={6}
    >
      <ButtonComponent
        onPress={handleInstallClick}
        label={buttonText}
        style={{ 
          whiteSpace: 'normal', 
          height: 'auto', 
          minHeight: '48px',
          padding: '12px 24px',
          margin: '8px',
          width: '100%'
        }}
      />
    </Box>
  )
}