import { PauseCircleIcon } from "@heroicons/react/24/solid";
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit"
import { deleteBlog, fetchMoreBlogPosts, getBlogPostById, getIntialBlogPosts, postBlog, updateBlog } from "./api/blog.api";


const BlogAdapter = createEntityAdapter({
    selectId: (blog) => blog.bid,
    sortComparer: (a, b) => b.createdAt - a.createdAt
})

export const BlogSlice = createSlice({
    name: "blogposts",
    reducers: {},
    initialState: BlogAdapter.getInitialState({ hasMore: true, isDeleting: false, intialloading: false, isPosting: false, isFetchError: null, isPostError: null }),
    extraReducers: {
        [getIntialBlogPosts.fulfilled]: (state, { payload }) => {
            BlogAdapter.addMany(state, payload)
            state.intialloading = false;
        },
        [getIntialBlogPosts.pending]: (state) => {
            state.intialloading = true
        },
        [getBlogPostById.fulfilled]: (state, { payload }) => {
            if (payload !== null)
                BlogAdapter.addOne(state, payload)
        },
        [getBlogPostById.rejected]: (state) => {
            state.isFetchError = "something went wrong ! try again later"
        },
        [postBlog.fulfilled]: (state, { payload }) => {
            BlogAdapter.addOne(state, payload)
            state.isPosting = false;
            state.isPostError = null;
        },
        [postBlog.pending]: (state) => {
            state.isPosting = true;
        },
        [postBlog.rejected]: (state) => {
            state.isPostError = "something went wrong, try again later !"
            state.isPosting = false;
        },
        [fetchMoreBlogPosts.fulfilled]: (state, { payload }) => {
            if (payload.length == 0)
                state.hasMore = false;
            BlogAdapter.addMany(state, payload)
        },
        [updateBlog.fulfilled]: (state, { payload }) => {
            BlogAdapter.updateOne(state, { id: payload.bid, changes: payload })
            state.isPosting = false;
        },
        [updateBlog.pending]: (state) => {
            state.isPosting = true;
        },
        [deleteBlog.fulfilled]: (state, { payload }) => {
            BlogAdapter.removeOne(state, payload);
            state.isDeleting = false;
        },
        [deleteBlog.pending]: (state, { payload }) => {
            state.isDeleting = true;
        },
    }
})

export const BlogSelector = BlogAdapter.getSelectors(state => state.blogposts);