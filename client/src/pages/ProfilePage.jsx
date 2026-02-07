// src/pages/ProfilePage.jsx

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetMeQuery } from "../features/auth/authApi";
import { useJoinClassMutation } from "../features/student/studentApi";
import { useGetClassesQuery } from "../features/teacher/teacherApi"; 
import { clearUser } from "../features/auth/authSlice";
import { useLogoutMutation } from "../features/auth/authApi";

import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Loader2, LogOut, School, User, BookOpen } from "lucide-react";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetMeQuery();
  const [logout] = useLogoutMutation();
  const [joinClass] = useJoinClassMutation();
  const [classCode, setClassCode] = useState("");

  const user = data?.user;

  const { data: teacherClasses } = useGetClassesQuery(undefined, {
    skip: user?.role !== "Teacher",
  });

  const handleLogout = async () => {
    await logout();
    dispatch(clearUser());
    window.location.href = "/login";
  };

  const handleJoinClass = async () => {
    if (!classCode.trim()) return;
    try {
      const res = await joinClass(classCode).unwrap();
      alert("Successfully joined class");
      setClassCode("");
    } catch (err) {
      alert(err?.data?.message || "Failed to join class");
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin" />
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto mt-10 px-3">
      {/* Profile Card */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <User size={20} /> Profile
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3 text-sm">
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Role:</strong> {user?.role}</p>
          <p><strong>College:</strong> {user?.collegeName}</p>
        </CardContent>
      </Card>

      {/* Student Section */}
      {user?.role === "Student" && (
        <Card className="shadow-md mt-6">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <School size={20} /> Your Classes
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {user?.classes?.length > 0 ? (
              user.classes.map((c) => (
                <div key={c} className="p-2 rounded border">
                  Class ID: {c}
                </div>
              ))
            ) : (
              <p>No classes joined yet.</p>
            )}

            <div className="flex gap-2 mt-3">
              <Input
                placeholder="Enter class code"
                value={classCode}
                onChange={(e) => setClassCode(e.target.value)}
              />
              <Button onClick={handleJoinClass}>Join</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Teacher Section */}
      {user?.role === "Teacher" && (
        <Card className="shadow-md mt-6">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <BookOpen size={20} /> Your Created Classes
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            {teacherClasses && teacherClasses.length > 0 ? (
              teacherClasses.map((cls) => (
                <div
                  key={cls._id}
                  className="border p-2 rounded bg-gray-50 hover:bg-gray-100"
                >
                  <p><strong>Name:</strong> {cls.className}</p>
                  <p><strong>Code:</strong> {cls.classCode}</p>
                </div>
              ))
            ) : (
              <p>No classes created yet.</p>
            )}

            <Button className="mt-2" onClick={() => (window.location.href = "/teacher/create-class")}>
              Create New Class
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Logout Button */}
      <div className="mt-8 text-center">
        <Button
          variant="destructive"
          className="flex items-center gap-2 mx-auto"
          onClick={handleLogout}
        >
          <LogOut size={18} /> Logout
        </Button>
      </div>
    </div>
  );
};

export default ProfilePage;
