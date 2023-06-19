import React from "react";
import GovNavbar from "../gov_Component/govNavbar/govNavbar.jsx";
import GovFooter from "../gov_Component/govFooter/govFooter.jsx";

const GovBlacklist = () => {
    const [verify, setVerify] = React.useState("");//state to store the verification result
    //function to handle verification
    const handleverify = () => {
        const vehicleid = document.getElementById('vehicleid').value;
        if(vehicleid === 'KL-12-AB-2020'){
            setVerify('Vehicle with given id is existing');
            document.getElementById('verify-alert').style.color = 'green';
        }
        else{
            setVerify('Vehicle with given id is not existing');
            document.getElementById('verify-alert').style.color = 'red';
        }
    }
     //function to handle blacklisting
    const handleblacklist = () => {
        if(verify === 'Vehicle with given id is existing'){
            alert('RC book is updated successfully');
            document.getElementById('vehicleid').value = "";
            setVerify("");
        }
        else{
            alert('Please verify the vehicle id first');
        }
    }

    return (
        <div>
            <GovNavbar />
            <div className="m-7 mx-10 rounded-md border border-slate-200 p-20 shadow-xl min-h-screen">
                <label htmlFor="" className="mt-5 block text-xl">
                    Vehicle ID <span className="text-red-600">*</span>
                </label>
                <input
                    className="mt-2 rounded-md border border-slate-600 py-1 px-3 text-xl outline-none"
                    type="text"
                    id='vehicleid'
                    placeholder="KL-12-AB-2020"
                />
                <button
                    className="mt-5 block h-10 w-40 rounded-md bg-slate-800 text-xl text-white" onClick={handleverify}
                >
                    Verify
                </button> <p id='verify-alert' className='text-xl'>{verify}</p>
                <br />
                <div>
                    <label htmlFor="" className=" mt-5 text-xl">
                        Is Blacklisted? <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="radio"
                        id="no"
                        className="ml-10"
                        name="blackListed"
                        value="No"
                    />
                    <label htmlFor="no" className="p-3 text-xl">
                        No
                    </label>
                    <input
                        type="radio"
                        id="yes"
                        className="ml-10"
                        name="blackListed"
                        value="Yes"
                    />
                    <label htmlFor="yes" className="p-3 text-xl">
                        Yes
                    </label>
                    <br />
                    <button className='mt-11 rounded-md bg-slate-800 text-xl text-white p-2 px-11' onClick={handleblacklist}>
                        Submit 
                    </button>
                </div>
                <br />
            </div>
            <GovFooter/>
        </div>
    );
}
export default GovBlacklist;
