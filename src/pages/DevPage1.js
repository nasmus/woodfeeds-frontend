import fbicon from "../css/facebook.svg";
import githubicon from "../css/github.svg";

import { Link } from 'react-router-dom';

export default function DevPage1() {
  return (
    <div>
      <div className="flex justify-center items-center flex-col mb-5 ">
        <h3>Developed By</h3>
      </div>
      <section className="md:flex md:justify-around">
        <div className="bg-slate-100 mx-10 my-5 p-2 px-4 rounded-3xl flex justify-between gap-2 shadow-lg lg:w-[540px]">
          <div className="flex items-center gap-2">
            <img
              className="h-28 w-28"
              src="https://avatars.githubusercontent.com/u/58904411?v=4"
            />
            <div className="">
              <h1 className="text-xl font-bold">MD NASMUS SHAHADAT</h1>
              <p className="text-sm text-slate-600">Software Engineer</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              target="_blank"
              to="https://www.facebook.com/5H4M1M.HUNT3R.official/"
            >
              <img
                className="h-8 hover:opacity-60 hover:cursor-pointer ease-in-out transition-all duration-300"
                src={fbicon}
              />
            </Link>

            <Link to="https://github.com/shamim261" target="_blank">
              <img
                className="h-8 hover:opacity-60 hover:cursor-pointer ease-in-out transition-all duration-300"
                src={githubicon}
              />
            </Link>
          </div>
        </div>
        <div className="bg-slate-100 mx-10 my-5 p-2 px-4 rounded-3xl flex justify-between shadow-lg lg:w-[512px]">
          <div className="flex items-center gap-2">
            <img
              className="h-28 w-28"
              src="https://avatars.githubusercontent.com/u/92126672?v=4"
            />
            <div className="">
              <h1 className="text-xl font-bold">Shamim Reza</h1>
              <p className="text-sm text-slate-600">Software Developer</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              target="_blank"
              to="https://www.facebook.com/5H4M1M.HUNT3R.official/"
            >
              <img
                className="h-8 hover:opacity-60 hover:cursor-pointer ease-in-out transition-all duration-300"
                src={fbicon}
              />
            </Link>

            <Link to="https://github.com/shamim261" target="_blank">
              <img
                className="h-8 hover:opacity-60 hover:cursor-pointer ease-in-out transition-all duration-300"
                src={githubicon}
              />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
