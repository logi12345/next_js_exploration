import { BaseEditor, Node } from "slate";
import { ReactEditor } from "slate-react";

type CustomText = {
  text: string;
  bold?: boolean | null;
  italic?: boolean | null;
  type?: "paragraph" | "code";
  size: string;
  underlined?: boolean | null;
  // size: string | number;
};

export type ParagraphElement = {
  type: "paragraph";
  children: CustomText[];
  bold?: boolean | null;
  italic?: boolean | null;
  size?: "string";
  underlined?: boolean | null;
  // size: string | number;
};

export type CodeElement = {
  type: "code";
  children: CustomText[];
  bold?: boolean | null;
  italic?: boolean | null;
  size?: "string";
  underlined?: boolean | null;
  // size: string | number;
};

interface CustomBaseEditor extends BaseEditor {
  bold?: boolean | null;
  type: "paragraph" | "code";
  italic?: boolean | null;
  size?: "string";
  underlined?: boolean | null;
  // size: string | number;
}
export type CustomElement = ParagraphElement | CodeElement;
declare module "slate" {
  interface CustomTypes {
    Editor: CustomBaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
