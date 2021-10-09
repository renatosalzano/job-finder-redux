import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { setJob } from "../app/jobSlice";

interface Props {
  jobs: any[];
  expand: boolean;
  total?: number;
  setExpand: React.Dispatch<React.SetStateAction<boolean>>;
}

const Jobs: React.FunctionComponent<Props> = ({
  jobs = [],
  expand,
  setExpand,
  total,
}) => {
  const [active, setActive] = useState<any>(undefined);
  const dispatch = useAppDispatch();

  const expand_job = (job_info: any, id: number) => {
    setActive(id);
    setExpand(true);
    dispatch(setJob({ info: job_info }));
  };

  const date_to_string = (date: string) => {
    const new_date = new Date(date);
    return new_date.toLocaleDateString("it-IT");
  };

  return (
    <>
      <div className="job_list">
        <span>{`Found ${total} job offers`}</span>
        {jobs.length > 0 &&
          jobs.map((job: any) => (
            <div
              key={job.id}
              className={`job ${active === job.id ? "active" : ""}`}
              onClick={() => expand_job(job, job.id)}
            >
              <strong>{job.name}</strong>
              <span>{job.company.name}</span>
              <Locations locations={job.locations} id={job.id} />
              <span>{date_to_string(job.publication_date)}</span>
            </div>
          ))}
      </div>
    </>
  );
};

export default Jobs;

interface locationProps {
  locations: any[];
  id: string;
}
const Locations: React.FunctionComponent<locationProps> = ({
  locations,
  id,
}) => {
  return (
    <span>
      {locations.map((location: any) => (
        <span key={location.name + id}>{location.name}</span>
      ))}
    </span>
  );
};
