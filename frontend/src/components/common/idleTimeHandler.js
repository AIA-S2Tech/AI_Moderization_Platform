import React, { useEffect, useCallback, useRef } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  Text,
  Center
} from '@chakra-ui/react';
import { WarningIcon } from '@chakra-ui/icons';

const IdleTimeHandler = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  
  const TIMEOUT = 15 * 60 * 1000; 
  const ONE_DAY = 24 * 60 * 60 * 1000;
  const timeoutId = useRef(null);

  const handleLogout = useCallback(async () => {
    // 1. Get user info BEFORE clearing storage
    const userStr = localStorage.getItem('user');
    const userInfo = userStr ? JSON.parse(userStr) : null;

    // 2. Clear storage & Show Alert immediately for UI responsiveness
    localStorage.clear();
    sessionStorage.clear();
    onOpen();
    
    // 3. Backend sync (Conditional check to avoid errors if userInfo is missing)
    if (userInfo?.access_token) {
      try {
        await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${userInfo.access_token}`,
            'Content-Type': 'application/json'
          }
        });
      } catch (error) {
        console.error("Logout API failed:", error);
      }
    }
  }, [onOpen]);

  const resetTimer = useCallback(() => {
    if (isOpen) {
      if (timeoutId.current) clearTimeout(timeoutId.current);
      return;
    }
    if (timeoutId.current) clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(handleLogout, TIMEOUT);
  }, [handleLogout, TIMEOUT, isOpen]);

  // --- REFINED: Persistence Check on Mount ---
  useEffect(() => {
    const checkSessionValidity = () => {
      const userTimestamp = localStorage.getItem('user_timestamp');
      const user = localStorage.getItem('user');

      // If no user is logged in, don't bother checking
      if (!user) return;

      if (userTimestamp) {
        const lastSavedTime = new Date(userTimestamp).getTime();
        const currentTime = Date.now();

        if (currentTime > lastSavedTime + ONE_DAY) {
          handleLogout();
        }
      } else {
        // Optional: If 'user' exists but 'user_timestamp' is missing, 
        // you might want to log them out as a security precaution.
        handleLogout();
      }
    };

    checkSessionValidity();
  }, [handleLogout, ONE_DAY]); 
  // ---------------------------------------

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'mousedown', 'touchstart', 'scroll'];
    
    if (!isOpen) {
      resetTimer();
      events.forEach(event => window.addEventListener(event, resetTimer));
    }

    return () => {
      if (timeoutId.current) clearTimeout(timeoutId.current);
      events.forEach(event => window.removeEventListener(event, resetTimer));
    };
  }, [resetTimer, isOpen]);

  const handleLoginRedirect = () => {
    onClose();
    window.location.href = '/sign-in';
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={handleLoginRedirect}
      isCentered
      closeOnOverlayClick={false}
    >
      <AlertDialogOverlay backdropFilter="blur(8px) hue-rotate(10deg)">
        <AlertDialogContent borderRadius="xl" p={4} m={4}>
          <AlertDialogHeader fontSize="lg" fontWeight="bold" textAlign="center">
            <Center mb={4}>
              <WarningIcon boxSize={10} color="orange.400" />
            </Center>
            Session Expired
          </AlertDialogHeader>

          <AlertDialogBody textAlign="center">
            <Text color="gray.600">
              For your security, you have been logged out because you were inactive for a while. 
              Please log in again to continue your work.
            </Text>
          </AlertDialogBody>

          <AlertDialogFooter justifyContent="center">
            <Button 
              colorScheme="blue" 
              onClick={handleLoginRedirect} 
              width="full"
              size="lg"
            >
              Sign In Again
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default IdleTimeHandler;