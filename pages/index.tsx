import { signIn, useSession } from 'next-auth/client';
import { FaGoogle, FaInfoCircle } from 'react-icons/fa';
import { Stack, Button, Text, Tooltip, Icon } from '@chakra-ui/react';

function LoginForm() {
  // auth hooks
  const { 1: loading } = useSession();

  // handlers
  const handleSignIn = () => signIn('google');

  return (
    <Stack height='100vh' justifyContent='center' alignItems='center'>
      <Button leftIcon={<FaGoogle />} colorScheme='teal' size='lg' onClick={handleSignIn} isLoading={loading}>
        Log in with Google
      </Button>

      <Stack isInline color='gray.500' fontSize='sm'>
        <Text>For more info hover on icon</Text>
        <Tooltip shouldWrapChildren placement='bottom' label="We'll need you to log in in order to allow you to vote">
          <Icon as={FaInfoCircle} />
        </Tooltip>
      </Stack>
    </Stack>
  );
}

export default LoginForm;
