import React from "react";
import { useState, useEffect } from "react";
import GovNavbar from "../gov_Component/govNavbar/govNavbar.jsx";
import GovFooter from "../gov_Component/govFooter/govFooter.jsx";
import RcBook from "../../Components/rcBook/rcBook.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

/*auth code */
import Loader from "../../Components/loader/Loader.jsx";
import { useAuthState } from "react-firebase-hooks/auth";
import { appAuth } from "../../../utils/firebase.js";

//firestore related commands
import { db } from "../../../utils/firebase.js";
import {
	collection,
	query,
	where,
	getDocs,
	doc,
	updateDoc,
} from "firebase/firestore";

//firebase storage related commands
import { getStorage, ref } from "firebase/storage";
import { listAll, getDownloadURL } from "firebase/storage";

const GovConfirmation = () => {
	const storage = getStorage();
	const loginRoute = "/login";
	const govWelcome = "./govWelcome";
	const govUid = "GHHYwlHErhdC84sKe3MmseCKqvv1";
	const [currUser, loading] = useAuthState(appAuth);
	const [vehicleVerified, setVehicleVerified] = useState(false);
	const [vehicleId, setVehicleId] = useState("NULL");
	// const [currStatus, setStatus] = useState("PENDING");
	const [ownerId, setOwnerId] = useState("");
	const [legitDocuments, setLegitDocuments] = useState(false);
	const [acceptTerms, setAcceptTerms] = useState(false);

	//in order to handle the vehicle verfication
	function handleVerfication() {
		if (vehicleId === "NULL") {
			alert("Please enter the vehicle Id");
			return;
		}

		// console.log(vehicleId);

		//now we have to fetch all the details related to the vehicle id
		const requestDetails = query(
			collection(db, "confirmationDetails"),
			where("vehicleId", "==", vehicleId)
		);

		async function getConfirmationDetails() {
			const querySnapshot = await getDocs(requestDetails);
			
			if (querySnapshot.size > 0) {
				querySnapshot.forEach((doc) => {
					// doc.data() is never undefined for query doc snapshots
					// console.log(doc.data());
					setOwnerId(doc.data().sellerId);
				});
				setVehicleVerified(true);
				alert("Vehicle has been verified");
			} else {
				alert("The Vehicle has not submitted title changing request");
			}
		}
		// in order to update these changes to profile
		getConfirmationDetails();
	}

	//in order to download all the documents that the seller has submitted
	function downloadDocuments() {
		if (vehicleVerified == false) {
			alert("Please verify the vehicle Id");
			return;
		}

		const docRef = ref(storage, `${vehicleId}`);
		console.log("Download started!!");
		// console.log(vehicleId);

		listAll(docRef)
			.then((result) => {
				const promises = result.items.map((item) => {
					return getDownloadURL(item)
						.then((url) => {
							const xhr = new XMLHttpRequest();
							xhr.responseType = "blob";
							xhr.onload = (event) => {
								const blob = xhr.response;
								const a = document.createElement("a");
								const url = URL.createObjectURL(blob);
								a.href = url;
								a.download = `${item.name}`; // replace with the desired filename
								document.body.appendChild(a);
								a.click();
								URL.revokeObjectURL(url);
							};
							xhr.open("GET", url);
							xhr.send();
						})
						.catch((error) => {
							console.log(
								`An error occurred while downloading ${item.name}: `,
								error
							);
						});
				});

				Promise.all(promises)
					.then(() => {
						console.log("All files have been downloaded successfully.");
					})
					.catch((error) => {
						console.log("An error occurred while downloading files: ", error);
					});
			})
			.catch((error) => {
				console.log(
					`An error occurred while listing files in images}: `,
					error
				);
			});
	}

	//in order to handle the checkbox
	function handleDocChange(event) {
		setLegitDocuments(event.target.checked);
	}

	//in order to handle the approval
	function handleApprovalChange(event) {
		setAcceptTerms(event.target.checked);
	}

	//in order to accept the users request for title changing
	function accept() {
		//first we need to vehicle id
		if (vehicleVerified == false) {
			alert("Please verify the vehicle Id");
			return;
		}

		if (!acceptTerms || !legitDocuments) {
			alert("Please accept the conditions before accepting");
			return;
		}

		alert("Once accepted, you cannot make any further changes.");

		//now we have to fetch all the details related to the vehicle id
		const requestDetails = query(
			collection(db, "confirmationDetails"),
			where("vehicleId", "==", vehicleId)
		);

		// console.log(vehicleId);

		async function updateChangesToConfirmationDetails() {
			const querySnapshot = await getDocs(requestDetails);
			querySnapshot.forEach((currdoc) => {
				// doc.data() is never undefined for query doc snapshots
				// console.log(currdoc.id, " => ", currdoc.data());

				const docRef = doc(db, "confirmationDetails", querySnapshot.docs[0].id);
				updateDoc(docRef, {
					confFromGov: "ACCEPTED",
				})
					.then(() => {
						alert("Title change request has been forwarded to the buyer");
						// window.location.pathname = statusPage;
					})
					.catch((error) => {
						console.log(error);
					});
			});
		}
		// in order to update these changes to profile
		updateChangesToConfirmationDetails();
	}

	//in order to reject the request for title changing
	function reject() {
		//first we need to  verify the vehicle id
		if (vehicleVerified == false) {
			alert("Please verify the vehicle Id");
			return;
		}

		alert("Are you sure that you want to reject the application ?");

		//now we have to fetch all the details related to the vehicle id
		const requestDetails = query(
			collection(db, "confirmationDetails"),
			where("vehicleId", "==", vehicleId)
		);

		console.log(vehicleId);

		async function updateChangesToConfirmationDetails() {
			const querySnapshot = await getDocs(requestDetails);
			querySnapshot.forEach((currdoc) => {
				// doc.data() is never undefined for query doc snapshots
				// console.log(currdoc.id, " => ", currdoc.data());
				const docRef = doc(db, "confirmationDetails", querySnapshot.docs[0].id);
				updateDoc(docRef, {
					confFromGov: "REJECTED",
				})
					.then(() => {
						alert("Title change request has been rejected");
					})
					.catch((error) => {
						console.log(error);
					});
			});
		}
		// in order to update these changes to profile
		updateChangesToConfirmationDetails();
	}

	if (loading) {
		return <Loader />;
	} else if (currUser.uid !== govUid) {
		window.location.pathname = loginRoute;
	} else {
		return (
			<div className="">
				{/* Import the navbar component */}
				<div className="mb-5 ">
					<GovNavbar />
				</div>
				<div className="m-7 mx-10 rounded-md border border-slate-200 p-20 shadow-xl">
					<h1 className="ml-7 mb-2 text-2xl">Title Change Application</h1>
					<p className="ml-7 text-xl">
						Fields marked&nbsp;"<strong className="text-red-600">*</strong>
						"&nbsp;are required
					</p>
					<hr class=" mt-4  bg-gray-800" />

					<div className="ml-7 p-5 ">
						<label htmlFor="" className="block text-xl">
							Registration Number <span className="text-red-600">*</span>
						</label>
						<input
							className="mt-2 rounded-md border border-slate-600 py-1 px-3 text-xl outline-none"
							type="text"
							onChange={(event) => {
								setVehicleId(event.target.value);
								setVehicleVerified(false);
							}}
						/>
						<button
							className="mt-5 block h-10 w-40 rounded-md bg-slate-800 text-xl text-white"
							onClick={handleVerfication}
						>
							Verify Vehicle Id
						</button>
						<label htmlFor="" className="mt-5 block text-xl">
							Owner's Username <span className="text-red-600">*</span>
						</label>
						<input
							className="mt-2 rounded-md border border-slate-600 py-1 px-3 text-xl outline-none"
							type="text"
							value={ownerId}
							readOnly
						/>
						<div className="mt-5">
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
							<p className="mt-6 text-xl">
								Given below is the current registration certificate :{" "}
							</p>
							<RcBook />
							<p className="ml-7 text-xl font-black">
								Download and verify the documents
							</p>
							<p className="ml-7 mt-4 text-xl">Residence Proof </p>
							<p className="ml-7 mt-4 text-xl">
								Valid Certificate of Insurance{" "}
							</p>
							<p className="ml-7 mt-4 text-xl">Proof of Vehicle Fitness </p>
							<button
								className="m-10 w-36 rounded-md border border-black bg-blue-500 p-5 text-xl text-white"
								onClick={downloadDocuments}
							>
								Download
							</button>
							<br />

							<input
								type="checkbox"
								id=""
								name=""
								value=""
								className="ml-7 mt-7"
								onChange={handleApprovalChange}
							/>
							<label htmlFor="" className="px-3 text-xl">
								The Government agrees that the above documents are legit{" "}
								<span className="text-red-600">*</span>
							</label>
							<br />
							<input
								type="checkbox"
								id=""
								name=""
								value=""
								className="ml-7 mt-7"
								onChange={handleDocChange}
							/>
							<label htmlFor="" className="px-3 text-xl">
								The Governemt accepts to change the ownership of the
								registration certificate <span className="text-red-600">*</span>
							</label>
							<br />

							<button
								onClick={reject}
								className="m-10 w-36 rounded-md border border-black bg-red-600 p-5 text-xl text-white"
							>
								Reject
							</button>
							<button
								onClick={accept}
								className="m-10 w-36 rounded-md border border-black bg-green-700 p-5 text-xl text-white"
							>
								Accept
							</button>
						</div>
						<button className="float-right my-5 mt-10 block h-10 w-40 items-center justify-center rounded-md bg-slate-800 text-center text-xl text-white">
							Submit
							<FontAwesomeIcon icon={faArrowRight} className="px-3" />
						</button>
					</div>
				</div>

				{/* Import the footer component  */}
				<div className="">
					<GovFooter />
				</div>
			</div>
		);
	}
};

export default GovConfirmation;
