import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { RoomServiceProvider } from '@roomservice/react';
import { Provider as NextAuthProvider } from 'next-auth/client';

// hooks
import { useUserId } from '@hooks/useUserId';

async function myAuthFunction(params: { room: string; ctx: { userId: number } }) {
  const response = await fetch('/api/roomservice', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ room: params.room, user: params.ctx.userId }),
  });

  if (response.status === 401) {
    throw new Error('Unauthorized!');
  }

  if (response.status !== 200) {
    throw await response.text();
  }

  const body = await response.json();

  return {
    user: body.user,
    token: body.token,
    resources: body.resources,
  };
}

function MyApp({ Component, pageProps }: AppProps) {
  const userId = useUserId();

  return (
    <NextAuthProvider session={pageProps.session}>
      <RoomServiceProvider online={userId !== null} clientParameters={{ auth: myAuthFunction, ctx: { userId } }}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </RoomServiceProvider>
    </NextAuthProvider>
  );
}

export default MyApp;
