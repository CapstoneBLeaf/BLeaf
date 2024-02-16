import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const bleafApi = createApi({
  reducerPath: "bleafApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bleaf-backend.onrender.com/api",
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["User", "Activity", "Habits"],
  endpoints: (builder) => ({
    getAllHabits: builder.query({
      query: () => "/habits",
      providesTags: ["Habits"],
    }),
    getHabitsById: builder.query({
      query: (id) => `/habits/${id}`,
      providesTags: ["Habits"],
    }),
    createHabits: builder.mutation({
      query: (body) => ({
        url: "/habits",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Habits"],
    }),
    deleteHabits: builder.mutation({
      query: ({ id, token }) => ({
        url: `/habits/${id}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["Habits"],
    }),
    getAllUsers: builder.query({
      query: () => "/users",
      providesTags: ["User"],
    }),
    getUsersById: builder.query({
      query: (id, token) => ({
        url: `/users/${id}`,
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: ["User"],
    }),
    register: builder.mutation({
      query: (body) => ({
        url: "/users/register",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    loginUser: builder.mutation({
      query: (body) => ({
        url: "/users/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: ({ id, token }) => ({
        url: `/users/${id}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["User"],
    }),
    getAllGoals: builder.query({
      query: () => "/goals",
    }),
    getGoalsById: builder.query({
      query: (id) => `/goals/${id}`,
    }),
    createGoals: builder.mutation({
      query: ({ name, frequency, achivements }) => ({
        url: "/goals",
        method: "POST",
        body: { name, frequency, achivements },
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
    //list checkIn habits
    listCheckIn: builder.query({
      query: (id) => ({
        url: `/activity/user/${id}`,
        method: "GET",
      }),
      providesTags: ["Activity", "User"],
    }),

    //checkIn a habit
    CheckIn: builder.mutation({
      query: (data) => ({
        url: `/activity/${data.id}/add`,
        method: "POST",
        body: { userId: data.userId },
      }),
      invalidatesTags: ["Activity"],
    }),
    //remove CheckIn
    removeCheckIn: builder.mutation({
      query: (data) => ({
        url: `/activity/${data.id}/delete`,
        method: "DELETE",
        body: { userId: data.userId },
      }),
      invalidatesTags: ["Activity"],
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
  useRegisterMutation,
  useLoginUserMutation,
  useDeleteUserMutation,
  useGetAllGoalsQuery,
  useGetGoalsByIdQuery,
  useCreateGoalsMutation,
  useDeleteGoalMutation,
  useUpdateGoalsMutation,
  useGetAllPlantsQuery,
  useGetPlantsByIdQuery,
  useCreatePlantsMutation,
  useDeletePlantsMutation,
  useUpdatePlantsMutation,
  useListCheckInQuery,
  useCheckInMutation,
  useRemoveCheckInMutation,
} = bleafApi;
