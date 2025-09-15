import { Client, Databases, Query, ID } from 'appwrite'

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite Endpoint
    .setProject(PROJECT_ID) // Your project ID

const databases = new Databases(client)

// find trending movies
// searchterm and movie associated with it
// 1. use appwrite sdk to check if search exists in database
// 2. if exists, update count +1
// 3. if not, create new record with count = 1
export const updateSearchCount = async (searchTerm, movie) => {
    try{
        const results = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal('searchTerm', searchTerm)
        ])

        if (results.documents.length>0){
            const doc = results.documents[0];
            await databases.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
                count: doc.count + 1
            })
        } else {
            await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                searchTerm,
                movie_id: movie.id,
                count: 1,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            })
        }
    } catch(e) {
        console.log('Error updating search count: ', e);
    }
}