// import React from "react";
// import GovNavbar from "../gov_Component/govNavbar/govNavbar.jsx";
// import GovFooter from "../gov_Component/govFooter/govFooter.jsx";
// import { useState } from 'react';
// // import Loader from "../Components/loader/Loader";
// // import Footer from "../Components/footer/footer";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
// const GovFine = () => {
//     function Dictionary() {
//         const [words, setWords] = useState({
//             "apple": "a round fruit with red or green skin and a white inside",
//             "banana": "a long curved fruit with a yellow skin",
//             "orange": "a round fruit with an orange skin and a juicy inside",
//         });

//         const [selectedWord, setSelectedWord] = useState('');

//         const handleWordChange = (event) => {
//             const word = event.target.value;
//             setSelectedWord(word);
//         };
//         return (
//             <div className="">
//                 <div className="">
//                     <GovNavbar />
//                 </div>
//                 <div className="border border-slate-200 p-10 shadow-md rounded-sm m-10">
//                     <h3 className="text-2xl pb-3">Record Fine</h3>
//                     <label htmlFor="fine" className="text-xl">Vehicle Registration Number :</label>
//                     <input type="text"
//                         id="fine"
//                         name="fine"
//                         className="border ml-3 rounded-md py-2 px-3 text-xl outline-none" />
//                     <button className=" items-center flex justify-end rounded-md bg-slate-600 p-2 text-xl text-white ml-auto ">
//                         Submit
//                         <FontAwesomeIcon icon={faArrowRight} className="px-3" />
//                     </button>
//                     <select onChange={handleWordChange}>
//                         <option value="">Select a word</option>
//                         {Object.keys(words).map((word) => (
//                             <option key={word} value={word}>
//                                 {word}
//                             </option>
//                         ))}
//                         {selectedWord && (
//                             <div>
//                                 <h2>{selectedWord}</h2>
//                                 <p>{words[selectedWord]}</p>
//                             </div>
//                         )}
//                     </select>
//                 </div>

//                 <div className="">
//                     <GovFooter />
//                 </div>
//             </div>
//         );
//     }
// };

// export default GovFine;

import React, { useEffect, useState } from "react";
import GovNavbar from "../gov_Component/govNavbar/govNavbar.jsx";
import GovFooter from "../gov_Component/govFooter/govFooter.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

//in order to import fire store related commands
import { db } from "../../../utils/firebase.js";
import { collection, query, where, getDocs } from "firebase/firestore";

const GovFine = () => {
	const [violations, setViolations] = useState({
		"Driving Without Helmet": {
			violationName: "Driving Without Helmet",
			fine: 1000,
		},
		"Triple Riding on Two-wheeler": {
			violationName: "Triple Riding on Two-wheeler",
			fine: 2000,
		},
		"Over-speeding Penalty": {
			violationName: "Over-speeding Penalty",
			fine: 3000,
		},
		"Driving Without a Seatbelt": {
			violationName: "Driving Without a Seatbelt",
			fine: 4000,
		},
		"Using a Mobile Phone While Driving": {
			violationName: "Using a Mobile Phone While Driving",
			fine: 5000,
		},
	});

	const [fineStatement, setFineStatement] = useState("");
	const [userVerified, setUserVerified] = useState(false);
	const [vehicleId, setVehicleId] = useState("");
	const [ownerId, setOwnerId] = useState("");
	const [fineAmount, setFineAmount] = useState(0);
	const violationOptions = Object.keys(violations);

	//in order to update the fine amount as and when the fine statement gets changed
	useEffect(() => {
		const setFine = (selectedViolation) => {
			if (selectedViolation && violations[selectedViolation]) {
				setFineAmount(violations[selectedViolation].fine);
			}
		};

		console.log(fineStatement);
		//in order to set the fine amount
		setFine(fineStatement);
		console.log(fineAmount);
	}, [fineStatement]);

	const handleFineStatement = (event) => {
		const word = event.target.value;
		setFineStatement(word);
	};

	//in order to handle the vehicle verfication
	function handleVehicleVerfication() {
		if (vehicleId === "") {
			alert("Please enter a valid vehicle Id");
			return;
		}

		//in order to check in the fire store whether the assosciated user exist or not
		const userRef = collection(db, "users");
		const userExist = query(userRef, where("Username", "==", ownerId));

		const userValidation = async () => {
			const querySnapshot = await getDocs(userExist);

			if (querySnapshot.size > 0) {
				setUserVerified(true);
				alert("User Details are verified");
			} else {
				alert("Please enter valid user details");
			}
		};

		userValidation();
	}

	//in order to add the details to the database
	function updateFineDetails() {
		if (userVerified == false) {
			alert("Please verify the user details");
			return;
		}

		if (fineStatement === "") {
			alert("Please choose an appropriate violation");
			return;
		}

		console.log(fineStatement);
		console.log("fine charged:", fineAmount);

		const fineDetails = {
			violationStatement: fineStatement,
			amountCharged: fineAmount,
		};

		//in order to add details to the firestore
	}

	return (
		<div className="">
			<div className="">
				<GovNavbar />
			</div>
			<div className="m-10 rounded-sm border border-slate-200 p-10 shadow-md">
				<h3 className="pb-3 text-2xl">Record Fine</h3>
				<label htmlFor="fine" className="text-xl">
					Enter user id:
				</label>
				<input
					type="text"
					id="username"
					name="username"
					placeholder="owner@test.com"
					className="mt-3 ml-3 rounded-md border py-2 px-3 text-xl outline-none"
					onChange={(event) => {
						setUserVerified(false);
						setOwnerId(event.target.value);
					}}
				/>
				<br />
				<label htmlFor="fine" className="text-xl">
					Vehicle Registration Number :
				</label>
				<input
					type="text"
					id="fine"
					name="fine"
					placeholder="XX-XX-XX-XXXX"
					className="mt-3 ml-3 rounded-md border py-2 px-3 text-xl outline-none"
					onChange={(event) => {
						setVehicleId(event.target.value);
					}}
				/>
				<button
					className="mt-5 block h-10 w-40 rounded-md bg-slate-800 text-xl text-white"
					onClick={handleVehicleVerfication}
				>
					Verify details
				</button>
				<br></br>
				<label htmlFor="" className="text-xl">
					Violation :
				</label>
				<select
					className="mt-3 ml-3 rounded-md border py-2 px-3 text-xl outline-none"
					onChange={handleFineStatement}
				>
					<option value="" className="">
						Select a violation
					</option>
					{violationOptions.map((option) => (
						<option
							key={violations[option].violationName}
							value={violations[option].violationName}
						>
							{violations[option].violationName}
						</option>
					))}
				</select>
				<button
					className=" ml-auto flex items-center justify-end rounded-md bg-slate-600 p-2 text-xl text-white"
					onClick={updateFineDetails}
				>
					Submit
					<FontAwesomeIcon icon={faArrowRight} className="px-3" />
				</button>
			</div>

			<div className="">
				<GovFooter />
			</div>
		</div>
	);
};

export default GovFine;
