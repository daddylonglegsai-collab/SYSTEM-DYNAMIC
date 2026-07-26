import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({
  content,
}: MarkdownRendererProps) {
  return (
    <div
      dir="rtl"
      className="
        prose
        prose-invert
        max-w-none
        text-right
        leading-8
        text-slate-300
      "
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{

          h1: ({ children }) => (
            <h1 className="text-2xl font-bold text-white mt-6 mb-4">
              {children}
            </h1>
          ),

          h2: ({ children }) => (
            <h2 className="text-xl font-bold text-white mt-5 mb-3">
              {children}
            </h2>
          ),

          h3: ({ children }) => (
            <h3 className="text-lg font-semibold text-white mt-4 mb-2">
              {children}
            </h3>
          ),

          p: ({ children }) => (
            <p className="mb-4 text-right">
              {children}
            </p>
          ),

          ul: ({ children }) => (
            <ul className="list-disc pr-6 mb-4 space-y-2">
              {children}
            </ul>
          ),

          ol: ({ children }) => (
            <ol className="list-decimal pr-6 mb-4 space-y-2">
              {children}
            </ol>
          ),

          blockquote: ({ children }) => (
            <blockquote
              className="
                border-r-4
                border-[#169cda]
                pr-4
                italic
                text-slate-400
                my-4
              "
            >
              {children}
            </blockquote>
          ),


          table: ({ children }) => (
            <div className="overflow-x-auto my-5">
              <table
                className="
                  w-full
                  border-collapse
                  border
                  border-white/10
                  text-sm
                  text-right
                "
              >
                {children}
              </table>
            </div>
          ),

          thead: ({ children }) => (
            <thead className="bg-[#169cda]/20">
              {children}
            </thead>
          ),

          th: ({ children }) => (
            <th
              className="
                border
                border-white/10
                px-4
                py-3
                font-bold
                text-white
                text-right
              "
            >
              {children}
            </th>
          ),

          td: ({ children }) => (
            <td
              className="
                border
                border-white/10
                px-4
                py-3
                text-right
              "
            >
              {children}
            </td>
          ),


          code: ({ children }) => (
            <code
              className="
                rounded
                bg-black/30
                px-2
                py-1
                text-sm
                text-[#67cef5]
              "
            >
              {children}
            </code>
          ),

          pre: ({ children }) => (
            <pre
              dir="ltr"
              className="
                overflow-x-auto
                rounded-xl
                bg-black/40
                p-4
                my-4
                text-left
              "
            >
              {children}
            </pre>
          ),

          a: ({ children, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="text-[#57c6f2] underline"
            >
              {children}
            </a>
          ),

        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
