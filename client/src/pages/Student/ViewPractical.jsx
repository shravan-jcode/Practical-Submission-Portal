import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetPracticalsQuery } from "../../features/student/studentApi";

const ViewPractical = () => {
  const { id } = useParams(); // the practicalId
  const navigate = useNavigate();

  // Fetch all practicals of student
  const { data, isLoading } = useGetPracticalsQuery();

  if (isLoading) return <div className="p-10 text-center">Loading...</div>;

  const all = data?.data || [];
  const practical = all.find((p) => p.practicalId === id);

  if (!practical)
    return <div className="p-10 text-center">Practical not found.</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <button
        onClick={() => navigate("/student/check-status")}
        className="mb-4 text-blue-500 font-medium hover:underline"
      >
        ← Back
      </button>

      <h2 className="text-2xl font-bold mb-4 text-gray-900">
        View Practical
      </h2>

      <div className="grid grid-cols-2 gap-4 mb-4 text-gray-700">
        <p><b>Subject:</b> {practical.subject}</p>
        <p><b>Class:</b> {practical.class} ({practical.classCode})</p>
        <p><b>Practical Number:</b> {practical.practicalNumber}</p>
        <p><b>Status:</b> {practical.status}</p>
      </div>

      {/* Inline file preview */}
      <div
        className="border rounded-lg overflow-hidden bg-gray-100 mb-6"
        style={{ height: "500px" }}
      >
        {practical.fileUrl.toLowerCase().endsWith(".pdf") ? (
          <embed
            src={practical.fileUrl}
            type="application/pdf"
            width="100%"
            height="100%"
          />
        ) : (
          <iframe
            title="Document Viewer"
            src={`https://docs.google.com/gview?url=${encodeURIComponent(
              practical.fileUrl
            )}&embedded=true`}
            width="100%"
            height="100%"
          />
        )}
      </div>
    </div>
  );
};

export default ViewPractical;
