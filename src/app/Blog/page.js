'use client';
import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import Heading from '@tiptap/extension-heading';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import Highlight from '@tiptap/extension-highlight';
import axios from 'axios';
import { REACT_LOADABLE_MANIFEST } from 'next/dist/shared/lib/constants';
import { NextResponse } from 'next/server';
import Link from 'next/link';
import { toast } from 'react-toastify';

export default function BlogEditor() {
  const [isMounted, setIsMounted] = useState(false);
  const [heading , setHeading] = useState('');
  const Show = true;

  const handleHeading = (e) => {
      e.preventDefault();
      setHeading(e.target.value);
      console.log(e.target.value);
  };



  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ✅ Call the Hook unconditionally
const editor = useEditor({
  extensions: [
    StarterKit,
    Bold,
    Italic,
    Underline,
    BulletList,
    OrderedList,
    ListItem,
    Highlight.configure({
      multicolor: false,
      HTMLAttributes: { style: 'background-color: yellow;' },
    }),
  ],
  content: '<p>Write something awesome...</p>',
  immediatelyRender: false,
});

  // Only render the editor content after mounting
  if (!isMounted || !editor) return null;

  const handleSave = async() => {
    const blogData = editor.getHTML();
    const responseBlog = await axios.post('/api/blog', { head : heading , content : blogData});
    console.log( 'from blog save ' , responseBlog.status);
    if(responseBlog.status == 200){
      toast.success('Saved !!!');
      return NextResponse.json('success' , {status : 200});
    }
    return NextResponse.json('success' , {status : 500});
  };

  return (
  <div>
    <div className="border p-4 rounded-lg shadow-lg bg-white">
      <div className="flex flex-wrap gap-2 mb-3 border-b pb-2">
        <button onClick={() => editor.chain().focus().toggleBold().run()} className="border px-2 py-1 rounded">Bold</button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className="border px-2 py-1 rounded">Italic</button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()} className="border px-2 py-1 rounded">Underline</button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className="border px-2 py-1 rounded">• List</button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className="border px-2 py-1 rounded">1. List</button>
        <button onClick={() => editor.chain().focus().toggleHighlight().run()} className="border px-2 py-1 rounded bg-yellow-200">Highlight</button>
      </div>

    <div>
      <input onChange={(e) => handleHeading(e)} type='text' className='border my-2 w-full'></input>
      <EditorContent editor={editor} className="border p-3 min-h-[100px] rounded-lg" />
    </div>

      <div className="flex flex-row justify-around mt-3 text-right">
        <Link href={`/blog-listing?show=${Show}`}>
          <button  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">Blog Listing</button>
        </Link>
        <button onClick={() => handleSave()} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">Save Blog</button>
      </div>
    </div>
  </div>
  );
};