import { useEffect } from "react";

const PAGE_HTML = `<!-- 404 Not Found --> <h1>404 - Not Found</h1>`;

export default function NotFound() {
  useEffect(() => {}, []);
  return <div dangerouslySetInnerHTML={{__html: PAGE_HTML}} />;
}
