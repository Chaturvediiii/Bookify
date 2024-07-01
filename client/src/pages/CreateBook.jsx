import { useState } from "react";
import Select from "react-select";
import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
  ref,
} from "firebase/storage";
import { app } from "../firebase";

export default function CreateBook() {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageURLs: [],
  });
  const [imageUploadError, setImageUploadWError] = useState(false);
  const subjects = [
    { value: "m1", label: "Engineering Mathematics-1" },
    { value: "m2", label: "Engineering Mathematics-2" },
    { value: "m3", label: "Engineering Mathematics-3" },
    { value: "physics", label: "Engineering Physics" },
    { value: "e1", label: "Electronics-1" },
    { value: "e2", label: "Electronics-2" },
    { value: "e3", label: "Electronics-3" },
    { value: "ppsc", label: "Programming and Problem Solving in C" },
    { value: "emce", label: "Engineering Mechanics and Civil Engineering" },
    {
      value: "focse",
      label: "Fundamental of computer Science and Engineering",
    },
    { value: "ms", label: "Material Science" },
    { value: "de", label: "Digital Electronics" },
    { value: "emi", label: "Electronics Measurement and Instrumentation" },
    { value: "ns", label: "Network Analysis" },
    { value: "cs", label: "Control Systems" },
    { value: "cs-1", label: "Communication Systems-1" },
    { value: "ss", label: "Signals and Systems" },
  ];

  const colleges = [
    { value: "uit-rgpv", label: "University Institute of Technology, RGPV" },
    { value: "lnct-main", label: "Lakshmi Narayan College of Technology" },
    {
      value: "lnct-s",
      label: "Lakshmi Narayan College of Technology and Science",
    },
    {
      value: "lnct-e",
      label: "Lakshmi Narayan College of Technology and Excellence",
    },
    { value: "oist", label: "Oriental Institute of Science and Technology" },
    { value: "oct", label: "Oriental College of Technology" },
  ];

  const branches = [
    { value: "cse", label: "Computer Science and Engineering" },
    { value: "it", label: "Information Technology" },
    { value: "ece", label: "Electronics and Communication Engineering" },
    { value: "ee", label: "Electrical Engineering" },
    { value: "ce", label: "Civil Engineering" },
    { value: "me", label: "Mechanical Engineering" },
    { value: "au", label: "Automobile Engineering" },
  ];

  const handleImageSubmit = () => {
    if (files.length > 0 && files.length + formData.imageURLs.length < 7) {
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageURLs: formData.imageURLs.concat(urls),
          });
          setImageUploadWError(false);
        })
        .catch((error) => {
          setImageUploadWError(true);
        });
    } else {
      setImageUploadWError("You can only upload upto 6 images per book");
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };
  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageURLs: formData.imageURLs.filter((_, i) => i !== index),
    });
  };
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Enter book details
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Your Name"
            className="border p-3 rounded-sm"
            id="name"
            maxLength="62"
            minLength="10"
            required
          />
          <input
            type="text"
            placeholder="Author"
            className="border p-3 rounded-sm"
            id="author"
            maxLength="62"
            minLength="10"
            required
          />
          <div>
            <h3 className="font-semibold">Choose your branch</h3>
            <Select
              options={branches}
              className="w-56"
              classNamePrefix="react-select"
              placeholder="Branches"
            />
          </div>
          <div>
            <h3 className="font-semibold">Choose your college</h3>
            <Select
              options={colleges}
              className="w-56"
              classNamePrefix="react-select"
              placeholder="Colleges"
            />
          </div>
          <div>
            <h3 className="font-semibold">Choose Subject</h3>
            <Select
              options={subjects}
              className="w-56"
              classNamePrefix="react-select"
              placeholder="Subjects"
            />
          </div>
          <div>
            <h3 className="font-semibold">Enter Price</h3>
            <input
              type="number"
              id="regularPrice"
              required
              className="p-2 border border-gray-300 rounded-sm"
            />
          </div>
          <div>
            <h3 className="font-semibold">Enter Discounted Price</h3>
            <input
              type="number"
              id="discountedPrice"
              required
              className="p-2 border border-gray-300 rounded-sm"
            />
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              type="file"
              id="images"
              accept="image/*"
              multiple
              className="p-3 border border-gray-300 rounded-sm w-full bg-white"
              onChange={(e) => setFiles(e.target.files)}
            />
            <button
              onClick={handleImageSubmit}
              type="button"
              className="p-3 text-green-700 border border-green-700  rounded-sm uppercase hover:shadow-lg disabled:opacity-80"
            >
              Upload
            </button>
          </div>
          <p className="text-red-700">{imageUploadError && imageUploadError}</p>
        {formData.imageURLs.length > 0 &&
          formData.imageURLs.map((url,index) => (
            <div key={url} className="flex justify-between p-3 border items-center">
              <img src={url} alt="book preview" className="w-20 h-20 object-contain rounded-sm" />
              <button type="button" onClick={()=>handleRemoveImage(index)} className="text-red-700 p-3 rounded-sm uppercase hover:opacity-75">Delete</button>
            </div>
          ))}
          <button className="p-3 bg-blue-950  text-white rounded-ms uppercase hover:opacity-95 disabled:opacity-80">
            Create Book
          </button>
        </div>
      </form>
    </main>
  );
}
