import { FaPlus } from "react-icons/fa6";
import { useRef, useState, useEffect, type ChangeEvent } from "react";
const Stories = () => {
  const reader = new FileReader();
  const [images, setImages] = useState([]);
  const [iv, setIv] = useState(false);
  const [sr, setSr] = useState("");

  
  const iViewer = async (d: any) => {
    
    
    await setSr(d);
    setIv(true)
   
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("/api/fetchStories");
        const data = await res.json();
        setImages(data);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };

    fetchJobs();
  }, []);

  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const handleClick = (_e: React.MouseEvent) => {
    if (hiddenFileInput.current !== null) {
      hiddenFileInput.current.click();
    }
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (e.target.files[0].type.split("/")[0] !== "image") {
        alert("not an image");
        return;
      }
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = async (e) => {
        if (e.target !== null) {
          try {
            const result = await fetch("/api/postStories", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ uri: e.target.result }),
            });

            console.log(result);
          } catch (e) {
            console.log(e);
          }
        }
      };
    }
  };

  if (iv) {
    
    return (
      <>
        <img className="mx-auto" src={sr}/>
        <button  onClick={()=>{setIv(false)}}>Close</button>
      </>
    );
  }

  return (
    <>
    
      <div className="font-medium border-b-gray-500 border-b-1 text-3xl">
        Stories
      </div>
      <div className="flex flex-row border-b-gray-500 border-b-1 py-5 px-3">
        <button
          onClick={handleClick}
          className="bg-gray-300 p-5 rounded-full hover:bg-gray-400"
        >
          <FaPlus />{" "}
          <input
            ref={hiddenFileInput}
            onChange={handleChange}
            type="file"
            style={{ display: "none" }}
          />
        </button>
        {images.map((i) => (
          <button
            onClick={() => {
              iViewer(i);
            }}
          >
            <img
              className="mx-2 rounded-full"
              src={i}
              width="60"
              height="60"
            ></img>
          </button>
        ))}
      </div>
    </>
  );
};

export default Stories;
