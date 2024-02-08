import React, { useState } from 'react';
import {
    ChakraProvider,
    Box,
    Heading,
    Text,
    Badge,
    Divider,
    Button,
    Stack,
    Flex,
    Avatar,
    useDisclosure,
} from '@chakra-ui/react';
import NoteModal from './components/NoteModel';

// Dummy data for testing
const dummyNotes = [
    { id: 1, title: 'Note 1', tags: ['tag1', 'tag2'], detail: 'This is the detail of Note 1.' },
    { id: 2, title: 'Note 2', tags: ['tag3'], detail: 'This is the detail of Note 2.' },
    { id: 3, title: 'Note 3', tags: ['tag1', 'tag4'], detail: 'This is the detail of Note 3.' },
];

function Dashboard() {
    const [notes, setNotes] = useState(dummyNotes);
    const [selectedNote, setSelectedNote] = useState(null);
    const { isOpen: isAddModalOpen, onOpen: onAddModalOpen, onClose: onAddModalClose } = useDisclosure();
    const { isOpen: isEditModalOpen, onOpen: onEditModalOpen, onClose: onEditModalClose } = useDisclosure();

    // Dummy user data
    const user = {
        name: 'John Doe',
        profilePicture: 'https://bit.ly/dan-abramov',
    };

    const handleLogout = () => {
        // Implement your logout logic here
        console.log('Logged out');
    };

    const handleAddNote = () => {
        // Implement logic to add a new note
        console.log('Add note clicked');
        onAddModalClose();
    };

    const handleEditNote = (note) => {
        setSelectedNote(note);
        onEditModalOpen();
    };

    const handleSaveNote = () => {
        // Implement logic to save the edited note
        console.log('Save note clicked');
        onEditModalClose();
    };

    return (
        <ChakraProvider resetCSS>
            <Flex direction="column" alignItems="flex-end" bg="gray.100" minH="100vh">
                <Box p={4} bg="purple.600" color="white" w="100%" mb={4}>
                    <Flex justify="end" alignItems="center">
                        <Box textAlign="right" mr={4}>
                            <Heading size="md" fontWeight="semibold">{user.name}</Heading>
                            <Button colorScheme="white" onClick={handleLogout} size="sm">Logout</Button>
                        </Box>
                        <Avatar size="md" src={user.profilePicture} />
                    </Flex>
                </Box>
                <Flex mt={4} direction="column" w="100%" maxW="800px" mx="auto">
                    <Button
                        colorScheme="purple"
                        onClick={onAddModalOpen}
                        mb={4}
                        w="100%"
                    >
                        Add New Note
                    </Button>
                    {notes.map((note) => (
                        <Box key={note.id} borderWidth="1px" borderRadius="lg" p={4} mb={4} bg="white" boxShadow="md">
                            <Heading size="md" mb={2}>{note.title}</Heading>
                            <Text mb={2}>{note.detail}</Text>
                            <Stack direction="row" mb={2}>
                                {note.tags.map((tag, index) => (
                                    <Badge key={index} colorScheme="green" mr={2}>{tag}</Badge>
                                ))}
                            </Stack>
                            <Divider mt={2} mb={2} />
                            <Stack direction="row" justify="flex-end">
                                <Button colorScheme="blue" size="sm" onClick={() => handleEditNote(note)}>Edit</Button>
                                <Button colorScheme="red" size="sm" ml={2}>Delete</Button>
                            </Stack>
                        </Box>
                    ))}
                </Flex>
                {/* Add New Note Modal */}
                <NoteModal
                    isOpen={isAddModalOpen}
                    onClose={onAddModalClose}
                    onSave={handleAddNote}
                    title=""
                    detail=""
                    tags={[]}
                />
                {/* Edit Note Modal */}
                {selectedNote && (
                    <NoteModal
                        isOpen={isEditModalOpen}
                        onClose={onEditModalClose}
                        onSave={handleSaveNote}
                        title={selectedNote.title}
                        detail={selectedNote.detail}
                        tags={selectedNote.tags}
                    />
                )}
            </Flex>
        </ChakraProvider>
    );
}

export default Dashboard;
