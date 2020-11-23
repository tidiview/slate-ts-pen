import { Button, Card, makeStyles } from "@material-ui/core";
import * as React from "react";
import { FC, useMemo, useState } from "react";
import { render } from "react-dom";
import { createEditor, Editor, Node } from "slate";
import { withHistory } from "slate-history";
import { SlatePen, useSticky, TSlateTypeElement } from "slate-pen";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";
import { initial_string } from "./initial";
import { createSlatePen } from "./setup";
import { CustomToolbar } from "./toolbar";

const SlateHtmlEditor: FC<{
  value: TSlateTypeElement[];
  setValue: (value: TSlateTypeElement[]) => void;
  editor: Editor;
  slatePen: SlatePen;
}> = ({ value, setValue, slatePen, editor }) => {
  const [isSticky, stickyPlaceholderRef] = useSticky();

  const classes = useStyles({});
  return (
    <Slate
      editor={editor as ReactEditor}
      defaultValue={value}
      onChange={(value) => {
        setValue(value as TSlateTypeElement[]);
      }}
      value={value as Node[]}
    >
      <Card>
        <div className={classes.toolbarPlaceholder} ref={stickyPlaceholderRef}>
          <CustomToolbar
            className={
              classes.toolbar + (isSticky ? " " + classes.toolbarSticky : "")
            }
            editor={editor}
          />
        </div>
        <Editable
          renderElement={slatePen.RenderElement}
          renderLeaf={slatePen.RenderLeaf}
          placeholder="Enter some rich text…"
          spellCheck
          className={classes.editable}
        />
      </Card>
    </Slate>
  );
};
SlateHtmlEditor.displayName = "SlateHtmlEditor";

const useStyles = makeStyles(
  (theme) => ({
    toolbarPlaceholder: {
      height: "47px"
    },
    toolbar: {
      padding: "8px",
      backgroundColor: "rgba(255,255,255,0.8)",
      backdropFilter: "blur(2px)",
      borderBottom: "1px solid " + theme.palette.divider,
      top: 0
    },
    toolbarSticky: {
      position: "fixed",
      borderRight: "1px solid " + theme.palette.divider
    },
    editable: { minHeight: "100px", padding: "8px" }
  }),
  { name: SlateHtmlEditor.displayName }
);

const MyEditor: FC = () => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const slatePen = useMemo(() => createSlatePen(editor), [editor]);
  const initial = useMemo(() => slatePen.fromHtml(initial_string), [
    slatePen
  ]) as TSlateTypeElement[];
  const [value, setValue] = useState<TSlateTypeElement[]>(initial);

  return (
    <div>
      <SlateHtmlEditor
        value={value}
        setValue={setValue}
        editor={editor}
        slatePen={slatePen}
      />
    </div>
  );
};
MyEditor.displayName = "MyEditor";

render(<MyEditor />, document.getElementById("app"));
