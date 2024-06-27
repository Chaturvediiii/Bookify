import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function Profile() {
  const [file, setFile] = useState(undefined);
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [filePer, setFilePer] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePer(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7 uppercase">
        Profile
      </h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className="rounded-full w-24 h-24 object-cover cursor-pointer self-center mt-2"
          accept="image/*"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">Error Image Upload (Image must be less than 2 mb)</span>
          ) : filePer > 0 && filePer < 100 ? (
            <span className="text-blue-950">{`Uplaoding ${filePer}%`}</span>
          ) : filePer === 100 ? (
            <span className="text-green-700">Successfully uploaded</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="username"
          id="username"
          className="border p-3 rounded-sm"
        />
        <input
          type="text"
          placeholder="email"
          id="email"
          className="border p-3 rounded-sm"
        />
        <input
          type="text"
          placeholder="password"
          id="password"
          className="border p-3 rounded-sm"
        />
        <button className="bg-blue-950 opacity-90 hover:opacity-80 p-3 text-white rounded-sm uppercase">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 p-3 rounded-sm">Delete Account</span>
        <span className="text-green-700 p-3 rounded-sm "> Sign Out</span>
      </div>
    </div>
  );
}
