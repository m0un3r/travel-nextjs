import { useEffect } from "react";

const PAGE_HTML = `<!-- body innerHTML from cloned_site/index.html -->`;

export default function Home() {
  useEffect(() => {}, []);
  return <div dangerouslySetInnerHTML={{__html: PAGE_HTML}} />;
}
