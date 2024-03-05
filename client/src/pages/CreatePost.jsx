import React from "react";
import { Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a Post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            className="flex-1"
            required
            placeholder="Title"
          />

          <Select>
            <option value="uncategorized">Select a catagory</option>
            <option value="javaScript">JavaScript</option>
            <option value="rectjs">RectJS</option>
            <option value="nextjs">NextJS</option>
            <option value="anime">Anime News</option>
            <option value="football">Football</option>
            <option value="others">Other</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dashed p-3">
          <FileInput type="file" accept="image/*" />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
          >
            Upload Image
          </Button>
        </div>
        <ReactQuill theme="snow" placeholder="Write Something" className="mb-12 h-96 "/>
        <Button type="submit" gradientDuoTone='purpleToBlue'  >Publish</Button>
      </form>
    </div>
  );
};

export default CreatePost;
