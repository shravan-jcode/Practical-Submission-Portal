// src/features/teacher/teacherApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const teacherApi = createApi({
  reducerPath: 'teacherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/teacher',
    credentials: 'include',
  }),
  tagTypes: ['Classes', 'Submissions'],   // <-- ADD THIS
  endpoints: (builder) => ({
    getClasses: builder.query({
      query: () => '/classes',
      providesTags: ['Classes'],
      transformResponse: (response) => response.classes,
    }),

    createClass: builder.mutation({
      query: (data) => ({
        url: '/classes',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Classes'],
    }),

    getSubmissions: builder.query({
      query: () => '/submissions',
      providesTags: ['Submissions'],      // <-- ADD THIS
    }),

    getSubmissionById: builder.query({
      query: (id) => `/submissions/${id}`,
      providesTags: ['Submissions'],      // <-- ADD THIS
    }),

    checkPractical: builder.mutation({
      query: ({ practicalId, data }) => ({
        url: `/submissions/${practicalId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Submissions'],   // <-- ADD THIS
    }),

    getApprovedSubmissions: builder.query({
      query: () => '/approved-submissions',
      providesTags: ['Submissions'],      // <-- ADD THIS
    }),
  }),
});


export const {
  useCreateClassMutation,
  useGetClassesQuery,
  useGetSubmissionsQuery,
  useGetSubmissionByIdQuery, // ✅ export this
  useCheckPracticalMutation,
  useGetApprovedSubmissionsQuery,
} = teacherApi;
