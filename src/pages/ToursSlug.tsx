import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const slugs = ["beijing-shanghai-city-highlights", "canada-rockies-explorer", "cherry-blossoms-kyoto-nara", "china-heritage-nature-tour", "deep-amazon-river-journey", "iceland-northern-lights-trails", "iceland-volcano-adventure-route", "japan-autumn-colors-tour", "maldives-island-getaway", "maldives-luxury-retreat-escape", "marrakech-desert-atlas-journey", "morocco-cultural-cities-tour", "new-york-california-city-escape", "rio-unlocked-beyond-the-postcard", "serengeti-great-migration-tour", "tanzania-safari-wildlife-experience", "tokyo-kyoto-city-experience", "usa-national-parks-adventure", "vancouver-toronto-city-tour"];

const PAGE_HTMLS: Record<string, string> = {
  "beijing-shanghai-city-highlights": `<!-- body innerHTML from cloned_site/tours/beijing-shanghai-city-highlights/index.html -->`,
  "canada-rockies-explorer": `<!-- body innerHTML from cloned_site/tours/canada-rockies-explorer/index.html -->`,
  "cherry-blossoms-kyoto-nara": `<!-- body innerHTML from cloned_site/tours/cherry-blossoms-kyoto-nara/index.html -->`,
  "china-heritage-nature-tour": `<!-- body innerHTML from cloned_site/tours/china-heritage-nature-tour/index.html -->`,
  "deep-amazon-river-journey": `<!-- body innerHTML from cloned_site/tours/deep-amazon-river-journey/index.html -->`,
  "iceland-northern-lights-trails": `<!-- body innerHTML from cloned_site/tours/iceland-northern-lights-trails/index.html -->`,
  "iceland-volcano-adventure-route": `<!-- body innerHTML from cloned_site/tours/iceland-volcano-adventure-route/index.html -->`,
  "japan-autumn-colors-tour": `<!-- body innerHTML from cloned_site/tours/japan-autumn-colors-tour/index.html -->`,
  "maldives-island-getaway": `<!-- body innerHTML from cloned_site/tours/maldives-island-getaway/index.html -->`,
  "maldives-luxury-retreat-escape": `<!-- body innerHTML from cloned_site/tours/maldives-luxury-retreat-escape/index.html -->`,
  "marrakech-desert-atlas-journey": `<!-- body innerHTML from cloned_site/tours/marrakech-desert-atlas-journey/index.html -->`,
  "morocco-cultural-cities-tour": `<!-- body innerHTML from cloned_site/tours/morocco-cultural-cities-tour/index.html -->`,
  "new-york-california-city-escape": `<!-- body innerHTML from cloned_site/tours/new-york-california-city-escape/index.html -->`,
  "rio-unlocked-beyond-the-postcard": `<!-- body innerHTML from cloned_site/tours/rio-unlocked-beyond-the-postcard/index.html -->`,
  "serengeti-great-migration-tour": `<!-- body innerHTML from cloned_site/tours/serengeti-great-migration-tour/index.html -->`,
  "tanzania-safari-wildlife-experience": `<!-- body innerHTML from cloned_site/tours/tanzania-safari-wildlife-experience/index.html -->`,
  "tokyo-kyoto-city-experience": `<!-- body innerHTML from cloned_site/tours/tokyo-kyoto-city-experience/index.html -->`,
  "usa-national-parks-adventure": `<!-- body innerHTML from cloned_site/tours/usa-national-parks-adventure/index.html -->`,
  "vancouver-toronto-city-tour": `<!-- body innerHTML from cloned_site/tours/vancouver-toronto-city-tour/index.html -->`
};

export default function ToursSlug() {
  const { slug } = useParams<{slug: string}>();
  const key = slug ?? slugs[0];
  const html = PAGE_HTMLS[key] ?? PAGE_HTMLS[slugs[0]];
  useEffect(() => {}, []);
  return <div dangerouslySetInnerHTML={{__html: html}} />;
}
