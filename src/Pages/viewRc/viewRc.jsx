import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign, faPrint } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../Components/navbar/navbar";
import Loader from "../Components/loader/Loader";
import Footer from "../Components/footer/footer";
import RcBook from "../Components/rcBook/rcBook";
// // import ReactToPdf from 'react-to-pdf';
// import ReactToPdf from 'react-to-pdf';
import { useReactToPrint } from "react-to-print";
import ReactToPrint from "react-to-print";

/* Auth related imports*/
import { useAuthState } from "react-firebase-hooks/auth";
import { appAuth } from "../../utils/firebase";

const ViewRc = () => {
  const ref = useRef();
  const handlePrint = useReactToPrint({
    content: () => ref.current,
    documentTitle: "RC Book",
    onafterprint: () => alert("Print success"),
  });
  /*auth functionality in order to mantain the state of the user*/
  const [user, loading] = useAuthState(appAuth);
  const routeLoginPage = "./login";
  const govUid = "GHHYwlHErhdC84sKe3MmseCKqvv1";

  //to be shown during loading
  if (loading) return <Loader />;
  //to be show if the user doesn't logs in
  else if (!user || user.uid === govUid)
    window.location.pathname = routeLoginPage;
  //if the user logs in successfully
  else
    return (
      <div className="">
        <div className="">
          <Navbar />
        </div>
        <div className="mt-5 items-center p-10 md:flex">
          <h1 className="text-2xl">Registration Certificate</h1>

          <button
            onClick={handlePrint}
            className="my-5 flex h-10 w-24 items-center justify-center rounded-md border border-slate-400 bg-white sm:my-0 md:absolute md:right-10"
          >
            <FontAwesomeIcon icon={faPrint} className="px-3" />
            <p className="pr-3 text-xl">Print</p>
          </button>
        </div>

        <div className="" ref={ref}>
          <RcBook />
        </div>

        <div className="">
          <Footer />
        </div>
      </div>
    );
};
export default ViewRc;
