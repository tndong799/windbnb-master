<template>
    <div id="app" class="bg-white">
        <header
            class="flex justify-between items-center px-24 py-8 mb:flex-col mb:px-2 mb:items-start mb:gap-y-10"
        >
            <img
                class="w-[96px] h-[18px] cursor-pointer"
                src="./assets/images/logo.png"
                alt="Logo"
                @click="clearFilter"
            />
            <div
                class="flex items-center rounded-full shadow-md h-[55px]"
                @click="isShowFilter = true"
            >
                <div
                    class="font-Mulish w-26 text-[#333] px-4 border-r border-r-[#F2F2F2] leading-[55px]"
                >
                    <span v-if="location">{{ location }}, Finland</span>
                    <span v-else class="text-[#BDBDBD]">Add location</span>
                </div>
                <div
                    class="font-Mulish px-4 border-r border-r-[#F2F2F2] leading-[55px]"
                >
                    <span v-if="hasGuest">{{ countGuest }} guest</span>
                    <span class="text-[#BDBDBD]" v-else>Add guest</span>
                </div>
                <search-icon class="mx-4 text-[#EB5757]" />
            </div>
        </header>
        <main class="flex flex-col gap-y-8 px-24 mt-7 mb:px-2">
            <div class="flex justify-between items-center">
                <h2 class="font-bold text-2xl text-[#333]">Stays in Finland</h2>
                <p class="text-sm font-medium text-[#4f4f4f]">
                    {{ stays.length > 12 ? '12+' : stays.length }} stays
                </p>
            </div>
            <div class="flex flex-wrap gap-x-8 gap-y-12 mb:flex-col">
                <div
                    v-for="(stay, index) in stays.slice(0, 12)"
                    :key="index"
                    class="flex w-[calc((100%-64px)/3)] flex-col mb:w-full"
                >
                    <img
                        :src="stay.photo"
                        :alt="stay.title"
                        class="w-full h-[270px] object-cover rounded-[24px]"
                    />
                    <div class="mt-5 mb-3 flex items-center">
                        <span
                            v-if="stay.superHost"
                            class="mr-3 rounded-[12px] border border-[#4f4f4f] px-2 py-[6px] uppercase font-bold text-xs text-[#4f4f4f]"
                            >Super Host</span
                        >
                        <p class="font-medium text-sm text-[#828282]">
                            {{ stay.type }} .
                        </p>
                        <span
                            class="ml-1 font-medium text-sm text-[#828282]"
                            v-if="stay.beds > 0"
                            >{{ stay.beds }} beds</span
                        >
                        <div class="ml-auto flex items-center gap-x-[6px]">
                            <star-icon class="text-[#EB5757]" size="20" />
                            <span class="font-sm font-medium text-[#4f4f4f]">{{
                                stay.rating
                            }}</span>
                        </div>
                    </div>
                    <h2
                        class="mt-auto text-md font-semibold text-[#333] truncate w-full"
                    >
                        {{ stay.title }}
                    </h2>
                </div>
            </div>
        </main>
        <footer class="mt-[100px] mb-4 mx-auto">
            <p class="text-center text-[#828282] text-sm font-medium">
                created by <span class="font-semibold">dongtn99</span> -
                devChallenges.io
            </p>
        </footer>
        <filter-dropdown
            :location="location"
            :guest="guest"
            :cities="cities"
            v-if="isShowFilter"
            @close="isShowFilter = false"
            @plus="plus"
            @minus="minus"
            @handleChangeLocation="handleChangeLocation"
            @search="search"
        ></filter-dropdown>
    </div>
</template>

<script>
import { SearchIcon } from '@vue-hero-icons/outline';
import { StarIcon } from '@vue-hero-icons/solid';
import FilterDropdown from './components/filter-dropdown.vue';

import stays from './api/';
export default {
    name: 'App',
    components: {
        SearchIcon,
        StarIcon,
        FilterDropdown,
    },
    data() {
        return {
            stays: stays,
            isShowFilter: false,
            location: '',
            guest: {
                adults: 0,
                children: 0,
            },
        };
    },
    computed: {
        hasGuest() {
            return this.countGuest > 0;
        },
        countGuest() {
            return this.guest.adults + this.guest.children;
        },
        cities() {
            return stays
                .map((stay) => stay.city)
                .filter((citi, index, arr) => {
                    return arr.indexOf(citi) == index;
                });
        },
        hasFilter() {
            return this.location || this.hasGuest;
        },
    },
    methods: {
        minus(e, type) {
            switch (type) {
                case 'adults':
                    if (this.guest.adults === 0) break;
                    this.guest.adults--;
                    break;
                case 'children':
                    if (this.guest.children === 0) break;
                    this.guest.children--;
                    break;
            }
        },
        plus(e, type) {
            switch (type) {
                case 'adults':
                    this.guest.adults++;
                    break;
                case 'children':
                    this.guest.children++;
                    break;
            }
        },
        handleChangeLocation(location) {
            this.location = location;
        },
        clearFilter() {
            this.location = '';
            this.guest.adults = 0;
            this.guest.children = 0;
            this.stays = stays;
        },
        search() {
            this.isShowFilter = false;
            if (!this.hasFilter) {
                return;
            }
            if (this.location && !this.countGuest) {
                this.stays = stays.filter((stay) => {
                    return stay.city === this.location && stay;
                });
                return;
            }
            if (!this.location && this.countGuest) {
                this.stays = stays.filter((stay) => {
                    return stay.maxGuests >= this.countGuest;
                });
                return;
            }
            this.stays = stays.filter((stay) => {
                if (
                    stay.city === this.location &&
                    stay.maxGuests >= this.countGuest
                ) {
                    return stay;
                }
            });
            return;
        },
    },
    created() {},
};
</script>

<style></style>
