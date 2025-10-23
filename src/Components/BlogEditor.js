// 'use client';
// import React, { useEffect, useState } from 'react';
// import { useEditor, EditorContent } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
// import Bold from '@tiptap/extension-bold';
// import Italic from '@tiptap/extension-italic';
// import Underline from '@tiptap/extension-underline';
// import Heading from '@tiptap/extension-heading';
// import BulletList from '@tiptap/extension-bullet-list';
// import OrderedList from '@tiptap/extension-ordered-list';
// import ListItem from '@tiptap/extension-list-item';
// import Highlight from '@tiptap/extension-highlight';

// export default function BlogEditor() {
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   const editor = useEditor({
//     extensions: [
//       StarterKit.configure({ bulletList: false, orderedList: false }),
//       Bold,
//       Italic,
//       Underline,
//       Heading.configure({ levels: [1, 2, 3] }),
//       BulletList,
//       OrderedList,
//       ListItem,
//       Highlight.configure({
//         multicolor: false, // only allow one color
//         HTMLAttributes: { style: 'background-color: yellow;' }, // always yellow
//       }),
//     ],
//     content: '<p>Write something awesome...</p>',
//     immediatelyRender: false,
//   });

//   if (!isMounted || !editor) return null;

//   return (
//     <div className="border p-4 rounded-lg shadow-lg bg-white">
//       {/* Toolbar */}
//       <div className="flex flex-wrap gap-2 mb-3 border-b pb-2">
//         <button onClick={() => editor.chain().focus().toggleBold().run()} className="border px-2 py-1 rounded">Bold</button>
//         <button onClick={() => editor.chain().focus().toggleItalic().run()} className="border px-2 py-1 rounded">Italic</button>
//         <button onClick={() => editor.chain().focus().toggleUnderline().run()} className="border px-2 py-1 rounded">Underline</button>
//         <button onClick={() => editor.chain().focus().toggleBulletList().run()} className="border px-2 py-1 rounded">• List</button>
//         <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className="border px-2 py-1 rounded">1. List</button>
//         <button onClick={() => editor.chain().focus().setHeading({ level: 1 }).run()} className="border px-2 py-1 rounded">H1</button>
//         <button onClick={() => editor.chain().focus().setHeading({ level: 2 }).run()} className="border px-2 py-1 rounded">H2</button>
//         {/* Highlight button */}
//         <button onClick={() => editor.chain().focus().toggleHighlight().run()} className="border px-2 py-1 rounded bg-yellow-200">
//           Highlight
//         </button>
//       </div>

//       <EditorContent editor={editor} className=" p-3 min-h-[200px] rounded-lg" />

//       {/* Save Button */}
//       <div className="mt-3 text-right">
//         <button onClick={() => console.log(editor.getHTML())} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
//           Save Blog
//         </button>
//       </div>
//     </div>
//   );
// };