import { createAsyncThunk } from "@reduxjs/toolkit"
import { db } from "../../config"
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, limit, orderBy, query, startAfter, updateDoc, } from "firebase/firestore"

export const getIntialBlogPosts = createAsyncThunk("blogposts/getIntialPost", async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
        const q = query(collection(db, "/blogposts"), limit(6), orderBy("createdAt", "desc"))
        const res = await getDocs(q)
        const blogPosts = res.docs.map((blog) => ({ bid: blog.id, ...blog.data() }))
        return fulfillWithValue(blogPosts)
    } catch (e) {
        console.log(e)
        return rejectWithValue(e.message)
    }
})

export const getBlogPostById = createAsyncThunk("blogposts/getBlogPostById", async (payload, { fulfillWithValue, rejectWithValue, getState }) => {
    try {
        const blogIds = getState().blogposts.ids
        if (!blogIds.includes(payload)) {
            const blog = await getDoc(doc(db, "/blogposts/" + payload));
            const blogPost = { bid: blog.id, ...blog.data() }
            return fulfillWithValue(blogPost);
        } else {
            return fulfillWithValue(null);
        }
    } catch (e) {
        return rejectWithValue(e.message)
    }
})

export const postBlog = createAsyncThunk("blogposts/postBlog", async ({ title, content, link }, { fulfillWithValue, rejectWithValue }) => {
    try {
        const data = { title, content, link, createdAt: new Date(Date.now()).getTime() }
        const res = await addDoc(collection(db, "/blogposts"), data)
        return fulfillWithValue({ bid: res.id, ...data })
    } catch (e) {
        return rejectWithValue(e)
    }
})

export const updateBlog = createAsyncThunk("blogposts/update", async ({ bid, title, link, content }, { fulfillWithValue, rejectWithValue }) => {
    try {
        const data = { title, content, link, updatedAt: new Date(Date.now()).getTime() }
        await updateDoc(doc(db, "blogposts/" + bid), data)
        const updatedBlogPost = { bid, ...data }
        console.log(updatedBlogPost)
        return fulfillWithValue(updatedBlogPost)
    } catch (e) {
        return rejectWithValue(e)
    }
})

export const deleteBlog = createAsyncThunk("blogposts/delete", async ({ bid }, { fulfillWithValue, rejectWithValue }) => {
    try {
        await deleteDoc(doc(db, "blogposts/" + bid))
        return fulfillWithValue(bid)
    } catch (e) {
        return rejectWithValue(e)
    }
})

export const fetchMoreBlogPosts = createAsyncThunk("blogposts/fetchMore", async (payload, { fulfillWithValue, rejectWithValue, getState }) => {
    try {
        const last_bid = getState().blogposts.ids
        const lastDocRef = await getDoc(doc(db, "/blogposts/" + last_bid[last_bid.length - 1]))
        const q = query(collection(db, "/blogposts"), orderBy("createdAt", "desc"), startAfter(lastDocRef), limit(6))
        const res = await getDocs(q)
        const blogPosts = res.docs.map((blog) => ({ bid: blog.id, ...blog.data() }))
        return fulfillWithValue(blogPosts);
    } catch (e) {
        return rejectWithValue(e)
    }
})
