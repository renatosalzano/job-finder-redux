import React, { useEffect, useRef, useState } from "react";
import { VscArrowLeft } from "react-icons/vsc";
import { useAppSelector } from "../app/hooks";
import { info } from "../app/jobSlice";
import { useGetCompanyQuery } from "../service/themuseAPI";

interface Props {
  back_arrow_click: any;
  is_expand: boolean;
}

const Job: React.FunctionComponent<Props> = ({
  back_arrow_click,
  is_expand,
}) => {
  const job = useAppSelector(info);

  useEffect(() => {
    document.querySelector(".job-main")?.scrollTo(0, 0);
    console.log(job);
  });
  return (
    <>
      {job !== undefined && (
        <div className={`job_detail ${!is_expand ? "_hide" : ""}`}>
          <div className="job-header">
            <strong>{job.company.name}</strong>
            <span className="icon" onClick={back_arrow_click}>
              <VscArrowLeft />
            </span>
          </div>

          <div className="job-main">
            <Thumbnail id={job.company.id} />
            <strong>{job.name}</strong>
            {job.locations.map((location: { name: string }, index: number) => (
              <span key={location.name + index}>{location.name}</span>
            ))}
            {job.levels.map((level: { name: string }, index: number) => (
              <span key={level.name + index}>{level.name}</span>
            ))}
            <Content innerHTML={job.contents} />
          </div>
        </div>
      )}
    </>
  );
};

export default Job;

interface ContentProps {
  innerHTML: string;
}
const Content: React.FunctionComponent<ContentProps> = ({ innerHTML }) => {
  const contentRef = useRef<HTMLSpanElement>(null);
  const parseHTML = (content: string) => {
    contentRef.current !== null && (contentRef.current.innerHTML = content);
  };
  useEffect(() => {
    parseHTML(innerHTML);
  });
  return <span className="content" ref={contentRef}></span>;
};

interface ThumbnailProps {
  id?: number;
}

const Thumbnail: React.FunctionComponent<ThumbnailProps> = ({ id }) => {
  const { data, isLoading, isSuccess } = useGetCompanyQuery(id);

  return (
    <>
      {isSuccess && !isLoading && (
        <img src={data.refs?.logo_image} alt="thumb-company" />
      )}
    </>
  );
};
