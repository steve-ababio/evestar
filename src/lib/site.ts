import type { StaticImageData } from "next/image";
import interiorImg from "@/assets/hero-interior.jpg";
import officeImg from "@/assets/office-cleaning.jpg";
import vehicleImg from "@/assets/vehicle-care.jpg";
import eventImg from "@/assets/eventclean.jpg";
import cleaningImg from "@/assets/cleaning-bg.jpg";
import vacuumImg from "@/assets/vacuum.jpg";
import carpetImg from "@/assets/carpet.jpg";
import moveInOutImg from "@/assets/moveinout.jpg";
import postConstructionImg from "@/assets/post-const.jpg";
import commercialImg from "@/assets/commercial.jpg";
import truckImg from "@/assets/truck.jpg";
import sofaImg from "@/assets/sofa.jpg";
import windowImg from "@/assets/window.jpg";
import suppliesImg from "@/assets/supplies.jpg";


export const contact = {
  name: "Polished by Evestair Ghana",
  phoneDisplay: "+233 594 775 550",
  phoneHref: "tel:+233594775550",
  whatsapp: "233594775550",
  email: "polishedbyevestairGH@gmail.com",
  handle: "@polishedbyevestairgh",
  instagram: "https://instagram.com/polishedbyevestairgh",
  facebook: "https://facebook.com/polishedbyevestairgh",
  location: "Accra, Ghana",
};

export const whatsappLink = (text?: string) =>
  `https://wa.me/${contact.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

const resolveImg = (img: string | StaticImageData | { src: string }) =>
  typeof img === "string" ? img : img.src;

export const images = {
  interior: resolveImg(interiorImg),
  office: resolveImg(officeImg),
  cleaning:resolveImg(cleaningImg),
  vehicle: resolveImg(vehicleImg),
  event: resolveImg(eventImg),
  chores:resolveImg(vacuumImg),
  carpet:resolveImg(carpetImg),
  moveInOut:resolveImg(moveInOutImg),
  postConstruction:resolveImg(postConstructionImg),
  commercial:resolveImg(commercialImg),
  truck:resolveImg(truckImg),
  sofa:resolveImg(sofaImg),
  window:resolveImg(windowImg),
  supplies:resolveImg(suppliesImg)
};

export type ServiceProcessStep = {
  tag: string;
  title: string;
  description: string;
};

export type IdealForItem = {
  title: string;
  icon: string;
};

export type Service = {
  slug: string;
  title: string;
  category: "Property" | "Commercial" | "Specialist" | "Vehicle" | "Supplies";
  tagline: string;
  intro: string;
  coverage: string[];
  process: ServiceProcessStep[];
  customers: string;
  idealFor?: IdealForItem[];
  note: string;
  image: string;
};

export const services: Service[] = [
  {
    slug: "post-construction-cleaning",
    title: "Post-Construction Cleaning",
    category: "Property",
    tagline: "From build complete to move-in ready.",
    intro: "We remove the dust, debris and residue left behind after building work, so your property is ready to present, hand over or move into.",
    coverage: ["Construction dust and debris removal", "Floors, walls and surface cleaning", "Kitchens, bathrooms and fixtures", "Internal windows and glass", "Paint, cement and adhesive residue removal where safely possible", "Corners and difficult-to-reach areas", "Detailed final finishing"],
    process: [
      { tag: "Stage 01", title: "Builders Clean", description: "Heavy dust, rubble, paint splashes and site debris are safely cleared from every room." },
      { tag: "Stage 02", title: "Detailed Clean", description: "Kitchens, bathrooms, fixtures, glass and hard-to-reach corners receive a thorough deep clean." },
      { tag: "Stage 03", title: "Final Presentation Clean", description: "A final polish and supervisor check leave the property spotless and ready for handover." },
    ],
    customers: "Property developers, contractors, homeowners, landlords and facility managers.",
    idealFor: [
      { title: "Property Developers", icon: "Building2" },
      { title: "Contractors & Builders", icon: "HardHat" },
      { title: "Homeowners", icon: "Home" },
      { title: "Landlords & Investors", icon: "Key" },
      { title: "Facility Managers", icon: "ClipboardCheck" },
    ],
    note: "Every project is assessed individually so we can prepare a tailored scope of work and quotation.",
    image: images.postConstruction,
  },
  {
    slug: "event-cleaning",
    title: "Event Cleaning",
    category: "Specialist",
    tagline: "Before. During. After.",
    intro: "Keep your venue spotless from setup to the final guest leaving, with attendants who handle every stage of the event.",
    coverage: ["Pre-event venue preparation", "Cleaning attendants during events", "Washroom monitoring and replenishment", "Spill response and touch-point cleaning", "Waste collection and management", "Complete post-event clean-up"],
    process: [
      { tag: "Pre-Event", title: "Before the Event", description: "Full venue preparation, floor care and washroom readiness before your first guest arrives." },
      { tag: "Live Support", title: "During the Event", description: "Discreet attendants manage spills, touch-points, waste and washroom replenishment throughout." },
      { tag: "Wrap-Up", title: "After the Event", description: "Complete post-event breakdown cleaning and waste removal to restore the venue promptly." },
    ],
    customers: "Event organisers, festivals, concerts, weddings, churches, conferences, corporate functions and private parties.",
    idealFor: [
      { title: "Event Organisers", icon: "Sparkles" },
      { title: "Weddings & Celebrations", icon: "PartyPopper" },
      { title: "Churches & Assemblies", icon: "Landmark" },
      { title: "Conferences & Corporate", icon: "Briefcase" },
      { title: "Festivals & Concerts", icon: "Music" },
    ],
    note: "Service plans are tailored to the venue, guest numbers, event schedule and cleaning requirements.",
    image: images.event,
  },
  {
    slug: "commercial-cleaning",
    title: "Commercial Cleaning",
    category: "Commercial",
    tagline: "Cleaner workplaces. Stronger impressions.",
    intro: "Reliable cleaning for offices and shared premises, on a one-off, scheduled or contract basis.",
    coverage: ["Floors and high-touch surfaces", "Desks, reception and communal areas", "Kitchens and staff facilities", "Washrooms and replenishment", "Internal windows and glass", "Waste collection and disposal", "Detailed periodic cleaning"],
    process: [
      { tag: "Flexible", title: "One-Off Cleaning", description: "Intensive deep cleaning for seasonal refreshes, audits or preparing offices for new teams." },
      { tag: "Routine", title: "Scheduled Cleaning", description: "Consistent daily or weekly upkeep timed cleanly around your staff and operating hours." },
      { tag: "Managed", title: "Commercial Contracts", description: "Dedicated teams, structured checklists and ongoing quality inspections for managed premises." },
    ],
    customers: "Offices, shops, churches, schools, event venues, corporate premises and managed facilities.",
    idealFor: [
      { title: "Offices & Workplaces", icon: "Briefcase" },
      { title: "Retail Shops & Stores", icon: "Store" },
      { title: "Churches & Community", icon: "Landmark" },
      { title: "Schools & Colleges", icon: "GraduationCap" },
      { title: "Corporate Facilities", icon: "Building2" },
    ],
    note: "Following an assessment, we prepare a tailored cleaning plan and quotation based on premises size, condition, frequency and requirements.",
    image: images.commercial,
  },
  {
    slug: "move-in-move-out-cleaning",
    title: "Move-In & Move-Out Cleaning",
    category: "Property",
    tagline: "A fresh start begins with a clean space.",
    intro: "A thorough top-to-bottom clean for moving day, property handovers and new tenancies.",
    coverage: ["Floors and surfaces", "Kitchens and bathrooms", "Cupboards and storage areas", "Internal windows and glass", "Skirting boards and doors", "Corners and hard-to-reach areas", "Final presentation cleaning"],
    process: [
      { tag: "Fresh Start", title: "Move-In Clean", description: "Sanitising kitchens, bathrooms, cupboards and floors so your new space feels truly fresh." },
      { tag: "End of Tenancy", title: "Move-Out Clean", description: "Top-to-bottom cleaning across rooms, skirting boards and internal glass before departure." },
      { tag: "Inspection Ready", title: "Property Handover", description: "Final presentation detailing and supervisor sign-off for landlords, agents and developers." },
    ],
    customers: "Homeowners, tenants, landlords, estate agents, property managers and property developers.",
    idealFor: [
      { title: "Homeowners", icon: "Home" },
      { title: "Tenants & Renters", icon: "Key" },
      { title: "Landlords", icon: "ShieldCheck" },
      { title: "Estate Agents", icon: "Building2" },
      { title: "Property Managers", icon: "ClipboardCheck" },
    ],
    note: "Each property is assessed individually to prepare the right cleaning plan and tailored quotation.",
    image: images.moveInOut,
  },
  {
    slug: "restaurant-hospitality-cleaning",
    title: "Restaurant & Hospitality Cleaning",
    category: "Commercial",
    tagline: "Clean spaces that welcome every guest.",
    intro: "Front-of-house and back-of-house cleaning that keeps guests comfortable and your venue ready to open.",
    coverage: ["Dining areas and floors", "Front-of-house surfaces", "Kitchens and external equipment surfaces", "Washrooms and replenishment", "Staff and storage areas", "High-touch points", "Waste collection and removal", "Detailed periodic cleaning"],
    process: [
      { tag: "Launch Ready", title: "Pre-Opening Cleaning", description: "Detailed front-of-house and kitchen-surface preparation before doors open to guests." },
      { tag: "Daily Care", title: "Scheduled Cleaning", description: "Reliable routine cleaning across dining rooms, washrooms, bars and staff areas." },
      { tag: "Intensive", title: "Detailed Deep Cleaning", description: "Periodic deep cleaning targeting high-touch points, grease-prone exteriors and floors." },
    ],
    customers: "Restaurants, cafés, bars, hotels, food courts, catering facilities and hospitality venues.",
    idealFor: [
      { title: "Restaurants & Cafés", icon: "UtensilsCrossed" },
      { title: "Bars & Lounges", icon: "Wine" },
      { title: "Hotels & Guesthouses", icon: "Hotel" },
      { title: "Food Courts & Catering", icon: "ChefHat" },
      { title: "Hospitality Venues", icon: "Sparkles" },
    ],
    note: "A tailored cleaning plan and quotation follow assessment of premises, frequency and operational requirements.",
    image: images.event,
  },
  {
    slug: "carpet-cleaning",
    title: "Carpet Cleaning",
    category: "Specialist",
    tagline: "Deeper cleaning for fresher spaces.",
    intro: "Deep extraction cleaning that lifts embedded dirt, treats stains and reduces odours.",
    coverage: ["Pre-clean inspection", "Thorough vacuuming", "Targeted stain treatment", "Deep extraction cleaning", "Dirt and odour reduction", "Final inspection and finishing"],
    process: [
      { tag: "Inspection", title: "Assess", description: "We inspect carpet fibres, pile condition and problem stains before choosing the right treatment." },
      { tag: "Pre-Treat", title: "Treat & Clean", description: "Thorough vacuuming followed by targeted stain treatment and gentle agitation." },
      { tag: "Extraction", title: "Extract & Finish", description: "Deep extraction lifts embedded dirt and reduces odours, followed by a final quality check." },
    ],
    customers: "Homes, offices, hotels, churches, event venues, rental properties and commercial premises.",
    idealFor: [
      { title: "Private Residences", icon: "Home" },
      { title: "Offices & Workplaces", icon: "Briefcase" },
      { title: "Hotels & Guesthouses", icon: "Hotel" },
      { title: "Churches & Venues", icon: "Landmark" },
      { title: "Rental Properties", icon: "Building2" },
    ],
    note: "Results depend on carpet material, condition and staining. We assess each booking before confirming treatment and quotation.",
    image: images.carpet,
  },
  {
    slug: "sofa-upholstery-cleaning",
    title: "Sofa & Upholstery Cleaning",
    category: "Specialist",
    tagline: "Refresh the furniture you use every day.",
    intro: "Careful fabric cleaning that brings sofas, chairs and seating back to life.",
    coverage: ["Fabric sofas and sectional seating", "Armchairs and occasional chairs", "Dining chairs", "Office and reception seating", "Removable cushions", "Suitable upholstered furniture"],
    process: [
      { tag: "Fabric Check", title: "Inspect", description: "Each fabric, cushion and seam is checked to confirm safe, colour-fast cleaning methods." },
      { tag: "Targeted Care", title: "Pre-Treat & Clean", description: "Targeted pre-treatment loosens everyday marks, oils and ground-in dust gently." },
      { tag: "Refresh", title: "Extract & Finish", description: "Controlled extraction refreshes seating cleanly, finishing with an inspection of every piece." },
    ],
    customers: "Homes, offices, hotels, restaurants, waiting areas, rental properties and event venues.",
    idealFor: [
      { title: "Private Homes", icon: "Armchair" },
      { title: "Offices & Receptions", icon: "Briefcase" },
      { title: "Hotels & Lounges", icon: "Hotel" },
      { title: "Restaurants & Seating", icon: "UtensilsCrossed" },
      { title: "Waiting Spaces", icon: "Users" },
    ],
    note: "Results depend on fabric, construction, condition and staining. We assess each item before confirming treatment and quotation.",
    image: images.sofa,
  },
  {
    slug: "window-cleaning",
    title: "Window Cleaning",
    category: "Specialist",
    tagline: "Clearer glass. A brighter finish.",
    intro: "Streak-free glass, frames and sills for homes, shopfronts and commercial buildings.",
    coverage: ["Interior and exterior windows", "Window frames and sills", "Glass doors and partitions", "Shopfronts and display glass", "Accessible high-level windows", "Final detailing and inspection"],
    process: [
      { tag: "Safety First", title: "Assess Access", description: "We review window height, access points and safety requirements before starting work." },
      { tag: "Glass & Frames", title: "Prepare & Clean", description: "Interior and exterior glass, frames, sills and partitions are washed for a streak-free shine." },
      { tag: "Final Check", title: "Detail & Inspect", description: "Edges and sills are wiped dry and inspected in natural light for crystal-clear results." },
    ],
    customers: "Homes, offices, shops, restaurants, hotels, schools, churches and event venues.",
    idealFor: [
      { title: "Residential Homes", icon: "Home" },
      { title: "Corporate Offices", icon: "Building2" },
      { title: "Retail Shopfronts", icon: "Store" },
      { title: "Restaurants & Hotels", icon: "Hotel" },
      { title: "Schools & Churches", icon: "Landmark" },
    ],
    note: "Exterior and high-level window cleaning is subject to accessibility, location and applicable safety requirements.",
    image: images.window,
  },
  {
    slug: "mobile-vehicle-care",
    title: "Mobile Vehicle Care",
    category: "Vehicle",
    tagline: "Professional vehicle cleaning at your location.",
    intro: "Hand washing and detailing brought to your home, office or depot.",
    coverage: ["Exterior hand washing", "Wheel and tyre cleaning", "Interior vacuuming and surface care", "Full interior and exterior detailing", "Engine-bay cleaning", "Commercial and fleet bookings"],
    process: [
      { tag: "Exterior & Cabin", title: "Routine Wash", description: "Careful hand washing, wheel care and interior vacuuming right at your location." },
      { tag: "Deep Finish", title: "Car Detailing", description: "Comprehensive interior and exterior detailing to restore trim, surfaces and gloss." },
      { tag: "Under Hood", title: "Engine Bay Cleaning", description: "Safe degreasing and tidy dressing of accessible engine-bay surfaces." },
      { tag: "Business Fleets", title: "Commercial & Fleet Care", description: "Scheduled on-site washing for company cars, vans and multi-vehicle depots." },
    ],
    customers: "Cars, SUVs, vans, trucks, business vehicles and vehicle fleets.",
    idealFor: [
      { title: "Private Cars & Saloons", icon: "Car" },
      { title: "SUVs & 4x4s", icon: "ShieldCheck" },
      { title: "Vans & Transporters", icon: "Truck" },
      { title: "Corporate Fleets", icon: "Briefcase" },
      { title: "Commercial Depots", icon: "Warehouse" },
    ],
    note: "Bookings are subject to assessment, availability, location and suitable access. Pricing depends on vehicle type, size, condition and selected service.",
    image: images.vehicle,
  },
  {
    slug: "heavy-machinery-cleaning",
    title: "Tipper Trucks & Heavy Machinery",
    category: "Vehicle",
    tagline: "Built for the toughest jobs.",
    intro: "Heavy-duty washing for trucks, earthmovers and site equipment.",
    coverage: ["Tipper and dump trucks", "Excavators and loaders", "Bulldozers and graders", "Earthmoving machinery", "Construction equipment", "Mining equipment", "Multiple-vehicle and machinery fleets"],
    process: [
      { tag: "Site Check", title: "Assess", description: "Confirm safe site access, equipment shutdown, water management and safety protocols." },
      { tag: "Heavy Wash", title: "Prepare & Wash", description: "Heavy-duty washing removes compacted mud, dust and site build-up from trucks and plant." },
      { tag: "Sign-Off", title: "Check & Complete", description: "Final walk-around inspection ensures machinery and fleets are clean and site-ready." },
    ],
    customers: "Construction companies, mining operators, contractors, equipment-hire businesses, fleet operators and industrial sites.",
    idealFor: [
      { title: "Construction Companies", icon: "HardHat" },
      { title: "Mining Operators", icon: "Factory" },
      { title: "Civil Contractors", icon: "Wrench" },
      { title: "Plant-Hire Businesses", icon: "Truck" },
      { title: "Industrial Sites & Yards", icon: "Warehouse" },
    ],
    note: "Bookings are subject to site assessment, safe access, equipment shutdown, water management and applicable safety requirements.",
    image: images.truck,
  },
  {
    slug: "cleaning-supplies",
    title: "Cleaning Supplies",
    category: "Supplies",
    tagline: "The right products for cleaner spaces.",
    intro: "Cleaning products and consumables for businesses, supplied once or on a recurring basis.",
    coverage: ["General cleaning products", "Disinfectants and sanitisers", "Floor and surface cleaners", "Glass-cleaning products", "Handwash and washroom consumables", "Paper products and bin liners", "Mops, buckets, brushes and cloths", "Other supplies based on client requirements"],
    process: [
      { tag: "On Demand", title: "One-Off Orders", description: "Fast supply of detergents, disinfectants, washroom consumables and cleaning tools." },
      { tag: "Auto Restock", title: "Recurring Supply", description: "Scheduled replenishment deliveries matched to your premises usage and budget." },
      { tag: "All-in-One", title: "Cleaning & Supply", description: "Combine our professional cleaning teams with managed consumable restocking." },
    ],
    customers: "Offices, restaurants, hotels, schools, churches, event venues, construction projects and managed properties.",
    idealFor: [
      { title: "Offices & Workplaces", icon: "Briefcase" },
      { title: "Restaurants & Cafés", icon: "UtensilsCrossed" },
      { title: "Hotels & Guesthouses", icon: "Hotel" },
      { title: "Schools & Churches", icon: "Landmark" },
      { title: "Managed Properties", icon: "Building2" },
    ],
    note: "Product ranges, quantities and availability are confirmed following consultation.",
    image: images.supplies,
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

export const differentiators = [
  { title: "UK-inspired standards", text: "Founded in the United Kingdom, we bring the same structured, consistent approach to every job in Accra." },
  { title: "Trained & supervised team", text: "Our cleaners are trained in our methods and supervised on site to keep standards high." },
  { title: "Professional equipment", text: "Commercial-grade tools and products chosen for each surface and task." },
  { title: "Tailored cleaning plans", text: "Every space is assessed so the plan and quotation fit exactly what you need." },
  { title: "Structured quality control", text: "Checklists and supervisor inspections before we call any job complete." },
  { title: "Flexible & reliable", text: "One-off, scheduled or contract service, arranged around your timetable." },
];

export const steps = [
  "Contact us",
  "Discuss your requirements",
  "Receive a tailored quotation",
  "Schedule the service",
  "Cleaning is completed",
  "Quality inspection & finishing",
];

export const processSteps = [
  {
    title: "Contact us",
    description: "Reach us by WhatsApp, phone, email or the quote form — whichever suits you.",
  },
  {
    title: "Discuss requirements",
    description: "We learn about your property, project, vehicle or event and what you need.",
  },
  {
    title: "Tailored quotation",
    description: "Following assessment, you receive a quotation built around your requirements.",
  },
  {
    title: "Schedule the service",
    description: "One-off or recurring — we agree a date and plan that works around you.",
  },
  {
    title: "Cleaning completed",
    description: "Our trained, supervised team arrives prepared with professional equipment.",
  },
  {
    title: "Quality inspection & finishing",
    description: "A supervisor inspects every detail against our checklist before handover.",
  },
] as const;

// Reviews from Polished by Evestair's UK operations, published on Bark.
export const testimonials = [
  { name: "James Bryson", date: "14 June 2026", text: "Excellent, thorough service from start to finish. Highly recommended." },
  { name: "Olivia Guillum Scott", date: "1 June 2026", text: "Professional, punctual and left everything spotless." },
  { name: "Abigail", date: "19 March 2026", text: "Great attention to detail and very easy to arrange." },
  { name: "Nicola", date: "28 February 2026", text: "Friendly team and a fantastic result. Would book again." },
  { name: "Abeera", date: "18 November 2025", text: "Reliable and careful — the place looked brand new." },
  { name: "PJ", date: "12 November 2025", text: "Clear communication and a really high standard of cleaning." },
  { name: "Jenny", date: "9 November 2025", text: "Quick, efficient and incredibly thorough." },
  { name: "Cynthia Turkson", date: "23 October 2025", text: "Wonderful service. Everything was done with real care." },
];

export type PricingTier = {
  name: string;
  tagline: string;
  popular?: boolean;
  price: {
    monthly: string;
    oneOff: string;
  };
  period: string;
  ctaText: string;
  ctaHref: string;
  features: string[];
};

export type PricingCategory = {
  id: string;
  label: string;
  shortLabel?: string;
  title: string;
  subtitle: string;
  tiers: PricingTier[];
};

export const pricingCategories: PricingCategory[] = [
  {
    id: "residential",
    label: "Residential & Homes",
    shortLabel: "Residential",
    title: "Plans that keep your home pristine.",
    subtitle: "Choose the right care plan for your residence. Supervisor-inspected, reliable, and scheduled around you.",
    tiers: [
      {
        name: "Basic Plan",
        tagline: "Ideal for routine upkeep & apartments",
        price: {
          oneOff: "GH₵ 450",
          monthly: "GH₵ 360",
        },
        period: "/visit",
        ctaText: "Select Plan",
        ctaHref: "/quote?plan=residential-basic",
        features: [
          "All rooms vacuumed, swept & mopped",
          "Kitchen worktops, sinks & hob exterior",
          "Bathroom sanitisation & mirror polish",
          "Waste bins emptied and relined",
          "Trained, vetted & uniformed cleaners",
        ],
      },
      {
        name: "Business Plan",
        tagline: "For busy family homes & deep seasonal resets",
        popular: true,
        price: {
          oneOff: "GH₵ 850",
          monthly: "GH₵ 680",
        },
        period: "/visit",
        ctaText: "Select Plan",
        ctaHref: "/quote?plan=residential-deep",
        features: [
          "Everything in basic plan",
          "Skirting boards, light switches & door frames",
          "Microwave interior & oven exterior detailing",
          "Limescale treatment & tile degreasing",
          "Internal window glass & window sills",
          "Supervisor inspection & sign-off checklist",
        ],
      },
      {
        name: "Premium Plan",
        tagline: "Ideal for property handovers & new tenancies",
        price: {
          oneOff: "GH₵ 1,450",
          monthly: "GH₵ 1,160",
        },
        period: "/service",
        ctaText: "Select Plan",
        ctaHref: "/quote?plan=residential-handover",
        features: [
          "Everything in business plan",
          "Inside all cupboards, wardrobes & drawers",
          "Wall spot-cleaning & light scuff removal",
          "Balcony, terrace & entrance washdown",
          "Detailed landlord/agent handover checklist",
          "Priority re-clean guarantee if flagged",
        ],
      },
    ],
  },
  {
    id: "commercial",
    label: "Commercial & Offices",
    shortLabel: "Commercial",
    title: "Cleaner workplaces. Stronger impressions.",
    subtitle: "Reliable commercial cleaning scaled cleanly to your operating hours, floor area, and hygiene standards.",
    tiers: [
      {
        name: "Basic Plan",
        tagline: "Ideal for creative studios & offices under 10 desks",
        price: {
          oneOff: "GH₵ 650",
          monthly: "GH₵ 520",
        },
        period: "/visit",
        ctaText: "Select Plan",
        ctaHref: "/quote?plan=commercial-basic",
        features: [
          "Desk sanitisation & high-touch wipe down",
          "Commercial floor vacuuming & mopping",
          "Kitchenette & staff washroom upkeep",
          "Waste collection & central bin disposal",
          "Flexible after-hours or early-morning visits",
        ],
      },
      {
        name: "Business Plan",
        tagline: "For active offices, corporate suites & agencies",
        popular: true,
        price: {
          oneOff: "GH₵ 1,200",
          monthly: "GH₵ 960",
        },
        period: "/visit",
        ctaText: "Select Plan",
        ctaHref: "/quote?plan=commercial-corporate",
        features: [
          "Everything in basic plan",
          "Boardroom & glass partition detailing",
          "Deep restroom sanitisation & replenishment",
          "Staff breakroom appliances & stations",
          "Dedicated cleaning crew & on-site supervisor",
          "Monthly hygiene compliance report",
        ],
      },
      {
        name: "Premium Plan",
        tagline: "Ideal for multi-floor facilities & headquarters",
        price: {
          oneOff: "GH₵ 2,500",
          monthly: "GH₵ 2,000",
        },
        period: "/visit",
        ctaText: "Select Plan",
        ctaHref: "/quote?plan=commercial-enterprise",
        features: [
          "Everything in business plan",
          "Multi-shift cleaning team coverage",
          "Consumables & washroom supply management",
          "Periodic carpet extraction & window washing",
          "Key-holding & security protocol compliance",
          "Dedicated account manager & SLA guarantees",
        ],
      },
    ],
  },
  {
    id: "specialist",
    label: "Specialist & Vehicles",
    shortLabel: "Specialist",
    title: "On-site vehicle care and specialist services.",
    subtitle: "Professional care brought right to your driveway, depot, event venue, or industrial site.",
    tiers: [
      {
        name: "Basic Plan",
        tagline: "At-your-location hand wash & interior refresh",
        price: {
          oneOff: "GH₵ 250",
          monthly: "GH₵ 200",
        },
        period: "/vehicle",
        ctaText: "Select Plan",
        ctaHref: "/quote?plan=vehicle-valet",
        features: [
          "Exterior hand wash & wheel scrub",
          "Cabin vacuuming & dashboard dust down",
          "Streak-free glass & mirror polish",
          "Door jambs & boot area wipe",
          "Fully self-contained water & power setup",
        ],
      },
      {
        name: "Business Plan",
        tagline: "Full detailing, gloss restoration & cabin deep clean",
        popular: true,
        price: {
          oneOff: "GH₵ 650",
          monthly: "GH₵ 520",
        },
        period: "/vehicle",
        ctaText: "Select Plan",
        ctaHref: "/quote?plan=vehicle-detailing",
        features: [
          "Everything in basic plan",
          "Paint decontamination & deep hand wax",
          "Seats shampoo & stain extraction",
          "Leather conditioning & UV protection",
          "Engine-bay degreasing & tidy dressing",
          "Odour neutralisation & long-lasting finish",
        ],
      },
      {
        name: "Premium Plan",
        tagline: "For company vans, truck fleets & machinery",
        price: {
          oneOff: "GH₵ 1,800",
          monthly: "GH₵ 1,440",
        },
        period: "/fleet",
        ctaText: "Select Plan",
        ctaHref: "/quote?plan=vehicle-fleet",
        features: [
          "Everything in business plan",
          "Multi-vehicle depot batch scheduling",
          "Heavy compacted mud & site build-up removal",
          "High-pressure plant degreasing",
          "Sanitised cabins across every fleet unit",
          "Supervisor quality sign-off per vehicle",
        ],
      },
    ],
  },
];

export const pricingFaqs = [
  {
    question: "Are cleaning equipment and supplies included in the price?",
    answer: "Yes, our teams arrive fully equipped with professional tools, commercial vacuums, extraction machines, and specialized cleaning products suited to each surface.",
  },
  {
    question: "Can I customize the checklist or frequency of visits?",
    answer: "Absolutely. While our standard tiers cover most client needs, every plan can be adjusted to include specific rooms, frequencies (daily, weekly, bi-weekly), or specialist add-ons.",
  },
  {
    question: "How does the recurring discount work?",
    answer: "When you schedule regular visits on a weekly, bi-weekly, or monthly recurring schedule, you receive 20% off our standard one-off rates.",
  },
  {
    question: "What happens during a supervisor inspection?",
    answer: "Before any job is considered finished, a trained supervisor walks through the property with a structured quality checklist to verify that all corners, fixtures, and touch-points meet our UK-standard benchmarks.",
  },
  {
    question: "Do you offer tailored quotes for large or custom commercial projects?",
    answer: "Yes. For post-construction projects, multi-storey commercial offices, or large event venues, we conduct an on-site or digital walkthrough and provide an itemised, obligation-free quotation.",
  },
];
