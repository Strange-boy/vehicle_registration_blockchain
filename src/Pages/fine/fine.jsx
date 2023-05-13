import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../Components/navbar/navbar";
import Loader from "../Components/loader/Loader";
import Footer from "../Components/footer/footer";

// auth page
import { useAuthState } from "react-firebase-hooks/auth";
import { appAuth } from "../../utils/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

//firestore related commands
import { db } from "../../utils/firebase";
import {
	collection,
	query,
	where,
	getDocs,
	doc,
	updateDoc,
} from "firebase/firestore";

const Fine = () => {
	const [vehicleId, setVehicleId] = useState("");
	const [violations, setViolations] = useState([
		{ violationStatement: "No Violations", amountCharged: 0 },
	]);
	const [currUser, loading] = useAuthState(appAuth);
	const govUid = "GHHYwlHErhdC84sKe3MmseCKqvv1";
	const routeLoginPage = "./login";

	const auth = getAuth();

	//in order to find the fine charged
	function showFineCharged() {
		//in order to check in the fire store whether the assosciated user exist or not
		const userRef = collection(db, "fineDetails");
		const userExist = query(userRef, where("vehicleId", "==", vehicleId));

		const userValidation = async () => {
			const querySnapshot = await getDocs(userExist);

			if (querySnapshot.size > 0) {
				querySnapshot.forEach((currdoc) => {
					// doc.data() is never undefined for query doc snapshots
					// console.log(currdoc.id, " => ", currdoc.data());
					// Step 3: Modify the array locally
					const fineDetails = currdoc.data().fineInfo || []; // If the array field is empty or doesn't exist yet
					setViolations(fineDetails);
					fineDetails.map((items) => {
						console.log("violation:", items.violationStatement);
						console.log("Amount charged:", items.amountCharged);
					});
				});
			} else {
				alert("No fine charged so far !!");
			}
		};

		//in order to check whether a document exists or not
		userValidation();
	}

	//to be shown during loading
	if (loading) return <Loader />;
	//to be show if the user doesn't logs in
	else if (!currUser || currUser.uid === govUid)
		window.location.pathname = routeLoginPage;
	//if the user logs in successfully
	else
		return (
			<div className="">
				<div className="">
					<Navbar />
				</div>
				<label htmlFor="" className="block text-xl mt-10 ml-10">
					Registration Number <span className="text-red-600">*</span>
				</label>
				<input
					className="mt-5 ml-10 rounded-md border border-slate-600 py-1 px-3 text-xl outline-none"
					type="text"
					onChange={(event) => {
						setVehicleId(event.target.value);
						setViolations([
							{ violationStatement: "No Violations", amountCharged: 0 },
						]);
						// setRequest(false);
					}}
				/>
				<button
					className="mt-5 ml-10 block h-10 w-40 rounded-md bg-slate-800 text-xl text-white"
					onClick={showFineCharged}
				>
					Fine Charged
				</button>
				<div className="m-10 rounded-sm border border-slate-200 p-10 shadow-md">
					<h3 className="pb-3 text-2xl">Fine Record</h3>
					<div>
						{violations.map((item) => (
							<div className="mb-5 rounded-md bg-slate-100 px-5 py-3">
								<span className="text-xl font-semibold">Violation : </span>
								<span className="text-xl">{item.violationStatement}</span>
								<br></br>
								<span className="text-xl font-semibold">Penalty : </span>
								<span className="font-medium text-red-500">
									{item.amountCharged}/-
								</span>
							</div>
						))}
					</div>
					{/* <div className="mb-5 rounded-md bg-slate-100 px-5 py-3">
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
					</div> */}
				</div>
				<div className="">
					<Footer />
				</div>
			</div>
		);
};

export default Fine;
