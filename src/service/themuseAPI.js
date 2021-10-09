import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const themuseApi = createApi({
  reducerPath: "themuseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.themuse.com/api/public/",
  }),
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: (src = { category: "", location: "", page_index: 1 }) =>
        `jobs?${src.category}${src.location}&page=${src.page_index}`,
    }),
    getJob: builder.query({
      query: (id) => `jobs/${id}`,
    }),
    getCompany: builder.query({
      query: (id) => `companies/${id}`,
    }),
  }),
});

export const { useGetJobsQuery } = themuseApi;
export const { useGetJobQuery } = themuseApi;
export const { useGetCompanyQuery } = themuseApi;
