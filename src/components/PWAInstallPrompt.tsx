import { Box, useToast } from 'native-base'
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
  const [isIOS, setIsIOS] = useState(false)
  const toast = useToast()

  useEffect(() => {
    // Check if device is iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as Window & typeof globalThis & { MSStream?: unknown }).MSStream;
    setIsIOS(isIOSDevice);

    // Show install button immediately for iOS
    if (isIOSDevice) {
      setShowInstallButton(true);
    }

    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      console.log('beforeinstallprompt fired');
      e.preventDefault()
      deferredPrompt = e
      setShowInstallButton(true)
    }

    const handleAppInstalled = () => {
      console.log('appinstalled fired');
      toast.show({
        description: 'App installed successfully!',
        placement: 'top'
      })
      setShowInstallButton(false)
    }

    console.log('Adding PWA event listeners');
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      console.log('Removing PWA event listeners');
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [toast])

  const handleInstallClick = async () => {
    if (isIOS) {
      toast.show({
        description: 'To install, tap the Share button below and then "Add to Home Screen"',
        placement: 'top',
        duration: 5000
      })
      return;
    }

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
    >
      <ButtonComponent
        onPress={handleInstallClick}
        label={isIOS ? "Install via Share Menu" : "Install App"}
      />
    </Box>
  )
} 