import { Link } from "react-router-dom";
import { ReactComponent as DeleteIcon } from "../assets/svg/deleteIcon.svg";
import bedIcon from "../assets/svg/bedIcon.svg";
import baththubIcon from "../assets/svg/bathtubIcon.svg";
// import { deleteDoc, doc } from "firebase/firestore";
// import { db } from "../firebase.config";

export default function ListingItem({ listing, id, onDelete }) {
//   const onDelete = async (id) => {
//     const docRef = await doc(db, "listings", id);
//     console.log(docRef);
//   };
  return (
    <>
      <li className="categoryListing">
        <Link
          to={`/category/${listing.type}/${id}`}
          className="categoryListingLink"
        >
          <img
            src={listing.imageUrls[0]}
            className="categoryListingImg"
            alt={listing.name}
          />
          <div className="categoryListingDetails">
            <p className="categoryListingLocation">{listing.location}</p>
            <p className="categoryListingName">{listing.name}</p>
            <p className="categoryListingPrice">
              $
              {listing.offer
                ? listing.discountPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : listing.regularPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              {listing.type === "rent" && " / Month"}
            </p>
            <div className="categoryListingInfoDiv">
              <img src={bedIcon} alt="Bed" />
              <p className="categoryListingInfoText">
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} Bedrooms`
                  : "1 Bedroom"}
              </p>
              <img src={baththubIcon} alt="bath" />
              <p className="categoryListingInfoText">
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} Bathrooms`
                  : "1 Bathroom"}
              </p>
            </div>
          </div>
        </Link>
        {onDelete && (
          <DeleteIcon
            className="removeIcon"
            fill="rgb(231,76,60)"
            onClick={() => onDelete(id)}
          />
        )}
      </li>
    </>
  );
}
