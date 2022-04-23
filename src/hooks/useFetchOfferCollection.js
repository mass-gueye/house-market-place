import { useState, useContext, useEffect } from "react";
import {
  // doc,
  getDocs,
  query,
  // startAfter,
  collection,
  where,
  limit,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase.config";
import AuthContext from "../context/AuthContext";

// this is a custom hook to fetch firebase collection
const useFetchOfferCollection = () => {
  const { notify } = useContext(AuthContext);
  const [documentCollections, setDocumentCollections] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        // Getting reference
        const listingsRef = await collection(db, "listings");

        // Create a query
        const q = await query(
          listingsRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(10)
        );

        // Execute query
        const querySnap = await getDocs(q);
        const collections = [];
        querySnap.forEach((doc) => {
          collections.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setDocumentCollections(collections);
        setLoading(false);
      } catch (error) {
        notify("Could not fetch collections right now", "error");
      }
    };

    fetchCollection();
  }, [notify]);

  return {
    loading,
    data: documentCollections,
  };
};

export default useFetchOfferCollection;
