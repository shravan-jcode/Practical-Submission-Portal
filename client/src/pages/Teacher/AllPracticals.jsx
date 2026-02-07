import React, { useState } from "react";
import { useGetApprovedSubmissionsQuery } from "../../features/teacher/teacherApi";
import { useNavigate } from "react-router-dom";
import { Search, ChevronRight, FileCheck, Loader2, AlertTriangle } from "lucide-react";

const AllPracticals = () => {
  const { data, isLoading, error } = useGetApprovedSubmissionsQuery();
  const navigate = useNavigate();

  const [searchName, setSearchName] = useState("");
  const [filterSubject, setFilterSubject] = useState("");
  const [filterClass, setFilterClass] = useState("");

  // --- STYLING CONSTANTS (Updated for a cleaner look) ---
  const PRIMARY_TEXT = "text-gray-900"; 
  const HEADING_TEXT = "text-gray-800"; 
  const UI_BG_WHITE = "bg-white"; 
  const CARD_BG = "bg-gray-50"; 
  const INPUT_BG = "bg-white"; 
  const BORDER_COLOR = "border-gray-300"; 
  const SUBTLE_TEXT = "text-gray-500"; 
  const SECONDARY_BUTTON_BG = "bg-[#284B63]";
  const ACCENT_BUTTON_HOVER = "hover:bg-[#3C6E71]";
  const FOCUS_RING = "focus:ring-blue-500"; 
  const ICON_COLOR = "text-[#3C6E71]"; 
  // --------------------------------------------------------

  if (isLoading)
    return (
      <div className={`text-center p-12 ${UI_BG_WHITE} flex justify-center items-center h-48`}>
        <Loader2 className="w-6 h-6 animate-spin mr-3 text-[#284B63]" />
        <span className={`${PRIMARY_TEXT} font-medium`}>Loading approved practicals...</span>
      </div>
    );

  if (error)
    return (
      <div className="text-center p-8 bg-red-50 text-red-600 border border-red-300 rounded-lg max-w-6xl mx-auto mt-6">
        <AlertTriangle className="w-5 h-5 inline-block mr-2" />
        <span className="font-semibold">Failed to load approved practicals.</span>
      </div>
    );

  let approved = data?.data || [];

  const subjects = [...new Set(approved.map((p) => p.subject))];
  const classes = [...new Set(approved.map((p) => p.className))];

  // --- FILTERING LOGIC ---
  approved = approved.filter((p) => {
    return (
      p.studentName.toLowerCase().includes(searchName.toLowerCase()) &&
      (filterSubject ? p.subject === filterSubject : true) &&
      (filterClass ? p.className === filterClass : true)
    );
  });
  // -----------------------

  return (
    <div className={`max-w-6xl mx-auto p-8 ${UI_BG_WHITE} shadow-xl rounded-xl mt-6`}>
      <h2 className={`text-3xl font-bold mb-8 ${HEADING_TEXT} border-b border-gray-200 pb-4 flex items-center`}>
        <FileCheck className={`w-7 h-7 mr-3 ${ICON_COLOR}`} />
        Approved Practical Submissions
      </h2>

      {/* FILTERS - STYLING IMPROVED */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        
        {/* 1. Search by Student Name */}
        <div className="relative">
          <Search className={`w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 ${SUBTLE_TEXT}`} />
          <input
            type="text"
            placeholder="Search by Student Name"
            className={`w-full p-3 pl-10 border ${BORDER_COLOR} rounded-xl ${INPUT_BG} ${PRIMARY_TEXT} placeholder-${SUBTLE_TEXT.split('-')[1]} focus:outline-none focus:ring-2 ${FOCUS_RING} shadow-sm transition duration-150`}
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>

        {/* 2. Filter by Subject (Custom Styled Select) */}
        <div className="relative">
          <select
            className={`w-full p-3 border ${BORDER_COLOR} ${INPUT_BG} rounded-xl ${PRIMARY_TEXT} focus:ring-2 ${FOCUS_RING} shadow-sm appearance-none pr-10 transition duration-150`}
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
          >
            <option value="" disabled>Filter by Subject</option>
            {subjects.map((subj) => (
              <option key={subj} value={subj}>{subj}</option>
            ))}
          </select>
          {/* Custom Arrow Down Icon */}
          <ChevronRight className={`w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none ${SUBTLE_TEXT}`} />
        </div>

        {/* 3. Filter by Class (Custom Styled Select) */}
        <div className="relative">
          <select
            className={`w-full p-3 border ${BORDER_COLOR} ${INPUT_BG} rounded-xl ${PRIMARY_TEXT} focus:ring-2 ${FOCUS_RING} shadow-sm appearance-none pr-10 transition duration-150`}
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
          >
            <option value="" disabled>Filter by Class</option>
            {classes.map((cls) => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>
          {/* Custom Arrow Down Icon */}
          <ChevronRight className={`w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none ${SUBTLE_TEXT}`} />
        </div>
      </div>
      {/* END OF FILTERS */}
      
      <hr className="border-gray-200 mb-6"/>

      {/* LIST */}
      <div className="space-y-4">
        {approved.map((p) => (
          <div
            key={p.practicalId}
            className={`p-5 border border-gray-200 rounded-xl ${CARD_BG} flex justify-between items-center hover:shadow-md cursor-pointer transition-all duration-200`}
            onClick={() => navigate(`/teacher/approved/${p.practicalId}`)} // Made the entire card clickable
          >
            <div>
              <p className={`font-semibold ${PRIMARY_TEXT} text-lg`}>
                {p.studentName}
              </p>

              <p className={`text-sm ${SUBTLE_TEXT} mt-0.5`}>
                <span className="font-medium text-[#284B63]">{p.subject}</span> | {p.className} |
                Practical {p.practicalNumber} | Roll No: {p.studentRollNumber}
              </p>
            </div>

            <div 
               className={`px-4 py-2 ${SECONDARY_BUTTON_BG} text-white rounded-lg font-medium ${ACCENT_BUTTON_HOVER} flex items-center shadow-sm`}
            >
              Preview Details <ChevronRight className="w-5 h-5 ml-2" />
            </div>
          </div>
        ))}

        {approved.length === 0 && (
          <div className="text-center p-10 bg-gray-50 border border-gray-300 rounded-xl">
            <Search className="w-8 h-8 mx-auto mb-3 text-gray-400" />
            <p className="font-semibold text-gray-600">
                No approved practical submissions match your current filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPracticals;