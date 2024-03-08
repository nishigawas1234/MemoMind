import React from 'react';
import { Formik, Form, Field } from 'formik';
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
    cookieStorageManager,
} from '@chakra-ui/react';

function NoteModal({ isOpen, onClose, onSave, title, detail, tags ,data}) {
  
 
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <Formik
                initialValues={{
                    title: data ? data.Note_title : '',
                    detail:data? data.Note_detail : '',
                    tags: data ? data.Tag : '',
                    id : data ? data.$id : 0
                }}
                onSubmit={(values) => {
                    onSave(values);
                    
                }}
            >
                <Form>
                    <ModalContent>
                        <ModalHeader>Add Note</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Field name="title">
                                {({ field }) => (
                                    <FormControl>
                                        <Input {...field} placeholder="Note Title" mb={4} />
                                    </FormControl>
                                )}
                            </Field>
                            <Field name="detail">
                                {({ field }) => (
                                    <FormControl>
                                        <Input {...field} placeholder="Note Detail" mb={4} />
                                    </FormControl>
                                )}
                            </Field>
                            <Field name="tags">
                                {({ field }) => (
                                    <FormControl>
                                        <Input {...field} placeholder="Tags" />
                                    </FormControl>
                                )}
                            </Field>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="purple" type="submit">Save</Button>
                            <Button variant="ghost" onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Form>
            </Formik>
        </Modal>
    );
}

export default NoteModal;
