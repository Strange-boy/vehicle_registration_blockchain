import React, { useState } from "react";
import Navbar from "../Components/navbar/navbar";
import Footer from "../Components/footer/footer";
import Loader from "../Components/loader/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

/*Auth code */
import { useAuthState } from "react-firebase-hooks/auth";
import { appAuth, db } from "../../utils/firebase";
import { getAuth } from "firebase/auth";

// inorder to add firestore functionality
import { collection, addDoc } from "firebase/firestore";

//in order to add the storage functionality to firestore
import { getStorage, ref } from "firebase/storage";
import { uploadBytes } from "firebase/storage";

const TitleChange = () => {
	/*Inorder to mantain the state of the user */
	const [user, loading] = useAuthState(appAuth);
	let sellerId; //inorder to set the seller id
	const [buyer, setBuyer] = useState("");
	const [vehicleId, setVehicleId] = useState("");
	const routeLoginPage = "./login";
	const govUid = "GHHYwlHErhdC84sKe3MmseCKqvv1";

	//in order to upload the files
	const storage = getStorage();
	const [residence, setResidence] = useState(null);
	const [insurance, setInsurance] = useState(null);
	const [fitness, setFitness] = useState(null);

	const auth = getAuth();
	const authUser = auth.currentUser;

	//in order to fetch the seller's username
	if (authUser !== null) {
		authUser.providerData.forEach((profile) => {
			sellerId = profile.email;
			// console.log("seller email:", sellerId);
		});
	}

	function updatingVehicleInfo() {
		//in order to add the data to firestore
		async function addDataToFirestore() {
			await addDoc(collection(db, "confirmationDetails"), {
				buyerId: buyer,
				sellerId: sellerId,
				vehicleId: vehicleId,
				confFromGov: "PENDING",
				confFromBuyer: "PENDING",
			});
		}

		//inorder to add the data to the firestore
		addDataToFirestore();
		console.log("Successfully added data to firestore");

		// console.log(residence);
		// console.log(fitness);
		// console.log(insurance);

		//in order to add residence file to firestore
		const residenceFileUploaded = () => {
			if (residence == null) return;

			const residenceRef = ref(storage, `${vehicleId}/${residence.name}`);
			uploadBytes(residenceRef, residence)
				.then(() => {
					console.log("Residence File Uploaded");
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					// ..
					console.log(errorMessage);
					alert(errorMessage);
				});
		};

		//in order to upload the residence file uploaded
		residenceFileUploaded();

		//in order to add residence file to firestore
		const insuranceFileUploaded = () => {
			if (insurance == null) return;

			const insuranceRef = ref(storage, `${vehicleId}/${insurance.name}`);
			uploadBytes(insuranceRef, insurance)
				.then(() => {
					console.log("insurance File Uploaded");
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					// ..
					console.log(errorMessage);
					alert(errorMessage);
				});
		};

		//in order to upload the insurance file uploaded
		insuranceFileUploaded();

		//in order to add residence file to firestore
		const fitnessFileUploaded = () => {
			if (fitness == null) return;

			const fitnessRef = ref(storage, `${vehicleId}/${fitness.name}`);
			uploadBytes(fitnessRef, fitness)
				.then(() => {
					console.log("Fitness File Uploaded");
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					// ..
					console.log(errorMessage);
					alert(errorMessage);
				});
		};

		//in order to upload the fitness file uploaded
		fitnessFileUploaded();
		alert("Your request for Title change has sucessfully been submitted!");
	}

	//to be show in the loading screen
	if (loading) return <Loader />;
	//to be show if the user doesn't logs in
	else if (!user || user.uid === govUid)
		window.location.pathname = routeLoginPage;
	//if the user logs in successfully
	else
		return (
			<div className="">
				{/* Import the navbar component */}
				<div className="mb-5">
					<Navbar />
				</div>

				<h1 className="ml-7 mb-2 text-2xl">Title Change Application</h1>
				<p className="ml-7 text-xl">
					Fields marked&nbsp;"<strong className="text-red-600">*</strong>
					"&nbsp;are required
				</p>
				<hr className=" mt-4  bg-gray-800" />

				<div className="ml-7 mb-10 p-5">
					<label htmlFor="" className="block text-xl">
						Username of new owner <span className="text-red-600">*</span>
					</label>
					<input
						id="newOwner"
						name="newOwner"
						onChange={(event) => setBuyer(event.target.value)}
						className="mt-2 mb-5 rounded-md border border-slate-600 py-1 px-3 text-xl outline-none"
						type="text"
					/>
					<label htmlFor="" className="block text-xl">
						Vehicle Registration Number<span className="text-red-600">*</span>
					</label>
					<input
						id="vehicleRegNo"
						name="vehicleRegNo"
						onChange={(event) => setVehicleId(event.target.value)}
						className="mt-2 rounded-md border border-slate-600 py-1 px-3 text-xl outline-none"
						type="text"
					/>
					<strong className="block py-5">Upload documents required</strong>
					<label htmlFor="" className="block text-xl ">
						Residence Proof <span className="text-red-600">*</span>
					</label>
					<input
						type="file"
						onChange={(event) => {
							setResidence(event.target.files[0]);
						}}
						className="pb-5"
					/>
					<label htmlFor="" className="block text-xl ">
						Valid Certificate of Insurance{" "}
						<span className="text-red-600">*</span>
					</label>
					<input
						type="file"
						onChange={(event) => {
							setInsurance(event.target.files[0]);
						}}
						className="pb-5"
					/>
					<label htmlFor="" className="block text-xl ">
						Proof of Vehicle Fitness <span className="text-red-600">*</span>
					</label>
					<input
						type="file"
						onChange={(event) => {
							setFitness(event.target.files[0]);
						}}
						className="pb-5"
					/>
					<button
						onClick={updatingVehicleInfo}
						className="float-right my-5 block h-10 w-40 rounded-md bg-slate-800 text-xl text-white "
					>
						Submit
						<FontAwesomeIcon icon={faArrowRight} className="px-3" />
					</button>
				</div>
				<br className="" />
				<br className="" />
				{/* Import the footer component  */}
				<div className="">
					<Footer />
				</div>
			</div>
		);
};

export default TitleChange;
