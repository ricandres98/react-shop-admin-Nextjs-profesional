import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import endPoints from "services/api";

export default function Pagination({ limit, setProducts, products }) {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [offsetState, setOffsetState] = useState(0);
  const [totalProducts, setTotalProducts] = useState(null);
  const [totalPages, setTotalPages] = useState(null);

  function PaginationNumberButton({ number }) {
    const classCurrent =
      "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";
    // Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
    const basicClasses =
      "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0";

    const goToPage = (e) => {
      e.preventDefault();
      setPage(number);
      setOffsetState((number - 1) * 5);
    };

    return (
      <button
        aria-current="page"
        className={
          page === number ? classCurrent + basicClasses : basicClasses
        }
        onClick={(e) => goToPage(e)}
      >
        {number}
      </button>
    );
  }

  //   const products = useFetch(endPoints.products.getProducts(limit, offset));
  useEffect(() => {
    (async function fetchData() {
      const response1 = await axios.get(
        endPoints.products.getProducts(0, 0)
      );
      setTotalProducts(response1.data.length);
      const response = await axios.get(
        endPoints.products.getProducts(limit, offsetState)
      );
      if (offsetState + response.data.length <= totalProducts) {
        console.log(response);
        setProducts(response.data);
      }
    })();
    setTotalPages(Math.ceil(totalProducts / 5));
  }, [page, totalProducts]);

  const previous = (e) => {
    e.preventDefault();
    console.log(router);
    if (offsetState >= limit) {
      setPage(page - 1);
      setOffsetState(offsetState - limit);
    }
  };
  const next = (e) => {
    e.preventDefault();
    console.log(router);
    if (offsetState + products.length < totalProducts) {
      setPage(page + 1);
      setOffsetState(offsetState + products.length);
    }
  };
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={(e) => previous(e)}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </button>
        <button
          onClick={(e) => next(e)}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{offsetState + 1}</span>{" "}
            to{" "}
            <span className="font-medium">
              {offsetState + products.length}
            </span>{" "}
            of <span className="font-medium">{totalProducts}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              onClick={(e) => previous(e)}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            <PaginationNumberButton
              number={page < totalPages - 4 ? page : totalPages - 5}
            />
            <PaginationNumberButton
              number={
                page + 1 < totalPages - 3 ? page + 1 : totalPages - 4
              }
            />
            <PaginationNumberButton
              number={
                page + 2 < totalPages - 2 ? page + 2 : totalPages - 3
              }
            />
            <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
              ...
            </span>
            <PaginationNumberButton number={totalPages - 2} />
            <PaginationNumberButton number={totalPages - 1} />
            <PaginationNumberButton number={totalPages} />
            <button
              onClick={(e) => next(e)}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
