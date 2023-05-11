import React from "react";
import GovNavbar from "../gov_Component/govNavbar/govNavbar.jsx";
import GovFooter from "../gov_Component/govFooter/govFooter.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import Loader from "../../Components/loader/Loader.jsx";
import { useAuthState } from "react-firebase-hooks/auth";
import { appAuth, db } from "../../../utils/firebase.js";
// in order to fetch the data from firestore
import { collection, query, where, getDocs } from "firebase/firestore";

const GovIssueRc = () => {
  const loginRoute = "/login";
  const govUid = "GHHYwlHErhdC84sKe3MmseCKqvv1";
  const [currUser, loading] = useAuthState(appAuth);

  // const []
  //function to find the wallet id corresponding to the aadhar
  const findWalletWithAadhar = async () => {
    const q = query(
      collection(db, "users"),
      where("Aadhar", "==", "8745 8547 8745")
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data().Wallet_id);
    });
  };

  if (loading) {
    return <Loader />;
  } else if (currUser.uid !== govUid) {
    window.location.pathname = loginRoute;
  }

  return (
    <div className="">
      <div className="">
        <GovNavbar />
      </div>
      <div className="m-7 mx-10 rounded-md border border-slate-200 pt-20 pl-20 pb-40 pr-20 shadow-xl">
        <h1 className="text-2xl">Registration Certificate Issuance</h1>

        <label htmlFor="" className="mt-6 block text-xl">
          Registration Number
        </label>
        <input
          type="text"
          className="mt-2 h-10 w-64 rounded-md border border-slate-800 px-3"
        />

        <label htmlFor="" className="mt-6 block text-xl">
          Registration Date
        </label>
        <input
          type="date"
          className="mt-2 h-10 w-64 rounded-md border border-slate-800 px-3"
        />

        <label htmlFor="" className="mt-6 block text-xl">
          Registration Validity
        </label>
        <input
          type="date"
          className="mt-2 h-10 w-64 rounded-md border border-slate-800 px-3"
        />

        <label htmlFor="" className="mt-6 block text-xl">
          Owner Name
        </label>
        <input
          type="text"
          className="mt-2 h-10 w-64 rounded-md  border border-slate-800 px-3"
        />

        <label htmlFor="" className="mt-6 block text-xl">
          Engine Number
        </label>
        <input
          type="text"
          className="mt-2 h-10 w-64 rounded-md  border border-slate-800 px-3"
        />

        <label htmlFor="" className="mt-6 block text-xl">
          Chassis Number
        </label>
        <input
          type="text"
          className="mt-2 h-10 w-64 rounded-md  border border-slate-800 px-3"
        />

        <label htmlFor="" className="mt-6 block text-xl">
          Fuel Used
        </label>
        <input
          type="text"
          className="mt-2 h-10 w-64 rounded-md  border border-slate-800 px-3"
        />

        <label htmlFor="" className="mt-6 block text-xl">
          Month and Year of Manufacturing
        </label>
        <input
          type="text"
          className="mt-2 h-10 w-64 rounded-md  border border-slate-800 px-3"
        />

        <label htmlFor="" className="mt-6 block text-xl">
          Model Name
        </label>
        <input
          type="text"
          className="mt-2 h-10 w-64 rounded-md  border border-slate-800 px-3"
        />

        <label htmlFor="" className="mt-6 block text-xl">
          Maker’s name
        </label>
        <input
          type="text"
          className="mt-2 h-10 w-64 rounded-md  border border-slate-800 px-3"
        />

        <label htmlFor="" className="mt-6 block text-xl">
          Seating Capacity
        </label>
        <input
          type="number"
          className="mt-2 h-10 w-64 rounded-md  border border-slate-800 px-3"
        />

        <label htmlFor="" className="mt-6 block text-xl">
          Cubic Capacity
        </label>
        <input
          type="text"
          className="mt-2 h-10 w-64 rounded-md  border border-slate-800 px-3"
        />

        <label htmlFor="" className="mt-6 block text-xl">
          Color
        </label>
        <input
          type="text"
          className="mt-2 h-10 w-64 rounded-md  border border-slate-800 px-3"
        />

        <label htmlFor="" className="mt-6 block text-xl">
          Body Type
        </label>
        <input
          type="text"
          className="mt-2 h-10 w-64 rounded-md  border border-slate-800 px-3"
        />

        <label htmlFor="" className="mt-6 block text-xl">
          Vehicle’s class
        </label>
        <input
          type="text"
          className="mt-2 h-10 w-64 rounded-md  border border-slate-800 px-3"
        />
        <button
          onClick={findWalletWithAadhar}
          className="float-right mt-20 block h-10 w-40 rounded-md bg-slate-800 text-xl text-white"
        >
          Issue RC
          <FontAwesomeIcon icon={faArrowRight} className="px-3" />
        </button>
      </div>
      <div className="">
        <GovFooter />
      </div>
    </div>
  );
};

export default GovIssueRc;
