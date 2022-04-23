// import React,{useState,useContext} from 'react'
import { useParams } from "react-router-dom";
import useFetchCollection from "../hooks/useFetchCollection";
// import {
//     doc,
//     getDocs,
//     query,
//     startAfter,
//     collection,
//     where,
//     limit,
//     orderBy
// } from "firebase/firestore"
// import {db} from "../firebase.config"
// import AuthContext from "../context/AuthContext"
import Spinner from "../components/Spinner";

export default function Category() {
  // const {notify} = useContext(AuthContext)
  const params = useParams();
  // const [listings, setListings] = useState(null)
  // [loading, setLoading] = useState(true)
  const { loading, data: listings } = useFetchCollection(params.categoryName);

  if (loading) {
    return <Spinner />;
  }

  if (listings.length > 0) {
    console.log(listings);
  } else {
    console.log("not document of this criteria");
  }
  console.log(params.categoryName, typeof params.categoryName);
  return (
    <div className="category">
      <header>
        <p className="pageHeader">
          {params.categoryName === "rent"
            ? "Places for rent"
            : "Places for sale"}
        </p>
      </header>
      {listings && listings.length > 0 ? (
              <>
                  <main>
                      <ul className="categoryListing">
                          {/* {listings.map((listing, index) => (<ListingItem />))} */}
                      </ul>
              </main>
              </>
      ) : (
        <p>No listings for {params.categoryName}</p>
      )}
    </div>
  );
}
