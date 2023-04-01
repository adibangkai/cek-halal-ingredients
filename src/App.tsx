import { useEffect, useState } from "react";
import mecin from "/mecin.png";
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);
  const [ingre, setIngre] = useState(null);

  const upload = async (e) => {
    e.preventDefault;

    const formData = new FormData();
    formData.append("file", e);
    setData(e);
    setIsPending(true);

    const res = await fetch("http://127.0.0.1:5000/api/extract", {
      method: "POST",
      body: formData,
    });
    const hasil = await res.json();
    setIsPending(false);
    setIngre(hasil);
  };

  return (
    <div className="w-full min-h-screen text-gray-900 bg-gradient-to-r from-white from-10% via-zinc-100 via-30% to-sky-50 to-70%  bottom-0">
      <div className="p-5 ml-20 pt-12">
        <a
          href="#"
          className="text-[#54bab9] text-2xl font-semibold tracking-wide"
        >
          Halal <span className="text-gray-400"> Ingredients</span>
        </a>
      </div>
      <div className="flex mx-auto px-8 w-11/12 justify-center mt-20 pl-20 ">
        <div className="w-1/2 content-center grid grid-row ">
          <h1 className="text-[#54bab9] text-4xl font-bold">Welcome</h1>
          <p className="font-extralight mt-4 text-2xl">
            Check your food Ingredients by put images of product Ingredients
          </p>
          <label>
            <input
              type="file"
              className="text-sm text-grey-500
            file:mr-5 file:py-2 file:px-6
            file:rounded-full file:border-0
            file:text-sm file:font-medium
            file:bg-teal-50 file:text-teal-600
            hover:file:cursor-pointer hover:file:bg-sky-50
            hover:file:text-sky-700
            mt-8
          "
              onChange={(e) => upload(e.target.files[0])}
            />
          </label>{" "}
          <div className="grid mt-4 gap-4 ">
            <p className="font-extralight pl-2">entity color: </p>
            <div className="gap-4 flex ">
              <p className="entitas HALAL">halal</p>{" "}
              <p className="entitas syubhat">syubhat</p>{" "}
              <p className="entitas haram">haram</p>
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <div className=" flex items-center  justify-center px-16 bg-transparent">
            <div className="relative w-full  max-w-lg ">
              <div className="absolute top-0 -left-4 w-72 h-72 bg-teal-200 rounded-full   animate-blob"></div>
              <div className="absolute top-0 -right-4 w-72 h-72 bg-sky-200 rounded-full   animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-8 left-20 w-96 h-96 bg-yellow-100 rounded-full opacity-40 animate-blob animation-delay-4000"></div>
              <div className="relative space-y-4 ">
                <img
                  src={mecin}
                  alt="logo"
                  className="w-[400px] mx-auto z-10 "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center mx-auto px-8 mt-12  pb-8">
        <div className="w-1/2 justify-center flex">
          <img
            src={data ? URL.createObjectURL(data) : "https://default-image.jpg"}
            alt=""
            className="w-2/3 self-start mt-20"
          />
        </div>
        <div className="w-1/2  ">
          {isPending && (
            <p className="text-center animate-pulse text-4xl pt-48 font-extralight">
              loading..
            </p>
          )}
          {ingre && (
            <p className="text-3xl font-extralight text-center mb-4">Hasil</p>
          )}
          <ul className="grid grid-cols-3 gap-4">
            {ingre?.detected_entities?.map((i) => (
              <li className={`entitas ${i.entities}`}>
                <a
                  target="_blank"
                  href={`https://www.google.com/search?client=firefox-b-d&q=is ${i.name} ${i.entities}?`}
                >
                  {i.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
