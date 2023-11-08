import { Link } from "react-router-dom";
import { allPosts } from "../posts";

const formatDate = (date: Date) => {
  // pad left with 0
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${date.getFullYear()}. ${pad(date.getMonth() + 1)}. ${pad(date.getDate())}.`;
}

export const Index = () => {
  return (
    <>
      <div className="container mx-auto px-4 py-32">
        <Link to="/" className="mt-36 font-black text-lg cursor-pointer select-none pr-2 bg-white -mb-4 z-10 relative top-[0.85em]">
          SHIFT BLOG.
        </Link>

        <div className="flex flex-col gap-12 py-16 border-y-2 border-black">
          {allPosts.map((post) => {
            return (
              <div className="flex flex-col gap-1">
                <ul className="flex gap-6 mb-1 font-semibold">
                  { post.tags.map((tag) => <li>{tag}</li>) }
                </ul>
                <Link to={post.slug} className="text-2xl font-semibold mb-1">
                  { post.title }
                </Link>
                <p className="text-gray-400">
                  { formatDate(post.date) }
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
