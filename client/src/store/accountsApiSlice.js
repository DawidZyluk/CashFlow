import { apiSlice } from "./apiSlice";

const ACCOUNTS_URL = "/api/accounts";

export const accountsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addAccount: builder.mutation({
      query: (data) => ({
        url: `${ACCOUNTS_URL}/addAccount`,
        method: "POST",
        body: data,
      }),
    }),
    getAccounts: builder.query({
      query: () => ({
        url: `${ACCOUNTS_URL}/getAccounts`,
      }),
      keepUnusedDataFor: 1,
    }),
    getAccount: builder.query({
      query: (id) => ({
        url: `${ACCOUNTS_URL}/${id}`,
      }),
      keepUnusedDataFor: 1,
    }),
    deleteAccount: builder.mutation({
      query: (id) => ({
        url: `${ACCOUNTS_URL}/${id}`,
        method: "DELETE",
      }),
    }),
    updateAccount: builder.mutation({
      query: (data) => ({
        url: `${ACCOUNTS_URL}/updateAccount`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useAddAccountMutation,
  useGetAccountsQuery,
  useGetAccountQuery,
  useDeleteAccountMutation,
  useUpdateAccountMutation
} = accountsApiSlice;
