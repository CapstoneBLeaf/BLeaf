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
  tagTypes: ["User", "Activity", "Habits", "Goals"],
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
      query: (id) => ({
        url: `/goals/user/${id}`,
        method: "GET",
      }),
      providesTags: ["Goals", "User"],
    }),
    createGoals: builder.mutation({
      query: (body) => ({
        url: `/goals/add`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Goals"],
    }),
    deleteGoal: builder.mutation({
      query: (id) => ({
        url: `/goals/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Goals"],
    }),
    updateGoals: builder.mutation({
      query: ({ id, token }) => ({
        url: `/habits/${id}`,
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
      invalidatesTags: ["Activity", "User"],
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
