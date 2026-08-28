import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const slugs = ["privacy-policy", "terms-and-conditions"];

const PAGE_HTMLS: Record<string, string> = {
  "privacy-policy": `<!-- body innerHTML from cloned_site/legal-pages/privacy-policy/index.html -->`,
  "terms-and-conditions": `<!-- body innerHTML from cloned_site/legal-pages/terms-and-conditions/index.html -->`
};

export default function LegalSlug() {
  const { slug } = useParams<{slug: string}>();
  const key = slug ?? slugs[0];
  const html = PAGE_HTMLS[key] ?? PAGE_HTMLS[slugs[0]];
  useEffect(() => {}, []);
  return <div dangerouslySetInnerHTML={{__html: html}} />;
}
