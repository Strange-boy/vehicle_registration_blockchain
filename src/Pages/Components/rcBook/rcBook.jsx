import React from "react";
import Emblem from "../../assets/Emblem.png";

const RcBook = () => {
  return (
    <div className="w-fit items-center justify-center rounded-md border border-slate-800 shadow-md overflow-hidden">
      <div className="flex w-full items-center justify-start bg-slate-100">
        <div className="">
          <img src={Emblem} alt="IndianEmblem" className="h-40 w-28" />
        </div>
        <div className="">
          <h1 className="text-3xl font-bold">GOVERNMENT OF KERALA</h1>
          <p className="mt-2 text-xl">Certificate of Registartion</p>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="m-7 flex">
          <div className="ml-7 w-80 bg-slate-100 px-20">
            <div className="my-5">
              <label htmlFor="" className="text-xl font-bold">
                Regn No:
              </label>
              <p className="text-xl">KL41R034</p>
            </div>
            <div className="">
              <label htmlFor="" className="text-xl font-bold">
                Regn Validity:
              </label>
              <p className="text-xl">20/09/2022</p>
            </div>
            <div className="my-5">
              <label htmlFor="" className="text-xl font-bold">
                Engine No:
              </label>
              <p className="text-xl">5BBHG876</p>
            </div>
            <div className="mb-5">
              <label htmlFor="" className="text-xl font-bold">
                Chasis No:
              </label>
              <p className="text-xl">FBH764H8</p>
            </div>
          </div>
          <div className="w-64 bg-slate-100 pr-20">
            <div className="my-5">
              <label htmlFor="" className="text-xl font-bold">
                Date of Regn:
              </label>
              <p className="text-xl">10/01/2001</p>
            </div>
            <div className="">
              <label htmlFor="" className="text-xl font-bold">
                Owner Name:
              </label>
              <p className="text-xl">Hema K Shaji</p>
            </div>
          </div>
        </div>

        <div className="m-7 flex">
          <div className="w-96 bg-slate-100 px-20">
            <div className="my-5">
              <label htmlFor="" className="text-xl font-bold">
                Fuel Used:
              </label>
              <p className="text-xl">PETROL</p>
            </div>
            <div className="">
              <label htmlFor="" className="text-xl font-bold">
                Vehicle Class:
              </label>
              <p className="text-xl">M-CYCLE/SCOOTER</p>
            </div>
            <div className="my-5">
              <label htmlFor="" className="text-xl font-bold">
                Maker’s Name:
              </label>
              <p className="text-xl">ROYAL ENFIELD</p>
            </div>
            <div className="my-5">
              <label htmlFor="" className="text-xl font-bold">
                Seating Capacity:
              </label>
              <p className="text-xl">2</p>
            </div>
            <div className="mb-5">
              <label htmlFor="" className="text-xl font-bold">
                Cubic Capacity:
              </label>
              <p className="text-xl">350.00</p>
            </div>
          </div>
          <div className="mr-7 w-80 bg-slate-100 pr-20">
            <div className="my-5">
              <label htmlFor="" className="text-xl font-bold">
                Month and Yr. of Mfg:
              </label>
              <p className="text-xl">01/2001</p>
            </div>
            <div className="">
              <label htmlFor="" className="text-xl font-bold">
                Model Name:
              </label>
              <p className="text-xl">BULLET STD</p>
            </div>
            <div className="my-5">
              <label htmlFor="" className="text-xl font-bold">
                Color:
              </label>
              <p className="text-xl">BLACK</p>
            </div>
            <div className="my-5">
              <label htmlFor="" className="text-xl font-bold">
                Body Type:
              </label>
              <p className="text-xl">SOLO</p>
            </div>
            <div className="mb-5">
              <label htmlFor="" className="text-xl font-bold">
                Is Blacklisted:
              </label>
              <p className="text-xl">NO</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RcBook;
