// pages/Student/CheckStatus.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetPracticalsQuery } from "../../features/student/studentApi";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  Upload,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

const PRIMARY_TEXT = "text-[#2B2B2B]";
const UI_BG_WHITE = "bg-[#FFFFFF]";
const CARD_BORDER = "border-[#cbd5e1]";
const SECONDARY_BUTTON_BG = "bg-[#284B63]";
const ACCENT_BUTTON_HOVER = "hover:bg-[#3C6E71]";
const ICON_COLOR = "text-[#4c7cff]";

const CheckStatus = () => {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState("All");
  const { data, isLoading, error } = useGetPracticalsQuery();

  if (isLoading)
    return (
      <div
        className={`p-8 text-center ${PRIMARY_TEXT} flex items-center justify-center h-40 ${UI_BG_WHITE}`}
      >
        <span className="font-medium">Loading submission status...</span>
      </div>
    );

  if (error)
    return (
      <div className="p-8 text-center text-red-600 bg-red-50 rounded-lg max-w-4xl mx-auto mt-6 border border-red-300">
        Failed to load submission status.
      </div>
    );

  const allPracticals = data?.data || [];
  const uniqueSubjects = ["All", ...new Set(allPracticals.map((p) => p.subject))];

  const filteredPracticals = allPracticals.filter((p) =>
    selectedSubject === "All" ? true : p.subject === selectedSubject
  );

  const getStatusPill = (status) => {
    switch (status) {
      case "Approved":
        return (
          <span className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
            <CheckCircle className="w-4 h-4" />
            Approved
          </span>
        );
      case "Rejected":
        return (
          <span className="flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
            <XCircle className="w-4 h-4" />
            Rejected
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
            <Clock className="w-4 h-4" />
            Pending
          </span>
        );
    }
  };

  const handleResubmit = (classId, subjectId) => {
    if (!classId || !subjectId) {
      console.warn("Missing classId or subjectId for practical resubmit", {
        classId,
        subjectId,
      });
      return alert("Cannot resubmit — class or subject ID is missing.");
    }
    navigate(`/student/submit/${classId}/${subjectId}`);
  };

  return (
    <div className={`p-8 max-w-5xl mx-auto ${UI_BG_WHITE}`}>
      <h1
        className={`text-3xl font-bold ${PRIMARY_TEXT} mb-8 border-b border-[#D4D4D4] pb-3 flex items-center gap-3`}
      >
        <FileText className={`w-8 h-8 ${ICON_COLOR}`} /> Practical Submission Status
      </h1>

      {/* Filter Section */}
      <div className="mb-6 flex items-center gap-4 p-4 bg-gray-50 rounded-lg border">
        <label
          htmlFor="subject-filter"
          className="font-medium text-gray-700 flex items-center gap-2"
        >
          <Search className="w-5 h-5" /> Filter by Subject:
        </label>

        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
          <SelectTrigger className="w-[180px] bg-white border-gray-300">
            <SelectValue placeholder="Select Subject" />
          </SelectTrigger>

          <SelectContent>
            {uniqueSubjects.map((sub) => (
              <SelectItem key={sub} value={sub}>
                {sub}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Practical Cards */}
      <div className="space-y-5">
        {filteredPracticals.length === 0 ? (
          <p className="text-center text-gray-600 p-10 bg-white rounded-lg shadow-inner">
            {selectedSubject === "All"
              ? "You have not submitted any practicals yet."
              : `No practicals found for the subject: ${selectedSubject}.`}
          </p>
        ) : (
          filteredPracticals.map((p) => (
            <Card
              key={p.practicalId}
              className={`shadow-lg ${CARD_BORDER} ${UI_BG_WHITE} rounded-xl`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-semibold text-blue-600">
                  {p.subject} — Practical #{p.practicalNumber}
                </CardTitle>

                <div className="flex items-center gap-3">
                  {getStatusPill(p.status)}

                  {/* Resubmit Button */}
                  {p.status === "Rejected" && (
                    <button
                      onClick={() => handleResubmit(p.classId, p.subjectId)}
                      className={`${SECONDARY_BUTTON_BG} text-white px-4 py-1.5 rounded-full text-sm font-semibold ${ACCENT_BUTTON_HOVER} transition-colors flex items-center gap-2`}
                    >
                      <Upload className="w-4 h-4" />
                      Resubmit
                    </button>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-700">
                  <p>
                    <span className="font-medium">Class:</span> {p.class} ({p.classCode})
                  </p>

                  <p>
                    <span className="font-medium">Submitted On:</span>{" "}
                    {new Date(p.submittedOn).toLocaleDateString()}
                  </p>

                  <p>
                    <span className="font-medium">Teacher:</span>{" "}
                    {p.teacherAssigned}
                  </p>

                  <p
                    onClick={() => navigate(`/student/view/${p.practicalId}`)}
                    className="text-blue-600 underline hover:text-blue-800 cursor-pointer"
                  >
                    View Practical
                  </p>

                </div>

                {p.status === "Rejected" && p.rejectionReason && (
                  <div className="mt-3 p-3 bg-red-50 border-l-4 border-red-500 rounded-md">
                    <p className="font-medium text-red-700">Reason:</p>
                    <p className="text-sm text-red-600">{p.rejectionReason}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default CheckStatus;
