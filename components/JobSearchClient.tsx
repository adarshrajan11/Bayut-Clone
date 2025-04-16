"use client";
import { useState } from "react";

import { JobListing } from "@/types";
import { fetchJobs } from "@/lib/api";

export default function JobSearchClient({ initialJobs }: { initialJobs: JobListing[] }) {
    const [jobs, setJobs] = useState<JobListing[]>(initialJobs);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("developer");
    const [location, setLocation] = useState("dubai");

    const handleSearch = async () => {
        setLoading(true);
        try {
            const jobsData = await fetchJobs({
                query: 'developer jobs in dubai',
                country: 'ae', // UAE country code
                page: '1',
                num_pages: '3' // Get more results
            });
            setJobs(jobsData);
        } catch (error) {
            console.error("Search failed:", error);
        } finally {
            setLoading(false);
        }
    };
    console.log("base", process.env.NEXT_PUBLIC_API_BASE_URL)
    // Temporarily add this to your route.ts to test
    console.log('Using API Key:', process.env.RAPIDAPI_KEY?.substring(0, 5) + '...');

    return (
        <main className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-blue-600">Bayut Jobs</h1>
                    <div className="flex space-x-4">
                        <button className="text-gray-600 hover:text-blue-600">Jobs</button>
                        <button className="text-gray-600 hover:text-blue-600">Companies</button>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Post a Job</button>
                    </div>
                </div>
            </nav>

            <section className="max-w-7xl mx-auto px-4 py-12">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Find Your Dream Job in Dubai</h1>

                    {/* Search Bar */}
                    <div className="flex flex-col md:flex-row justify-center gap-2 mb-4">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Job title, keywords"
                            className="px-4 py-3 border rounded-md focus:outline-none"
                        />
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Location (e.g., dubai)"
                            className="px-4 py-3 border rounded-md focus:outline-none"
                        />
                        <button
                            onClick={handleSearch}
                            disabled={loading}
                            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? "Searching..." : "Search"}
                        </button>
                    </div>
                </div>
            </section>

            {/* Job Listings Section */}
            <section className="max-w-7xl mx-auto px-4 py-8">
                {loading ? (
                    <div className="text-center py-12">
                        <p>Loading jobs...</p>
                    </div>
                ) : (
                    <>
                        <h2 className="text-2xl font-bold mb-6">
                            {jobs.length > 0 ? "Latest Jobs" : "No jobs found"}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {jobs.map((job) => (
                                <div key={job.job_id} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition">
                                    <h3 className="text-lg font-semibold">{job.job_title}</h3>
                                    <p className="text-gray-600">{job.employer_name}</p>
                                    <p className="text-sm text-gray-500 mt-2">
                                        {job.job_city}, {job.job_country}
                                    </p>
                                    <div className="mt-4 flex justify-between items-center">
                                        <span className="text-blue-600 font-medium">
                                            {job.job_salary ? job.job_salary : "Salary not disclosed"}
                                        </span>
                                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
                                            Apply Now
                                        </button>
                                    </div>
                                </div>

                            ))}
                        </div>
                    </>
                )}
            </section>
        </main>
    );
}