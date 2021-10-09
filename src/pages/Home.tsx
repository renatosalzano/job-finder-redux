import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Jobs from "../layout/Jobs";
import Paginator from "../layout/Paginator";
import { useGetJobsQuery } from "../service/themuseAPI";
import { updateReq, reqObj } from "../app/apiSlice";
import Job from "../layout/Job";
const array = [{ name: "test" }];
const Home: React.FunctionComponent = () => {
  const [expandJob, setExpandJob] = useState<boolean>(false);
  const req = useAppSelector(reqObj);
  const { data, error, isLoading, isSuccess, isError } = useGetJobsQuery(req);
  const dispatch = useAppDispatch();

  const test = () => {
    setExpandJob(false);
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="home">
      {isLoading && <h1>LOADING TIME</h1>}
      <div className={`column ${expandJob ? "_reduced" : ""} `}>
        {isSuccess && (
          <Jobs
            jobs={data?.results}
            expand={expandJob}
            setExpand={setExpandJob}
            total={data?.total}
          />
        )}
        <Paginator
          page_count={data?.page_count}
          is_loading={isLoading}
          expand={expandJob}
        />
      </div>
      <Job back_arrow_click={test} is_expand={expandJob} />
    </div>
  );
};

export default Home;
