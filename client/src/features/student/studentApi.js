import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const studentApi = createApi({
    reducerPath: 'studentApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/student',
        credentials: 'include',
    }),
    tagTypes: ["Classes", "Subjects"],  // <-- ADD THIS
    endpoints: (builder) => ({
        joinClass: builder.mutation({
            query: (classCode) => ({
                url: '/join-class',
                method: 'POST',
                body: { classCode },
            }),
            invalidatesTags: ["Classes", "Subjects"],  // <-- ADD THIS
        }),

        getMySubjects: builder.query({
            query: () => '/my-subjects',
            providesTags: ["Classes", "Subjects"],  // <-- ADD THIS
        }),

        getClassById: builder.query({
            query: (classId) => `/class/${classId}`,
            providesTags: ["Classes"],  // <-- ADD THIS
        }),

        uploadPractical: builder.mutation({
            query: ({ classId, formData }) => ({
                url: `/upload-practical/${classId}`,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ["Classes", "Subjects"], // optional if needed
        }),

        getPracticals: builder.query({
            query: () => '/practicals',
        }),
    }),
});

export const {
    useJoinClassMutation,
    useUploadPracticalMutation,
    useGetPracticalsQuery,
    useGetMySubjectsQuery,
    useGetClassByIdQuery,
} = studentApi;
