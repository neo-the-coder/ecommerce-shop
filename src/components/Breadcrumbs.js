import { Link, useLocation } from "react-router-dom";

function Breadcrumbs() {
  const crumbs = decodeURIComponent(useLocation().pathname).split("/");

  return (
    <nav className="ml-5 mt-2 mb-4">
      {/* <p>{location.pathname}</p> */}
      <ul className="flex items-center px-4 py-2 rounded-md bg-neutral/25">
        {crumbs.map((crumb, nth, crumbs) => (
          <li key={nth}>
            {/* {console.log(nth, crumbs.slice(0, nth + 1).join("/"))} */}
            {nth !== crumbs.length - 1 ? (
              <Link
                to={`${nth === 0 ? '/' : crumbs.slice(0, nth + 1).join("/")}`}
                className="text-sm text-black capitalize transition-colors hover:text-accent"
              >
                {nth === 0 ? "Home" : crumb.replaceAll("-", " ")}
              </Link>
            ) : (
              <span className="text-sm text-black capitalize">
                {crumb.replaceAll("-", " ")}
              </span>
            )}
            {nth !== crumbs.length - 1 && (
              <span className="inline-block mx-2 text-xs text-gray-400 &gt;">/</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Breadcrumbs;
