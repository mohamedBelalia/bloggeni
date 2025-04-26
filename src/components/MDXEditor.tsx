import dynamic from 'next/dynamic';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Bold, Italic, List, ListOrdered, Quote, Code, Image, Link, HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

type MDXEditorProps = {
  mdxData: string;
  getGeneratedBlog: Dispatch<SetStateAction<string>>;
};

const MDXEditor: React.FC<MDXEditorProps> = ({ mdxData, getGeneratedBlog }) => {
  const [value, setValue] = useState<string>(mdxData);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    setValue(mdxData);
  }, [mdxData]);

  useEffect(() => {
    getGeneratedBlog(value);
  }, [value]);

  const handleCommand = (command: string) => {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    let newText = '';

    switch (command) {
      case 'bold':
        newText = `**${selectedText}**`;
        break;
      case 'italic':
        newText = `*${selectedText}*`;
        break;
      case 'list':
        newText = `- ${selectedText}`;
        break;
      case 'ordered-list':
        newText = `1. ${selectedText}`;
        break;
      case 'quote':
        newText = `> ${selectedText}`;
        break;
      case 'code':
        newText = `\`${selectedText}\``;
        break;
      case 'image':
        newText = `![alt text](image-url)`;
        break;
      case 'link':
        newText = `[${selectedText}](url)`;
        break;
    }

    const newValue = value.substring(0, start) + newText + value.substring(end);
    setValue(newValue);
  };

  return (
    <div className="w-full">
      {/* Toolbar */}
      <div className="flex items-center gap-2 p-2 border-b border-gray-200 bg-gray-50 rounded-t-lg">
        <TooltipProvider>
          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => handleCommand('bold')}
                  className="p-2 hover:bg-gray-200 rounded-md transition-colors"
                >
                  <Bold className="w-4 h-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Bold</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => handleCommand('italic')}
                  className="p-2 hover:bg-gray-200 rounded-md transition-colors"
                >
                  <Italic className="w-4 h-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Italic</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => handleCommand('list')}
                  className="p-2 hover:bg-gray-200 rounded-md transition-colors"
                >
                  <List className="w-4 h-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Bullet List</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => handleCommand('ordered-list')}
                  className="p-2 hover:bg-gray-200 rounded-md transition-colors"
                >
                  <ListOrdered className="w-4 h-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Numbered List</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => handleCommand('quote')}
                  className="p-2 hover:bg-gray-200 rounded-md transition-colors"
                >
                  <Quote className="w-4 h-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Quote</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => handleCommand('code')}
                  className="p-2 hover:bg-gray-200 rounded-md transition-colors"
                >
                  <Code className="w-4 h-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Code</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => handleCommand('image')}
                  className="p-2 hover:bg-gray-200 rounded-md transition-colors"
                >
                  <Image className="w-4 h-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Insert Image</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => handleCommand('link')}
                  className="p-2 hover:bg-gray-200 rounded-md transition-colors"
                >
                  <Link className="w-4 h-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Insert Link</TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>

        <div className="flex-1" />

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => setShowHelp(!showHelp)}
              className="p-2 hover:bg-gray-200 rounded-md transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent>Markdown Help</TooltipContent>
        </Tooltip>
      </div>

      {/* Help Panel */}
      {showHelp && (
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <h3 className="font-medium mb-2">Markdown Quick Reference</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p><code>**text**</code> - Bold</p>
              <p><code>*text*</code> - Italic</p>
              <p><code># Heading</code> - Heading</p>
              <p><code>- item</code> - Bullet List</p>
            </div>
            <div>
              <p><code>1. item</code> - Numbered List</p>
              <p><code> text</code> - Quote</p>
              <p><code>`code`</code> - Code</p>
              <p><code>[text](url)</code> - Link</p>
            </div>
          </div>
        </div>
      )}

      {/* Editor */}
      <div data-color-mode="light" className="rounded-b-lg">
        <MDEditor
          value={value}
          style={{ minHeight: '400px' }}
          onChange={(val) => setValue(val || '')}
          preview="preview"
          height={400}
          visibleDragbar={false}
        />
      </div>
    </div>
  );
};

export default MDXEditor;


