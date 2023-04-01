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
import { HexAlphaColorPicker } from "react-colorful";
import icon from "text_editor_icons/image/imagesmode.svg";
const SlateEditor = () => {
  const [editor] = useState(() => withReact(createEditor()));
  const [value, setValue] = useState<Descendant[] | null>(null);
  const [iconList, setIconList] = useState<{ [key: string]: string }>();
  const [exceptions, setExceptions] = useState<string[] | null>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [displayPicker, setPicker] = useState<boolean>(false);

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
    setExceptions([
      "text_editor_icons/image/imagesmode.svg",
      "text_editor_icons/format/code_blocks_FILL0.svg",
    ]);
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
            children: [{ text: "A line of text in a paragraph", size: "24px" }],
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
      // CustomEditor.increaseTextSize(editor);
    },
    "text_editor_icons/format/format_italic.svg": (e) => {
      e.preventDefault();
      CustomEditor.toggleItalicMark(editor);
    },
    "text_editor_icons/size/text_decrease.svg": (e) => {
      e.preventDefault();
      CustomEditor.decreaseTextSize(editor);
    },
    "text_editor_icons/format/format_underlined.svg": (e) => {
      e.preventDefault();
      CustomEditor.toggleUnderlined(editor);
    },
    "text_editor_icons/format/format_color_text.svg": (e) => {
      e.preventDefault();
      setPicker(!displayPicker);
    },
  };

  const onClose = () => setPicker(false);
  const [color, setColor] = useState("#aabbcc");

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
          localStorage.setItem("consent", content);
        }
      }}
    >
      <Container>
        <ButtonToolbar>
          <ButtonGroupContainer>
            {Object.keys(iconList).map((item, key) => {
              if (iconList[item] === "format" && !exceptions?.includes(item)) {
                return (
                  <div
                    key={key}
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <Button onMouseDown={mouseEventDictionary[item]}>
                      <img
                        style={{
                          width: "25px",
                          height: "auto",
                        }}
                        src={item}
                      />
                    </Button>
                    {displayPicker &&
                    item ===
                      "text_editor_icons/format/format_color_text.svg" ? (
                      <div
                        style={{
                          position: "absolute",
                          paddingTop: "50px",
                          paddingLeft: "5px",
                          zIndex: "2",
                        }}
                      >
                        <div
                          style={{
                            position: "fixed",
                            top: "0px",
                            right: "0px",
                            bottom: "0px",
                            left: "0px",
                          }}
                          onClick={onClose}
                        />
                        <HexAlphaColorPicker
                          color={color}
                          onChange={setColor}
                        />
                      </div>
                    ) : null}
                  </div>
                );
              }
            })}
          </ButtonGroupContainer>
          <ButtonGroupContainer>
            {Object.keys(iconList).map((item, key) => {
              if (iconList[item] === "size") {
                return (
                  <Button key={key} onMouseDown={mouseEventDictionary[item]}>
                    <img style={{ width: "25px", height: "auto" }} src={item} />
                  </Button>
                );
              }
            })}
          </ButtonGroupContainer>
          <ButtonGroupContainer>
            {Object.keys(iconList).map((item, key) => {
              if (iconList[item] === "justify") {
                return (
                  <Button key={key} onMouseDown={mouseEventDictionary[item]}>
                    <img style={{ width: "25px", height: "auto" }} src={item} />
                  </Button>
                );
              }
            })}
          </ButtonGroupContainer>
          <ButtonGroupContainer>
            {Object.keys(iconList).map((item, key) => {
              if (iconList[item] === "bullet") {
                return (
                  <Button key={key} onMouseDown={mouseEventDictionary[item]}>
                    <img style={{ width: "25px", height: "auto" }} src={item} />
                  </Button>
                );
              }
            })}
          </ButtonGroupContainer>
          <ButtonGroupContainer>
            {Object.keys(iconList).map((item, key) => {
              if (iconList[item] === "image" && !exceptions?.includes(item)) {
                return (
                  <Button key={key} onMouseDown={mouseEventDictionary[item]}>
                    <img style={{ width: "25px", height: "auto" }} src={item} />
                  </Button>
                );
              }
            })}
          </ButtonGroupContainer>
          {/* {iconList} */}
          {/* <Button onMouseDown={toggleBoldMark}>Make Bold</Button> */}
        </ButtonToolbar>
        {/* <ColourModal showModal={showModal} setShowModal={setShowModal} /> */}
        <Editable
          style={{ background: "#F5F5F5", borderRadius: "5px" }}
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
