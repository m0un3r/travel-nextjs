const fs = require('fs');
const path = require('path');

const d1 = require('../explorer_survey_1/travelio_catalog.json');
const d2 = require('../explorer_survey_2/tours_dataset.json');

const d2Map = new Map(d2.map(t => [t.id, t]));

const customItineraries = {
  'cherry-blossoms-kyoto-nara': [
    { day: 1, title: 'Arrival in Kyoto & Gion Lantern Walk', description: 'Private airport transfer to your boutique ryokan in historic Gion. Evening lantern walk along the Shirakawa canal.' },
    { day: 2, title: 'Kiyomizu-dera & Philosopher’s Path', description: 'Early morning temple visit before crowds arrive. Walk beneath cherry blossom canopies along Philosopher’s Path with tea tasting.' },
    { day: 3, title: 'Arashiyama Bamboo & Sagano Scenic Train', description: 'Walk through Arashiyama bamboo forest and Tenryu-ji Zen garden, followed by a scenic retro railway ride.' },
    { day: 4, title: 'Nara Deer Park & Todai-ji Great Buddha', description: 'Excursion to Nara, feeding sacred sika deer in Nara Park and admiring the colossal bronze Buddha at Todai-ji.' },
    { day: 5, title: 'Uji Tea Ceremony & Byodoin Pavilion', description: 'Travel to historic Uji for an authentic matcha preparation class and explore the iconic Phoenix Hall.' },
    { day: 6, title: 'Fushimi Inari & Farewell Kaiseki Banquet', description: 'Hike through thousands of vermilion torii gates at Fushimi Inari, followed by a multi-course private Kaiseki dinner.' },
    { day: 7, title: 'Zen Meditation & Departure', description: 'Morning guided meditation session at Daitoku-ji and private Shinkansen/airport transfer.' }
  ],
  'marrakech-desert-atlas-journey': [
    { day: 1, title: 'Arrival in Marrakech & Medina Discovery', description: 'Private transfer to luxury Riad in the medina. Evening sensory walk through Jemaa el-Fna square.' },
    { day: 2, title: 'High Atlas Mountains & Ait Benhaddou', description: 'Scenic 4x4 drive across Tizi n’Tichka pass to the UNESCO clay fortress of Ait Benhaddou.' },
    { day: 3, title: 'Todra Gorges & Erg Chebbi Sunset Camel Trek', description: 'Journey through towering palm groves to Merzouga. Sunset camel trek into luxury Berber desert camp.' },
    { day: 4, title: 'Sahara Stargazing & Nomad Culture', description: 'Sunrise over golden dunes, 4x4 desert safari across black desert expanses, and traditional Gnawa music around campfire.' },
    { day: 5, title: 'Draa Valley & Return to Marrakech', description: 'Scenic drive through Draa palm oasis and departure transfer.' }
  ],
  'maldives-island-getaway': [
    { day: 1, title: 'Seaplane Scenic Arrival to Overwater Villa', description: 'VIP lounge greeting at Male airport and breathtaking scenic seaplane flight over turquoise atolls.' },
    { day: 2, title: 'House Reef Guided Snorkel Safari', description: 'Discover manta rays, sea turtles, and kaleidoscopic reef fish with our resident marine biologist.' },
    { day: 3, title: 'Private Sandbank Picnic & Sunset Dolphin Cruise', description: 'Exclusive speedboat ride to a secluded private sandbank followed by a champagne sunset yacht cruise.' },
    { day: 4, title: 'Ayurvedic Overwater Spa & Catamaran Sailing', description: 'Holistic 90-minute couple spa treatment with glass-floor ocean views and afternoon lagoon catamaran sailing.' },
    { day: 5, title: 'Floating Villa Breakfast & Departure', description: 'Indulgent floating breakfast in your private infinity pool followed by return seaplane transfer.' }
  ],
  'iceland-northern-lights-trails': [
    { day: 1, title: 'Arrival & Blue Lagoon Geothermal Soak', description: 'Arrive at Keflavik airport, VIP entry to the mineral-rich geothermal waters of the Blue Lagoon.' },
    { day: 2, title: 'Golden Circle & Thingvellir Rift Valley', description: 'Explore Thingvellir continental rift, Gullfoss golden waterfall, and erupting Strokkur geysers.' },
    { day: 3, title: 'South Coast Waterfalls & Reynisfjara Black Sand', description: 'Walk behind Seljalandsfoss waterfall, admire Skogafoss, and photograph the basalt columns of Reynisfjara.' },
    { day: 4, title: 'Vatnajokull Glacier Ice Caves & Aurora Chase', description: 'Super Jeep excursion inside crystal blue glacier ice caves. Nightly expert-guided Northern Lights hunt.' },
    { day: 5, title: 'Reykjavik Culture Walk & Departure', description: 'Morning design and culinary stroll in Reykjavik before airport transfer.' }
  ],
  'serengeti-great-migration-tour': [
    { day: 1, title: 'Fly to Central Serengeti & Sunset Game Drive', description: 'Bush plane flight into Seronera airstrip. Afternoon open-top 4x4 safari tracking lions and leopards.' },
    { day: 2, title: 'Mara River Migration Corridor Safari', description: 'Full-day game drive witnessing dramatic wildebeest river crossings and crocodile encounters.' },
    { day: 3, title: 'Sunrise Hot Air Balloon & Bush Champagne Breakfast', description: 'Float at dawn above endless plains followed by a full champagne breakfast under an acacia tree.' },
    { day: 4, title: 'Ngorongoro Crater Rim & Highlands', description: 'Ascend to the crater rim with sweeping panoramic views of the volcanic caldera.' },
    { day: 5, title: 'Ngorongoro Caldera Floor Big Five Safari', description: 'Descend 600 meters into the crater floor for premier black rhino, lion, and elephant sightings.' },
    { day: 6, title: 'Olduvai Gorge & Maasai Cultural Village', description: 'Visit the Cradle of Humankind archaeological site and participate in authentic Maasai traditions.' },
    { day: 7, title: 'Lake Manyara Morning Safari & Departure', description: 'Spot tree-climbing lions and pink flamingo flocks at Lake Manyara before transfer to Kilimanjaro.' }
  ],
  'tokyo-kyoto-city-experience': [
    { day: 1, title: 'Tokyo Arrival & Shinjuku Neon Night Walk', description: 'Private transfer to central Tokyo hotel. Evening izakaya and neon alleyway exploration.' },
    { day: 2, title: 'Tsukiji Food Safari & Meiji Shrine', description: 'Gourmet street food tasting with local culinary host, followed by tranquil walk through Meiji forest shrine.' },
    { day: 3, title: 'Akihabara Tech & Asakusa Senso-ji', description: 'Contrast futuristic digital art and retro gaming culture with ancient Edo temple architecture.' },
    { day: 4, title: 'Shinkansen Bullet Train to Kyoto & Gion Evening', description: 'Ride the 300 km/h bullet train past Mt. Fuji. Evening walk through lantern-lit preservation districts.' },
    { day: 5, title: 'Kyoto Golden Pavilion & Bamboo Forest', description: 'Visit Kinkaku-ji gleaming over its reflecting pond and wander through Arashiyama bamboo paths.' },
    { day: 6, title: 'Fushimi Inari Torii & Kaiseki Dinner', description: 'Early hike along 10,000 torii gates and an exclusive private multi-course Kaiseki dinner.' },
    { day: 7, title: 'Farewell Tea Ceremony & Departure', description: 'Authentic matcha ceremony inside a historic Machiya merchant house before departure.' }
  ],
  'canada-rockies-explorer': [
    { day: 1, title: 'Calgary Arrival & Drive to Banff', description: 'Scenic luxury Sprinter drive from Calgary into the majestic Canadian Rocky Mountain gateway.' },
    { day: 2, title: 'Lake Louise & Moraine Lake Canoeing', description: 'Early morning canoe paddling across the electric-turquoise glacial waters of Lake Moraine.' },
    { day: 3, title: 'Icefields Parkway & Columbia Icefield Glacier Walk', description: 'Traverse one of the world’s most scenic alpine highways and step onto ancient Athabasca Glacier ice.' },
    { day: 4, title: 'Jasper National Park & Maligne Canyon', description: 'Explore deep limestone gorges, roaring waterfalls, and spot roaming elk and grizzly bears.' },
    { day: 5, title: 'Yoho National Park & Emerald Lake', description: 'Visit Natural Bridge, Takakkaw Falls, and take a peaceful hike around vivid Emerald Lake.' },
    { day: 6, title: 'Banff Gondola & Upper Hot Springs', description: 'Ride the Banff Gondola to Sulphur Mountain summit and relax in soothing mineral hot springs.' },
    { day: 7, title: 'Bow Valley Trail Walk & Calgary Departure', description: 'Scenic valley photography stops before private transfer back to Calgary airport.' }
  ],
  'deep-amazon-river-journey': [
    { day: 1, title: 'Manaus Arrival & Board Boutique Riverboat', description: 'Board your boutique expedition vessel on the Rio Negro and cruise past the Meeting of the Waters.' },
    { day: 2, title: 'Anavilhanas Archipelago Skiff Safari', description: 'Navigate one of the world’s largest freshwater archipelagos in search of pink river dolphins.' },
    { day: 3, title: 'Primary Rainforest Jungle Trek & Survival Lore', description: 'Guided botanical hike with indigenous naturalists discovering medicinal flora and canopy wildlife.' },
    { day: 4, title: 'Nocturnal Caiman Safari & Piranha Fishing', description: 'Spot caimans and nocturnal birds with spotter lights under the equatorial canopy.' },
    { day: 5, title: 'Caboclo Riverine Community Visit', description: 'Learn sustainable cassava farming and traditional river handicrafts from riverside villagers.' },
    { day: 6, title: 'Flooded Forest (Igapo) Kayaking & Treefrogs', description: 'Paddle through surreal submerged forests among giant water lilies and toucans.' },
    { day: 7, title: 'Sunrise Birdwatching & Manaus Transfer', description: 'Early morning macaw and parrot chorus cruise before disembarkation and transfer.' }
  ],
  'china-heritage-nature-tour': [
    { day: 1, title: 'Beijing Arrival & Courtyard Welcome Dinner', description: 'Private transfer to luxury hotel near Wangfujing. Authentic Peking duck welcome banquet.' },
    { day: 2, title: 'Forbidden City & Summer Palace VIP Access', description: 'Explore imperial palaces and stroll the lakeside marble pavilions of the Summer Palace.' },
    { day: 3, title: 'Mutianyu Great Wall Sunset Banquet', description: 'Cable car ride to restored battlements and champagne sunset toasts on a secluded watchtower.' },
    { day: 4, title: 'Fly to Zhangjiajie & Tianmen Mountain Cableway', description: 'Fly to Hunan and ascend the world’s longest cable car to Tianmen Mountain and Heaven’s Gate.' },
    { day: 5, title: 'Avatar Hallelujah Mountains & Yuanjiajie', description: 'Walk among towering sandstone pillars that inspired the floating mountains of Avatar.' },
    { day: 6, title: 'Zhangjiajie Grand Canyon Glass Bridge', description: 'Cross the thrilling glass suspension bridge and cruise down pristine Baofeng Lake.' },
    { day: 7, title: 'Tujia Folk Heritage & Departure', description: 'Discover Tujia ethnic customs and embroidery before airport transfer.' }
  ],
  'iceland-volcano-adventure-route': [
    { day: 1, title: 'Reykjavik Arrival & Lava Tube Cave Exploration', description: 'Explore ancient subterranean lava tunnels formed thousands of years ago during volcanic eruptions.' },
    { day: 2, title: 'Fagradalsfjall Active Volcano Hiking Trail', description: 'Hike across recently formed basalt lava fields and steaming volcanic fissures on the Reykjanes Peninsula.' },
    { day: 3, title: 'Landmannalaugar Highland 4x4 Super Jeep Expedition', description: 'Drive through colorful rhyolite mountains, cross glacial streams, and bathe in natural geothermal rivers.' },
    { day: 4, title: 'Thorsmork Valley of Thor Wilderness Trek', description: 'Navigate deep glacial valleys sheltered by three immense surrounding ice caps.' },
    { day: 5, title: 'Descent Inside Thrihnukagigur Volcano Magma Chamber', description: 'Take an open cable lift 120 meters deep into the colorful dormant magma chamber of a volcano.' },
    { day: 6, title: 'Snaefellsnes Peninsula Volcanic Coastlines', description: 'Visit Kirkjufell mountain, black pebble beaches, and dramatic sea cliffs carved by waves.' },
    { day: 7, title: 'Secret Lagoon Geothermal Pool & Departure', description: 'Final relaxing thermal soak in Iceland’s oldest natural pool before Keflavik departure.' }
  ],
  'japan-autumn-colors-tour': [
    { day: 1, title: 'Kyoto Arrival & Illuminated Night Gardens', description: 'Arrive in Kyoto and visit Kodai-ji Temple for a breathtaking evening autumn maple illumination.' },
    { day: 2, title: 'Eikando Zen Temple & Nanzen-ji Aqueduct', description: 'Wander through fiery crimson momiji maple canopies and historic brick Roman-style aqueducts.' },
    { day: 3, title: 'Scenic Hakone Mountain Ryokan & Open-Air Onsen', description: 'Travel by Romancecar to Hakone. Relax in private outdoor thermal hot spring baths with Fuji views.' },
    { day: 4, title: 'Lake Ashi Pirate Ship Cruise & Tokyo Departure', description: 'Sail across Lake Ashi reflecting autumn foliage and Mt. Fuji before bullet train transfer.' }
  ],
  'maldives-luxury-retreat-escape': [
    { day: 1, title: 'VIP Seaplane Arrival & Dedicated Butler Greeting', description: 'Private yacht or seaplane transfer to your presidential overwater residence with 24/7 personal Thakuru.' },
    { day: 2, title: 'Underwater Michelin-Curated Dining Experience', description: 'Dine 5 meters below the Indian Ocean surrounded by living coral reefs and manta rays.' },
    { day: 3, title: 'Private Yacht Charter to Uninhabited Atoll', description: 'Sail aboard a luxury yacht for champagne and fresh grilled seafood on a deserted white sandbank.' },
    { day: 4, title: 'Overwater Ayurvedic Rejuvenation Rituals', description: 'Customized wellness treatments using organic island botanicals in an overwater pavilion.' },
    { day: 5, title: 'Private Starlight Cinema on the Beach', description: 'Watch classic cinema under the equatorial stars with gourmet snacks and vintage wine.' },
    { day: 6, title: 'Sunrise Yoga on Private Jetty & VIP Transfer', description: 'Morning oceanfront meditation followed by seaplane flight back to Male airport.' }
  ],
  'morocco-cultural-cities-tour': [
    { day: 1, title: 'Casablanca & Imperial Rabat', description: 'Tour Hassan II Mosque over the Atlantic ocean and proceed to the capital city of Rabat.' },
    { day: 2, title: 'Chefchaouen Blue Pearl Photography Walk', description: 'Explore the azure alleys, rooftop cafes, and mountain vistas of magical Chefchaouen.' },
    { day: 3, title: 'Roman Volubilis & Imperial Fez Medina', description: 'Marvel at ancient Roman mosaics and enter the world’s oldest functioning medieval medina.' },
    { day: 4, title: 'Fez Artisan Guilds: Tanneries & Ceramics', description: 'Visit the famous Chouara Tannery and learn traditional mosaic zellij tile craft from masters.' },
    { day: 5, title: 'Middle Atlas Cedar Forest & Marrakech Arrival', description: 'Drive past cedar forests and Barbary apes into the magical red city of Marrakech.' },
    { day: 6, title: 'Marrakech Palaces & Bahia Courtyards', description: 'Explore Bahia Palace, Saadian Tombs, Majorelle Gardens, and evening storytellers in Jemaa el-Fna.' },
    { day: 7, title: 'Moroccan Cooking Masterclass & Departure', description: 'Shop with a chef in the spice souk, prepare authentic tagines, and depart.' }
  ],
  'new-york-california-city-escape': [
    { day: 1, title: 'New York Arrival & Manhattan Skyline Helicopter', description: 'VIP helicopter flight over Manhattan, Statue of Liberty, and check-in to luxury Midtown hotel.' },
    { day: 2, title: 'SoHo Culinary Walk & Broadway VIP Theater', description: 'Curated tasting tour through Greenwich Village and prime orchestra seating for a Broadway production.' },
    { day: 3, title: 'Fly to Los Angeles & Pacific Coast Highway Drive', description: 'Morning flight to LAX. Convertible coastal cruise through Malibu, Santa Monica pier, and Beverly Hills.' },
    { day: 4, title: 'Hollywood Hills Sunrise Hike & Departure', description: 'Private guided sunrise hike to the Hollywood Sign with panoramic city views before departure.' }
  ],
  'rio-unlocked-beyond-the-postcard': [
    { day: 1, title: 'Ipanema Beach Arrival & Sunset at Arpoador', description: 'Check-in to beachfront hotel and watch locals applaud the sunset over the Two Brothers mountains.' },
    { day: 2, title: 'Corcovado Sunrise & Santa Teresa Arts District', description: 'VIP early entrance to Christ the Redeemer before crowds, followed by historic tram ride in Santa Teresa.' },
    { day: 3, title: 'Sugarloaf Mountain & Tijuca Rainforest Hike', description: 'Glass cable car ascent up Sugarloaf and nature walk to hidden waterfalls in the urban rainforest.' },
    { day: 4, title: 'Samba School Experience & Caipirinha Workshop', description: 'Private masterclass with local musicians and evening VIP table at a traditional Lapa samba hall.' },
    { day: 5, title: 'Secret Beaches of Grumari & Prainha', description: 'Excursion to protected wild coastal nature reserves with fresh grilled seafood lunch.' },
    { day: 6, title: 'Botanical Gardens & Galeao Airport Transfer', description: 'Morning walk along imperial royal palm avenues before departure.' }
  ],
  'tanzania-safari-wildlife-experience': [
    { day: 1, title: 'Arusha to Tarangire National Park', description: 'Drive into Tarangire, famous for giant baobabs and massive elephant herds wandering riverbeds.' },
    { day: 2, title: 'Lake Manyara Tree-Climbing Lions & Flamingos', description: 'Full game drive in Lake Manyara tracking baboon troops, tree-climbing lions, and hippos.' },
    { day: 3, title: 'Ngorongoro Crater Floor Big Five Safari', description: 'Descend 600m into the wildlife-dense caldera for black rhinos, cheetahs, and golden jackals.' },
    { day: 4, title: 'Maasai Cultural Exchange & Kilimanjaro Departure', description: 'Engage with local Maasai community elders before transfer to airport.' }
  ],
  'usa-national-parks-adventure': [
    { day: 1, title: 'Las Vegas to Zion National Park', description: 'Private luxury touring van into Zion Canyon. Evening riverside walk along the Virgin River.' },
    { day: 2, title: 'Zion Narrows & Bryce Canyon Amphitheater', description: 'Hike among the soaring red canyon walls of Zion, followed by sunset over Bryce’s hoodoo spires.' },
    { day: 3, title: 'Scenic Highway 12 to Moab & Arches', description: 'Drive one of America’s most scenic byways across Capitol Reef into the red rock wonderland of Moab.' },
    { day: 4, title: 'Delicate Arch Sunrise & Canyonlands Island in the Sky', description: 'Witness sunrise beneath iconic Delicate Arch and peer 1,000 feet down into the Green River canyon.' },
    { day: 5, title: 'Monument Valley Navajo Off-Road Safari', description: 'Private Navajo guide driving through sacred sandstone buttes and iconic cinematic landscapes.' },
    { day: 6, title: 'Grand Canyon South Rim Flightseeing & Sunset', description: 'Aerial flight over the Grand Canyon followed by champagne sunset viewing along Desert View Drive.' },
    { day: 7, title: 'Route 66 Drive & Las Vegas Departure', description: 'Drive historical Route 66 through Seligman and Kingman before Las Vegas departure.' }
  ],
  'vancouver-toronto-city-tour': [
    { day: 1, title: 'Vancouver Arrival & Stanley Park Seawall', description: 'Private transfer to downtown waterfront hotel. Electric bike tour along the scenic Stanley Park seawall.' },
    { day: 2, title: 'Capilano Suspension Bridge & Seaplane Harbor Flight', description: 'Walk among ancient coastal rainforest canopy and soar over coastal mountains by seaplane.' },
    { day: 3, title: 'Granville Island Market & Trans-Canada Flight to Toronto', description: 'Artisan culinary tasting at Granville Island Market before afternoon flight to Toronto.' },
    { day: 4, title: 'Toronto Waterfront & CN Tower SkyPod Access', description: 'Explore Toronto’s harborfront, historic Distillery District, and 360-degree views from CN Tower.' },
    { day: 5, title: 'Niagara Falls VIP Cruise & Wine Tasting', description: 'Day trip to Niagara Falls with priority boat access and ice wine tasting in Niagara-on-the-Lake.' },
    { day: 6, title: 'Kensington Market Cultural Walk & Departure', description: 'Explore multicultural food stalls, vintage boutiques, and private airport transfer.' }
  ],
  'beijing-shanghai-city-highlights': [
    { day: 1, title: 'Beijing Arrival & Hutong Rickshaw Experience', description: 'Private airport greeting. Traditional rickshaw ride through ancient Hutong alleyways with local family tea.' },
    { day: 2, title: 'Forbidden City & Mutianyu Great Wall', description: 'VIP imperial courtyard access in the morning, followed by cable car ascent to the Great Wall.' },
    { day: 3, title: 'Temple of Heaven & Bullet Train to Shanghai', description: 'Observe morning Tai Chi at Temple of Heaven. Board the 350 km/h Fuxing high-speed train to Shanghai.' },
    { day: 4, title: 'The Bund & Yu Garden Classical Heritage', description: 'Stroll the colonial Bund promenade and explore Ming Dynasty pavilions at Yu Garden.' },
    { day: 5, title: 'Shanghai Tower Observation & VIP River Cruise', description: 'Ride the world’s fastest elevator to Shanghai Tower observation deck and evening Huangpu cruise.' },
    { day: 6, title: 'French Concession Brunch & Departure', description: 'Tree-lined cafe stroll through the historic French Concession before Maglev train transfer.' }
  ]
};

const mergedTours = d1.tours.map(t1 => {
  const t2 = d2Map.get(t1.id) || {};
  return {
    id: t1.id,
    slug: t1.slug || t1.id,
    title: t1.title,
    category: t1.category,
    location: t1.location,
    country: t1.location,
    region: t1.region || '',
    price: t1.price,
    priceFormatted: t1.priceFormatted,
    pricePer: t1.pricePer || '/person',
    duration: t1.duration,
    days: t1.days,
    nights: t1.nights,
    rating: t1.rating,
    reviewsCount: t1.reviewsCount,
    reviewCount: t1.reviewsCount,
    badge: t1.badge || '',
    featured: !!t1.featured,
    tagline: t1.tagline || '',
    description: t1.description,
    overview: t1.overview,
    note: t2.note || '',
    highlights: t1.highlights || t2.highlights || [],
    inclusions: t1.inclusions || t2.inclusions || [],
    exclusions: t1.exclusions || t2.exclusions || [],
    image: t1.image,
    gallery: t1.gallery || (t2.images ? t2.images : [t1.image]),
    itinerary: customItineraries[t1.id] || t2.itinerary || []
  };
});

const outDir = path.resolve(__dirname, '../../travelio_vite_app/src/data');
fs.mkdirSync(outDir, { recursive: true });

const toursCode = `import { Tour } from '@/types';

export const tours: Tour[] = ${JSON.stringify(mergedTours, null, 2)};
`;

fs.writeFileSync(path.join(outDir, 'tours.ts'), toursCode, 'utf-8');
console.log('Successfully written tours.ts with', mergedTours.length, 'tours.');
