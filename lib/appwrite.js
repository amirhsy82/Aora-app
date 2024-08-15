import 'react-native-url-polyfill/auto'
import { Avatars, Client, Databases, ID } from 'react-native-appwrite';
import { Account } from 'react-native-appwrite';


export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.jsm.aoraApp',
    projectId: '66bb26360030c2766ea7',
    databaseId: '66bb289e0024c1c1024a',
    userCollectionId: '66bb28d300370eb0739f',
    videoCollectionId: '66bb28ff00160c4fe0e2',
    storageId: '66bb2d2000039e439e32'
}


// Init React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // project ID
    .setPlatform(appwriteConfig.platform); // application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register User
export async function createUser(email, password, username) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        if(!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username);

        await signIn(email, password)
    
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email: email,
                username: username,
                avatar: avatarUrl
            }
        );

        return newUser
    } catch (error) {
         throw new Error(error)
    }
}

// Sign In
export async function signIn(email, password) {
    try {
        const session = await account.createEmailPasswordSession(email, password);

        return session;
    } catch (error) {
        throw new Error(error)
    }
}