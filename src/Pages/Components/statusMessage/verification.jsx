import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFingerprint } from "@fortawesome/free-solid-svg-icons";

const Verification = () => {
  return (
    <div className="mx-7 mt-7 flex items-center rounded-md bg-slate-100 p-5 text-xl">
      <FontAwesomeIcon icon={faFingerprint} className="px-3" />
      <p className="">
        Title change: document verification required!{" "}
        <a href="/confirmation" className="text-blue-600">
          Go
        </a>
        .
      </p>
      <div className="mx-3 block rounded-xl border border-red-700 bg-red-100 px-5">
        <p className="">Important</p>
      </div>
    </div>
  );
};
export default Verification;
