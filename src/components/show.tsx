import ReactMarkdown from "react-markdown";

import { allPosts } from "../posts";
import { useParams } from "react-router";
import { useMemo } from "react";
import { Link } from "react-router-dom";
export const Show = () => {
  const { slug } = useParams();

  const post = useMemo(() => {
    return allPosts.find((post) => post.slug === slug);
  }, [slug]);

  if (!post) return <div className="flex items-center justify-center w-screen h-screen">
    <h1 className="text-xl font-semibold">Not Found.</h1>
  </div>;

  return (
    <>
      <div className="container mx-auto px-4 py-36">
        <Link to="/" className='font-black text-lg cursor-pointer select-none'>SHIFT BLOG.</Link>

        <h1 className="font-semibold text-4xl mt-8 break-keep">
          {post.title}
        </h1>
        <p className='text-gray-500 mb-8 font-mono text-xs mt-1 font-bold'>{post.slug}</p>

        <ReactMarkdown className="flex flex-col gap-8 text-lg leading-9" components={{
          h1: ({ ...props }) => <h1 className="font-semibold text-3xl mt-10" {...props} />,
          h2: ({ ...props }) => <h2 className="font-semibold text-2xl mt-10" {...props} />,
          h3: ({ ...props }) => <h3 className="font-semibold text-xl mt-10" {...props} />,
          h4: ({ ...props }) => <h4 className="font-semibold text-lg mt-10" {...props} />,
          h5: ({ ...props }) => <h5 className="font-semibold text-lg mt-10" {...props} />,
          h6: ({ ...props }) => <h6 className="font-semibold text-lg mt-10" {...props} />,
          p: ({ ...props }) => <p className="" {...props} />,
          a: ({ ...props }) => <a className="text-blue-500 hover:underline" {...props} />,
          ul: ({ ...props }) => <ul className="list-disc list-inside" {...props} />,
          ol: ({ ...props }) => <ol className="list-decimal list-inside" {...props} />,
          li: ({ ...props }) => <li className="" {...props} />,
          strong: ({ ...props }) => <strong className="font-semibold" {...props} />,
          hr: ({ ...props }) => <hr className="border-gray-300 my-8" {...props} />,
          blockquote: ({ ...props }) => <blockquote className="border-l-4 border-blue-500 pl-3" {...props} />,
          img: ({ ...props }) => {
            if (props.alt?.startsWith('wide-')) {
              let alt = props.alt.replace('wide-', '');
              let align = 'center';
              if (alt.startsWith('right-')) {
                alt = alt.replace('right-', '');
                align = 'right';
              }
              return <>
                <div className='flex justify-center'>
                  <img className="w-screen max-w-[100vw] relative left-0 mx-auto" {...props} />
                </div>
                <p className={`mt-2 text-gray-500 text-${align}`}>{alt}</p>
              </>
            }
            return <>
              <img className="max-w-full lg:max-w-screen-lg mx-auto" {...props} />
            </>
          },
          pre: ({ ...props }) => <pre className="bg-gray-100 p-6 rounded-md leading-6 text-sm" {...props} />,
          code: ({ ...props }) => <code className="bg-gray-100 p-1 rounded-md font-mono text-sm" {...props} />,
          // Unchecked
          table: ({ ...props }) => <table className="border-collapse border border-gray-300" {...props} />,
          thead: ({ ...props }) => <thead className="border border-gray-300" {...props} />,
          tbody: ({ ...props }) => <tbody className="border border-gray-300" {...props} />,
          th: ({ ...props }) => <th className="border border-gray-300 px-4 py-2" {...props} />,
          td: ({ ...props }) => <td className="border border-gray-300 px-4 py-2" {...props} />,
          em: ({ ...props }) => <em className="italic" {...props} />,
          del: ({ ...props }) => <del className="line-through" {...props} />,
        }}>
          {post.content}
        </ReactMarkdown>
      </div>
    </>
  )
}
