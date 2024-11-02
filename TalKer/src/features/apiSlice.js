// src/features/openaiApiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const openaiApi = createApi({
  reducerPath: 'openaiApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.openai.com/v1/chat',
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${import.meta.env.VITE_TALKER_API_KEY}`);
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchAdaResponse: builder.mutation({
      query: (prompt) => ({
        url: '/completions',
        method: 'POST',
        body: {
          model: 'gpt-3.5-turbo',
          prompt: prompt,
          max_tokens: 50,  // Adjust as needed
          temperature: 0.4, // Adjust as needed
        },
      }),
    }),
  }),
});

export const { useFetchAdaResponseMutation } = openaiApi;
