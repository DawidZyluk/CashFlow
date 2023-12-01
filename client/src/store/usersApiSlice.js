import { apiSlice } from "./apiSlice";

const USERS_URL = "/api/users";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    getProfile: builder.query({
      query: () => ({
        url: `${USERS_URL}/profile`,
      }),
      keepUnusedDataFor: 1
    }),
    update: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    delete: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "DELETE",
        body: data,
      }),
    }),
    requestReset: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/requestReset`,
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/resetPassword`,
        method: "POST",
        body: data,
      }),
    }),
    verifyAccount: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/verifyAccount`,
        method: "POST",
        body: data,
      }),
    }),
    requestVerifyAccount: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/requestVerifyAccount`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetProfileQuery,
  useUpdateMutation,
  useDeleteMutation,
  useRequestResetMutation,
  useResetPasswordMutation,
  useVerifyAccountMutation,
  useRequestVerifyAccountMutation
} = usersApiSlice;
