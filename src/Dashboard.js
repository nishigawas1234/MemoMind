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
    AvatarBadge
} from '@chakra-ui/react';
import NoteModal from './components/NoteModel';
import { Link as RouterLink ,useNavigate} from 'react-router-dom';
import { Client, Databases ,ID , Account} from "appwrite";


function Dashboard() {
    const navigate = useNavigate();
    const [notes, setNotes] = useState();
    const [selectedNote, setSelectedNote] = useState(null);
    const [getUser , setUser] = useState()
    const { isOpen: isAddModalOpen, onOpen: onAddModalOpen, onClose: onAddModalClose } = useDisclosure();
    const { isOpen: isEditModalOpen, onOpen: onEditModalOpen, onClose: onEditModalClose } = useDisclosure();

    const client = new Client();
    const account = new Account(client);
    client
        .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
        .setProject('65c4c6ac2b9a06cef41b'); // Your project ID

    const databases = new Databases(client);

useEffect(()=>{
    const getUser = account.get()

    getUser.then(
        function(response){
       console.log(response,"get data")
       setUser(response)
        },
        function(error){
            console.log(error,"get data error")
        }
    )
},[])

    const getData = () => {
        let promise = databases.listDocuments(
            "65c4c8b653802bc0e25f",
            "65c4ca569bf871e35bbb"
        );

        promise.then(
            function (response) {
                setNotes(response);
                setSelectedNote(response.documents[0])
            },
            function (error) {
                console.log(error, "error");
            }
        );
    }

    useEffect(() => {
        getData()
        console.log(notes,"notes")
    }, []);

    const user = {
        profilePicture: 'https://bit.ly/dan-abramov',
    };

    const handleLogout = () => {
        let promise = account.deleteSession("current")
        promise.then(
            function (response) {
                if(response){
                    navigate('/');
                }
                
            },
            function (error) {
                console.log(error, "error");
            }
        );
    };

    const handleViewNote = (note) => {
        setSelectedNote(note);
    };

    const handleEditNote = (values) => {
        console.log(values,"valuesvaluesvalues")
        let promise = databases.updateDocument(
            "65c4c8b653802bc0e25f",
            "65c4ca569bf871e35bbb",
            values.id,
             { "Tag" :"tag", 
            }
         
          );
          promise.then(
            function (response) {
                if(response){
                    getData()
                    onEditModalClose()
                }
                
            },
            function (error) {
                console.log(error, "error");
            }
        );
        
        // setSelectedNote(note);
        // onEditModalOpen();
    };

    const handleAddNewNote = (values) => {
     let promise = databases.createDocument(
        "65c4c8b653802bc0e25f",
        "65c4ca569bf871e35bbb",
         ID.unique(),
         { "Tag" :values.tags, 
         "Note_title" : values.title , 
        "Note_detail" : values.detail}
     
      );

    promise.then(
        function (response) {
            if(response){
                getData()
                onAddModalClose()
               
            }
            
        },
        function (error) {
            console.log(error, "error");
        }
    );
    
    };

    const handleDeleteNote = (id) =>{ 
        console.log(id,"id----")
        let promise = databases.deleteDocument(
            "65c4c8b653802bc0e25f",
            "65c4ca569bf871e35bbb",
            id
          );

        promise.then(
            function (response) {
                if(response){
                    getData()
                }
            },
            function (error) {
                console.log(error, "error");
            }
        );
    }



    return (
        <ChakraProvider resetCSS >
            <Flex direction="column" alignItems="flex-end" bg="gray.100" minH="100vh">
                <Box p={4} bg="purple.600" color="white" w="100%" mb={4}>
                {getUser &&
                    <Flex justify="end" alignItems="center">
                        <Box textAlign="right" mr={4}>
                            <Heading size="md" fontWeight="semibold">{getUser ? getUser.name : "--"}</Heading>
                            <Button colorScheme="white" onClick={handleLogout} size="sm">Logout</Button>
                        </Box>
                        <Avatar
                            bg="#010002"
                            name={getUser.name}
                            color="contrast.200"
                        >
                            <AvatarBadge boxSize={4} bg="green.500" />
                        </Avatar>
                      
                    </Flex>
}
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
                                    {/* {note?.Tag.map((tag, index) => ( */}
                                        <Badge  colorScheme="green" mr={2}>{note.Tag}</Badge>
                                    {/* ))} */}
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
                                    {/* {selectedNote?.Tag.map((tag, index) => ( */}
                                        <Badge colorScheme="green" mr={2}>{selectedNote.Tag}</Badge>
                                    {/* ))} */}
                                </Stack>
                                <Divider mt={2} mb={2} />
                                <Stack direction="row" justify="flex-end">
                                    <Button colorScheme="blue" size="sm" onClick={onEditModalOpen}>Edit</Button>
                                    <Button colorScheme="red" size="sm" ml={2} onClick={()=>{handleDeleteNote(selectedNote.$id)}} >Delete</Button>
                                </Stack>
                            </Box>
                        )}
                    </Box>
                </Flex>
                {/* Add New Note Modal */}
                <NoteModal
                    isOpen={isAddModalOpen}
                    onClose={onAddModalClose}
                    onSave={(values)=>{
                        handleAddNewNote(values)
                    }} 
                  
                />
                {/* Edit Note Modal */}
                {selectedNote && (
                    <NoteModal
                        isOpen={isEditModalOpen}
                        onClose={onEditModalClose}
                        onSave={(values)=>{
                            handleEditNote(values)
                    }} 
                    data={selectedNote}
                    />
                )}
            </Flex>
        </ChakraProvider>
    );
}

export default Dashboard;
