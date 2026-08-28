const fs = require('fs');

const tours = [
  {
    id: "cherry-blossoms-kyoto-nara",
    slug: "cherry-blossoms-kyoto-nara",
    title: "Cherry Blossoms of Kyoto & Nara",
    category: "Nature",
    location: "Japan",
    region: "East Asia",
    price: 3290,
    priceFormatted: "$3,290",
    pricePer: "/person",
    duration: "7 D / 6 N",
    nights: 6,
    days: 7,
    rating: 4.9,
    reviewsCount: 148,
    badge: "🌸 Cherry blossom season · Apr 4, 2026 · 6 spots left",
    featured: true,
    tagline: "Where ancient temples meet clouds of pastel pink petals.",
    description: "Experience Japan’s ethereal spring season wandering quiet stone paths, ancient shrine courtyards, and blooming bamboo groves across Kyoto, Nara, and Uji.",
    overview: "Walk beneath cascading sakura blossoms across Kyoto’s UNESCO World Heritage shrines, feed the gentle sacred deer of Nara Park, and experience authentic tea ceremonies with certified local masters.",
    highlights: [
      "Private early-morning access to Fushimi Inari and Arashiyama Bamboo Grove",
      "Traditional Kaiseki dinner with Geiko performance in Gion",
      "Curated photography walks through Kyoto’s Philosopher's Path"
    ],
    inclusions: [
      "6 nights in boutique Ryokans & luxury hotels",
      "JR Shinkansen bullet train passes & private transfers",
      "Daily artisan breakfasts & 4 curated dinners",
      "English-speaking licensed cultural guide",
      "All temple and garden entrance fees"
    ],
    exclusions: [
      "International flights to/from Kansai or Tokyo",
      "Personal travel insurance",
      "Alcoholic beverages outside tastings"
    ],
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "marrakech-desert-atlas-journey",
    slug: "marrakech-desert-atlas-journey",
    title: "Marrakech Desert & Atlas Journey",
    category: "Adventure",
    location: "Morocco",
    region: "North Africa",
    price: 3150,
    priceFormatted: "$3,150",
    pricePer: "/person",
    duration: "5 D / 4 N",
    nights: 4,
    days: 5,
    rating: 4.9,
    reviewsCount: 132,
    badge: "🐪 Desert season · Oct 12, 2026 · 4 spots left",
    featured: true,
    tagline: "Vibrant medinas, High Atlas passes, and starlit Sahara dunes.",
    description: "Journey through Morocco’s vibrant imperial cities, cinematic mountain passes, and vast desert horizons with luxury desert glamping and Berber hospitality.",
    overview: "From the sensory kaleidoscope of Marrakech’s Jemaa el-Fna to the silent dunes of Erg Chebbi, this adventure combines historic riad stays, 4x4 mountain crossings, and private nomad camps under the Sahara stars.",
    highlights: [
      "Exclusive luxury desert camp in the golden dunes of Merzouga",
      "High Atlas 4x4 mountain crossing via Tizi n'Tichka pass",
      "Private guided culinary and architectural tour of Marrakech medina"
    ],
    inclusions: [
      "4 nights in authentic luxury Riads & Berber desert tents",
      "Private air-conditioned 4x4 transport with driver",
      "Camel trek with sunset tea in Erg Chebbi",
      "All dinners in desert & daily gourmet breakfasts",
      "Local cultural storytelling & music performances"
    ],
    exclusions: [
      "International flights to Marrakech Menara",
      "Gratuities for guides and drivers",
      "Personal souvenirs and optional spa treatments"
    ],
    image: "https://images.unsplash.com/photo-1509721434272-b79147e0e708?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1509721434272-b79147e0e708?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "maldives-island-getaway",
    slug: "maldives-island-getaway",
    title: "Maldives Island Getaway",
    category: "Honeymoon",
    location: "Maldives",
    region: "Indian Ocean",
    price: 3980,
    priceFormatted: "$3,980",
    pricePer: "/person",
    duration: "5 D / 4 N",
    nights: 4,
    days: 5,
    rating: 5.0,
    reviewsCount: 164,
    badge: "✨ Romantic luxury getaway · Private overwater villa",
    featured: true,
    tagline: "Unwind in crystal lagoons with uninterrupted ocean calm.",
    description: "Unwind in the Maldives with crystal clear turquoise waters, private overwater villas, secluded sandbank dining, and thriving coral reefs.",
    overview: "Escape into tropical tranquility with panoramic Indian Ocean vistas, bespoke sunset dolphin cruises, rejuvenating overwater spa rituals, and world-class house reef snorkeling.",
    highlights: [
      "Stay in an overwater villa with direct lagoon access and private plunge pool",
      "Private candlelit sandbank dinner under the constellations",
      "Guided marine biology snorkel safari with manta rays and sea turtles"
    ],
    inclusions: [
      "4 nights in 5-star overwater pool villa",
      "Roundtrip seaplane / speedboat airport transfers",
      "All-inclusive gourmet dining & sommelier wine pairings",
      "Daily snorkeling equipment & guided reef excursions",
      "Couple’s 90-minute holistic spa treatment"
    ],
    exclusions: [
      "International flights to Malé (MLE)",
      "PADI scuba certification courses",
      "Motorized watersports (jet skis)"
    ],
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "iceland-northern-lights-trails",
    slug: "iceland-northern-lights-trails",
    title: "Iceland Northern Lights Trails",
    category: "Nature",
    location: "Iceland",
    region: "Nordic Europe",
    price: 3980,
    priceFormatted: "$3,980",
    pricePer: "/person",
    duration: "5 D / 4 N",
    nights: 4,
    days: 5,
    rating: 4.9,
    reviewsCount: 156,
    badge: "🌌 Aurora season · Nov 15, 2026 · High aurora probability",
    featured: true,
    tagline: "Glaciers, thundering waterfalls, and celestial dancing lights.",
    description: "Witness Iceland’s glaciers, waterfalls, and northern lights across vast and ever-changing volcanic landscapes and geothermal hot springs.",
    overview: "Traverse the Golden Circle, walk along the black basalt sands of Reynisfjara, explore ethereal crystal ice caves in Vatnajökull, and hunt for the Aurora Borealis from remote wilderness lodges.",
    highlights: [
      "Vatnajökull glacier crystal ice cave exploration with glaciologist",
      "Nightly aurora chases with professional night-sky photographer",
      "Relaxation in the geothermal waters of the Blue Lagoon & Sky Lagoon"
    ],
    inclusions: [
      "4 nights in premium Nordic design lodges with aurora wake-up service",
      "Custom 4x4 Super Jeep transport throughout route",
      "Crampons, helmet, and glacier expedition gear",
      "All thermal bath entries and towel service",
      "Daily organic Scandinavian breakfasts & 3 farm-to-table dinners"
    ],
    exclusions: [
      "International flights to Keflavík (KEF)",
      "Alcoholic beverages & personal outerwear",
      "Optional helicopter volcano tour"
    ],
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1483373018724-770a096812ff?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "serengeti-great-migration-tour",
    slug: "serengeti-great-migration-tour",
    title: "Serengeti Great Migration Tour",
    category: "Wildlife",
    location: "Tanzania",
    region: "East Africa",
    price: 4980,
    priceFormatted: "$4,980",
    pricePer: "/person",
    duration: "7 D / 6 N",
    nights: 6,
    days: 7,
    rating: 5.0,
    reviewsCount: 195,
    badge: "🦁 Migration confirmed active · Aug 5, 2026 · 3 spots left",
    featured: true,
    tagline: "Dramatic wildlife movement across open savanna plains.",
    description: "Follow the Great Migration across open plains with dramatic wildlife movement, predator encounters, and shifting African landscapes.",
    overview: "Witness millions of wildebeest and zebras crossing the Mara River, track the Big Five in Ngorongoro Crater, and stay in eco-luxury tented camps with front-row savanna views.",
    highlights: [
      "Front-row game drives along the Mara River migration corridors",
      "Descend 600m into Ngorongoro Crater for premier Big Five viewing",
      "Sunrise hot air balloon safari with champagne breakfast in the bush"
    ],
    inclusions: [
      "6 nights in luxury tented safari camps & crater lodges",
      "Custom 4x4 open-roof safari vehicle with dedicated ranger & tracker",
      "All Serengeti & Ngorongoro national park conservation fees",
      "All meals, filtered water, bush picnics, and selected sundowners",
      "Domestic charter flights between Arusha and Serengeti airstrips"
    ],
    exclusions: [
      "International flights to Kilimanjaro (JRO)",
      "Tanzania visa fees",
      "Ranger and camp staff gratuities"
    ],
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "tokyo-kyoto-city-experience",
    slug: "tokyo-kyoto-city-experience",
    title: "Tokyo & Kyoto City Experience",
    category: "Cities",
    location: "Japan",
    region: "East Asia",
    price: 2980,
    priceFormatted: "$2,980",
    pricePer: "/person",
    duration: "7 D / 6 N",
    nights: 6,
    days: 7,
    rating: 4.9,
    reviewsCount: 172,
    badge: "🏯 Most booked Japan tour · May 12, 2026 · 5 spots left",
    featured: true,
    tagline: "Where futuristic energy meets timeless tradition.",
    description: "Step into Tokyo’s fast-paced energy and Kyoto’s quiet traditions through a balanced city journey across world-class cuisine, architecture, and nightlife.",
    overview: "Contrast Tokyo's electric neon alleys of Shibuya and Shinjuku with Kyoto's serene stone lanes in Gion and historic bamboo paths, traveling seamlessly by bullet train.",
    highlights: [
      "Tsukiji outer market street food safari with local chef",
      "Private tea ceremony in a centuries-old Kyoto machiya",
      "Shinkansen bullet train first-class scenic ride past Mt. Fuji"
    ],
    inclusions: [
      "6 nights in 4-star boutique city hotels in Ginza & Downtown Kyoto",
      "7-day Unlimited JR Green Car Rail Pass",
      "Private bilingual city host for major excursions",
      "Daily breakfasts & curated Izakaya food crawl",
      "Pocket Wi-Fi device with unlimited high-speed data"
    ],
    exclusions: [
      "International airfare",
      "Meals not specified in the itinerary",
      "Personal shopping and transit metro cards"
    ],
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "canada-rockies-explorer",
    slug: "canada-rockies-explorer",
    title: "Canada Rockies Explorer",
    category: "Nature",
    location: "Canada",
    region: "North America",
    price: 3680,
    priceFormatted: "$3,680",
    pricePer: "/person",
    duration: "7 D / 6 N",
    nights: 6,
    days: 7,
    rating: 4.9,
    reviewsCount: 118,
    badge: "🏔️ Alpine peak season · Jul 10, 2026 · Limited group of 10",
    featured: false,
    tagline: "Glacial lakes, towering peaks, and pristine alpine wilderness.",
    description: "Experience Canada’s alpine landscapes through turquoise glacier-fed lakes, towering mountain passes, and scenic wildlife corridors in Banff and Jasper.",
    overview: "Drive the world-renowned Icefields Parkway, kayak on the electric-blue waters of Lake Louise and Moraine Lake, and walk atop ancient Athabasca Glacier ice.",
    highlights: [
      "Sunrise canoeing on Lake Moraine before public access opens",
      "Icefields Parkway scenic expedition and Columbia Icefield skywalk",
      "Stay at the historic Fairmont Chateau Lake Louise"
    ],
    inclusions: [
      "6 nights in premium mountain lodges & alpine resorts",
      "Private luxury sprinter van transportation throughout Alberta",
      "National Park discovery passes and guided hikes",
      "Canoe rentals on Lake Louise & Moraine Lake",
      "Daily breakfast & 3 gourmet rustic dinners"
    ],
    exclusions: [
      "Flights to Calgary (YYC)",
      "Park equipment rental (hiking poles/boots)",
      "Gratuities for mountain guides"
    ],
    image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "deep-amazon-river-journey",
    slug: "deep-amazon-river-journey",
    title: "Deep Amazon River Journey",
    category: "Adventure",
    location: "Brazil",
    region: "South America",
    price: 3920,
    priceFormatted: "$3,920",
    pricePer: "/person",
    duration: "7 D / 6 N",
    nights: 6,
    days: 7,
    rating: 4.8,
    reviewsCount: 94,
    badge: "🌿 Deep expedition · Sep 14, 2026 · Native naturalist led",
    featured: false,
    tagline: "River routes, dense canopy, and guided nocturnal wildlife exploration.",
    description: "Travel deep into the Amazon through river routes, dense rainforest canopy, and guided wildlife exploration along the Rio Negro and tributaries.",
    overview: "Navigate hidden river tributaries aboard an eco-riverboat, spot pink river dolphins, trek primary rainforest trails, and learn botanical remedies from indigenous guides.",
    highlights: [
      "Small-ship boutique river cruise with panoramic cabin balconies",
      "Night safaris to spot caimans, tree frogs, and nocturnal predators",
      "Piranha fishing and visits to riverine caboclo communities"
    ],
    inclusions: [
      "6 nights aboard boutique expedition vessel & jungle lodge",
      "All meals featuring authentic Amazonian regional gastronomy",
      "Daily motorized skiff excursions with expert naturalists",
      "Airport transfers in Manaus",
      "Rubber boots and expedition equipment provided"
    ],
    exclusions: [
      "Flights to Manaus (MAO)",
      "Yellow fever vaccination costs",
      "Alcoholic beverages"
    ],
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "china-heritage-nature-tour",
    slug: "china-heritage-nature-tour",
    title: "China Heritage & Nature Tour",
    category: "Nature",
    location: "China",
    region: "East Asia",
    price: 3180,
    priceFormatted: "$3,180",
    pricePer: "/person",
    duration: "7 D / 6 N",
    nights: 6,
    days: 7,
    rating: 4.9,
    reviewsCount: 108,
    badge: "🐉 Heritage classic · Oct 8, 2026 · Exclusive Great Wall access",
    featured: false,
    tagline: "Historic imperial wonders meet mystical avatar mountain pillars.",
    description: "Travel through China’s historic sites and breathtaking natural karst pillars from the Great Wall of Mutianyu to the misty peaks of Zhangjiajie.",
    overview: "Walk the unrestored wild sections of the Great Wall, marvel at Beijing's Forbidden City, and explore the sandstone pinnacles of Zhangjiajie National Forest Park.",
    highlights: [
      "Private sunset banquet on a secluded watchtower of the Great Wall",
      "Glass bridge and cableway crossing in Zhangjiajie National Park",
      "VIP access to the Forbidden City and Summer Palace in Beijing"
    ],
    inclusions: [
      "6 nights in 5-star hotels & boutique mountain retreat",
      "Domestic high-speed train & flights between Beijing and Zhangjiajie",
      "Private English-speaking certified historical guide",
      "All breakfasts and regional specialty banquet lunches",
      "All park entry permits and priority VIP queue bypass"
    ],
    exclusions: [
      "International flights",
      "China tourist visa processing",
      "Personal items and evening meals"
    ],
    image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "iceland-volcano-adventure-route",
    slug: "iceland-volcano-adventure-route",
    title: "Iceland Volcano & Adventure Route",
    category: "Adventure",
    location: "Iceland",
    region: "Nordic Europe",
    price: 3720,
    priceFormatted: "$3,720",
    pricePer: "/person",
    duration: "7 D / 6 N",
    nights: 6,
    days: 7,
    rating: 4.9,
    reviewsCount: 125,
    badge: "🌋 Volcanic trails · Jul 20, 2026 · Highlands 4x4 expedition",
    featured: false,
    tagline: "Move across active volcanic terrain, lava tubes, and steaming rifts.",
    description: "Move across volcanic terrain shaped by fresh lava fields, rugged highland tracks, black desert rivers, and active natural formations.",
    overview: "Hike the raw volcanic terrain of Fagradalsfjall, explore the colorful rhyolite mountains of Landmannalaugar, and bathe in natural secret geothermal rivers.",
    highlights: [
      "Guided trek across fresh lava fields and steaming volcanic fissures",
      "Highlands expedition through Landmannalaugar and Thórsmörk",
      "Descent inside the dormant magma chamber of Thrihnukagigur volcano"
    ],
    inclusions: [
      "6 nights in boutique eco-hotels & mountain chalets",
      "Modified Super Jeep 4x4 with professional wilderness driver",
      "Specialist volcano geology guide",
      "All volcano descent gear and safety equipment",
      "Daily breakfasts and hearty trail lunches"
    ],
    exclusions: [
      "International flights to KEF",
      "Alcoholic drinks and tips",
      "Personal hiking boots and waterproof apparel"
    ],
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "japan-autumn-colors-tour",
    slug: "japan-autumn-colors-tour",
    title: "Japan Autumn Colors Tour",
    category: "Nature",
    location: "Japan",
    region: "East Asia",
    price: 1980,
    priceFormatted: "$1,980",
    pricePer: "/person",
    duration: "4 D / 3 N",
    nights: 3,
    days: 4,
    rating: 5.0,
    reviewsCount: 142,
    badge: "🍁 Momiji peak foliage · Nov 18, 2026 · 4 spots remaining",
    featured: false,
    tagline: "Fiery crimson maple foliage framing tranquil Zen gardens.",
    description: "Experience Japan’s autumn landscapes across temples, gardens, and scenic countryside glowing with brilliant red and gold momiji leaves.",
    overview: "Wander the illuminated evening maple gardens of Kyoto, explore the mountain village of Hakone with Fuji views, and soak in private outdoor thermal onsen baths.",
    highlights: [
      "Evening light-up viewing at Kiyomizu-dera and Eikando Zen Temple",
      "Private ryokan stay in Hakone with open-air hot spring bath",
      "Traditional matcha tea tasting inside a private Japanese maple garden"
    ],
    inclusions: [
      "3 nights in luxury onsen ryokan & 4-star Kyoto hotel",
      "Private transfers & regional Hakone transport pass",
      "Daily artisan multi-course Kaiseki dinners & breakfasts",
      "Expert local cultural photographer guide",
      "Exclusive evening garden entry permits"
    ],
    exclusions: [
      "International flights",
      "Personal shopping and souvenirs",
      "Luggage forwarding services outside program"
    ],
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: "maldives-luxury-retreat-escape",
    slug: "maldives-luxury-retreat-escape",
    title: "Maldives Luxury Retreat Escape",
    category: "Honeymoon",
    location: "Maldives",
    region: "Indian Ocean",
    price: 5480,
    priceFormatted: "$5,480",
    pricePer: "/person",
    duration: "6 D / 5 N",
    nights: 5,
    days: 6,
    rating: 5.0,
    reviewsCount: 188,
    badge: "💎 Ultra-luxury private island escape · All-inclusive concierge",
    featured: false,
    tagline: "A refined island sanctuary with private infinity pools and butler service.",
    description: "A refined island stay with private water villas, Michelin-curated moments, underwater dining, and uninterrupted ocean calm.",
    overview: "Indulge in the ultimate romantic sanctuary featuring private 24/7 butler service, an underwater dining experience surrounded by coral life, and bespoke sunset yacht charters.",
    highlights: [
      "Underwater 5-course tasting menu paired by world-class sommelier",
      "Private yacht excursion to deserted sandbanks with personal chef",
      "Daily restorative ayurvedic overwater pavilion spa treatments"
    ],
    inclusions: [
      "5 nights in ultra-luxury overwater ocean villa with slide & private pool",
      "Roundtrip VIP private seaplane transfers",
      "All-inclusive dining across 6 gourmet specialty restaurants",
      "Unlimited champagne, fine wines, and premium spirits",
      "Personal 24-hour dedicated island butler (Thakuru)"
    ],
    exclusions: [
      "International flights to Malé (MLE)",
      "Deep sea sport fishing",
      "PADI dive master courses"
    ],
    image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: "morocco-cultural-cities-tour",
    slug: "morocco-cultural-cities-tour",
    title: "Morocco Cultural Cities Tour",
    category: "Cities",
    location: "Morocco",
    region: "North Africa",
    price: 2890,
    priceFormatted: "$2,890",
    pricePer: "/person",
    duration: "7 D / 6 N",
    nights: 6,
    days: 7,
    rating: 4.8,
    reviewsCount: 112,
    badge: "🕌 Imperial cities · Sep 18, 2026 · Small group of 8",
    featured: false,
    tagline: "Step into Morocco’s historic imperial cities and hidden medinas.",
    description: "Step into Morocco’s historic cities through ancient architecture, vibrant souks, artisan guilds, and everyday Moroccan life.",
    overview: "Explore the labyrinthine medinas of Fez and Marrakech, marvel at the blue pearl town of Chefchaouen, and discover Roman ruins at Volubilis.",
    highlights: [
      "Deep medina artisan discovery in Fez with leather tanners and ceramic masters",
      "Photography walk through the blue-washed walls of Chefchaouen",
      "Private cooking masterclass at a restored historical palace"
    ],
    inclusions: [
      "6 nights in handpicked boutique Riads with internal courtyards",
      "Private chauffeured Mercedes van for all intercity journeys",
      "Licensed architectural guides in Fez, Rabat, and Marrakech",
      "Daily Moroccan breakfast & 3 traditional feast dinners",
      "All monument and historical site entrance tickets"
    ],
    exclusions: [
      "International flights",
      "Tips for drivers and local site guides",
      "Personal purchases in craft souks"
    ],
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: "new-york-california-city-escape",
    slug: "new-york-california-city-escape",
    title: "New York & California City Escape",
    category: "Cities",
    location: "USA",
    region: "North America",
    price: 3260,
    priceFormatted: "$3,260",
    pricePer: "/person",
    duration: "4 D / 3 N",
    nights: 3,
    days: 4,
    rating: 4.9,
    reviewsCount: 139,
    badge: "🗽 Coast-to-coast icon · Jun 6, 2026 · Most popular USA tour",
    featured: false,
    tagline: "Where the electric pulse of Manhattan meets the golden Pacific coast.",
    description: "Experience iconic cities from New York to California through culture, lifestyle, culinary scene, and urban highlights.",
    overview: "Move from the soaring skyscrapers, Broadway theaters, and Central Park greenery of NYC to the sun-soaked Pacific coastlines and cinematic glamour of Los Angeles and San Francisco.",
    highlights: [
      "VIP helicopter flight over Manhattan skyline and Statue of Liberty",
      "Pacific Coast Highway convertible drive from Malibu to Santa Monica",
      "Curated Michelin culinary walk through SoHo and Greenwich Village"
    ],
    inclusions: [
      "3 nights in iconic luxury lifestyle hotels (Manhattan & West Hollywood)",
      "Private airport transfers and curated city transport",
      "VIP Broadway theater tickets & priority observation deck access",
      "Daily artisanal breakfasts & 2 landmark dinners",
      "Local insider neighborhood host in each city"
    ],
    exclusions: [
      "Domestic transcontinental flights (NYC - LAX)",
      "Personal expenses and drinks outside dinner",
      "Optional shopping concierge service"
    ],
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: "rio-unlocked-beyond-the-postcard",
    slug: "rio-unlocked-beyond-the-postcard",
    title: "Rio Unlocked Beyond the Postcard",
    category: "Cities",
    location: "Brazil",
    region: "South America",
    price: 2680,
    priceFormatted: "$2,680",
    pricePer: "/person",
    duration: "6 D / 5 N",
    nights: 5,
    days: 6,
    rating: 4.9,
    reviewsCount: 104,
    badge: "🎭 Local insider access · May 9, 2026 · 5 spots remaining",
    featured: false,
    tagline: "Samba rhythm, bohemian hills, and hidden coastal perspectives.",
    description: "Step beyond Rio’s famous sights and experience the city through culture, rhythm, bohemian neighborhoods, and local life.",
    overview: "Ascend to Christ the Redeemer at sunrise before crowds arrive, ride the cable cars of Sugarloaf Mountain, explore Santa Teresa's artistic villas, and experience authentic Lapa samba culture.",
    highlights: [
      "Exclusive early-access sunrise entry to Christ the Redeemer on Corcovado",
      "Private samba percussion and caipirinha workshop with local musicians",
      "Tijuca National Park rainforest trek to hidden mountain waterfalls"
    ],
    inclusions: [
      "5 nights in beachfront boutique hotel in Ipanema",
      "Private transportation with local Carioca cultural guide",
      "All cable car, tram, and national park entries",
      "Daily Brazilian tropical breakfast & traditional Churrascaria dinner",
      "VIP access to evening live samba clubs in Lapa"
    ],
    exclusions: [
      "International flights to Rio Galeão (GIG)",
      "Hang gliding or paragliding over São Conrado",
      "Personal purchases and beach rental chairs"
    ],
    image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: "tanzania-safari-wildlife-experience",
    slug: "tanzania-safari-wildlife-experience",
    title: "Tanzania Safari Wildlife Experience",
    category: "Wildlife",
    location: "Tanzania",
    region: "East Africa",
    price: 4250,
    priceFormatted: "$4,250",
    pricePer: "/person",
    duration: "4 D / 3 N",
    nights: 3,
    days: 4,
    rating: 4.9,
    reviewsCount: 185,
    badge: "🐾 Peak safari season · Jul 18, 2026 · Only 4 seats left",
    featured: false,
    tagline: "Where dramatic predator encounters unfold across golden plains.",
    description: "Experience Tanzania’s wildlife across open savannas and guided safari landscapes in Tarangire, Lake Manyara, and Ngorongoro.",
    overview: "Track enormous elephant herds under Tarangire's ancient baobabs, spot tree-climbing lions in Lake Manyara, and explore the wildlife-packed caldera of Ngorongoro.",
    highlights: [
      "Expert-led game drives with licensed master safari guides",
      "Exclusive sundowner cocktails overlooking the African savanna",
      "Visit to an authentic Maasai cultural village"
    ],
    inclusions: [
      "3 nights in luxury safari lodges & eco-camps",
      "Dedicated 4x4 Land Cruiser with pop-up photography roof",
      "All park conservation entry fees and permits",
      "Full board dining (breakfast, lunch, dinner, safari snacks)",
      "Professional English-speaking driver/guide"
    ],
    exclusions: [
      "International flights to Arusha / Kilimanjaro",
      "Staff gratuities",
      "Alcoholic beverages"
    ],
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: "usa-national-parks-adventure",
    slug: "usa-national-parks-adventure",
    title: "USA National Parks Adventure",
    category: "Adventure",
    location: "USA",
    region: "North America",
    price: 3540,
    priceFormatted: "$3,540",
    pricePer: "/person",
    duration: "7 D / 6 N",
    nights: 6,
    days: 7,
    rating: 4.9,
    reviewsCount: 160,
    badge: "🏞️ Summer season open · Jun 28, 2026 · 5 spots left",
    featured: false,
    tagline: "Iconic canyon vistas, red rock arches, and dramatic desert roads.",
    description: "Journey through national parks along scenic routes, wide canyon landscapes, and iconic natural landmarks in Utah and Arizona.",
    overview: "Witness the sheer scale of the Grand Canyon, hike the dramatic red rock narrows of Zion, admire the sandstone arches of Moab, and marvel at Monument Valley at sunset.",
    highlights: [
      "Guided sunrise hike to Delicate Arch in Arches National Park",
      "Private Navajo-guided off-road tour of Monument Valley",
      "Spectacular flightseeing tour over the Grand Canyon"
    ],
    inclusions: [
      "6 nights in premium national park lodges & glamping resorts",
      "Private custom touring van with Wi-Fi & refreshments",
      "All National Park entrance fees and permits",
      "Daily breakfasts & 3 special campfire dinners",
      "Expert outdoor adventure guide and trail leader"
    ],
    exclusions: [
      "Flights to Las Vegas or Salt Lake City",
      "Personal hiking gear",
      "Optional helicopter or river rafting add-ons"
    ],
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: "vancouver-toronto-city-tour",
    slug: "vancouver-toronto-city-tour",
    title: "Vancouver & Toronto City Tour",
    category: "Cities",
    location: "Canada",
    region: "North America",
    price: 2960,
    priceFormatted: "$2,960",
    pricePer: "/person",
    duration: "6 D / 5 N",
    nights: 5,
    days: 6,
    rating: 4.8,
    reviewsCount: 98,
    badge: "🍁 Autumn city timing · Aug 22, 2026 · 6 spots left",
    featured: false,
    tagline: "West coast mountain-ocean charm meets dynamic east coast skyline.",
    description: "Experience Canada’s west and east coast cities through culture, design, coastal nature, and everyday urban life.",
    overview: "Explore Vancouver’s Stanley Park seawall and Granville Island food market before flying east to discover Toronto's diverse arts districts and majestic Niagara Falls.",
    highlights: [
      "Seaplane flight over Vancouver harbor and coastal mountains",
      "VIP Niagara Falls day tour with private boat access",
      "Curated culinary tasting tour through Toronto’s Kensington Market"
    ],
    inclusions: [
      "5 nights in 4-star boutique downtown hotels (Vancouver & Toronto)",
      "Domestic trans-Canada flight (YVR to YYZ)",
      "Private airport and excursion transportation",
      "Daily breakfast & 2 chef-curated dining experiences",
      "Admission to CN Tower, Capilano Suspension Bridge, and Niagara cruise"
    ],
    exclusions: [
      "International flights to Canada",
      "eTA / Visa fees",
      "Meals not noted in program"
    ],
    image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: "beijing-shanghai-city-highlights",
    slug: "beijing-shanghai-city-highlights",
    title: "Beijing & Shanghai City Highlights",
    category: "Cities",
    location: "China",
    region: "East Asia",
    price: 2750,
    priceFormatted: "$2,750",
    pricePer: "/person",
    duration: "6 D / 5 N",
    nights: 5,
    days: 6,
    rating: 4.8,
    reviewsCount: 115,
    badge: "🏮 Dual-city experience · Oct 15, 2026 · Bullet train included",
    featured: false,
    tagline: "Where ancient dynasty monuments meet cutting-edge skyscraper neon.",
    description: "Experience two of China’s most iconic mega-cities: historic imperial Beijing and futuristic skyline Shanghai connected by high-speed bullet train.",
    overview: "Walk the sacred courtyards of Beijing’s Forbidden City and the ancient Great Wall before whisking south at 350 km/h to Shanghai’s colonial Bund and skyscraper observation decks.",
    highlights: [
      "Private early entrance to the Mutianyu Great Wall with cable car",
      "First-class Shinkansen/Fuxing high-speed bullet train journey",
      "VIP Bund evening river cruise with illuminated Pudong skyline views"
    ],
    inclusions: [
      "5 nights in 5-star international hotels in central Beijing & Shanghai",
      "First-class high-speed train tickets between Beijing and Shanghai",
      "Private English-speaking certified historical guide",
      "Daily breakfast & authentic Peking Duck welcome banquet",
      "All landmark entrance fees and priority bypass tickets"
    ],
    exclusions: [
      "International flights",
      "China visa processing fees",
      "Personal expenses and shopping"
    ],
    image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1200&q=80"
    ]
  }
];

const categories = [
  {
    id: "cities",
    name: "Cities",
    title: "Cities & Culture",
    tagline: "Urban Energy & Heritage",
    description: "Explore iconic cities through culture, architecture, Michelin-starred cuisine, and everyday urban life.",
    toursCount: 6,
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
    color: "from-blue-500/20 to-indigo-500/20",
    badgeColor: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300"
  },
  {
    id: "nature",
    name: "Nature",
    title: "Nature & Landscapes",
    tagline: "Mountains, Lakes & Sky",
    description: "Discover landscapes shaped by towering mountains, turquoise glacial lakes, blooming forests, and open horizons.",
    toursCount: 5,
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
    color: "from-emerald-500/20 to-teal-500/20",
    badgeColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300"
  },
  {
    id: "adventure",
    name: "Adventure",
    title: "Wild Adventures",
    tagline: "Thrills & Remote Expeditions",
    description: "Experience journeys built around movement, challenge, volcanic exploration, and remote expedition trails.",
    toursCount: 4,
    image: "https://images.unsplash.com/photo-1509721434272-b79147e0e708?auto=format&fit=crop&w=800&q=80",
    color: "from-amber-500/20 to-orange-500/20",
    badgeColor: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
  },
  {
    id: "honeymoon",
    name: "Honeymoon",
    title: "Honeymoon & Luxury",
    tagline: "Romantic Secluded Escapes",
    description: "Romantic escapes designed for privacy, comfort, overwater sanctuaries, and unforgettable moments together.",
    toursCount: 2,
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
    color: "from-rose-500/20 to-pink-500/20",
    badgeColor: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300"
  },
  {
    id: "wildlife",
    name: "Wildlife",
    title: "Wildlife & Safari",
    tagline: "The Great Migration & Savannas",
    description: "Witness majestic animals in their natural habitat across diverse savannas and remote rainforest sanctuaries.",
    toursCount: 2,
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80",
    color: "from-yellow-500/20 to-amber-500/20",
    badgeColor: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300"
  }
];

const reviews = [
  {
    id: "rev-1",
    author: "Priya & Rohan Mehta",
    location: "London, United Kingdom",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80",
    tourTitle: "Maldives Luxury Retreat Escape",
    category: "Honeymoon",
    rating: 5.0,
    quote: "It felt like time paused, and nothing else mattered.",
    story: "Waking up to the ocean, spending days without a plan, and watching sunsets that didn't feel real. The entire experience was calm, private, and exactly what we needed without even knowing it."
  },
  {
    id: "rev-2",
    author: "Tom Eriksson",
    location: "Stockholm, Sweden",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80",
    tourTitle: "Iceland Northern Lights Trails",
    category: "Nature",
    rating: 5.0,
    quote: "We waited for hours, and it was completely worth it.",
    story: "The northern lights appeared slowly, almost quietly, but the feeling stayed long after. Combined with waterfalls, glaciers, and black sand beaches, every day felt raw and unforgettable."
  },
  {
    id: "rev-3",
    author: "Elena Tanaka",
    location: "San Francisco, USA",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&h=200&q=80",
    tourTitle: "Tanzania Safari Wildlife Experience",
    category: "Wildlife",
    rating: 5.0,
    quote: "Seeing wildlife this close changes everything.",
    story: "Every drive felt different, from lions resting in the shade to elephants crossing right in front of us. It wasn’t just about seeing animals, it was about being part of their world, even for a moment."
  },
  {
    id: "rev-4",
    author: "Hina Kobayashi",
    location: "Tokyo, Japan",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200&q=80",
    tourTitle: "Japan Autumn Colors Tour",
    category: "Nature",
    rating: 5.0,
    quote: "Every street felt like a scene you don’t want to leave.",
    story: "Walking through temples surrounded by autumn colors, quiet paths, and soft light made every moment feel calm and thoughtful. It wasn’t crowded or rushed, just perfectly balanced."
  },
  {
    id: "rev-5",
    author: "Marcus Webb",
    location: "Sydney, Australia",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80",
    tourTitle: "Beijing & Shanghai City Highlights",
    category: "Adventure",
    rating: 5.0,
    quote: "Two cities, completely different energy, both unforgettable.",
    story: "Beijing felt historic and grounded, while Shanghai moved fast and modern. Experiencing both in one journey gave us a perspective we didn’t expect but really appreciated."
  },
  {
    id: "rev-6",
    author: "Carlos Ruiz",
    location: "Madrid, Spain",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&h=200&q=80",
    tourTitle: "Morocco Cultural Cities Tour",
    category: "Cities",
    rating: 5.0,
    quote: "Every corner had something new to discover.",
    story: "From markets to architecture, the culture felt alive everywhere we went. It wasn’t just sightseeing, it felt like stepping into a completely different way of life."
  },
  {
    id: "rev-7",
    author: "Liam Anderson",
    location: "Toronto, Canada",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&h=200&q=80",
    tourTitle: "New York & California City Escape",
    category: "Cities",
    rating: 5.0,
    quote: "The contrast between cities made the journey special.",
    story: "New York was intense and fast, California felt open and relaxed. Moving between both gave us the best of two completely different worlds in a short time."
  },
  {
    id: "rev-8",
    author: "Lisa Reed",
    location: "Auckland, New Zealand",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80",
    tourTitle: "Deep Amazon River Journey",
    category: "Adventure",
    rating: 5.0,
    quote: "No signal, no distractions, just the jungle.",
    story: "The experience felt raw and real. Every sound, every moment, and every step through the Amazon made us feel completely disconnected from everything else."
  }
];

const locations = [
  { slug: "japan", name: "Japan", region: "Asia · East Asia", desc: "Quiet temples, neon-lit streets, and seasons shifting in perfect harmony.", toursCount: 3, image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80" },
  { slug: "morocco", name: "Morocco", region: "Africa · North Africa", desc: "Vibrant medinas, spice-scented souks, and starlit Sahara dunes.", toursCount: 2, image: "https://images.unsplash.com/photo-1509721434272-b79147e0e708?auto=format&fit=crop&w=800&q=80" },
  { slug: "iceland", name: "Iceland", region: "Europe · Nordic", desc: "Glaciers, geothermal springs, black sand beaches, and Northern Lights.", toursCount: 2, image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80" },
  { slug: "maldives", name: "Maldives", region: "South Asia · Indian Ocean", desc: "Overwater bungalows, crystal lagoons, and peaceful secluded atolls.", toursCount: 2, image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80" },
  { slug: "china", name: "China", region: "Asia · East Asia", desc: "Ancient dynasties meet futuristic skylines and karst mountain wonders.", toursCount: 2, image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=800&q=80" },
  { slug: "tanzania", name: "Tanzania", region: "East Africa", desc: "The Great Migration, endless Serengeti plains, and majestic wildlife.", toursCount: 2, image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80" },
  { slug: "brazil", name: "Brazil", region: "South America", desc: "Rhythm of Rio, lush rainforests, and vibrant coastal culture.", toursCount: 2, image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=800&q=80" },
  { slug: "canada", name: "Canada", region: "North America", desc: "Emerald alpine lakes, rugged Rockies, and cosmopolitan cityscapes.", toursCount: 2, image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=800&q=80" },
  { slug: "usa", name: "USA", region: "North America", desc: "Iconic national parks, coast-to-coast wonders, and diverse cultural hubs.", toursCount: 2, image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80" }
];

const fullCatalog = {
  metadata: {
    brandName: "Travelio",
    tagline: "Travel Beyond the Ordinary",
    foundingYear: 2009,
    rating: 4.9,
    reviewsCountWorldwide: "2,000+",
    happyTravelers: "12,000+",
    destinationsCount: "80+",
    packagesCount: "60+",
    satisfactionRate: "99%"
  },
  categories,
  tours,
  reviews,
  locations
};

fs.writeFileSync('.agents/explorer_survey_1/travelio_catalog.json', JSON.stringify(fullCatalog, null, 2));
console.log('Saved complete travelio_catalog.json!');
