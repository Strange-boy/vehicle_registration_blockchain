import React, { useEffect, useState } from "react";
import Navbar from "../Components/navbar/navbar";
import Footer from "../Components/footer/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import PositiveStatus from "../Components/statusMessage/positiveStatus";
import NegativeStatus from "../Components/statusMessage/negativeStatus";
import Verification from "../Components/statusMessage/verification";
import TitleChangeSuccessful from "../Components/statusMessage/tcSuccess";
import approvalWaiting from "../Components/statusMessage/approvalWaiting";
import Loader from "../Components/loader/Loader";

/*Auth Related imports */
import { useAuthState } from "react-firebase-hooks/auth";
import { appAuth } from "../../utils/firebase";
import { getAuth } from "firebase/auth";

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

const Status = () => {
	/*this deals with the state management of the logged in user */
	const [currUser, loading] = useAuthState(appAuth);
	const [vehicleId, setVehicleId] = useState("XX-XX-XX-XXXX");
	const [buyerPresent, setBuyerPresent] = useState(false);
	const [sellerPresent, setSellerPresent] = useState(false);
	const [tcVerified, setTCVerified] = useState(false);
	const [waitGovApprov, setGovApprov] = useState(false);

	const [buyerConfirmation, setBuyerConfirmation] = useState("PENDING");
	const [govConfirmation, setGovConfirmation] = useState("PENDING");
	const [titleChangeRequest, setRequest] = useState(false);
	const [docVerification, setDocVerification] = useState(false);

	const [vehiclePresent, setVehiclePresent] = useState(true);
	const [currUserId, setCurrUserId] = useState("");
	const [sellerId, setSellerId] = useState("");
	const [buyerId, setBuyerId] = useState("");
	const [firstClick, setFirstClick] = useState(true);

	const routeLoginPage = "./login";
	const titleChange = "/titleChange";
	const govUid = "GHHYwlHErhdC84sKe3MmseCKqvv1";
	const auth = getAuth();

	useEffect(() => {
		const userExist = auth.currentUser;
		if (userExist) {
			const username = userExist.email;
			setCurrUserId(username);
			// console.log(username);

			// console.log("user says hi");
			const userDetails = query(
				collection(db, "confirmationDetails"),
				where("sellerId", "==", username)
			);

			// console.log(username);

			async function displayBuyerPresence() {
				const querySnapshot = await getDocs(userDetails);

				if (querySnapshot.size > 0) {
					setSellerPresent(true);
				} else {
					setBuyerPresent(true);
				}
			}
			// in order to update these changes to profile
			displayBuyerPresence();
		} else {
			console.log("user not logged");
		}
	});

	function showTitleChangeStatus() {
		if (vehicleId === "XX-XX-XX-XXXX" || vehicleId === "") {
			alert("Please enter the vehicle Id");
			return;
		}

		console.log("entered hello");

		//first we have to check whether the vehicle is related to
		// a particular seller or buyer
		//seller is already checked so we have to check for the buyer

		// console.log(vehicleId);
		//now we have to fetch all the details related to the vehicle id
		const requestDetails = query(
			collection(db, "confirmationDetails"),
			where("vehicleId", "==", vehicleId)
		);

		async function displayBuyerStatus() {
			const querySnapshot = await getDocs(requestDetails);

			if (querySnapshot.size > 0) {
				// console.log(querySnapshot[0].data().buyerId);
				querySnapshot.forEach((doc) => {
					// doc.data() is never undefined for query doc snapshots
					setBuyerId(doc.data().buyerId);
					setSellerId(doc.data().sellerId);

					// const obj = {
					// 	buyerID: doc.data().buyerId,
					// 	sellerID: doc.data().sellerId,
					// };

					// return obj;
				});
			} else {
				setVehiclePresent(false);
			}
		}

		async function fetchTitleChangeDetails() {
			const querySnapshot = await getDocs(requestDetails);
			querySnapshot.forEach((doc) => {
				// doc.data() is never undefined for query doc snapshots
				// console.log(doc.id, " => ", doc.data());

				setBuyerConfirmation(doc.data().confFromBuyer);
				setGovConfirmation(doc.data().confFromGov);
				// console.log("Title change request:", titleChangeRequest);

				//while the buyer is waiting for Government approval
				if (buyerConfirmation === "PENDING" && govConfirmation === "PENDING") {
					setGovApprov(true);
				}

				//in order to show the document verification for the buyer of the car
				if (
					buyerPresent &&
					buyerConfirmation === "PENDING" &&
					govConfirmation === "ACCEPTED"
				) {
					setDocVerification(true);
				}

				if (
					buyerConfirmation === "ACCEPTED" &&
					govConfirmation === "ACCEPTED"
				) {
					setTCVerified(true);
				}

				//finally we have to make title change display
				setRequest(true);
			});
		}

		async function handleDisplayBuyerStatus() {
			await displayBuyerStatus();
			if ((buyerId === "" && sellerId === "") || firstClick === true) {
				console.log("first click");
				setFirstClick(false);
			} else {
				console.log(vehiclePresent);
				console.log(buyerId);
				console.log(sellerId);
				console.log(currUserId);

				if (vehiclePresent === false) {
					alert("This Vehicle has not submitted any title change request");
					return;
				} else if (buyerId !== currUserId && sellerId !== currUserId) {
					alert("you are not allowed to this vehicle's details");
					return;
				} else {
					// in order to update these changes to profile
					fetchTitleChangeDetails();
				}
			}
		}

		handleDisplayBuyerStatus();
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
				<div className="min-h-screen">
					<button
						onClick={() => {
							if (sellerPresent) {
								alert("Title change request is under progress!!");
							} else {
								window.location.pathname = titleChange;
							}
						}}
						className="ml-7 mt-7 flex items-center justify-center rounded-md bg-slate-600 p-2 text-xl text-white "
					>
						Apply for title change
						<FontAwesomeIcon icon={faArrowRight} className="px-3" />
					</button>

					<label htmlFor="" className="block text-xl mt-10 ml-10">
						Registration Number <span className="text-red-600">*</span>
					</label>
					<input
						className="mt-5 ml-10 rounded-md border border-slate-600 py-1 px-3 text-xl outline-none"
						type="text"
						onChange={(event) => {
							setVehicleId(event.target.value);
							setRequest(false);
							setVehiclePresent(true);
							setFirstClick(true);
						}}
					/>
					<button
						className="mt-5 ml-10 block h-10 w-40 rounded-md bg-slate-800 text-xl text-white"
						onClick={showTitleChangeStatus}
					>
						Show Status
					</button>

					<div className="mx-7 mt-5 rounded-md border border-slate-400 p-5 shadow-md">
						<h1 className="ml-7 text-2xl">Status</h1>
						{titleChangeRequest ? (
							<div>
								{!tcVerified && (
									<div>
										<PositiveStatus />
									</div>
								)}

								<div className=" mx-7 mt-7 bg-slate-100 p-5">
									<h4 className="px-7 text-2xl  ">Title Change Application</h4>
									<p className="px-7 py-5 text-xl">
										Confirmation from new owner: {buyerConfirmation}
									</p>
									<p className="px-7 pb-5 text-xl">
										Validation from Government: {govConfirmation}
									</p>
									<p className="px-7 py-5 text-xl">Vehicle Id: {vehicleId}</p>

									<button className=" ml-auto flex items-center justify-end rounded-md bg-slate-600 p-2 text-xl text-white ">
										Change title
										<FontAwesomeIcon icon={faArrowRight} className="px-3" />
									</button>
								</div>

								{/* in order to display the message while the buyer is waiting for government confirmation */}
								{buyerPresent && waitGovApprov && (
									<div>
										<approvalWaiting />
									</div>
								)}
								{/* in order to display when title change is successful from both side */}
								{tcVerified && (
									<div>
										<TitleChangeSuccessful />
									</div>
								)}

								{/* in order to display the  document verification for the buyer */}
								{docVerification && (
									<div>
										<Verification />
									</div>
								)}
							</div>
						) : (
							<div>
								<NegativeStatus />
							</div>
						)}
					</div>
				</div>
				<div className="">
					<Footer />
				</div>
			</div>
		);
};

export default Status;
