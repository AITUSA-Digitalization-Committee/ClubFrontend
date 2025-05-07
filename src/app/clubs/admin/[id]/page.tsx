"use client";

import { api } from "@/api/instance";
import { useAuth } from "@/hooks/auth";
import { useParams } from "next/navigation";
import { useState } from "react";

function AdminPage() {
  const { id } = useParams();
  const { token } = useAuth();
  // ОБЯЗ ТОКЕН ОТПРАВИТЬ
  const [clubName, setClubName] = useState("");
  const [clubDescription, setClubDescription] = useState("");
  const [clubImage, setClubImage] = useState<File | null>(null);
  const [clubBanner, setClubBanner] = useState<File | null>(null);
  const [memberBarcode, setMemberBarcode] = useState("");
  const [memberFirstName, setMemberFirstName] = useState("");
  const [memberLastName, setMemberLastName] = useState("");

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (file: File | null) => void,
  ) => {
    setter(e.target.files?.[0] || null);
  };

  const handleClubSubmit = () => {
    console.log("Club Info Submitted:", { clubName, clubDescription });
    //TODO POST data to backend
    // роут clubs/edit/:id
  };

  const handleImageSubmit = () => {
    console.log("Image Upload:", { clubImage, clubBanner });
    // TODO: POST files to backend (e.g. with FormData)
    // роут /images/:id/logo и /images/:id/banner
  };

  const handleMemberSubmit = () => {
    console.log("Member Added:", {
      barcode: memberBarcode,
      firstName: memberFirstName,
      lastName: memberLastName,
    });
    // TODO: POST member to backend
    // роут /clubs/member/add
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-10">
      <h1 className="text-2xl font-bold mb-4">Admin Page</h1>
      <p className="text-sm text-gray-500">Club ID: {id}</p>

      {/* Club Info Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleClubSubmit();
        }}
        className="space-y-4 border p-4 rounded"
      >
        <h2 className="text-xl font-semibold">Club Info</h2>
        <input
          type="text"
          value={clubName}
          onChange={(e) => setClubName(e.target.value)}
          placeholder="Club Name"
          className="w-full p-2 border rounded"
        />
        <textarea
          value={clubDescription}
          onChange={(e) => setClubDescription(e.target.value)}
          placeholder="Club Description"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save Club Info
        </button>
      </form>

      {/* Image Upload Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleImageSubmit();
        }}
        className="space-y-4 border p-4 rounded"
      >
        <h2 className="text-xl font-semibold">Upload Images</h2>
        <div>
          <label className="block mb-1 font-medium">Club Image</label>
          <input
            className="border-2"
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, setClubImage)}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Club Banner</label>
          <input
            className="border-2"
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, setClubBanner)}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Upload Images
        </button>
      </form>

      {/* Member Add Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleMemberSubmit();
        }}
        className="space-y-4 border p-4 rounded"
      >
        <h2 className="text-xl font-semibold">Add Member</h2>
        <input
          type="text"
          value={memberBarcode}
          onChange={(e) => setMemberBarcode(e.target.value)}
          placeholder="Barcode"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          value={memberFirstName}
          onChange={(e) => setMemberFirstName(e.target.value)}
          placeholder="First Name"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          value={memberLastName}
          onChange={(e) => setMemberLastName(e.target.value)}
          placeholder="Last Name"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Add Member
        </button>
      </form>
    </div>
  );
}

export default AdminPage;
