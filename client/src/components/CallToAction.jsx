// eslint-disable-next-line no-unused-vars
import React from "react";
import { Button } from "flowbite-react";

const CallToAction = () => {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center ">
      <div className="flex-1 justify-center flex flex-col ">
        <h2 className=" text-2xl ">Want to master Javascript ?</h2>
        <p className="text-gray-500 my-3">
          Check out this page to learn more about how you can use Javascript in
          your projects.
        </p>
        <Button
          gradientDuoTone="purpleToPink"
          className="rounded-tl-xl rounded-bl-none"
        >
          <a
            href="https://github.com/Bamof25th/CN-backend-mastery"
            target="_blank"
            rel="noopener noreferrer"
          >
            Backend mastery JavaScript
          </a>
        </Button>
      </div>
      <div className="p-7 flex-1 ">
        <img
          src="https://cdn.stackoverflow.co/images/jo7n4k8s/production/eb9774ecfc0d05e8099ed26ee95a02c283b79b8a-630x450.png?rect=0,60,630,331&w=1200&h=630&auto=format&dpr=2"
          alt="call to action"
          className="h-[300px"
        />
      </div>
    </div>
  );
};

export default CallToAction;
