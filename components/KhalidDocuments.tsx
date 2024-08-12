import React from "react";
import { RiFilePdf2Fill } from "react-icons/ri";
import { toast } from "sonner";

type Props = {};

const KhalidDocuments = (props: Props) => {
  return (
    <div className="h-full w-full text-black">
      <div className="h-full w-full">
        <div className="shadow-dashboard mx-auto h-full border bg-white p-6 pb-1">
          <div className="-m-2 mb-1 flex flex-wrap items-center justify-between">
            <div className="w-auto p-2">
              <h2 className="text-coolGray-900 text-lg font-semibold">
                My Files
              </h2>
              <p className="text-coolGray-500 text-xs font-medium">
                Downloadables
              </p>
            </div>
            <div className="w-auto p-2">
              <span className="text-sm font-semibold text-green-500 hover:text-green-600">
                See all
              </span>
            </div>
          </div>
          <div className="flex flex-wrap">
            <a
              href="/resume.pdf"
              target="_blank"
              className="w-full cursor-pointer border-b-[1px] px-2 hover:rounded-md hover:bg-green-300/20"
            >
              <div className="-m-2 flex flex-wrap items-center justify-between py-4">
                <div className="w-auto p-2">
                  <div className="-m-2 flex flex-wrap items-center">
                    <div className="w-auto p-2">
                      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-green-50 text-green-500">
                        <RiFilePdf2Fill className="h-full w-full p-2" />
                      </div>
                    </div>
                    <div className="w-auto p-2">
                      <h2 className="text-coolGray-900 text-sm font-medium">
                        Download Resume
                      </h2>
                      <h3 className="text-coolGray-400 text-xs font-medium">
                        {"Updated 12-08-2024"}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="w-auto p-2">
                  <p className="text-coolGray-500 text-xs font-medium">
                    {"3.82 MB"}
                  </p>
                </div>
              </div>
            </a>
            <div
              onClick={() =>
                toast.warning("Photos Files are private rightnow.")
              }
              className="border-coolGray-100 w-full cursor-pointer border-b"
            >
              <div className="-m-2 flex flex-wrap items-center justify-between py-4">
                <div className="w-auto p-2">
                  <div className="-m-2 flex flex-wrap items-center">
                    <div className="w-auto p-2">
                      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-yellow-50">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          height="24"
                          width="24"
                        >
                          <path
                            fill="#F59E0B"
                            d="M19 4H5C4.20435 4 3.44129 4.31607 2.87868 4.87868C2.31607 5.44129 2 6.20435 2 7V17C2 17.7956 2.31607 18.5587 2.87868 19.1213C3.44129 19.6839 4.20435 20 5 20H19C19.7956 20 20.5587 19.6839 21.1213 19.1213C21.6839 18.5587 22 17.7956 22 17V7C22 6.20435 21.6839 5.44129 21.1213 4.87868C20.5587 4.31607 19.7956 4 19 4ZM5 18C4.73478 18 4.48043 17.8946 4.29289 17.7071C4.10536 17.5196 4 17.2652 4 17V14.58L7.3 11.29C7.48693 11.1068 7.73825 11.0041 8 11.0041C8.26175 11.0041 8.51307 11.1068 8.7 11.29L15.41 18H5ZM20 17C20 17.2652 19.8946 17.5196 19.7071 17.7071C19.5196 17.8946 19.2652 18 19 18H18.23L14.42 14.17L15.3 13.29C15.4869 13.1068 15.7382 13.0041 16 13.0041C16.2618 13.0041 16.5131 13.1068 16.7 13.29L20 16.58V17ZM20 13.76L18.12 11.89C17.5501 11.3424 16.7904 11.0366 16 11.0366C15.2096 11.0366 14.4499 11.3424 13.88 11.89L13 12.77L10.12 9.89C9.55006 9.34243 8.79036 9.03663 8 9.03663C7.20964 9.03663 6.44994 9.34243 5.88 9.89L4 11.76V7C4 6.73478 4.10536 6.48043 4.29289 6.29289C4.48043 6.10536 4.73478 6 5 6H19C19.2652 6 19.5196 6.10536 19.7071 6.29289C19.8946 6.48043 20 6.73478 20 7V13.76Z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div className="w-auto p-2">
                      <h2 className="text-coolGray-900 text-sm font-medium">
                        Photos
                      </h2>
                      <h3 className="text-coolGray-400 text-xs font-medium">
                        44 photos
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="w-auto p-2">
                  <p className="text-coolGray-500 text-xs font-medium">
                    126 MB
                  </p>
                </div>
              </div>
            </div>
            <div
              onClick={() => toast.warning("Folders are private rightnow.")}
              className="border-coolGray-100 w-full cursor-pointer border-b"
            >
              <div className="-m-2 flex flex-wrap items-center justify-between py-4">
                <div className="w-auto p-2">
                  <div className="-m-2 flex flex-wrap items-center">
                    <div className="w-auto p-2">
                      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-green-50">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          height="24"
                          width="24"
                        >
                          <path
                            fill="#2AD168"
                            d="M20 8.94C19.9896 8.84813 19.9695 8.75763 19.94 8.67V8.58C19.8919 8.47718 19.8278 8.38267 19.75 8.3L13.75 2.3C13.6673 2.22222 13.5728 2.15808 13.47 2.11H13.38C13.2784 2.05174 13.1662 2.01434 13.05 2H7C6.20435 2 5.44129 2.31607 4.87868 2.87868C4.31607 3.44129 4 4.20435 4 5V19C4 19.7956 4.31607 20.5587 4.87868 21.1213C5.44129 21.6839 6.20435 22 7 22H17C17.7956 22 18.5587 21.6839 19.1213 21.1213C19.6839 20.5587 20 19.7956 20 19V9C20 9 20 9 20 8.94ZM14 5.41L16.59 8H15C14.7348 8 14.4804 7.89464 14.2929 7.70711C14.1054 7.51957 14 7.26522 14 7V5.41ZM18 19C18 19.2652 17.8946 19.5196 17.7071 19.7071C17.5196 19.8946 17.2652 20 17 20H7C6.73478 20 6.48043 19.8946 6.29289 19.7071C6.10536 19.5196 6 19.2652 6 19V5C6 4.73478 6.10536 4.48043 6.29289 4.29289C6.48043 4.10536 6.73478 4 7 4H12V7C12 7.79565 12.3161 8.55871 12.8787 9.12132C13.4413 9.68393 14.2044 10 15 10H18V19Z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div className="w-auto p-2">
                      <h2 className="text-coolGray-900 text-sm font-medium">
                        Folders
                      </h2>
                      <h3 className="text-coolGray-400 text-xs font-medium">
                        33 folders
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="w-auto p-2">
                  <p className="text-coolGray-500 text-xs font-medium">
                    256 GB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KhalidDocuments;
