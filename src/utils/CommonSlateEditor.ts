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

  isUnderlineBlockActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.underlined === true,
      universal: true,
    });
    return !!match;
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

  toggleUnderlined(editor: Editor) {
    const isUnderlined = CustomEditor.isUnderlineBlockActive(editor);
    Transforms.setNodes(
      editor,
      { underlined: isUnderlined ? null : true },
      { match: (n) => Text.isText(n), split: true }
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
  getTextSize(editor: Editor) {
    let size = Editor.marks(editor);

    console.log(size);
    return size?.size;
  },

  increaseTextSize(editor: Editor) {
    const textSize = CustomEditor.getTextSize(editor);
    let increasedSize = parseInt(textSize.slice(0, -2)) + 2;
    console.log(increasedSize);
    Transforms.setNodes(
      editor,
      { size: `${increasedSize}px` },
      { match: (n) => Text.isText(n), split: true }
    );
    console.log(editor.children);
  },

  decreaseTextSize(editor: Editor) {
    const textSize = CustomEditor.getTextSize(editor);
    let decreasedSize = parseInt(textSize.slice(0, -2));
    decreasedSize = decreasedSize - 2 < 0 ? 0 : decreasedSize - 2;
    console.log(decreasedSize);
    Transforms.setNodes(
      editor,
      { size: `${decreasedSize}px` },
      { match: (n) => Text.isText(n), split: true }
    );
    console.log(editor.children);
  },
};

export default CustomEditor;
