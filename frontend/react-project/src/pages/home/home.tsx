import { LearnjsCard } from "./components/learnjsCard";
import { SmallImages } from "./components/smalImages";

export function Home() {
    return (
      <>
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="mt-8 layout-content-container flex flex-col max-w-[960px] flex-1">
            <LearnjsCard />
            <p className="text-[#1c110d] text-base font-normal leading-normal pb-3 pt-1 px-4">
              JavaScript is a powerful and flexible programming language that's essential for web development. Whether
              you're new to coding or an experienced developer, our courses can help you learn and master JavaScript.
            </p>
            <SmallImages />
          </div>
        </div>
      </>
    );
  }