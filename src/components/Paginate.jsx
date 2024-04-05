import React from "react";

const Paginate = () => {
  return (
    <>
      <nav aria-label="Page navigation example  ">
        <ul className="list-style-none flex items-center justify-center">
          <li>
            <a
              className="relative block rounded bg-primary px-3 text-white py-2.5 text-md text-surface transition duration-300 hover:bg-sec focus:bg-sec focus:text-primary-700 focus:outline-none focus:ring-0 active:bg-sec active:text-primary-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:focus:text-primary-500 dark:active:bg-neutral-700 dark:active:text-primary-500"
              href="#"
            >
              Previous
            </a>
          </li>
          <li>
            <a
              className="relative block rounded  px-3 py-1.5 text-sm text-surface transition duration-300 hover:bg-sec focus:bg-sec focus:text-primary-700 focus:outline-none active:bg-sec active:text-primary-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:focus:text-primary-500 dark:active:bg-neutral-700 dark:active:text-primary-500"
              href="#"
            >
              1
            </a>
          </li>
          <li aria-current="page">
            <a
              className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-surface transition duration-300 hover:bg-sec focus:bg-sec focus:text-primary-700 focus:outline-none active:bg-sec active:text-primary-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:focus:text-primary-500 dark:active:bg-neutral-700 dark:active:text-primary-500"
              href="#"
            >
              2
            </a>
          </li>
          <li>
            <a
              className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-surface transition duration-300 hover:bg-sec focus:bg-sec focus:text-primary-700 focus:outline-none active:bg-sec active:text-primary-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:focus:text-primary-500 dark:active:bg-neutral-700 dark:active:text-primary-500"
              href="#"
            >
              3
            </a>
          </li>
          <li>
            <a
              className="relative block rounded bg-primary px-3 text-white py-2.5 text-md  text-surface transition duration-300 hover:bg-sec focus:bg-sec focus:text-primary-700 focus:outline-none active:bg-sec active:text-primary-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:focus:text-primary-500 dark:active:bg-neutral-700 dark:active:text-primary-500"
              href="#"
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Paginate;
