import { useParams } from "react-router-dom";
// import {deleteDoc, doc} from "firebase/firestore"
// import AuthContext from "../context/AuthContext"
import Spinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";
import useFetchOfferCollection from "../hooks/useFetchOfferCollection";
// import { db } from "../firebase.config";

export default function Offers() {
  // const {notify} = useContext(AuthContext)
  const params = useParams();
  const { loading, data: listings } = useFetchOfferCollection();

  if (loading) {
    return <Spinner />;
  }
  // const onDelete = async () => {
  //   const docRef = await doc(db, "listings", listing);
  // };
  return (
    <div className="category">
      <header>
        <p className="pageHeader">Offers</p>
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
        <p>There are no current offers</p>
      )}
    </div>
  );
}
