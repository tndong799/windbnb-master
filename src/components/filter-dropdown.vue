<template>
    <transition name="dropdown">
        <div
            class="fixed top-0 left-0 right-0 z-50 h-full w-full bg-[#4F4F4F] bg-opacity-40"
            @click.self="$emit('close')"
        >
            <div class="bg-white px-24 flex py-20 gap-y-10 flex-col mb:px-2">
                <div
                    class="w-full rounded-[16px] shadow h-[55px] flex mb:flex-col mb:h-auto mb:gap-y-2 mb:p-2"
                >
                    <div
                        class="flex flex-col gap-y-1 flex-1 justify-center px-4"
                        :class="{ active: activeGuest }"
                        @click="activeFilter('guest')"
                    >
                        <span
                            class="text-[#333] uppercase font-extrabold text-[9px] leading-[11px]"
                            >Location</span
                        >
                        <input
                            type="text"
                            placeholder="Add location"
                            class="outline-none text-sm font-normal leading-[18px]"
                            :value="location === '' ? null : location"
                        />
                    </div>
                    <div
                        class="flex flex-col gap-y-1 flex-1 justify-center px-4"
                        :class="{ active: activeLocation }"
                        @click="activeFilter('location')"
                    >
                        <span
                            class="text-[#333] uppercase font-extrabold text-[9px] leading-[11px]"
                            >Guest</span
                        >
                        <input
                            type="text"
                            placeholder="Add guest"
                            class="outline-none text-sm font-normal leading-[18px]"
                            :value="countGuest === 0 ? null : countGuest"
                        />
                    </div>
                    <div class="flex flex-1 px-4 justify-center items-center">
                        <button
                            class="h-12 bg-[#EB5757] rounded-[16px] text-[#f2f2f2] flex gap-x-2.5 items-center px-6 text-sm font-bold"
                            @click="$emit('search')"
                        >
                            <search-icon size="18" />
                            <span>Search</span>
                        </button>
                    </div>
                </div>
                <div class="flex">
                    <div class="flex-1">
                        <div class="flex flex-col gap-y-9" v-if="activeGuest">
                            <div
                                class="flex gap-x-[10px] text-[#4f4f4f] items-center font-normal text-sm cursor-pointer"
                                v-for="(citi, index) in cities"
                                :key="index"
                                @click="$emit('handleChangeLocation', citi)"
                            >
                                <location-marker-icon size="20" />
                                <span>{{ citi }}, Finland</span>
                            </div>
                        </div>
                    </div>
                    <div class="flex-1">
                        <div
                            class="flex flex-col gap-y-12"
                            v-if="activeLocation"
                        >
                            <div class="flex flex-col">
                                <h3 class="text-sm font-bold text-[#333]">
                                    Adults
                                </h3>
                                <p class="text-sm font-normal text-[#bdbdbd]">
                                    Ages 13 or above
                                </p>
                                <div class="flex items-center gap-x-4 mt-3">
                                    <button
                                        class="w-[23px] h-[23px] border border-[#828282] rounded flex justify-center items-center"
                                        @click="
                                            $emit('minus', $event, 'adults')
                                        "
                                    >
                                        <minus-sm-icon size="14" />
                                    </button>
                                    <span>{{ guest.adults }}</span>
                                    <button
                                        class="w-[23px] h-[23px] border border-[#828282] rounded flex justify-center items-center"
                                        @click="$emit('plus', $event, 'adults')"
                                    >
                                        <plus-sm-icon size="14" />
                                    </button>
                                </div>
                            </div>
                            <div class="flex flex-col">
                                <h3 class="text-sm font-bold text-[#333]">
                                    Children
                                </h3>
                                <p class="text-sm font-normal text-[#bdbdbd]">
                                    Ages 2-12
                                </p>
                                <div class="flex items-center gap-x-4 mt-3">
                                    <button
                                        class="w-[23px] h-[23px] border border-[#828282] rounded flex justify-center items-center"
                                        @click="
                                            $emit('minus', $event, 'children')
                                        "
                                    >
                                        <minus-sm-icon size="14" />
                                    </button>
                                    <span>{{ guest.children }}</span>
                                    <button
                                        class="w-[23px] h-[23px] border border-[#828282] rounded flex justify-center items-center"
                                        @click="
                                            $emit('plus', $event, 'children')
                                        "
                                    >
                                        <plus-sm-icon size="14" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex-1 mb:hidden"></div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import { SearchIcon } from '@vue-hero-icons/outline';
import {
    LocationMarkerIcon,
    MinusSmIcon,
    PlusSmIcon,
} from '@vue-hero-icons/solid';
export default {
    name: 'FilterDropdown',
    components: {
        SearchIcon,
        LocationMarkerIcon,
        MinusSmIcon,
        PlusSmIcon,
    },
    props: {
        location: {
            type: String,
        },
        guest: {
            type: Object,
        },
        cities: {
            type: Array,
        },
    },
    data() {
        return {
            activeLocation: false,
            activeGuest: false,
        };
    },
    computed: {
        hasGuest() {
            return this.countGuest > 0;
        },
        countGuest() {
            return this.guest.adults + this.guest.children;
        },
    },
    methods: {
        activeFilter(input) {
            switch (input) {
                case 'location':
                    this.activeLocation = true;
                    this.activeGuest = false;
                    break;
                case 'guest':
                    this.activeGuest = true;
                    this.activeLocation = false;
                    break;
            }
        },
    },
};
</script>

<style>
.dropdown-enter {
    opacity: 0;
}

.dropdown-leave-active {
    opacity: 0;
}

.dropdown-enter,
.dropdown-leave-active {
    transition: all 0.3s ease;
}
</style>
