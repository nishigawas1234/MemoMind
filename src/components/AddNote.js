import React, { useState } from 'react';
import { ChakraProvider, Box, FormControl, FormLabel, Input, Textarea, Button, Heading, Tag, TagLabel, TagCloseButton } from '@chakra-ui/react';


export default function AddNote() {
  return (
    <ChakraProvider>
    <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg" margin="auto" mt={20}>
        <Box textAlign="center">
            <Heading>Add Note</Heading>
        </Box>
        <Box my={4}>
            <form onSubmit={handleSubmit}>
                <FormControl>
                    <FormLabel>Note Title</FormLabel>
                    <Input
                        type="text"
                        placeholder="Enter note title"
                        value={noteTitle}
                        onChange={(e) => setNoteTitle(e.target.value)}
                    />
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel>Note Tags</FormLabel>
                    <Input
                        type="text"
                        placeholder="Enter tags"
                        value={noteTitle}
                        onChange={(e) => setNoteTitle(e.target.value)}
                    />
                    <Button ml={2} onClick={handleAddTag} colorScheme="blue">
                        Add Tag
                    </Button>
                    <Box mt={2}>
                        {noteTags.map((tag, index) => (
                            <Tag key={index} mr={2} mb={2} size="md" variant="subtle" colorScheme="blue">
                                <TagLabel>{tag}</TagLabel>
                                <TagCloseButton onClick={() => handleRemoveTag(tag)} />
                            </Tag>
                        ))}
                    </Box>
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel>Note Detail</FormLabel>
                    <Textarea
                        placeholder="Enter note detail"
                        value={noteDetail}
                        onChange={(e) => setNoteDetail(e.target.value)}
                    />
                </FormControl>
                <Button width="full" mt={4} colorScheme="blue" type="submit">
                    Add Note
                </Button>
            </form>
        </Box>
    </Box>
</ChakraProvider>)
}
