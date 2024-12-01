import { CollectionDTO } from "@repo/schemas";
import { client } from "../lib/prismaClient";


export class CollectionService {


    async getCollections(): Promise<CollectionDTO[]>{
        const collectionsId = await client.collection.findMany({
            select: {
                id: true,
                name: true,
                description: true
            }
        });

        return collectionsId.map(collection => {
            return { id: collection.id, name : collection.name, description: collection.description }
        });
    }
}