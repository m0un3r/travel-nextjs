import { useEffect } from "react";

const PAGE_HTML = `<!-- body innerHTML from cloned_site/about/index.html -->`;

export default function About() {
  useEffect(() => {}, []);
  return <div dangerouslySetInnerHTML={{__html: PAGE_HTML}} />;
}
