import { useEffect } from "react";

const PAGE_HTML = `<!-- body innerHTML from cloned_site/contact/index.html -->`;

export default function Contact() {
  useEffect(() => {}, []);
  return <div dangerouslySetInnerHTML={{__html: PAGE_HTML}} />;
}
