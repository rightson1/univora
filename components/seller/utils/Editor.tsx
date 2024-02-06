"use client";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import type ReactQuill from "react-quill";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const QuillWrapper = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    // eslint-disable-next-line react/display-name
    return ({ ...props }) => <RQ {...props} />;
  },
  {
    ssr: false,
  }
) as typeof ReactQuill;

export const Editor = ({
  setEditorContent,
  editorContent,
}: {
  setEditorContent?: React.Dispatch<React.SetStateAction<string>>;
  editorContent: string;
}) => {
  return (
    <QuillWrapper
      theme="snow"
      value={editorContent}
      onChange={(e) => {
        setEditorContent && setEditorContent(e);
      }}
      modules={modules}
      formats={formats}
    />
  );
};
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];
const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],

    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};
