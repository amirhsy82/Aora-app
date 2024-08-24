import 'react-native-url-polyfill/auto'
import { Avatars, Client, Databases, ID, Query, Storage } from 'react-native-appwrite';
import { Account } from 'react-native-appwrite';


export const Config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.app.aora',
    projectId: '66c0704c000e9c6fc00d',
    databaseId: '66c071b10015d6f7fcf7',
    userCollectionId: '66c071da00237ae15b27',
    videoCollectionId: '66c072040008133fa3e3',
    storageId: '66c0747e0020e8f6d77f'
}


// Init React Native SDK
const client = new Client();

client
  .setEndpoint(Config.endpoint)
  .setProject(Config.projectId)
  .setPlatform(Config.platform);

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register user
export async function createUser(email, password, username) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    // Create New Document in the user collection
    const newUser = await databases.createDocument(
      Config.databaseId,
      Config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    throw new Error(error);
  }
}

// Sign In
export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Current User
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      Config.databaseId,
      Config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const getAllPosts = async () => {
  try{
    const posts = await databases.listDocuments(
      Config.databaseId,
      Config.videoCollectionId
    )

    return  posts.documents
    
  } catch (error) {
    throw new Error(error)
  }
}


export const getLatestPosts = async () => {
  try{
    const posts = await databases.listDocuments(
      Config.databaseId,
      Config.videoCollectionId,
      [Query.orderDesc('$createdAt', Query.limit(7))]
    )

    return  posts.documents
    
  } catch (error) {
    throw new Error(error)
  }
}

export const searchPosts = async (query) => {
  try{
    const posts = await databases.listDocuments(
      Config.databaseId,
      Config.videoCollectionId,
      [Query.search('title', query)]
    )

    return  posts.documents
    
  } catch (error) {
    throw new Error(error)
  }
}

export const getUserPosts = async (userId) => {
  try{
    const posts = await databases.listDocuments(
      Config.databaseId,
      Config.videoCollectionId,
      [Query.equal('creator', userId)]
    )

    return  posts.documents
    
  } catch (error) {
    throw new Error(error)
  }
}

export const signOut = async() => {
  try {
    const session = await account.deleteSession('current')
  } catch (error) {
    throw new Error(error)
  }
}