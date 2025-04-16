
import JobSearchClient from "@/components/JobSearchClient";
import { fetchJobs } from "@/lib/api";

import { JobListing } from "@/types";



export default async function Home() {
  // const jobs: JobListing[] = await fetchJobs();
  const initialJobs: JobListing[] = await fetchJobs();

  return (
    <JobSearchClient initialJobs={initialJobs} />
  );
}

