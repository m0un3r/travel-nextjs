import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const slugs = ["adventure", "cities", "honeymoon", "nature", "wildlife"];

const PAGE_HTMLS: Record<string, string> = {
  "adventure": `<!-- body innerHTML from cloned_site/categories/adventure/index.html -->`,
  "cities": `<!-- body innerHTML from cloned_site/categories/cities/index.html -->`,
  "honeymoon": `<!-- body innerHTML from cloned_site/categories/honeymoon/index.html -->`,
  "nature": `<!-- body innerHTML from cloned_site/categories/nature/index.html -->`,
  "wildlife": `<!-- body innerHTML from cloned_site/categories/wildlife/index.html -->`
};

export default function CategorySlug() {
  const { slug } = useParams<{slug: string}>();
  const key = slug ?? slugs[0];
  const html = PAGE_HTMLS[key] ?? PAGE_HTMLS[slugs[0]];
  useEffect(() => {}, []);
  return <div dangerouslySetInnerHTML={{__html: html}} />;
}
