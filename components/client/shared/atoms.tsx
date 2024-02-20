import Link from "next/link";

export const Custom_Breadcrumb = ({
  items,
}: {
  items: { name: string; link: string }[];
}) => {
  return (
    <div className="flex gap-2">
      {items.map(({ name, link }, index) => {
        return (
          <Link
            href={link}
            key={index}
            className="flex gap-2 h4 text-indigo-500"
          >
            <span>{name}</span>
            {index !== items.length - 1 && (
              <span className="text-indigo-500">{" > "}</span>
            )}
          </Link>
        );
      })}
    </div>
  );
};
