import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Base_url } from '../base_url/Base_url'
export const Users = createApi({
    reducerPath: 'users',
    baseQuery: fetchBaseQuery({
        baseUrl: Base_url,
    }),
    tagTypes: ['users'],
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => {
                return {
                    url: '/users',
                    method: 'GET'
                }
            },
            providesTags: ['users']
        }),
        addNewUser: builder.mutation({
            query: ({ name, bio }) => ({
                url: '/users',
                method: 'POST',
                body: { name, bio }
            }),
            invalidatesTags: ['users']
        }),
        updateExistUser: builder.mutation({
            query: ({ id , name, bio }) => (
                console.log("update_user", { name, bio }), {
                    url: `/users/${id}`,
                    method: 'PUT',
                    body: { name, bio }
                }),
            invalidatesTags: ['users']
        }),
        deleteExistUser: builder.mutation({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['users']
        })
    })

})

export const { useGetAllUsersQuery, useAddNewUserMutation, useUpdateExistUserMutation, useDeleteExistUserMutation } = Users;