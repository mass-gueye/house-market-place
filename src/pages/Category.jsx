import { useParams } from "react-router-dom";
import useFetchCollection from "../hooks/useFetchCollection";
// import {deleteDoc, doc} from "firebase/firestore"
// import AuthContext from "../context/AuthContext"
import Spinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";
// import { db } from "../firebase.config";

export default function Category() {
  // const {notify} = useContext(AuthContext)
  const params = useParams();
  const { loading, data: listings } = useFetchCollection(params.categoryName);

  if (loading) {
    return <Spinner />;
  }
  // const onDelete = async () => {
  //   const docRef = await doc(db, "listings", listing);
  // };
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
              {listings.map((listing, index) => (
                <ListingItem
                  key={index}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>
          </main>
        </>
      ) : (
        <p>No listings for {params.categoryName}</p>
      )}
    </div>
  );
}
