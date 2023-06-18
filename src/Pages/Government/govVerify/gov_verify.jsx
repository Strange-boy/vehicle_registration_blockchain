import React, { useRef } from "react";
import Loader from "../../Components/loader/Loader.jsx";
import GovNavbar from "../gov_Component/govNavbar/govNavbar.jsx";
import GovFooter from "../gov_Component/govFooter/govFooter.jsx";
import { Link } from "react-router-dom";
const GovVerify = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="">
                <GovNavbar />
            </div>
            <div className="flex-grow ">
                <div className="p-20">
                    <h1 className="pb-10 text-2xl text-black font-semibold">Verify Documents</h1>
                    <div className="bg-slate-100 h-20 flex items-center rounded">
                        <div className="flex">
                            <strong className="pl-14 text-xl">Owner</strong>
                            <p className="pl-2 text-xl">David</p>
                        </div>
                        <div className="flex">
                            <strong className="pl-14 text-xl">Vehicle ID</strong>
                            <p className="pl-2 text-xl">KL-12-AB-2020</p>
                        </div>
                        <div className="flex">
                            <strong className="pl-14 text-xl">Buyer</strong>
                            <p className="pl-2 text-xl">Joel</p>
                        </div>
                        <div className="flex ml-auto px-10 ">
                            <Link to="/govBlacklist">
                                <button className="text-xl px-10 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Verify</button>

                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-auto">
                <GovFooter />
            </div>
        </div>

    );
};

export default GovVerify;