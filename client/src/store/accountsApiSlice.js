import { apiSlice } from "./apiSlice";

const DATA_URL = "/api/accounts";

export const accountsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addAccount: builder.mutation({
      query: (data) => ({
        url: `${DATA_URL}/addAccount`,
        method: "POST",
        body: data,
      }),
    }),
    getAccounts: builder.query({
      query: () => ({
        url: `${DATA_URL}/getAccounts`,
      }),
      keepUnusedDataFor: 1
    }),
  }),
});

export const {
  useAddAccountMutation,
  useGetAccountsQuery
} = accountsApiSlice;