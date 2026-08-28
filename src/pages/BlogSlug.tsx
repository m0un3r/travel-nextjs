import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const slugs = ["a-cultural-walk-through-rome-s-ancient-streets", "a-sunset-journey-through-the-sahara-desert", "chasing-the-northern-lights-across-iceland", "exploring-kyoto-s-hidden-temples-and-quiet-streets", "island-life-in-the-maldives-what-it-really-feels-like", "lost-in-time-a-week-inside-the-medina-of-fez", "street-food-stories-from-bangkok-nights"];

const PAGE_HTMLS: Record<string, string> = {
  "a-cultural-walk-through-rome-s-ancient-streets": `<!-- body innerHTML from cloned_site/blog/a-cultural-walk-through-rome-s-ancient-streets/index.html -->`,
  "a-sunset-journey-through-the-sahara-desert": `<!-- body innerHTML from cloned_site/blog/a-sunset-journey-through-the-sahara-desert/index.html -->`,
  "chasing-the-northern-lights-across-iceland": `<!-- body innerHTML from cloned_site/blog/chasing-the-northern-lights-across-iceland/index.html -->`,
  "exploring-kyoto-s-hidden-temples-and-quiet-streets": `<!-- body innerHTML from cloned_site/blog/exploring-kyoto-s-hidden-temples-and-quiet-streets/index.html -->`,
  "island-life-in-the-maldives-what-it-really-feels-like": `<!-- body innerHTML from cloned_site/blog/island-life-in-the-maldives-what-it-really-feels-like/index.html -->`,
  "lost-in-time-a-week-inside-the-medina-of-fez": `<!-- body innerHTML from cloned_site/blog/lost-in-time-a-week-inside-the-medina-of-fez/index.html -->`,
  "street-food-stories-from-bangkok-nights": `<!-- body innerHTML from cloned_site/blog/street-food-stories-from-bangkok-nights/index.html -->`
};

export default function BlogSlug() {
  const { slug } = useParams<{slug: string}>();
  const key = slug ?? slugs[0];
  const html = PAGE_HTMLS[key] ?? PAGE_HTMLS[slugs[0]];
  useEffect(() => {}, []);
  return <div dangerouslySetInnerHTML={{__html: html}} />;
}
