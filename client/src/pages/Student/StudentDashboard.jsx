import React from "react";
import { Link } from "react-router-dom";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Zap, Users, ListChecks, CheckSquare, GraduationCap } from "lucide-react";
import { useSelector } from "react-redux";
import { useGetMySubjectsQuery } from "../../features/student/studentApi";

const StudentDashboard = () => {
    const { user } = useSelector((state) => state.auth);

    const { data, isLoading } = useGetMySubjectsQuery();
    const classes = data?.data || [];

    let totalSubjects = 0;
    classes.forEach((cls) => {
        totalSubjects += cls.subjects?.length || 0;
    });

    const DashboardCard = ({ icon, title, description, linkTo, actionText }) => (
        <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border border-[#D4D4D4] bg-white rounded-xl hover:border-[#284B63]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                
                {/* FIXED: Match Teacher Dashboard */}
                <CardTitle className="text-sm font-medium text-gray-500">
                    {title}
                </CardTitle>

                {icon}
            </CardHeader>
            <CardContent>

                {/* FIXED: Match Teacher dashboard numbers */}
                <p className="text-4xl font-bold text-slate-800 mb-3">
                    {description}
                </p>

                <Button
                    asChild
                    className="w-full bg-[#284B63] hover:bg-[#3C6E71] transition-colors text-white font-medium rounded-lg shadow-md"
                >
                    <Link to={linkTo}>{actionText}</Link>
                </Button>
            </CardContent>
        </Card>
    );

    return (
        <div className="min-h-[calc(100vh-64px)] p-6 md:p-10 bg-[#f9fafb]">
            <div className="max-w-6xl mx-auto space-y-8">
                <header className="pb-4 border-b border-[#D4D4D4]">

                    {/* FIXED: Heading matches teacher dashboard */}
                    <h1 className="text-4xl font-extrabold text-slate-800 mb-2 flex items-center">
                        <GraduationCap className="h-8 w-8 mr-3 text-[#284B63]" />
                        Welcome back, {user?.name || "Student"}
                    </h1>

                    <p className="text-lg text-[#374151]">
                        Your hub for managing classes and practical submissions.
                    </p>
                </header>

                {isLoading ? (
                    <p className="text-[#374151] text-lg">Loading dashboard data...</p>
                ) : (
                    <div className="grid gap-6 md:grid-cols-3">
                        <DashboardCard
                            title="New Enrollment"
                            description="Join a New Class"
                            linkTo="/student/join-class"
                            actionText="Enter Code"
                            icon={<Zap className="h-6 w-6 text-[#4c7cff]" />}
                        />

                        <DashboardCard
                            title="Active Subjects"
                            description={`${totalSubjects} Subjects`}
                            linkTo="/student/my-classes"
                            actionText="View Subjects"
                            icon={<Users className="h-6 w-6 text-[#284B63]" />}
                        />

                        <DashboardCard
                            title="Practical Status"
                            description="Check Submissions"
                            linkTo="/student/check-status"
                            actionText="View Status"
                            icon={<ListChecks className="h-6 w-6 text-[#3C6E71]" />}
                        />
                    </div>
                )}

                <hr className="my-10 border-[#cbd5e1]" />

                <section className="space-y-6">

                    {/* FIXED: Match teacher dashboard section title */}
                    <h2 className="text-2xl font-semibold text-slate-800 flex items-center">
                        <CheckSquare className="h-5 w-5 mr-2 text-[#284B63]" />
                        Quick Actions
                    </h2>

                    <div className="grid gap-4 sm:grid-cols-2">
                        
                        <Link
                            to="/student/my-classes"
                            className="flex items-center space-x-4 p-5 bg-white border border-[#D4D4D4] rounded-xl hover:bg-[#f3f4f6] transition-colors duration-200 shadow-sm"
                        >
                            <CheckSquare className="h-6 w-6 text-[#4c7cff]" />
                            
                            {/* FIXED: match bold + size of teacher quick text */}
                            <span className="font-medium text-slate-800 text-base">
                                Access All Enrolled Classes and Practicals
                            </span>
                        </Link>

                        <Link
                            to="/profile"
                            className="flex items-center space-x-4 p-5 bg-white border border-[#D4D4D4] rounded-xl hover:bg-[#f3f4f6] transition-colors duration-200 shadow-sm"
                        >
                            <Users className="h-6 w-6 text-[#374151]" />
                            <span className="font-medium text-slate-800 text-base">
                                Update and Manage Your Profile Settings
                            </span>
                        </Link>

                    </div>
                </section>
            </div>
        </div>
    );
};

export default StudentDashboard;
