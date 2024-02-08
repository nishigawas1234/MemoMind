import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Input,
    FormControl,
    Button,
} from '@chakra-ui/react';

function NoteModal({ isOpen, onClose, onSave, title, detail, tags }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <Input placeholder="Note Title" mb={4} defaultValue={title} />
                        <Input placeholder="Note Detail" mb={4} defaultValue={detail} />
                        <Input placeholder="Tags" defaultValue={tags.join(', ')} />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="purple" onClick={onSave}>Save</Button>
                    <Button variant="ghost" onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default NoteModal;
