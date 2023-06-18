
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
// contract starts

contract rcBook{
    // mapping is done using the block Id and the block content

    mapping(uint256 => rcbook_details) public rcbook;

    // counting the rcbooks entry
    uint256 rcbookCount =0;

    //providing license for only updater to update

    address owner;

    //custom building a modifier named onlyOwner to access the control

    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }

    //Blacklisting the rcbook

   // enum Blacklisted {Yes,No}
    //Blacklisted onlyOwner blacklisted;

    // struct for storing data inside the block

    struct rcbook_details{
        //uint256 _walletid;
        string registrationNumber;
        uint256 date;
        uint256 registrationValidity;
        string ownerName;
        string engineNumber;
        string chasisNumber;
        string fuel;
        string dateofMftr;
        string modelName;
        string makerName;
        uint256 seatingCapacity;
        uint256 cubicCapacity;
        string vehicleColor;
        string vehicleBody;
        string vehicleClass;


    }

    //setting the updater
    constructor() public{
        owner = msg.sender;
    }

    //setting bydefault blacklisted as 0

    // constructor(){
    //     blacklisted = Blacklisted.No;
    // }



    //function for adding data into the block

    function addData(
        string memory registrationNumber,
        uint256 date,
        uint256 registrationValidity,
        string memory ownerName,
        string memory engineNumber,
        string memory chasisNumber,
        string memory fuel,
        string memory dateofMftr,
        string memory modelName,
        string memory makerName,
        uint256 seatingCapacity,
        uint256 cubicCapacity,
        string memory vehicleColor,
        string memory vehicleBody,
        string memory vehicleClass
    )
        public
        onlyOwner
    {
        rcbookCount += 1;
        rcbook[rcbookCount] = rcbook_details(registrationNumber,date,registrationValidity,ownerName,engineNumber,chasisNumber,fuel,dateofMftr,modelName,makerName,seatingCapacity,cubicCapacity,vehicleColor,vehicleBody,vehicleClass);
    }

    //function to blacklist the rcbook


    // function blacklistProcess() onlyOwner {
    //     blacklisted = Blacklisted.Yes;
    // }

}
