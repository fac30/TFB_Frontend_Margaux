import { Box, Button, Text, useToast } from 'native-base'
import { useState, useEffect } from 'react'

let deferredPrompt: any

export default function PWAInstallPrompt() {
  const [showInstallButton, setShowInstallButton] = useState(false)
  const toast = useToast()

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      deferredPrompt = e
      setShowInstallButton(false)
    })

    window.addEventListener('appinstalled', () => {
      toast.show({
        description: 'App installed successfully!',
        placement: 'top'
      })
      setShowInstallButton(false)
    })

    return () => {
      window.removeEventListener('beforeinstallprompt', () => {})
      window.removeEventListener('appinstalled', () => {})
    }
  }, [])

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
      position="fixed" 
      bottom="xl" 
      right="xl" 
      p="xl" 
      bg="primary.100" 
      shadow="md" 
      borderRadius="lg"
    >
      <Text mb="md" color="primary.200" fontSize="md">
        Install Inside My Closet app?
      </Text>
      <Button 
        onPress={handleInstallClick}
        size="md"
        _hover={{ bg: "primary.300" }}
      >
        Install
      </Button>
    </Box>
  )
} 