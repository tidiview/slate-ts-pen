import { Editor } from "slate";
import { createBasePlugin, SlatePen } from "slate-pen";
import {
  createAnchorPlugin,
  createBrPlugin,
  createHtmlPlugin,
  createImgPlugin,
  createPicturePlugin
} from "slate-html-mui";

export const createSlatePen = (editor: Editor) =>
  new SlatePen({
    editor,
    plugins: [
      createAnchorPlugin(),
      createBasePlugin(),
      createBrPlugin(),
      createHtmlPlugin(),
      createImgPlugin(),
      createPicturePlugin()
    ]
  });
