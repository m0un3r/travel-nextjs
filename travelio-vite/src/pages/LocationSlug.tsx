import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const slugs = ["brazil", "canada", "china", "iceland", "japan", "maldives", "morocco", "tanzania", "usa"];

const PAGE_HTMLS: Record<string, string> = {
  "brazil": `<!-- body innerHTML from cloned_site/location/brazil/index.html -->`,
  "canada": `<!-- body innerHTML from cloned_site/location/canada/index.html -->`,
  "china": `<!-- body innerHTML from cloned_site/location/china/index.html -->`,
  "iceland": `<!-- body innerHTML from cloned_site/location/iceland/index.html -->`,
  "japan": `<!-- body innerHTML from cloned_site/location/japan/index.html -->`,
  "maldives": `<!-- body innerHTML from cloned_site/location/maldives/index.html -->`,
  "morocco": `<!-- body innerHTML from cloned_site/location/morocco/index.html -->`,
  "tanzania": `<!-- body innerHTML from cloned_site/location/tanzania/index.html -->`,
  "usa": `<!-- body innerHTML from cloned_site/location/usa/index.html -->`
};

export default function LocationSlug() {
  const { slug } = useParams<{slug: string}>();
  const key = slug ?? slugs[0];
  const html = PAGE_HTMLS[key] ?? PAGE_HTMLS[slugs[0]];
  useEffect(() => {}, []);
  return <div dangerouslySetInnerHTML={{__html: html}} />;
}
