import { CollectionDTO } from '@repo/schemas';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

const apiUrl = import.meta.env.VITE_API_URL;



function Collections() {
    const [collections, setCollections] = useState<CollectionDTO[]>([]);
    const location = useLocation();
    const navigate = useNavigate();
  
    const queryParams = new URLSearchParams(location.search);
    const selectedCollectionId = queryParams.get('collectionId');
  
    useEffect(() => {
      async function getCollections() {
        try {
          const response = await axios.get(`${apiUrl}/collections`);
          setCollections(response.data);
        } catch (error) {
          console.error('Error fetching collections', error);
        }
      }
  
      getCollections();
    }, []);
  
    const updateQueryParam = (collectionId: number | null) => {
      const updatedParams = new URLSearchParams(queryParams);
      if(collectionId){
        updatedParams.set('collectionId', String(collectionId));
      }else{
        updatedParams.delete('collectionId');
      }
      

      navigate(`?${updatedParams.toString()}`, { replace: true });
    };
  
    return (
      <div className="text-gray-200 py-6 px-5">
        <h1 className="font-semibold mb-3">Collections</h1>
        <ul>
          <li key={"default"} className="text-[0.85rem] pb-1">
              <button
                onClick={() => updateQueryParam(null)}
                className={`hover:text-gray-400 ${
                  selectedCollectionId === null ? 'text-blue-500 font-bold' : ''
                }`}
              >
                All
              </button>
            </li>
          {collections.map((collection) => (
            <li key={collection.id} className="text-[0.85rem] pb-1">
              <button
                onClick={() => updateQueryParam(collection.id)}
                className={`hover:text-gray-400 ${
                  selectedCollectionId === String(collection.id) ? 'text-blue-500 font-bold' : ''
                }`}
              >
                {collection.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default Collections;