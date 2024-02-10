import React, { useState, useEffect } from 'react';
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
import { Client, Databases } from "appwrite";

function Dashboard() {
    const [notes, setNotes] = useState();
    const [selectedNote, setSelectedNote] = useState(null);
    const { isOpen: isAddModalOpen, onOpen: onAddModalOpen, onClose: onAddModalClose } = useDisclosure();
    const { isOpen: isEditModalOpen, onOpen: onEditModalOpen, onClose: onEditModalClose } = useDisclosure();

    const client = new Client();

    client
        .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
        .setProject('65c4c6ac2b9a06cef41b'); // Your project ID

    const databases = new Databases(client);

    useEffect(() => {
        let promise = databases.listDocuments(
            "65c4c8b653802bc0e25f",
            "65c4ca569bf871e35bbb"
        );

        promise.then(
            function (response) {
                console.log(response, "--------------------");
                setNotes(response);
            },
            function (error) {
                console.log(error, "error");
            }
        );
    }, []);

    const user = {
        name: 'John Doe',
        profilePicture: 'https://bit.ly/dan-abramov',
    };

    const handleLogout = () => {
        console.log('Logged out');
    };

    const handleViewNote = (note) => {
        setSelectedNote(note);
    };

    const handleEditNote = (note) => {
        setSelectedNote(note);
        onEditModalOpen();
    };

    const addNewNote = () => {
     console.log("....")
    };


    return (
        <ChakraProvider resetCSS >
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
                <Flex mt={4} w="98%" m={4}>
                    {/* Left side: List of all notes */}
                    <Box  pr={4} w="40%">
                        <Button
                            colorScheme="purple"
                            onClick={onAddModalOpen}
                            mb={4}
                            w="100%"
                        >
                            Add New Note
                        </Button>
                        {notes && notes?.documents?.map((note) => (
                            <Box
                                key={note.id}
                                borderWidth="1px"
                                borderRadius="lg"
                                p={4}
                                mb={4}
                                bg="white"
                                boxShadow="md"
                                cursor="pointer"
                                onClick={() => handleViewNote(note)} // Handle click to view note details
                            > 
                                <Heading size="md" textAlign="start" mb={2}>{note.Note_title}</Heading>
                                <Text mb={2} textAlign="start">{note.Note_detail}</Text>
                                <Stack direction="row" mb={2}>
                                    {note?.Tag.map((tag, index) => (
                                        <Badge key={index} colorScheme="green" mr={2}>{tag}</Badge>
                                    ))}
                                </Stack>
                            </Box>
                        ))}
                    </Box>
                    {/* Right side: Display details of the clicked note */}
                    <Box  pl={4} w="58%">
                        {selectedNote && (
                            <Box p={4} mb={4}>
                                <Heading size="md" textAlign="start" mb={2}>{selectedNote.Note_title}</Heading>
                                <Text textAlign="start" mb={4}>{selectedNote.Note_detail}</Text>
                                <Stack direction="row" mb={2}>
                                    {selectedNote?.Tag.map((tag, index) => (
                                        <Badge key={index} colorScheme="green" mr={2}>{tag}</Badge>
                                    ))}
                                </Stack>
                                <Divider mt={2} mb={2} />
                                <Stack direction="row" justify="flex-end">
                                    <Button colorScheme="blue" size="sm" onClick={onEditModalOpen}>Edit</Button>
                                    <Button colorScheme="red" size="sm" ml={2}>Delete</Button>
                                </Stack>
                            </Box>
                        )}
                    </Box>
                </Flex>
                {/* Add New Note Modal */}
                <NoteModal
                    isOpen={isAddModalOpen}
                    onClose={onAddModalClose}
                    onSave={addNewNote} // Placeholder function
                    title=""
                    detail=""
                    tags={[]}
                />
                {/* Edit Note Modal */}
                {selectedNote && (
                    <NoteModal
                        isOpen={isEditModalOpen}
                        onClose={onEditModalClose}
                        onSave={() => {}} // Placeholder function
                        title={selectedNote.Note_title} // Use selectedNote.Note_title instead of selectedNote.title
                        detail={selectedNote.Note_detail} // Use selectedNote.Note_detail instead of selectedNote.detail
                        tags={selectedNote.Tag} // Use selectedNote.Tag instead of selectedNote.tags
                    />
                )}
            </Flex>
        </ChakraProvider>
    );
}

export default Dashboard;
