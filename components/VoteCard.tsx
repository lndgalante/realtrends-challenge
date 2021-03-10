import { Text, Button, Image, VStack, Progress } from '@chakra-ui/react';

type Props = {
  title: string;
  votes: number;
  totalVotes: number;
  imagePath: string;
  onVote: () => void;
};

function VoteCard({ title, votes, totalVotes, imagePath, onVote }: Props) {
  return (
    <VStack
      as='article'
      flex={1}
      alignItems='center'
      spacing={0}
      boxShadow='lg'
      p={4}
      borderRadius='md'
      position='relative'
    >
      <Image objectFit='cover' minHeight={240} src={imagePath} alt={title} />
      <Text fontSize='2xl' fontWeight='bold'>
        {title}
      </Text>
      <Text fontSize='lg' mb={2}>
        Total Votes: {votes || 0}
      </Text>
      <Button size='lg' colorScheme='teal' onClick={onVote}>
        Vote
      </Button>
      <Progress
        position='absolute'
        left={0}
        top={0}
        bottom={0}
        value={(votes / totalVotes) * 100}
        flex={1}
        width='full'
        borderTopLeftRadius='md'
        borderTopRightRadius='md'
      />
    </VStack>
  );
}

export default VoteCard;
