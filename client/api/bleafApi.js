import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const bleafApi = createApi({
  reducerPath: "bleafApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllHabits: builder.query({
      query: () => "/habits",
    }),
    getHabitsById: builder.query({
      query: (id) => `/habits/${id}`,
    }),
    createHabits: builder.mutation({
      query: (body) => ({
        url: "/habits",
        method: "POST",
        body: body,
      }),
    }),
    deleteHabits: builder.mutation({
      query: ({ id, token }) => ({
        url: `/habits/${id}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
    getAllUsers: builder.query({
      query: () => "/users",
    }),
    getUsersById: builder.query({
      query: (id, token) => ({
        url: `/users/${id}`,
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
    createUsers: builder.mutation({
      query: (body) => ({
        url: "/users/register",
        method: "POST",
        body: body,
      }),
    }),
    loginUser: builder.mutation({
      query: (body) => ({
        url: "/users/login",
        method: "POST",
        body,
      }),
    }),
    deleteUser: builder.mutation({
      query: ({ id, token }) => ({
        url: `/users/${id}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
    getAllGoals: builder.query({
      query: () => "/goals",
    }),
    getGoalsById: builder.query({
      query: (id) => `/goals/${id}`,
    }),
    createGoals: builder.mutation({
      query: (body) => ({
        url: "/goals",
        method: "POST",
        body: body,
      }),
    }),
    deleteGoal: builder.mutation({
      query: ({ id, token }) => ({
        url: `/goals/${id}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
    updateGoals: builder.mutation({
      query: ({ id, token }) => ({
        url: `/habits/${id}`,
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
    getAllJournals: builder.query({
      query: () => "/journals",
    }),
    getJournalsById: builder.query({
      query: (id) => `/journals/${id}`,
    }),
    createJournals: builder.mutation({
      query: (body) => ({
        url: "/journals",
        method: "POST",
        body: body,
      }),
    }),
    deleteJournals: builder.mutation({
      query: ({ id, token }) => ({
        url: `/journals/${id}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
    updateJournals: builder.mutation({
      query: ({ id, token }) => ({
        url: `/habits/${id}`,
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
    getAllPlants: builder.query({
      query: () => "/plants",
    }),
    getPlantsById: builder.query({
      query: (id) => `/plants/${id}`,
    }),
    createPlants: builder.mutation({
      query: (body) => ({
        url: "/plants",
        method: "POST",
        body: body,
      }),
    }),
    deletePlants: builder.mutation({
      query: ({ id, token }) => ({
        url: `/plants/${id}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
    updatePlants: builder.mutation({
      query: ({ id, token }) => ({
        url: `/plants/${id}`,
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
  }),
});

export const {
  useGetAllHabitsQuery,
  useGetHabitsByIdQuery,
  useCreateHabitsMutation,
  useDeleteHabitsMutation,
  useGetAllUsersQuery,
  useGetUsersByIdQuery,
  useCreateUsersMutation,
  useLoginUserMutation,
  useDeleteUserMutation,
  useGetAllGoalsQuery,
  useGetGoalsByIdQuery,
  useCreateGoalsMutation,
  useDeleteGoalMutation,
  useUpdateGoalsMutation,
  useGetAllJournalsQuery,
  useGetJournalsByIdQuery,
  useCreateJournalsMutation,
  useDeleteJournalsMutation,
  useUpdateJournalsMutation,
  useGetAllPlantsQuery,
  useGetPlantsByIdQuery,
  useCreatePlantsMutation,
  useDeletePlantsMutation,
  useUpdatePlantsMutation,
} = bleafApi;
