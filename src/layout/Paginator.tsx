import React, { useCallback, useEffect, useState } from "react";
import { updateReq } from "../app/apiSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { VscArrowLeft, VscArrowRight } from "react-icons/vsc";

interface Props {
  page_count?: Number;
  is_loading?: boolean;
  expand?: boolean;
}

const Paginator: React.FunctionComponent<Props> = ({
  page_count = 0,
  is_loading = false,
  expand = false,
}) => {
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();

  const update_page = useCallback(() => {
    return dispatch(updateReq({ page_index: page }));
  }, [dispatch, page]);

  const page_evt = (target: string) => {
    if (is_loading) return console.log("loading...");
    if (target === "next") {
      if (page >= page_count) return;
      setPage(page + 1);
    }
    if (target === "prev") {
      if (page <= 1) return;
      setPage(page - 1);
    }
  };

  useEffect(() => {
    update_page();
  }, [update_page]);

  return (
    <div className={`paginator ${expand ? "reduced" : ""}`}>
      <span className="arrow" id="prev" onClick={() => page_evt("prev")}>
        <VscArrowLeft />
      </span>
      <span>{`Page: ${page} of ${page_count}`}</span>
      <span className="arrow" id="next" onClick={() => page_evt("next")}>
        <VscArrowRight />
      </span>
    </div>
  );
};

export default Paginator;
