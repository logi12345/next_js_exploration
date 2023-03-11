// import { CustomElement } from "@/config/slate_config";
import { Editor, Element, Transforms, Text, Descendant, Node } from "slate";
import { Transform } from "stream";

const CustomEditor = {
  isBoldMarkActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.bold === true,
      universal: true,
    });

    return !!match;
  },

  isCodeBlockActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === "code",
    });

    return !!match;
  },

  isItalicBlockActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.italic === true,
      universal: true,
    });
    return !!match;
  },

  getFontSize(editor: Editor) {
    let x = editor.marks;
    // const [match] = Editor.nodes(editor, {
    //   match: (n) => {
    //     n.size !== null;
    //     x = n.size;
    //     return n.size !== null;
    //   },
    // });

    console.log(x);

    // editor.addMark("size", "24px");

    console.log(editor);
    // return Editor.marks(editor.).size;
    return editor.children;

    // const x = Editor.leaf(editor)
    // match.values()
    // console.log(match);
    // return match;
  },

  toggleBoldMark(editor: Editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor);
    Transforms.setNodes(
      editor,
      { bold: isActive ? null : true },
      { match: (n) => Text.isText(n), split: true }
    );
  },

  toggleItalicMark(editor: Editor) {
    const isActive = CustomEditor.isItalicBlockActive(editor);

    Transforms.setNodes(
      editor,
      { italic: isActive ? null : true },
      { match: (n) => Text.isText(n), split: true }
    );
  },

  toggleCodeBlock(editor: Editor) {
    const isActive = CustomEditor.isCodeBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? "paragraph" : "code" },
      { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) }
    );
  },

  serialise(v: Node[]) {
    return v.map((n) => Node.string(n)).join("\n");
  },

  deserialise(v: string) {
    return v.split("\n").map((line) => {
      return {
        children: [{ text: line }],
      } as Descendant;
    });
  },

  increaseTextSize(editor: Editor) {
    const fontSize = CustomEditor.getFontSize(editor);
    // let increased_fontsize = "16px";
    // if (fontSize) {
    //   let newsize = parseInt(fontSize.slice(0, -2));
    //   increased_fontsize = `${newsize + 2}px`;
    // }
    // console.log(fontSize);
    // Transforms.setNodes(
    //   editor,
    //   { size: increased_fontsize },
    //   { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) }
    // );
  },
};

export default CustomEditor;
