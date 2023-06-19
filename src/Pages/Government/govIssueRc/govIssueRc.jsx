// import GovNavbar from "../gov_Component/govNavbar/govNavbar.jsx";
// import GovFooter from "../gov_Component/govFooter/govFooter.jsx";
// import Web3 from "web3";
// import React, { Component } from "react";
// import {
// 	CONTRACT_ABI,
// 	CONTRACT_ADDRESS,
// } from "../../../Contracts/VehicleRegistry.jsx";
// import { appAuth, db } from "../../../utils/firebase.js";
// // in order to fetch the data from firestore
// import { collection, query, where, getDocs } from "firebase/firestore";
// import Loader from "../../Components/loader/Loader.jsx";

// class GovIssueRc extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			registrationNumber: "",
// 			registrationDate: "",
// 			registrationValidity: "",
// 			ownerName: "",
// 			engineNumber: "",
// 			chassisNumber: "",
// 			owner: "0xF73FaA018f8b9BDF39CfE5159010CdDeee39D94a",
// 			fuelUsed: "",
// 			monthAndYearOfManufacturing: "",
// 			modelName: "",
// 			makersName: "",
// 			seatingCapacity: 0,
// 			color: "",
// 			isBlacklisted: "NO",
// 			cubicCapacity: 0,
// 			vehicleClass: "",
// 			account: "",
// 			rcCount: 0,
// 			vehicleRegistry: {},
// 			currUser: null,
// 			loading: true,
// 			aadharAlert: "",
// 			aadharNumber: "",
// 		};
// 	}

// 	componentDidMount() {
// 		this.authListener();

// 		if (typeof window.ethereum !== "undefined") {
// 			console.log("MetaMask is installed!");
// 			this.loadBlockchainData();
// 		} else {
// 			alert("No web3 provider detected");
// 		}
// 	}

// 	authListener = () => {
// 		appAuth.onAuthStateChanged((user) => {
// 			if (user) {
// 				this.setState({ currUser: user, loading: false });
// 			} else {
// 				this.setState({ currUser: null, loading: false });
// 			}
// 		});
// 	};

// 	//function to find the wallet id corresponding to the aadhar
// 	findWalletWithAadhar = async () => {
// 		const q = query(
// 			collection(db, "users"),
// 			where("Aadhar", "==", this.state.aadharNumber)
// 		);

// 		const querySnapshot = await getDocs(q);
// 		querySnapshot.forEach((doc) => {
// 			// doc.data() is never undefined for query doc snapshots
// 			this.setState({
// 				owner: doc.data().Wallet_id,
// 			});
// 		});
// 	};

// 	async loadBlockchainData() {
// 		const web3 = new Web3(window.ethereum);
// 		const accounts = await web3.eth.getAccounts();
// 		// set account to state
// 		this.state.account = accounts[0];
// 		alert(this.state.account);
// 		console.log("account: " + this.state.account);
// 		const vehicleRegistry = new web3.eth.Contract(
// 			CONTRACT_ABI,
// 			CONTRACT_ADDRESS
// 		);
// 		this.setState({ vehicleRegistry: vehicleRegistry });
// 	}

// 	handleChange = (event) => {
// 		const target = event.target;
// 		const value = target.value;
// 		const name = target.name;

// 		if (name === "aadharNumber") {
// 			// validate Aadhar number
// 			const aadhaarRegex = /^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/;
// 			if (aadhaarRegex.test(value)) {
// 				this.setState({
// 					aadharAlert: "",
// 				});
// 			} else {
// 				this.setState({
// 					aadharAlert: "Invalid aadhar number",
// 				});
// 			}
// 		}
// 		// check if the input is a number
// 		if (!isNaN(value)) {
// 			this.setState({
// 				[name]: value,
// 			});
// 		} else {
// 			// if the input is not a number, convert it to uppercase
// 			this.setState({
// 				[name]: value.toUpperCase(),
// 			});
// 		}
// 	};

// 	handleSubmit = async (event) => {
// 		event.preventDefault();
// 		alert("Connect wallet to issue RC");
// 		// find the wallet id corresponding to the aadhar number
// 		this.findWalletWithAadhar();
// 		// check if all fields are filled or not
// 		if (
// 			this.state.registrationNumber === "" ||
// 			this.state.registrationDate === "" ||
// 			this.state.registrationValidity === "" ||
// 			this.state.ownerName === "" ||
// 			this.state.engineNumber === "" ||
// 			this.state.chassisNumber === "" ||
// 			this.state.fuelUsed === "" ||
// 			this.state.monthAndYearOfManufacturing === "" ||
// 			this.state.modelName === "" ||
// 			this.state.makersName === "" ||
// 			this.state.seatingCapacity === "" ||
// 			this.state.cubicCapacity === "" ||
// 			this.state.color === "" ||
// 			this.state.vehicleClass === ""
// 		) {
// 			alert("Please fill all the fields");
// 			return;
// 		}
// 		const {
// 			registrationNumber,
// 			registrationDate,
// 			registrationValidity,
// 			ownerName,
// 			engineNumber,
// 			chassisNumber,
// 			owner,
// 			fuelUsed,
// 			monthAndYearOfManufacturing,
// 			modelName,
// 			makersName,
// 			seatingCapacity,
// 			color,
// 			isBlacklisted,
// 			cubicCapacity,
// 			vehicleClass,
// 		} = this.state;

// 		console.log(
// 			registrationNumber,
// 			registrationDate,
// 			registrationValidity,
// 			ownerName,
// 			engineNumber,
// 			chassisNumber,
// 			owner,
// 			fuelUsed,
// 			monthAndYearOfManufacturing,
// 			modelName,
// 			makersName,
// 			seatingCapacity,
// 			color,
// 			isBlacklisted,
// 			cubicCapacity,
// 			vehicleClass
// 		);
// 		alert("please wait for the transaction to complete");
// 		// call the function of the smart contract with the values in the state object as arguments
// 		await this.state.vehicleRegistry.methods
// 			.addHeader(
// 				registrationNumber,
// 				registrationDate,
// 				registrationValidity,
// 				ownerName,
// 				engineNumber,
// 				chassisNumber,
// 				owner
// 			)
// 			.send({ from: this.state.account });
// 		await this.state.vehicleRegistry.methods
// 			.addDetails(
// 				registrationNumber,
// 				fuelUsed,
// 				monthAndYearOfManufacturing,
// 				modelName,
// 				makersName,
// 				seatingCapacity,
// 				color,
// 				isBlacklisted,
// 				cubicCapacity,
// 				vehicleClass
// 			)
// 			.send({ from: this.state.account });
// 		// alert the user that the vehicle has been registered
// 		alert("Vehicle registered successfully");

// 		// reset the state object
// 		this.setState({
// 			registrationNumber: "",
// 			registrationDate: "",
// 			registrationValidity: "",
// 			ownerName: "",
// 			engineNumber: "",
// 			chassisNumber: "",
// 			fuelUsed: "",
// 			monthAndYearOfManufacturing: "",
// 			modelName: "",
// 			makersName: "",
// 			seatingCapacity: "",
// 			cubicCapacity: "",
// 			color: "",
// 			vehicleClass: "",
// 		});
// 	};

// 	render() {
// 		const loginRoute = "/login";
// 		const { currUser, loading } = this.state;

// 		if (loading) {
// 			return <Loader />;
// 		} else if (!currUser) {
// 			window.location.href = loginRoute;
// 			return null;
// 		}
// 		return (
// 			<div>
// 				<div className="">
// 					<GovNavbar />
// 				</div>
// 				<div className="m-7 mx-10 rounded-md border border-slate-200 pt-20 pl-20 pb-40 pr-20 shadow-xl">
// 					<h1 className="text-2xl">Registration Certificate Issuance</h1>
// 					<br />
// 					<hr />
// 					<form onSubmit={this.handleSubmit}>
// 						<label htmlFor="" className="mt-6 block text-xl">
// 							Registration Number
// 						</label>
// 						<input
// 							name="registrationNumber"
// 							type="text"
// 							autoFocus
// 							className="mt-2 h-10 w-64 rounded-md border border-slate-800 px-3"
// 							value={this.state.registrationNumber}
// 							onChange={this.handleChange}
// 						/>

// 						<label htmlFor="" className="mt-6 block text-xl">
// 							Registration Date
// 						</label>
// 						<input
// 							name="registrationDate"
// 							type="date"
// 							className="mt-2 h-10 w-64 rounded-md border border-slate-800 px-3"
// 							value={this.state.registrationDate}
// 							onChange={this.handleChange}
// 						/>

// 						<label htmlFor="" className="mt-6 block text-xl">
// 							Registration Validity
// 						</label>
// 						<input
// 							name="registrationValidity"
// 							type="date"
// 							className="mt-2 h-10 w-64 rounded-md border border-slate-800 px-3"
// 							value={this.state.registrationValidity}
// 							onChange={this.handleChange}
// 						/>

// 						<label htmlFor="" className="mt-6 block text-xl">
// 							Aadhar Number of Owner
// 						</label>
// 						<input
// 							name="aadharNumber"
// 							type="text"
// 							className="mt-2 h-10 w-64 rounded-md  border border-slate-800 px-3"
// 							value={this.state.aadharNumber}
// 							onChange={this.handleChange}
// 						/>
// 						<p className="mb-4 text-xs">
// 							Please note:Aadhar number format - XXXX XXXX XXXX
// 						</p>
// 						<p className="text-sm text-red-600" id="aadhaarAlert">
// 							{this.state.aadharAlert}
// 						</p>

// 						<label htmlFor="" className="mt-6 block text-xl">
// 							Owner Name
// 						</label>
// 						<input
// 							name="ownerName"
// 							type="text"
// 							className="mt-2 h-10 w-64 rounded-md  border border-slate-800 px-3"
// 							value={this.state.ownerName}
// 							onChange={this.handleChange}
// 						/>

// 						<label htmlFor="" className="mt-6 block text-xl">
// 							Engine Number
// 						</label>
// 						<input
// 							name="engineNumber"
// 							type="text"
// 							className="mt-2 h-10 w-64 rounded-md  border border-slate-800 px-3"
// 							value={this.state.engineNumber}
// 							onChange={this.handleChange}
// 						/>

// 						<label htmlFor="" className="mt-6 block text-xl">
// 							Chassis Number
// 						</label>
// 						<input
// 							name="chassisNumber"
// 							type="text"
// 							className="mt-2 h-10 w-64 rounded-md  border border-slate-800 px-3"
// 							value={this.state.chassisNumber}
// 							onChange={this.handleChange}
// 						/>

// 						<label htmlFor="" className="mt-6 block text-xl">
// 							Fuel Used
// 						</label>
// 						<div className="mt-2">
// 							<label>
// 								<input
// 									type="radio"
// 									name="fuelUsed"
// 									value="PETROL"
// 									checked={this.state.fuelUsed === "PETROL"}
// 									onChange={this.handleChange}
// 								/>
// 								PETROL
// 							</label>
// 							<label className="ml-4">
// 								<input
// 									type="radio"
// 									name="fuelUsed"
// 									value="DIESEL"
// 									checked={this.state.fuelUsed === "DIESEL"}
// 									onChange={this.handleChange}
// 								/>
// 								DIESEL
// 							</label>
// 						</div>

// 						<label htmlFor="" className="mt-6 block text-xl">
// 							Month and Year of Manufacturing
// 						</label>
// 						<input
// 							name="monthAndYearOfManufacturing"
// 							type="month"
// 							className="mt-2 h-10 w-64 rounded-md  border border-slate-800 px-3"
// 							value={this.state.monthAndYearOfManufacturing}
// 							onChange={this.handleChange}
// 						/>

// 						<label htmlFor="" className="mt-6 block text-xl">
// 							Model Name
// 						</label>
// 						<input
// 							name="modelName"
// 							type="text"
// 							className="mt-2 h-10 w-64 rounded-md  border border-slate-800 px-3"
// 							value={this.state.modelName}
// 							onChange={this.handleChange}
// 						/>

// 						<label htmlFor="" className="mt-6 block text-xl">
// 							Maker’s name
// 						</label>
// 						<input
// 							name="makersName"
// 							type="text"
// 							className="mt-2 h-10 w-64 rounded-md  border border-slate-800 px-3"
// 							value={this.state.makersName}
// 							onChange={this.handleChange}
// 						/>

// 						<label htmlFor="" className="mt-6 block text-xl">
// 							Seating Capacity
// 						</label>
// 						<input
// 							name="seatingCapacity"
// 							type="number"
// 							className="mt-2 h-10 w-64 rounded-md  border border-slate-800 px-3"
// 							value={this.state.seatingCapacity}
// 							onChange={this.handleChange}
// 						/>

// 						<label htmlFor="" className="mt-6 block text-xl">
// 							Cubic Capacity
// 						</label>
// 						<input
// 							name="cubicCapacity"
// 							type="text"
// 							className="mt-2 h-10 w-64 rounded-md  border border-slate-800 px-3"
// 							value={this.state.cubicCapacity}
// 							onChange={this.handleChange}
// 						/>

// 						<label htmlFor="" className="mt-6 block text-xl">
// 							Color
// 						</label>
// 						<input
// 							name="color"
// 							type="text"
// 							className="mt-2 h-10 w-64 rounded-md  border border-slate-800 px-3"
// 							value={this.state.color}
// 							onChange={this.handleChange}
// 						/>

// 						<label htmlFor="" className="mt-6 block text-xl">
// 							Vehicle’s class
// 						</label>
// 						<input
// 							name="vehicleClass"
// 							type="text"
// 							className="mt-2 h-10 w-64 rounded-md  border border-slate-800 px-3"
// 							value={this.state.vehicleClass}
// 							onChange={this.handleChange}
// 						/>
// 						<input
// 							className="float-right mt-20 block h-10 w-40 rounded-md bg-slate-800 text-xl text-white"
// 							type="submit"
// 							value="Issue RC"
// 							onSubmit={this.handleSubmit}
// 						/>
// 					</form>
// 				</div>
// 				<div className="">
// 					<GovFooter />
// 				</div>
// 			</div>
// 		);
// 	}
// }

// export default GovIssueRc;
