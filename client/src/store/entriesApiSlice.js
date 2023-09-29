import { apiSlice } from "./apiSlice";

const DATA_URL = "/api/data";

export const entriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addEntry: builder.mutation({
      query: (data) => ({
        url: `${DATA_URL}/addEntry`,
        method: "POST",
        body: data,
      }),
    }),
    getEntries: builder.query({
      query: ({year, month}) => ({
        url: `${DATA_URL}/getEntries/${year}/${month}`,
      }),
      keepUnusedDataFor: 1
    }),
  }),
});

export const {
  useAddEntryMutation,
  useGetEntriesQuery
} = entriesApiSlice;