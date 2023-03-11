import CustomEditor from "@/utils/CommonSlateEditor";
import { useCallback, useEffect, useState, MouseEvent } from "react";
import { createEditor, Descendant, Node } from "slate";
import {
  Editable,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact,
} from "slate-react";
import styled from "styled-components";
import { CodeElement, DefaultElement, Leaf } from "./TextComponents";

const SlateEditor = () => {
  const [editor] = useState(() => withReact(createEditor()));
  const [value, setValue] = useState<Descendant[] | null>(null);
  const [iconList, setIconList] = useState<{ [key: string]: string }>();

  const fetchData = useCallback(async () => {
    const data = await fetch("JSON/icon_path_list.JSON", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const res = await data.json();
    setIconList(res);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const storage_value = localStorage.getItem("consent") as string;
    const val: Descendant[] = JSON.parse(storage_value);
    const value: Descendant[] = val
      ? val
      : [
          {
            type: "paragraph",
            children: [{ text: "A line of text in a paragraph" }],
          },
        ];

    setValue(value);
  }, []);
  const renderElement = useCallback((props: RenderElementProps) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);
  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return <Leaf {...props} />;
  }, []);

  const mouseEventDictionary: {
    [key: string]: (e: MouseEvent) => void;
  } = {
    "text_editor_icons/format/format_bold.svg": (e) => {
      e.preventDefault();
      CustomEditor.toggleBoldMark(editor);
    },
    "text_editor_icons/format/code_blocks_FILL1.svg": (e) => {
      e.preventDefault();
      CustomEditor.toggleCodeBlock(editor);
    },
    "text_editor_icons/size/text_increase.svg": (e) => {
      e.preventDefault();
      CustomEditor.increaseTextSize(editor);
    },
  };

  if (!value) return <p>Loading</p>;
  if (!iconList) return <p>waiting for icons</p>;
  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(v) => {
        const isAstChange = editor.operations.some(
          (op) => "set_selection" !== op.type
        );
        if (isAstChange) {
          const content = JSON.stringify(v);
          console.log(v);
          localStorage.setItem("consent", content);
        }
      }}
    >
      <Container>
        <ButtonToolbar>
          <ButtonGroupContainer>
            {Object.keys(iconList).map((item) => {
              if (iconList[item] === "format") {
                return (
                  <Button onMouseDown={mouseEventDictionary[item]}>
                    <img style={{ width: "25px", height: "auto" }} src={item} />
                  </Button>
                );
              }
            })}
          </ButtonGroupContainer>
          <ButtonGroupContainer>
            {Object.keys(iconList).map((item) => {
              if (iconList[item] === "size") {
                return (
                  <Button onMouseDown={mouseEventDictionary[item]}>
                    <img style={{ width: "25px", height: "auto" }} src={item} />
                  </Button>
                );
              }
            })}
          </ButtonGroupContainer>
          <ButtonGroupContainer>
            {Object.keys(iconList).map((item) => {
              if (iconList[item] === "justify") {
                return (
                  <Button onMouseDown={mouseEventDictionary[item]}>
                    <img style={{ width: "25px", height: "auto" }} src={item} />
                  </Button>
                );
              }
            })}
          </ButtonGroupContainer>
          <ButtonGroupContainer>
            {Object.keys(iconList).map((item) => {
              if (iconList[item] === "bullet") {
                return (
                  <Button onMouseDown={mouseEventDictionary[item]}>
                    <img style={{ width: "25px", height: "auto" }} src={item} />
                  </Button>
                );
              }
            })}
          </ButtonGroupContainer>
          <ButtonGroupContainer>
            {Object.keys(iconList).map((item) => {
              if (iconList[item] === "image") {
                return (
                  <Button onMouseDown={mouseEventDictionary[item]}>
                    <img style={{ width: "25px", height: "auto" }} src={item} />
                  </Button>
                );
              }
            })}
          </ButtonGroupContainer>
          {/* {iconList} */}
          {/* <Button onMouseDown={toggleBoldMark}>Make Bold</Button> */}
        </ButtonToolbar>
        <Editable
          style={{ background: "#F65431", borderRadius: "25px" }}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={(event) => {
            if (!event.ctrlKey) {
              return;
            }

            switch (event.key) {
              case "`": {
                event.preventDefault();
                CustomEditor.toggleCodeBlock(editor);
                break;
              }
              case "b": {
                event.preventDefault();
                CustomEditor.toggleBoldMark(editor);
                break;
              }
              case "i": {
                event.preventDefault();
                CustomEditor.toggleItalicMark(editor);
                break;
              }
            }
          }}
        />
      </Container>
    </Slate>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  position: relative;
`;

const ButtonToolbar = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 100%;
  // justify-content: space-between;
  flex-wrap: wrap;
`;

const ButtonGroupContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0px 5px 5px 5px;
  border-style: solid;
  padding: 10px;
`;

const Button = styled.a`
  border-radius: 5px;
  // padding: 20px;
  background: #f5f5f5;
  border-style: solid;
  padding: 5px;
  margin: 1px;
`;

export default SlateEditor;
