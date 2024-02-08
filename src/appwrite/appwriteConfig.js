import { Client, Databases } from "appwrite";

const client = new Client();

const databases = new Databases(client);

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('65c4c6ac2b9a06cef41b') // Your project ID
;

const promise = databases.listDocuments(client, "65c4c8b653802bc0e25f");

promise.then(function (response) {
    console.log(response); // Success
}, function (error) {
    console.log(error); // Failure
});

