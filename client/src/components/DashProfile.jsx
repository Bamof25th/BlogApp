import { Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";
const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="max-w-lg mx-auto p-3 w-full  ">
      <h1 className="my-7 text-center font-semibold text-3xl ">Profile</h1>
      <form className="flex flex-col gap-4 ">
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full ">
          <img
            className="rounded-full w-full h-full object-cover  border-8  border-[lightGrey]"
            src={currentUser.profilePicture}
          />
        </div>
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
        />
        <TextInput
          type="text"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
        />
        <TextInput type="text" id="password" placeholder="********" />
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
      </form>
      <div className="text-red-500 flex mt-5 hover:underline justify-between">
        <span className=" cursor-pointer ">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default DashProfile;
