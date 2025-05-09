"use client";

import { api } from "@/api/instance";
import Members from "@/components/info/Members";
import { useAuth } from "@/hooks/auth";
import { IClub, IMember } from "@/types";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function AdminPage() {
  const placeholder: IClub = {
    id: "228",
    title: "228",
    description: "asd",
    members: [],
  };
  const { id } = useParams();
  const { token } = useAuth();
  const [club, setClub] = useState<IClub>(placeholder);
  const [clubName, setClubName] = useState("");
  const [clubDescription, setClubDescription] = useState("");
  const [clubImage, setClubImage] = useState<File | null>(null);
  const [clubBanner, setClubBanner] = useState<File | null>(null);
  const [memberBarcode, setMemberBarcode] = useState("");
  const [memberFirstName, setMemberFirstName] = useState("");
  const [memberLastName, setMemberLastName] = useState("");
  const [allMembers, setAllMembers] = useState<IMember[]>([]);

  const handleMembers = () => {
    if (memberBarcode.length > 5 && !allMembers) {
      api
        .get("/clubs/members/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setAllMembers(res.data.data);
        });
      console.log(allMembers);
    }
  };

  useEffect(() => {
    handleMembers();
    const data: IMember | undefined = allMembers.find(
      (item: IMember) => item.barcode == memberBarcode,
    );
    if (data) {
      setMemberFirstName(data.name);
      setMemberLastName(data.surname);
    }
  }, [memberBarcode, allMembers]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (file: File | null) => void,
  ) => {
    setter(e.target.files?.[0] || null);
  };

  const fetchClub = () => {
    api
      .get(`clubs/get/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        console.log(resp.data);
        setClub(resp.data.data);
      });
  };

  useEffect(() => {
    fetchClub();
  }, [token, memberBarcode]);

  useEffect(() => {
    setClubName(club.title);
    setClubDescription(club.description);
  }, [club]);
  const handleClubSubmit = async () => {
    try {
      const response = await api.post(
        `/clubs/edit/${id}`,
        {
          title: clubName,
          description: clubDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log("Club updated:", response.data);
      fetchClub(); // Обновляем данные
    } catch (err) {
      console.error("Failed to update club:", err);
    }
  };

  const handleImageSubmit = async () => {
    try {
      if (clubImage) {
        const formData = new FormData();
        formData.append("file", clubImage);
        await api.post(`/images/${id}/logo`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }

      if (clubBanner) {
        const formData = new FormData();
        formData.append("file", clubBanner);
        await api.post(`/images/${id}/banner`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }

      console.log("Images uploaded");
      fetchClub(); // Обновим, если изображения отображаются
    } catch (err) {
      console.error("Image upload failed:", err);
    }
  };

  const handleMemberSubmit = async () => {
    try {
      const response = await api.post(
        "/clubs/member/add",
        {
          club_id: id,
          member_barcode: memberBarcode,
          name: memberFirstName,
          surname: memberLastName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log("Member added:", response.data);
      setMemberBarcode("");
      setMemberFirstName("");
      setMemberLastName("");
      fetchClub(); // Чтобы обновить список участников
    } catch (err) {
      console.error("Failed to add member:", err);
    }
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
            name="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, setClubImage)}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Club Banner</label>
          <input
            className="border-2"
            type="file"
            name="file"
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
          required
          type="text"
          value={memberBarcode}
          onChange={(e) => setMemberBarcode(e.target.value)}
          placeholder="Barcode"
          className="w-full p-2 border rounded"
        />
        <input
          required
          type="text"
          value={memberFirstName}
          onChange={(e) => setMemberFirstName(e.target.value)}
          placeholder="First Name"
          className="w-full p-2 border rounded"
        />
        <input
          required
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

      <Members club={club}></Members>
    </div>
  );
}

export default AdminPage;
