import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam.p.rapidapi.com",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "963dbdad84msh07cf6cee773cb45p16dbd3jsnd226b82b1eb3"
      );
      headers.set("X-RapidAPI-Host", "shazam.p.rapidapi.com");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: () => "/charts/track",
    }),
    getSongDetails: builder.query({
      query: ({ songid }) => `/shazam-songs/get-details?id=${songid}`,
    }),
    getSongRelated: builder.query({
      query: ({ relatedtrackid }) =>
        `/shazam-songs/list-similarities?id=${relatedtrackid}`,
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} = shazamCoreApi;
