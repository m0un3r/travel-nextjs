import { useEffect } from "react";

const PAGE_HTML = `<!-- body innerHTML from cloned_site/tours/index.html -->`;

export default function Tours() {
  useEffect(() => {}, []);
  return <div dangerouslySetInnerHTML={{__html: PAGE_HTML}} />;
}
