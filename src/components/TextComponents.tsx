import { RenderElementProps, RenderLeafProps } from "slate-react";

const CodeElement: React.FC<RenderElementProps> = ({
  attributes,
  children,
}) => {
  return (
    <pre {...attributes}>
      <code>{children}</code>
    </pre>
  );
};

const DefaultElement: React.FC<RenderElementProps> = ({
  attributes,
  children,
}) => {
  return <p {...attributes}>{children}</p>;
};

const Leaf: React.FC<RenderLeafProps> = ({ attributes, children, leaf }) => {
  return (
    <span
      {...attributes}
      style={{
        fontWeight: leaf.bold ? "bold" : "normal",
        fontStyle: leaf.italic ? "italic" : "normal",
        fontSize: leaf.size,
        textDecorationLine: leaf.underlined ? "underline" : "normal",
      }}
    >
      {children}
    </span>
  );
};

export { DefaultElement, CodeElement, Leaf };
