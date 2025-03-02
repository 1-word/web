import Editor from '@toast-ui/editor';
import { useEffect, useRef } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import api, { MODE } from "@/services/api";

function BoardEdit({
  content,
  setParentEditor
}) {
  const onClickHandler = api();
  const editorRef = useRef(null);
  const editor = useRef(null);

  useEffect(() => {
    setEditor();
  }, []);

  const setEditor = () => {
    editor.current = new Editor({
      el: editorRef.current,
      height: '500px',
      initialEditType: 'markdown',
      previewStyle: 'vertical',
      initialValue: content?? '',
      hooks: {
        addImageBlobHook: (blob, callback) => {
          const formData = new FormData();
          formData.append('files', blob);

          onClickHandler(null, MODE.POST_IMAGE_UPLOAD, {
            path: 'post',
            formData
          })
          .then(res => callback(res));
        }
      }
    });
    setParentEditor(editor);
  }


  return <>
    <div ref={editorRef} id="editor"></div>
  </>
}

export default BoardEdit;