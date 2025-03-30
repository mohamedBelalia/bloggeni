// components/MDXEditor.tsx
import { get } from 'http';
import dynamic from 'next/dynamic';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

type MDXEditorProps = {
  mdxData: string;
  getGeneratedBlog: Dispatch<SetStateAction<string>>
};

const MDXEditor: React.FC<MDXEditorProps> = ({ mdxData , getGeneratedBlog }) => {
  const [value, setValue] = useState<string>(mdxData); // store MDX content

  // Update the state when mdxData prop changes
  useEffect(() => {
    setValue(mdxData);
  }, [mdxData]);

  useEffect(() => {
    getGeneratedBlog(value);
  }, [value]);

  console.log('MDXEditor', mdxData);

  return (
    <div data-color-mode="light">
      <MDEditor
        value={value}
        style={{ minHeight: '100vh' }}
        onChange={(val) => setValue(val || '')}
      />
    </div>
  );
};

export default MDXEditor;


