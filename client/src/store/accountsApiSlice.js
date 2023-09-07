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
      keepUnusedDataFor: 1
    }),
  }),
});

export const {
  useAddAccountMutation,
  useGetAccountsQuery
} = accountsApiSlice;