import { nanoid } from 'nanoid';
import { useState } from 'react';
import { useMap, useList } from '@roomservice/react';
import { signOut, useSession } from 'next-auth/client';
import { Button, Center, useDisclosure, Stack, HStack, Text } from '@chakra-ui/react';
// hooks
// import { useUserId } from '@hooks/useUserId'

// components
import VoteCard from '@components/VoteCard';
import ModalInputComment from '@components/ModalInputComment';

// types
type RoomMap = {
  xbox: number;
  playstation: number;
};

type Console = keyof RoomMap;

type VotersMap = {
  [userName: string]: {
    [console: string]: number;
  };
};

type Comment = {
  id: string;
  comment: string;
};

type Comments = Comment[];

const log = console.log;

export default function Home() {
  // react hooks
  const [comment, setComment] = useState<string>('');
  const [selectedConsole, setSelectedConsole] = useState<Console | null>(null);

  // auth hooks
  const [session] = useSession();

  // chakra hooks
  const { isOpen, onOpen, onClose } = useDisclosure();

  // roomservice hooks
  const [voters, votersMap] = useMap<VotersMap>('realTrendsRoom', 'Voters15');
  console.log('\n ~ Home ~ voters', voters);
  const [productsVotes, productsVotesMap] = useMap<RoomMap>('realTrendsRoom', 'ProductVotes15');
  console.log('\n ~ Home ~ productsVotes', productsVotes);

  const [xboxComments, xboxCommentsMap] = useMap<Comments>('realTrendsRoom', 'XboxComments15');
  const [playstationComments, playstationCommentsMap] = useMap<Comments>('realTrendsRoom', 'PlaystationComments15');

  // constants
  const totalVotes = Object.values(productsVotes).reduce((accumulator, consoleVotes) => accumulator + consoleVotes, 0);

  // handlers
  function handleConfirmModal() {
    onClose();
    vote(selectedConsole);
  }

  function handleCommentChange(comment: string) {
    setComment(comment);
  }

  function handleVoteConsole(console: Console) {
    // Get username from google session
    const { name } = session.user;

    // Get console total votes and console total user votes
    const userVotes = voters?.[name]?.[console] || 0;

    if (userVotes >= 1) {
      return alert(`You cannot vote this console again.`);
    }

    onOpen();
    setSelectedConsole(console);
  }

  // helpers
  function vote(console: Console) {
    // Get username from google session
    const { name } = session.user;

    // Get console total votes and console total user votes
    const consoleVotes = productsVotes[console] || 0;
    const userVotes = voters?.[name]?.[console] || 0;
    const consoleCommentsMap = console === 'playstation' ? playstationCommentsMap : xboxCommentsMap;

    const otherConsole = console === 'playstation' ? 'xbox' : 'playstation';
    const userOtherConsoleVotes = voters?.[name]?.[otherConsole] || 0;
    const otherConsoleCommentsMap = otherConsole === 'playstation' ? playstationCommentsMap : xboxCommentsMap;

    if (userOtherConsoleVotes >= 1) {
      alert(`You have already voted other console. Your votes will be transfered to this one`);

      // Update console votes
      productsVotesMap.set(console, consoleVotes + 1);
      productsVotesMap.set(otherConsole, userOtherConsoleVotes - 1);

      // Update user console votes
      votersMap.set(name, {
        [console]: userVotes + 1,
        [otherConsole]: userOtherConsoleVotes - 1,
      });

      // Save comments
      consoleCommentsMap.set(name, { id: nanoid(), comment });

      // Delete comments
      otherConsoleCommentsMap.set(name, null);
    } else {
      // Update console votes
      productsVotesMap.set(console, consoleVotes + 1);

      // Update user console votes
      votersMap.set(name, { ...(voters?.[name] || {}), [console]: userVotes + 1 });

      // Save comments
      consoleCommentsMap.set(name, { id: nanoid(), comment });
    }

    // Reset react state
    setComment('');
    setSelectedConsole(null);
  }

  return (
    <Center as='main' minHeight='100vh' p={4} flexDirection='column'>
      <ModalInputComment
        isOpen={isOpen}
        onClose={onClose}
        isDisabled={comment === ''}
        onConfirm={handleConfirmModal}
        onCommentChange={handleCommentChange}
      />

      <Button onClick={signOut} position='absolute' right={2} top={2}>
        Sign out
      </Button>

      <Stack margin='0 auto' width='full' isInline spacing={4} maxWidth={800} mb={6}>
        <VoteCard
          imagePath='/ps5.png'
          title='Playstation 5'
          totalVotes={totalVotes}
          votes={productsVotes.playstation}
          onVote={() => handleVoteConsole('playstation')}
        />

        <VoteCard
          imagePath='/xbox.png'
          title='Xbox Series X'
          totalVotes={totalVotes}
          votes={productsVotes.xbox}
          onVote={() => handleVoteConsole('xbox')}
        />
      </Stack>

      <Stack margin='0 auto' width='full' isInline spacing={4} maxWidth={800}>
        <Stack
          borderWidth={2}
          borderColor='gray.200'
          borderStyle='solid'
          borderRadius='md'
          width='full'
          p={2}
          height={240}
          overflowY='auto'
          textAlign='center'
        >
          {Object.entries(playstationComments)
            .filter(([_user, value]) => value)
            .map(([user, { id, comment }]) => (
              <HStack width='full' justifyContent='space-between' key={id}>
                <Text fontWeight='medium'>{user}:</Text>
                <Text>{comment}</Text>
              </HStack>
            ))}
          <Center height='full'>
            {Object.values(playstationComments).filter(Boolean).length === 0 && <Text>No comments yet</Text>}
          </Center>
        </Stack>

        <Stack
          borderWidth={2}
          borderColor='gray.200'
          borderStyle='solid'
          borderRadius='md'
          width='full'
          p={2}
          height={240}
          overflowY='auto'
        >
          {Object.entries(xboxComments)
            .filter(([_user, value]) => value)
            .map(([user, { id, comment }]) => (
              <HStack width='full' justifyContent='space-between' key={id}>
                <Text fontWeight='medium'>{user}:</Text>
                <Text>{comment}</Text>
              </HStack>
            ))}
          <Center height='full'>
            {Object.values(xboxComments).filter(Boolean).length === 0 && <Text>No comments yet</Text>}
          </Center>
        </Stack>
      </Stack>
    </Center>
  );
}
