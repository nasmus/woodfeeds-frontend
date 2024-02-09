export default function DevPage1(){
  return (
    <div>
      <div className="flex justify-center items-center flex-col">
        <h3>Developed By</h3>
        <hr className="border-2 w-[14%] " />
      </div>
      <div className="bg-slate-100 rounded-xl py-2 md:py-10 w-[95%]  md:w-2/5 md:ml-[28rem] ml-[13px]   flex justify-center items-center ">
        <figure class="flex justify-center items-center rounded-xl p-8 md:p-0">
          <img
            class="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full me-10 md:me-0 "
            src="https://avatars.githubusercontent.com/u/58904411?v=4"
            alt=""
          />
          <div class="pt-6 md:p-8 text-center md:text-left space-y-4 ">
            <figcaption class="font-medium">
              <div class="text-sky-500 dark:text-sky-400">
                MD NASMUS SHAHADAT
              </div>
              <div class="text-slate-700 dark:text-slate-500">
                Software Engineer,Dhaka
              </div>
            </figcaption>
          </div>
        </figure>
      </div>
    </div>
  );
};