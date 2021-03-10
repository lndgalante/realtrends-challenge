import {
  Button,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Input,
} from '@chakra-ui/react';

type Props = {
  isOpen: boolean;
  isDisabled: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onCommentChange: (comment: string) => void;
};

function ModalInputComment({ isOpen, isDisabled, onClose, onConfirm, onCommentChange }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Comment your vote</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input placeholder='This console rocks!' onChange={({ target }) => onCommentChange(target.value)} />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onConfirm} disabled={isDisabled}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalInputComment;
