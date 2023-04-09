import { useEffect, useState } from "react";
import mecin from "/mecin.png";
import "./App.css";

interface IngredientsResType {
  detected_entities: {
    entities: string;
    name: string;
  }[];
  filename: string;
  other_entities: {
    entities: string;
    status: string;
  }[];
  result: Text;
  status: number;
}
function App() {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);
  const [ingre, setIngre] = useState<IngredientsResType | null>(null);

  const upload = async (e: any) => {
    e.preventDefault;

    const formData = new FormData();
    formData.append("file", e);
    setData(e);
    setIsPending(true);

    const res = await fetch("http://127.0.0.1:5000/api/extract" as string, {
      method: "POST",
      body: formData,
    });
    const hasil = await res.json();
    setIsPending(false);
    setIngre(hasil);
  };

  return (
    <div className="w-full min-h-screen text-gray-900 bg-gradient-to-r from-white from-10% via-zinc-100 via-30% to-sky-50 to-70%  bottom-0">
      <div className="p-5 ml-0 md:ml-20 pt-12 text-center md:text-left">
        <a
          href="#"
          className="text-[#54bab9] text-2xl font-semibold tracking-wide"
        >
          Halal <span className="text-gray-400"> Ingredients</span>
        </a>
      </div>
      <div className="flex mx-auto px-8 w-11/12 justify-center mt-20 pl-20 ">
        <div className="w-1/2 content-center grid grid-row ">
          <h1 className="text-[#54bab9] text-4xl font-bold">Welcome!</h1>
          <p className="font-extralight mt-4 text-2xl">
            Eating halal made simple. Use our scanner to identify halal
            ingredients in your meals.{" "}
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
              onChange={(e) =>
                upload((e.target as HTMLInputElement)?.files?.[0])
              }
            />
          </label>{" "}
        </div>
        <div className="w-1/2 invisible md:visible">
          <div className=" flex items-center  justify-center px-16 bg-transparent">
            <div className="relative w-full  max-w-lg ">
              <div className="absolute -bottom-8 left-20 w-96 h-96 bg-yellow-100 rounded-full opacity-90  animate-blob animation-delay-4000"></div>
              <div className="absolute top-0 -left-4 w-72 h-72 bg-teal-200 rounded-full   animate-blob"></div>
              <div className="absolute top-0 -right-4 w-72 h-72 bg-sky-200 rounded-full   animate-blob animation-delay-2000"></div>
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
      </div>{" "}
      <div className="grid mt-4 gap-4 w-full  ">
        <p className="font-extralight pl-2 text-center">
          Entity Color Indicator:{" "}
        </p>
        <div className="gap-4 flex justify-center">
          <p className="entitas HALAL">halal</p>{" "}
          <p className="entitas syubhat">syubhat</p>{" "}
          <p className="entitas haram">haram</p>
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row  justify-center mx-auto px-8 mt-4  pb-8">
        <div className="w-full md:w-1/2 justify-center flex">
          <img
            src={data ? URL.createObjectURL(data) : "https://default-image.jpg"}
            alt=""
            className="w-2/3 self-start mt-14"
          />
        </div>
        <div className="w-full md:w-1/2   ">
          {isPending && (
            <p className="text-center animate-pulse text-4xl pt-48 font-extralight">
              loading..
            </p>
          )}
          {ingre && (
            <p className="text-3xl font-extralight text-center mb-4">Results</p>
          )}
          <ul className="grid grid-cols-3 gap-4">
            {ingre?.detected_entities?.map((i) => (
              <li key={i.name} className={`entitas ${i.entities}`}>
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
      <div className="fixed left-4 bottom-4">
        <a
          href="https://github.com/adibangkai"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default App;
