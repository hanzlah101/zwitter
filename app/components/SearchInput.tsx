"use client";

import axios from "axios";
import React, { FC, useState } from "react";
import { toast } from "react-hot-toast";
import { CgSearch } from "react-icons/cg";
import User from "./User";
import UserLoader from "./loaders/UserLoader";

const SearchInput = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = async (e: any) => {
    setQuery(e.target.value);
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/search/?query=${query}`);
      setSuggestions(response.data.safeUsers);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="m-2 relative group">
      <div className="relative">
        <CgSearch className="absolute group-focus-within:text-primaryBlue top-[0.9rem] left-4 text-xl text-gray-400" />

        <input
          value={query}
          onChange={handleChange}
          autoComplete="off"
          className="w-full bg-gray-100 border-gray-100 border focus:bg-white focus:border-primaryBlue py-3 flex items-center pl-11 pr-4 text-sm rounded-full"
          placeholder="Search Zwitter"
        />
      </div>

      {query !== "" && (
        <div className="w-full mt-3 rounded-lg bg-white h-fit overflow-hidden z-20 absolute border-gray-100 border shadow-lg">
          {suggestions?.length > 0 &&
            suggestions?.map((user: any, i: number) => (
              <div key={i} className="brder-b p-3 hover:bg-gray-100">
                {isLoading ? <UserLoader /> : <User user={user} />}
              </div>
            ))}

          {query !== "" && !isLoading && suggestions?.length === 0 && (
            <div className="p-4 flex items-center text-sm justify-center font-semibold">
              No user found with "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
