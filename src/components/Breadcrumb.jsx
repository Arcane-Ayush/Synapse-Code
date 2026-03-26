import { Link } from "react-router-dom";

export function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex items-center gap-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            {item.to ? (
              <Link to={item.to} className="hover:underline">
                {item.label}
              </Link>
            ) : (
              <span>{item.label}</span>
            )}
            {i < items.length - 1 && <span>›</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
