<template>
    <div class="overflow-hidden overflow-x-auto p-6 bg-white border-gray-200">
        <div class="min-w-full align-middle">
            <div class="mb-4 grid lg:grid-cols-4 gap-4">
                <input v-model="searchGlobal" type="text" placeholder="Search..."
                       class="inline-block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
            </div>
            <table class="min-w-full divide-y divide-gray-200 border">
                <thead>
                <tr>
                    <th class="px-6 py-3 bg-gray-50 text-left">
                        <input v-model="searchId" type="text"
                               class="inline-block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                               placeholder="Filter by ID">
                    </th>
                    <th class="px-6 py-3 bg-gray-50 text-left">
                        <input v-model="searchTitle" type="text"
                               class="inline-block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                               placeholder="Filter by Title">
                    </th>
                    <th class="px-6 py-3 bg-gray-50 text-left">
                        <select v-model="searchCategory"
                                class="inline-block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                            <option value="" selected>-- all categories --</option>
                            <option v-for="category in categories" :value="category.id">
                                {{ category.title }}
                            </option>
                        </select>
                    </th>
                    <th class="px-6 py-3 bg-gray-50 text-left">
                        <input v-model="searchContent" type="text"
                               class="inline-block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                               placeholder="Filter by Content">
                    </th>
                    <th class="px-6 py-3 bg-gray-50 text-left"></th>
                    <th class="px-6 py-3 bg-gray-50 text-left"></th>
                </tr>
                <tr>
                    <th class="px-6 py-3 bg-gray-50 text-left">
                        <div class="flex flex-row items-center justify-between cursor-pointer"
                             @click="updateOrdering('id')">
                            <div class="leading-4 font-medium text-gray-500 uppercase tracking-wider"
                                 :class="{ 'font-bold text-blue-600': orderColumn === 'id' }">
                                ID
                            </div>
                            <div class="select-none">
                                <span :class="{
                                  'text-blue-600': orderDirection === 'asc' && orderColumn === 'id',
                                  'hidden': orderDirection !== '' && orderDirection !== 'asc' && orderColumn === 'id',
                                }">&uarr;</span>
                                <span :class="{
                                  'text-blue-600': orderDirection === 'desc' && orderColumn === 'id',
                                  'hidden': orderDirection !== '' && orderDirection !== 'desc' && orderColumn === 'id',
                                }">&darr;</span>
                            </div>
                        </div>
                    </th>
                    <th class="px-6 py-3 bg-gray-50 text-left">
                        <div class="flex flex-row items-center justify-between cursor-pointer"
                             @click="updateOrdering('title')">
                            <div class="leading-4 font-medium text-gray-500 uppercase tracking-wider"
                                 :class="{ 'font-bold text-blue-600': orderColumn === 'title' }">
                                Title
                            </div>
                            <div class="select-none">
                                <span :class="{
                                  'text-blue-600': orderDirection === 'asc' && orderColumn === 'title',
                                  'hidden': orderDirection !== '' && orderDirection !== 'asc' && orderColumn === 'title',
                                }">&uarr;</span>
                                <span :class="{
                                  'text-blue-600': orderDirection === 'desc' && orderColumn === 'title',
                                  'hidden': orderDirection !== '' && orderDirection !== 'desc' && orderColumn === 'title',
                                }">&darr;</span>
                            </div>
                        </div>
                    </th>
                    <th class="px-6 py-3 bg-gray-50 text-left">
                        <span
                            class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Content</span>
                    </th>
                    <th class="px-6 py-3 bg-gray-50 text-left">
                        <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Category</span>
                    </th>
                    <th class="px-6 py-3 bg-gray-50 text-left">
                        <div class="flex flex-row items-center justify-between cursor-pointer"
                             @click="updateOrdering('created_at')">
                            <div class="leading-4 font-medium text-gray-500 uppercase tracking-wider"
                                 :class="{ 'font-bold text-blue-600': orderColumn === 'created_at' }">
                                Created_at
                            </div>
                            <div class="select-none">
                                <span :class="{
                                  'text-blue-600': orderDirection === 'asc' && orderColumn === 'created_at',
                                  'hidden': orderDirection !== '' && orderDirection !== 'asc' && orderColumn === 'created_at',
                                }">&uarr;</span>
                                <span :class="{
                                  'text-blue-600': orderDirection === 'desc' && orderColumn === 'created_at',
                                  'hidden': orderDirection !== '' && orderDirection !== 'desc' && orderColumn === 'created_at',
                                }">&darr;</span>
                            </div>
                        </div>
                    </th>
                    <th class="px-6 py-3 bg-gray-50 text-left">Actions</th>
                </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200 divide-solid">
                <tr v-for="post in posts.data">
                    <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">{{ post.id }}</td>
                    <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">{{ post.title }}</td>
                    <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">{{ post.content }}</td>
                    <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">{{ post.category }}</td>
                    <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">{{ post.created_at }}</td>
                    <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                        <router-link v-if="can('post.update')" :to="{name: 'post.edit', params: {id: post.id }}">
                            Edit
                        </router-link>

                        <a href="#" v-if="can('post.delete')" @click.prevent="deletePost(post.id)"
                           class="ml-1">Delete</a>
                    </td>
                </tr>
                </tbody>
            </table>

            <Pagination :data="posts" @pagination-change-page="page => getPosts(page,selectedCategory)" />
        </div>
    </div>
</template>

<script>

import { useAbility } from '@casl/vue'
import { onMounted, ref, watch } from 'vue';
import useCategories from '../../composables/categories.js';
import usePosts from "../../composables/posts";

export default {
    name: "Index",
    setup() {
        const searchCategory = ref('');
        const searchId = ref('');
        const searchTitle = ref('');
        const searchContent = ref('');
        const searchGlobal = ref('');
        const orderColumn = ref('created_at');
        const orderDirection = ref('desc');
        const { posts, getPosts, deletePost } = usePosts();
        const { categories, getCategories } = useCategories();
        const { can } = useAbility()

        const updateOrdering = (column) => {
            orderColumn.value = column;
            orderDirection.value = (
                orderDirection.value === 'asc'
            ) ? 'desc' : 'asc';

            getPosts(
                1,
                searchCategory.value,
                searchId.value,
                searchTitle.value,
                searchContent.value,
                searchGlobal.value,
                orderColumn.value,
                orderDirection.value
            );
        }

        watch(searchCategory, (current, previous) => {
            getPosts(
                1,
                current,
                searchId.value,
                searchTitle.value,
                searchContent.value,
                searchGlobal.value,
            );
        });
        watch(searchId, (current, previous) => {
            getPosts(
                1,
                searchCategory.value,
                current,
                searchTitle.value,
                searchContent.value,
                searchGlobal.value,
            );
        });
        watch(searchTitle, (current, previous) => {
            getPosts(
                1,
                searchCategory.value,
                searchId.value,
                current,
                searchContent.value,
                searchGlobal.value,
            );
        });
        watch(searchContent, (current, previous) => {
            getPosts(
                1,
                searchCategory.value,
                searchId.value,
                searchTitle.value,
                current,
                searchGlobal.value,
            );
        });
        watch(searchGlobal, (current, previous) => {
            getPosts(
                1,
                searchCategory.value,
                searchId.value,
                searchTitle.value,
                searchContent.value,
                current,
            );
        });

        onMounted(() => {
            getPosts()
            getCategories()
        });

        return {
            posts,
            getPosts,
            categories,
            getCategories,
            searchCategory,
            searchId,
            searchTitle,
            searchContent,
            searchGlobal,
            orderColumn,
            orderDirection,
            updateOrdering,
            deletePost,
            can,
        };
    },
}
</script>
