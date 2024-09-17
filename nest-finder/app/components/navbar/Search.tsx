'use client';

import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';

const Search = () => {
    // State to handle filter visibility
    const [showFilters, setShowFilters] = useState(false);

    // State for filter options
    const [priceRange, setPriceRange] = useState({ min: 200, max: 3000 });
    const [roomType, setRoomType] = useState('');
    const [duration, setDuration] = useState(1);
    const [durationType, setDurationType] = useState('days');

    // Function to toggle the filter container visibility
    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    return (
        <div className="relative w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
            {/* Search bar and logo container */}
            <div className="flex flex-row items-center justify-between">
            <input
                type="text"
                placeholder="Search nest..."
                className="
                    hidden
                    sm:block
                    font-semibold
                    px-6
                    border-x-[1px]
                    text-sm
                    pl-6
                    pr-2
                    flex
                    flex-row
                    items-center
                    gap-3
                    ">
                        
                    </input>
                    <div
                        className="
                        p-2
                        bg-black
                        rounded-full
                        text-white
                        hover:bg-yellow-500 transition hover:text-black
                        "
                        >

                            <BiSearch size={15} />
                            
                        </div>
                <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
                    {/* Filter button */}
                    <button
                        onClick={toggleFilters}
                        className="px-4 py-2 text-sm bg-black text-white rounded-full hover:bg-yellow-500 transition hover:text-black"
                    >
                        {showFilters ? 'Hide Filters' : 'Show Filters'}
                    </button>
                </div>
            </div>

            {/* Floating Filter Container */}
            {showFilters && (
                <div
                    className="
                    absolute
                    top-14
                    right-0
                    mt-2
                    bg-white
                    border-[1px]
                    border-gray-300
                    p-4
                    rounded-lg
                    shadow-lg
                    w-96
                    z-50
                    "
                >
                    <form>
                        {/* Price Range */}
                        <div className="mb-4">
                            <label className="block text-sm font-semibold mb-2">Price Range (Baht):</label>
                            <div className="flex gap-3">
                                <input
                                    type="number"
                                    min="200"
                                    max="3000"
                                    value={priceRange.min}
                                    onChange={(e) =>
                                        setPriceRange({
                                            ...priceRange,
                                            min: Number(e.target.value),
                                        })
                                    }
                                    className="w-full px-3 py-2 border rounded-md"
                                />
                                <input
                                    type="number"
                                    min="200"
                                    max="3000"
                                    value={priceRange.max}
                                    onChange={(e) =>
                                        setPriceRange({
                                            ...priceRange,
                                            max: Number(e.target.value),
                                        })
                                    }
                                    className="w-full px-3 py-2 border rounded-md"
                                />
                            </div>
                        </div>

                        {/* Room Type */}
                        <div className="mb-4">
                            <label className="block text-sm font-semibold mb-2">Room Type:</label>
                            <select
                                value={roomType}
                                onChange={(e) => setRoomType(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md"
                            >
                                <option value="">Select a room type</option>
                                <option value="apartment">Apartment</option>
                                <option value="mansion">Mansion</option>
                                <option value="condominium">Condominium</option>
                                <option value="house">House</option>
                            </select>
                        </div>

                        {/* Duration */}
                        <div className="mb-4">
                            <label className="block text-sm font-semibold mb-2">Duration:</label>
                            <div className="flex gap-3">
                                <input
                                    type="number"
                                    min="1"
                                    value={duration}
                                    onChange={(e) => setDuration(Number(e.target.value))}
                                    className="w-full px-3 py-2 border rounded-md"
                                />
                                <select
                                    value={durationType}
                                    onChange={(e) => setDurationType(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md"
                                >
                                    <option value="days">Days</option>
                                    <option value="months">Months</option>
                                </select>
                            </div>
                        </div>

                        {/* Submit/Search Button */}
                        <div className="text-right">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-black text-white rounded-full hover:bg-yellow-500 hover:text-black
                                transition"
                            >
                                Search
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Search;
