import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../Components/navbar/navbar";
import Loader from "../Components/loader/Loader";
import Footer from "../Components/footer/footer";
const Fine = () => {
  return (
    <div className="">
      <div className="">
        <Navbar />
      </div>
      <div className="m-10 rounded-sm border border-slate-200 p-10 shadow-md">
        <h3 className="pb-3 text-2xl">Fine Record</h3>
        <div className="mb-5 rounded-md bg-slate-100 px-5 py-3">
          <span className="text-xl font-semibold">Violation : </span>
          <span className="text-xl">Driving Without Helmet</span>
          <br></br>
          <span className="text-xl font-semibold">Penalty : </span>
          <span className="font-medium text-red-500">1000/-</span>
        </div>
        <div className="mb-5 rounded-md bg-slate-100 px-5 py-3">
          <span className="text-xl font-semibold">Violation: </span>
          <span className="text-xl">Triple Riding on Two-wheeler</span>
          <br></br>
          <span className="text-xl font-semibold">Penalty :</span>
          <span className="font-medium text-red-500">1000/-</span>
        </div>
        <div className="mb-5 rounded-md bg-slate-100 px-5 py-3">
          <span className="text-xl font-semibold">Violation: </span>
          <span className="text-xl">Over-speeding Penalty :</span>
          <br></br>
          <span className="text-xl font-semibold">Penalty :</span>
          <span className="font-medium text-red-500">1000/-</span>
        </div>
        <div className="mb-5 rounded-md bg-slate-100 px-5 py-3">
          <span className="text-xl font-semibold">Violation: </span>
          <span className="text-xl">Driving Without a Seatbelt</span>
          <br></br>
          <span className="text-xl font-semibold">Penalty :</span>
          <span className="font-medium text-red-500">1000/-</span>
        </div>
        <div className="mb-5 rounded-md bg-slate-100 px-5 py-3">
          <span className="text-xl font-semibold">Violation: </span>
          <span className="text-xl">Using a Mobile Phone While Driving</span>
          <br></br>
          <span className="text-xl font-semibold">Penalty :</span>
          <span className="font-medium text-red-500">5000/-</span>
        </div>
      </div>
      <div className="">
        <Footer />
      </div>
    </div>
  );
};

export default Fine;
