import { apiSlice } from "./apiSlice";

const DATA_URL = "/api/stats";

export const statsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStats: builder.query({
      query: () => ({
        url: `${DATA_URL}/getStats`,
      }),
      keepUnusedDataFor: 1
    }),
  }),
});

export const {
  useGetStatsQuery
} = statsApiSlice;