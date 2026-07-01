import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:3000/api/v1";

const getAuthHeaders = () => {
  const token = sessionStorage.getItem("admin_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const portfolioApi = createApi({
  reducerPath: "portfolioApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE,
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem("admin_token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Profile", "Projects", "Experiences", "Educations"],
  endpoints: (builder) => ({
    // ── Auth ─────────────────────────────────────
    signIn: builder.mutation({
      query: (body) => ({
        url: "/auth/sign_in",
        method: "POST",
        body,
      }),
    }),

    // ── Profile ──────────────────────────────────
    getProfile: builder.query({
      query: () => "/profile",
      providesTags: ["Profile"],
    }),
    updateProfile: builder.mutation({
      query: (body) => ({
        url: "/profile",
        method: "PUT",
        headers: getAuthHeaders(),
        body,
      }),
      invalidatesTags: ["Profile"],
    }),

    // ── Projects ─────────────────────────────────
    getProjects: builder.query({
      query: () => "/projects",
      providesTags: ["Projects"],
    }),
    createProject: builder.mutation({
      query: (body) => ({
        url: "/projects",
        method: "POST",
        headers: getAuthHeaders(),
        body,
      }),
      invalidatesTags: ["Projects"],
    }),
    updateProject: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/projects/${id}`,
        method: "PUT",
        headers: getAuthHeaders(),
        body,
      }),
      invalidatesTags: ["Projects"],
    }),
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "DELETE",
        headers: getAuthHeaders(),
      }),
      invalidatesTags: ["Projects"],
    }),

    // ── Experiences ──────────────────────────────
    getExperiences: builder.query({
      query: () => "/experiences",
      providesTags: ["Experiences"],
    }),
    createExperience: builder.mutation({
      query: (body) => ({
        url: "/experiences",
        method: "POST",
        headers: getAuthHeaders(),
        body,
      }),
      invalidatesTags: ["Experiences"],
    }),
    updateExperience: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/experiences/${id}`,
        method: "PUT",
        headers: getAuthHeaders(),
        body,
      }),
      invalidatesTags: ["Experiences"],
    }),
    deleteExperience: builder.mutation({
      query: (id) => ({
        url: `/experiences/${id}`,
        method: "DELETE",
        headers: getAuthHeaders(),
      }),
      invalidatesTags: ["Experiences"],
    }),

    // ── Education ────────────────────────────────
    getEducations: builder.query({
      query: () => "/educations",
      providesTags: ["Educations"],
    }),
    createEducation: builder.mutation({
      query: (body) => ({
        url: "/educations",
        method: "POST",
        headers: getAuthHeaders(),
        body,
      }),
      invalidatesTags: ["Educations"],
    }),
    updateEducation: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/educations/${id}`,
        method: "PUT",
        headers: getAuthHeaders(),
        body,
      }),
      invalidatesTags: ["Educations"],
    }),
    deleteEducation: builder.mutation({
      query: (id) => ({
        url: `/educations/${id}`,
        method: "DELETE",
        headers: getAuthHeaders(),
      }),
      invalidatesTags: ["Educations"],
    }),

    // ── Gems & Contact ───────────────────────────
    getGems: builder.query({
      query: () => "/gems",
    }),
    submitContact: builder.mutation({
      query: (body) => ({
        url: "/contact",
        method: "POST",
        body: { contact_message: body },
      }),
    }),
  }),
});

export const {
  useSignInMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetProjectsQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useGetExperiencesQuery,
  useCreateExperienceMutation,
  useUpdateExperienceMutation,
  useDeleteExperienceMutation,
  useGetEducationsQuery,
  useCreateEducationMutation,
  useUpdateEducationMutation,
  useDeleteEducationMutation,
  useGetGemsQuery,
  useSubmitContactMutation,
} = portfolioApi;
