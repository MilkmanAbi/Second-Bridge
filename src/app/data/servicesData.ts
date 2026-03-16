// Real community services and hotlines data
// Organised by category with real contact information
// Sources: SAMHSA, 211, National Alliance on Mental Illness, Crisis Text Line, etc.

export interface Service {
  id: string;
  name: string;
  description: string;
  category: ServiceCategory;
  region: string; // Country or "Global" or specific city/state
  countryCode: string; // ISO 3166-1 alpha-2
  contact: {
    phone?: string;
    sms?: string;
    chat?: string;
    email?: string;
    website?: string;
    address?: string;
  };
  tags: string[];
  hours?: string;
  languages?: string[];
  isHotline?: boolean;
  isFree?: boolean;
  isAnonymous?: boolean;
}

export type ServiceCategory =
  | "Crisis & Mental Health"
  | "Substance Use"
  | "Domestic Violence"
  | "Food Assistance"
  | "Housing"
  | "Healthcare"
  | "Legal Services"
  | "Employment"
  | "Youth Services"
  | "LGBTQ+ Support"
  | "Veterans"
  | "Disability Services"
  | "Immigrant & Refugee"
  | "Transportation"
  | "Financial Assistance"
  | "Sexual Assault"
  | "Child Services"
  | "Elder Care"
  | "Grief & Loss"
  | "General Support";

export const services: Service[] = [
  // ─── CRISIS & MENTAL HEALTH ─────────────────────────────────────────────────
  {
    id: "988-lifeline",
    name: "988 Suicide & Crisis Lifeline",
    description:
      "Free, confidential support for people in suicidal crisis or emotional distress. Trained counsellors available by call or text. Previously known as the National Suicide Prevention Lifeline.",
    category: "Crisis & Mental Health",
    region: "United States",
    countryCode: "US",
    contact: {
      phone: "988",
      sms: "988",
      chat: "https://988lifeline.org/chat/",
      website: "https://988lifeline.org",
    },
    tags: ["crisis", "suicide", "mental-health", "24/7", "hotline"],
    hours: "24/7",
    languages: ["English", "Spanish"],
    isHotline: true,
    isFree: true,
    isAnonymous: true,
  },
  {
    id: "crisis-text-line",
    name: "Crisis Text Line",
    description:
      "Free text-based crisis support with trained crisis counsellors. Text HOME to 741741. Available for any crisis — not just mental health.",
    category: "Crisis & Mental Health",
    region: "United States / United Kingdom / Canada / Ireland",
    countryCode: "US",
    contact: {
      sms: "741741",
      website: "https://www.crisistextline.org",
    },
    tags: ["crisis", "text", "sms", "24/7", "free"],
    hours: "24/7",
    languages: ["English", "Spanish"],
    isHotline: true,
    isFree: true,
    isAnonymous: true,
  },
  {
    id: "samhsa-helpline",
    name: "SAMHSA National Helpline",
    description:
      "Free, confidential, 24/7 treatment referral and information service for individuals and families facing mental health or substance use disorders.",
    category: "Crisis & Mental Health",
    region: "United States",
    countryCode: "US",
    contact: {
      phone: "1-800-662-4357",
      website: "https://www.samhsa.gov/find-help/national-helpline",
    },
    tags: ["mental-health", "treatment", "referral", "24/7"],
    hours: "24/7",
    languages: ["English", "Spanish"],
    isHotline: true,
    isFree: true,
    isAnonymous: true,
  },
  {
    id: "nami-helpline",
    name: "NAMI HelpLine",
    description:
      "National Alliance on Mental Illness helpline providing free mental health information, support, and local referrals. Staffed by trained volunteers with lived experience.",
    category: "Crisis & Mental Health",
    region: "United States",
    countryCode: "US",
    contact: {
      phone: "1-800-950-6264",
      sms: "62640",
      email: "helpline@nami.org",
      chat: "https://www.nami.org/help",
      website: "https://www.nami.org/help",
    },
    tags: ["mental-health", "support", "referral", "nami"],
    hours: "Mon–Fri 10AM–10PM ET",
    languages: ["English", "Spanish"],
    isFree: true,
    isAnonymous: true,
  },
  {
    id: "samaritans-uk",
    name: "Samaritans",
    description:
      "Confidential emotional support for anyone in distress or struggling to cope, including those having thoughts of suicide. Available by phone, email, and letter.",
    category: "Crisis & Mental Health",
    region: "United Kingdom / Ireland",
    countryCode: "GB",
    contact: {
      phone: "116 123",
      email: "jo@samaritans.org",
      website: "https://www.samaritans.org",
    },
    tags: ["crisis", "emotional-support", "uk", "ireland", "24/7"],
    hours: "24/7",
    languages: ["English"],
    isHotline: true,
    isFree: true,
    isAnonymous: true,
  },
  {
    id: "lifeline-australia",
    name: "Lifeline Australia",
    description:
      "Australia's leading crisis support service. Provides 24/7 telephone crisis support, online chat, and text support.",
    category: "Crisis & Mental Health",
    region: "Australia",
    countryCode: "AU",
    contact: {
      phone: "13 11 14",
      sms: "0477 13 11 14",
      chat: "https://www.lifeline.org.au/crisis-chat/",
      website: "https://www.lifeline.org.au",
    },
    tags: ["crisis", "australia", "24/7", "phone", "chat"],
    hours: "24/7",
    languages: ["English"],
    isHotline: true,
    isFree: true,
    isAnonymous: true,
  },
  {
    id: "befrienders",
    name: "Befrienders Worldwide",
    description:
      "International network of emotional support centres. Find a centre near you in over 50 countries. Provides confidential support to prevent suicide.",
    category: "Crisis & Mental Health",
    region: "International",
    countryCode: "GB",
    contact: {
      website: "https://www.befrienders.org",
    },
    tags: ["international", "crisis", "emotional-support", "directory"],
    hours: "Varies by centre",
    isAnonymous: true,
  },
  {
    id: "isp-directory",
    name: "International Association for Suicide Prevention",
    description:
      "Directory of crisis centres worldwide. Provides a searchable list of suicide prevention and crisis intervention services globally.",
    category: "Crisis & Mental Health",
    region: "International",
    countryCode: "GB",
    contact: {
      website: "https://www.iasp.info/resources/Crisis_Centres/",
    },
    tags: ["international", "directory", "crisis-centres"],
  },

  // ─── SUBSTANCE USE ───────────────────────────────────────────────────────────
  {
    id: "aa",
    name: "Alcoholics Anonymous",
    description:
      "International mutual aid fellowship for people with alcohol use disorder. Peer support groups available worldwide. No membership fees or requirements.",
    category: "Substance Use",
    region: "International",
    countryCode: "US",
    contact: {
      phone: "1-212-870-3400",
      website: "https://www.aa.org",
    },
    tags: ["alcohol", "recovery", "peer-support", "meetings"],
    isFree: true,
  },
  {
    id: "na",
    name: "Narcotics Anonymous",
    description:
      "Community-based recovery organisation for people struggling with drug addiction. Over 70,000 weekly meetings in 144 countries.",
    category: "Substance Use",
    region: "International",
    countryCode: "US",
    contact: {
      website: "https://www.na.org",
    },
    tags: ["drugs", "recovery", "peer-support", "meetings"],
    isFree: true,
  },
  {
    id: "smart-recovery",
    name: "SMART Recovery",
    description:
      "Science-based mutual aid programme for people with addictive behaviours. In-person and online meetings, no steps required.",
    category: "Substance Use",
    region: "International",
    countryCode: "US",
    contact: {
      phone: "1-440-951-5357",
      website: "https://www.smartrecovery.org",
    },
    tags: ["recovery", "addiction", "science-based", "online-meetings"],
    isFree: true,
  },

  // ─── DOMESTIC VIOLENCE ───────────────────────────────────────────────────────
  {
    id: "ndvh",
    name: "National Domestic Violence Hotline",
    description:
      "Free, confidential support for domestic violence survivors and those at risk. Call, text, or chat with trained advocates 24/7.",
    category: "Domestic Violence",
    region: "United States",
    countryCode: "US",
    contact: {
      phone: "1-800-799-7233",
      sms: "Text START to 88788",
      chat: "https://www.thehotline.org",
      website: "https://www.thehotline.org",
    },
    tags: ["domestic-violence", "abuse", "safety", "24/7"],
    hours: "24/7",
    languages: ["English", "Spanish", "200+ languages via interpreter"],
    isHotline: true,
    isFree: true,
    isAnonymous: true,
  },
  {
    id: "refuge-uk",
    name: "Refuge National Domestic Abuse Helpline (UK)",
    description:
      "Free support for women experiencing domestic abuse. Specialist advice from trained advocates, referrals to local services and refuges.",
    category: "Domestic Violence",
    region: "United Kingdom",
    countryCode: "GB",
    contact: {
      phone: "0808 2000 247",
      website: "https://www.refuge.org.uk",
    },
    tags: ["domestic-violence", "uk", "women", "free", "24/7"],
    hours: "24/7",
    isFree: true,
    isAnonymous: true,
  },
  {
    id: "1800respect",
    name: "1800RESPECT (Australia)",
    description:
      "National sexual assault, domestic and family violence counselling service. Free, confidential support by phone and online chat.",
    category: "Domestic Violence",
    region: "Australia",
    countryCode: "AU",
    contact: {
      phone: "1800 737 732",
      chat: "https://www.1800respect.org.au",
      website: "https://www.1800respect.org.au",
    },
    tags: ["domestic-violence", "australia", "sexual-assault", "24/7"],
    hours: "24/7",
    isFree: true,
    isAnonymous: true,
  },

  // ─── SEXUAL ASSAULT ──────────────────────────────────────────────────────────
  {
    id: "rainn",
    name: "RAINN National Sexual Assault Hotline",
    description:
      "Confidential support for survivors of sexual violence. Call or chat to be connected with a trained staff member at a local RAINN-affiliated sexual assault service provider.",
    category: "Sexual Assault",
    region: "United States",
    countryCode: "US",
    contact: {
      phone: "1-800-656-4673",
      chat: "https://hotline.rainn.org/online",
      website: "https://www.rainn.org",
    },
    tags: ["sexual-assault", "rape", "support", "24/7"],
    hours: "24/7",
    isFree: true,
    isAnonymous: true,
  },

  // ─── LGBTQ+ SUPPORT ──────────────────────────────────────────────────────────
  {
    id: "trevor-project",
    name: "The Trevor Project",
    description:
      "Crisis intervention and suicide prevention for LGBTQ+ young people under 25. Call, text, or chat with trained counsellors.",
    category: "LGBTQ+ Support",
    region: "United States",
    countryCode: "US",
    contact: {
      phone: "1-866-488-7386",
      sms: "Text START to 678-678",
      chat: "https://www.thetrevorproject.org/get-help/",
      website: "https://www.thetrevorproject.org",
    },
    tags: ["lgbtq", "youth", "crisis", "suicide-prevention", "24/7"],
    hours: "24/7",
    isFree: true,
    isAnonymous: true,
  },
  {
    id: "trans-lifeline",
    name: "Trans Lifeline",
    description:
      "Peer support hotline run by and for trans people. Provides direct emotional and financial support to the trans community.",
    category: "LGBTQ+ Support",
    region: "United States / Canada",
    countryCode: "US",
    contact: {
      phone: "877-565-8860",
      website: "https://translifeline.org",
    },
    tags: ["transgender", "lgbtq", "peer-support", "crisis"],
    hours: "Variable — check website",
    isFree: true,
    isAnonymous: true,
  },
  {
    id: "glbt-near-you",
    name: "GLBT Near You",
    description:
      "Directory of LGBTQ+-friendly services, groups, and community organisations. Find local resources by location.",
    category: "LGBTQ+ Support",
    region: "International",
    countryCode: "US",
    contact: {
      website: "https://www.glbtnearyou.org",
    },
    tags: ["lgbtq", "directory", "local", "community"],
  },

  // ─── VETERANS ────────────────────────────────────────────────────────────────
  {
    id: "veterans-crisis-line",
    name: "Veterans Crisis Line",
    description:
      "Free, confidential crisis support for veterans, service members, and their families. Staffed by responders, many of whom are veterans themselves.",
    category: "Veterans",
    region: "United States",
    countryCode: "US",
    contact: {
      phone: "988 (press 1)",
      sms: "838255",
      chat: "https://www.veteranscrisisline.net/get-help-now/chat/",
      website: "https://www.veteranscrisisline.net",
    },
    tags: ["veterans", "military", "crisis", "24/7"],
    hours: "24/7",
    isFree: true,
    isAnonymous: true,
  },

  // ─── FOOD ASSISTANCE ─────────────────────────────────────────────────────────
  {
    id: "211",
    name: "211 (US & Canada)",
    description:
      "Free referral service connecting people with local human services — food, housing, childcare, healthcare, and more. Covers most of the US and Canada.",
    category: "Food Assistance",
    region: "United States / Canada",
    countryCode: "US",
    contact: {
      phone: "211",
      website: "https://www.211.org",
    },
    tags: ["referral", "local-services", "food", "housing", "211"],
    hours: "Varies by region (many 24/7)",
    isFree: true,
  },
  {
    id: "snap",
    name: "SNAP (Supplemental Nutrition Assistance Program)",
    description:
      "US federal nutrition programme providing monthly benefits to low-income individuals and families to purchase groceries. Apply at your state's SNAP office.",
    category: "Food Assistance",
    region: "United States",
    countryCode: "US",
    contact: {
      website: "https://www.fns.usda.gov/snap/recipient/eligibility",
      phone: "1-800-221-5689",
    },
    tags: ["food", "government", "benefits", "groceries"],
    isFree: true,
  },
  {
    id: "feeding-america",
    name: "Feeding America",
    description:
      "Nationwide network of food banks serving 46 million people. Use the food bank locator to find your nearest food bank.",
    category: "Food Assistance",
    region: "United States",
    countryCode: "US",
    contact: {
      website: "https://www.feedingamerica.org/find-your-local-foodbank",
    },
    tags: ["food-bank", "hunger", "local"],
    isFree: true,
  },
  {
    id: "trussell-trust",
    name: "Trussell Trust Food Bank Network (UK)",
    description:
      "Network of 1,400+ food bank centres across the UK. Provides emergency food and support to people in crisis.",
    category: "Food Assistance",
    region: "United Kingdom",
    countryCode: "GB",
    contact: {
      website: "https://www.trusselltrust.org/get-help/find-a-foodbank/",
    },
    tags: ["food-bank", "uk", "emergency", "local"],
    isFree: true,
  },

  // ─── HOUSING ─────────────────────────────────────────────────────────────────
  {
    id: "hud-housing",
    name: "HUD Housing Counseling (US)",
    description:
      "US Department of Housing approved housing counselling agencies offering assistance with renting, homebuying, foreclosure prevention, and homelessness.",
    category: "Housing",
    region: "United States",
    countryCode: "US",
    contact: {
      phone: "1-800-569-4287",
      website: "https://www.hud.gov/find_a_housing_counselor",
    },
    tags: ["housing", "rental", "foreclosure", "homelessness"],
    isFree: true,
  },
  {
    id: "shelter-uk",
    name: "Shelter (UK)",
    description:
      "UK housing and homelessness charity. Free housing advice, emergency helpline, and local services to help people facing housing issues.",
    category: "Housing",
    region: "United Kingdom",
    countryCode: "GB",
    contact: {
      phone: "0808 800 4444",
      website: "https://www.shelter.org.uk",
    },
    tags: ["housing", "homelessness", "uk", "advice"],
    hours: "Mon–Fri 8AM–8PM, Sat–Sun 9AM–5PM",
    isFree: true,
  },
  {
    id: "salvos-housing",
    name: "Salvation Army Housing Support (Australia)",
    description:
      "Emergency accommodation, transitional housing, and support services across Australia. Includes rough sleeping outreach.",
    category: "Housing",
    region: "Australia",
    countryCode: "AU",
    contact: {
      phone: "13 72 58",
      website: "https://www.salvationarmy.org.au/find-us/",
    },
    tags: ["housing", "australia", "emergency", "homeless"],
  },

  // ─── HEALTHCARE ──────────────────────────────────────────────────────────────
  {
    id: "fqhc",
    name: "Federally Qualified Health Centers (US)",
    description:
      "Community health centres providing primary care on a sliding fee scale regardless of ability to pay. Find a centre near you.",
    category: "Healthcare",
    region: "United States",
    countryCode: "US",
    contact: {
      website: "https://findahealthcenter.hrsa.gov",
    },
    tags: ["healthcare", "primary-care", "sliding-scale", "low-income"],
    isFree: true,
  },
  {
    id: "nhs-111",
    name: "NHS 111 (UK)",
    description:
      "Free non-emergency medical advice in England, 24/7. For when you need medical help or advice but it is not a life-threatening emergency.",
    category: "Healthcare",
    region: "United Kingdom",
    countryCode: "GB",
    contact: {
      phone: "111",
      website: "https://111.nhs.uk",
    },
    tags: ["healthcare", "nhs", "medical", "uk", "24/7"],
    hours: "24/7",
    isFree: true,
  },
  {
    id: "beyond-blue",
    name: "Beyond Blue (Australia)",
    description:
      "Australian mental health organisation providing information, support, and referrals for anxiety, depression, and suicide. 24/7 support line.",
    category: "Healthcare",
    region: "Australia",
    countryCode: "AU",
    contact: {
      phone: "1300 22 4636",
      chat: "https://www.beyondblue.org.au/get-support/get-immediate-support",
      website: "https://www.beyondblue.org.au",
    },
    tags: ["mental-health", "anxiety", "depression", "australia", "24/7"],
    hours: "24/7",
    isFree: true,
  },

  // ─── LEGAL SERVICES ──────────────────────────────────────────────────────────
  {
    id: "lsc",
    name: "Legal Services Corporation (US)",
    description:
      "Directory of free civil legal aid programmes for low-income Americans. Find legal help for housing, domestic violence, benefits, and more.",
    category: "Legal Services",
    region: "United States",
    countryCode: "US",
    contact: {
      website: "https://www.lsc.gov/what-legal-aid/find-legal-aid",
    },
    tags: ["legal", "civil-aid", "low-income", "directory"],
    isFree: true,
  },
  {
    id: "citizens-advice",
    name: "Citizens Advice (UK)",
    description:
      "Free, independent advice on legal, debt, housing, and employment issues in the UK. In-person, phone, and online support.",
    category: "Legal Services",
    region: "United Kingdom",
    countryCode: "GB",
    contact: {
      phone: "0800 144 8848",
      website: "https://www.citizensadvice.org.uk",
    },
    tags: ["legal", "advice", "debt", "uk", "free"],
    isFree: true,
  },

  // ─── EMPLOYMENT ──────────────────────────────────────────────────────────────
  {
    id: "american-job-centers",
    name: "American Job Centers (US)",
    description:
      "Free employment services including job search assistance, resume help, skills training, and more. 2,300+ locations nationwide.",
    category: "Employment",
    region: "United States",
    countryCode: "US",
    contact: {
      website: "https://www.careeronestop.org/LocalHelp/AmericanJobCenters/find-american-job-centers.aspx",
    },
    tags: ["employment", "job-search", "training", "free"],
    isFree: true,
  },
  {
    id: "jobcentre-uk",
    name: "Jobcentre Plus (UK)",
    description:
      "UK government employment service providing help finding work, claiming Universal Credit, and accessing back-to-work support.",
    category: "Employment",
    region: "United Kingdom",
    countryCode: "GB",
    contact: {
      website: "https://www.gov.uk/contact-jobcentre-plus",
      phone: "0800 169 0190",
    },
    tags: ["employment", "benefits", "uk", "universal-credit"],
    isFree: true,
  },

  // ─── YOUTH SERVICES ──────────────────────────────────────────────────────────
  {
    id: "youthline",
    name: "YouthLine (US)",
    description:
      "Youth-to-youth crisis helpline and text line. Trained teen volunteers provide free support to other young people.",
    category: "Youth Services",
    region: "United States",
    countryCode: "US",
    contact: {
      phone: "1-877-968-8491",
      sms: "Text teen2teen to 839863",
      website: "https://www.youthline.us",
    },
    tags: ["youth", "teens", "crisis", "peer-support"],
    hours: "4PM–10PM PT daily",
    isFree: true,
    isAnonymous: true,
  },
  {
    id: "childline",
    name: "Childline (UK)",
    description:
      "Free, confidential counselling service for children and young people up to age 19 in the UK. Available by phone, email, and 1-2-1 chat.",
    category: "Youth Services",
    region: "United Kingdom",
    countryCode: "GB",
    contact: {
      phone: "0800 1111",
      chat: "https://www.childline.org.uk",
      website: "https://www.childline.org.uk",
    },
    tags: ["youth", "children", "uk", "counselling", "24/7"],
    hours: "24/7",
    isFree: true,
    isAnonymous: true,
  },
  {
    id: "kids-helpline",
    name: "Kids Helpline (Australia)",
    description:
      "Free, private, 24/7 counselling service for Australians aged 5–25. Available by phone, webchat, and email.",
    category: "Youth Services",
    region: "Australia",
    countryCode: "AU",
    contact: {
      phone: "1800 55 1800",
      chat: "https://kidshelpline.com.au/get-help/webchat-counselling/",
      website: "https://kidshelpline.com.au",
    },
    tags: ["youth", "australia", "counselling", "24/7"],
    hours: "24/7",
    isFree: true,
    isAnonymous: true,
  },

  // ─── FINANCIAL ASSISTANCE ────────────────────────────────────────────────────
  {
    id: "benefits-gov",
    name: "Benefits.gov (US)",
    description:
      "Official US government benefits portal. Find and apply for federal assistance programmes for housing, food, healthcare, education, and more.",
    category: "Financial Assistance",
    region: "United States",
    countryCode: "US",
    contact: {
      website: "https://www.benefits.gov",
    },
    tags: ["benefits", "government", "assistance", "directory"],
    isFree: true,
  },
  {
    id: "turn2us",
    name: "Turn2us (UK)",
    description:
      "UK charity helping people access welfare benefits, charitable grants, and other financial help. Free benefits calculator and grants search.",
    category: "Financial Assistance",
    region: "United Kingdom",
    countryCode: "GB",
    contact: {
      phone: "0808 802 2000",
      website: "https://www.turn2us.org.uk",
    },
    tags: ["benefits", "grants", "uk", "financial-help"],
    isFree: true,
  },

  // ─── IMMIGRANT & REFUGEE ─────────────────────────────────────────────────────
  {
    id: "imm-advocates",
    name: "Immigration Advocates Network",
    description:
      "Directory of free and low-cost immigration legal services providers across the United States.",
    category: "Immigrant & Refugee",
    region: "United States",
    countryCode: "US",
    contact: {
      website: "https://www.immigrationadvocates.org/nonprofit/legaldirectory/",
    },
    tags: ["immigration", "legal", "asylum", "refugee", "directory"],
    isFree: true,
  },
  {
    id: "unhcr",
    name: "UNHCR – UN Refugee Agency",
    description:
      "International agency providing life-saving assistance to refugees and asylum seekers. Find local UNHCR offices and partners worldwide.",
    category: "Immigrant & Refugee",
    region: "International",
    countryCode: "GB",
    contact: {
      website: "https://www.unhcr.org/get-help",
    },
    tags: ["refugee", "asylum", "international", "un"],
  },

  // ─── DISABILITY SERVICES ─────────────────────────────────────────────────────
  {
    id: "ada-info",
    name: "ADA National Network",
    description:
      "Free information, guidance, and training on the Americans with Disabilities Act. Covers employment, education, housing, and public accommodations.",
    category: "Disability Services",
    region: "United States",
    countryCode: "US",
    contact: {
      phone: "1-800-949-4232",
      website: "https://adata.org",
    },
    tags: ["disability", "ada", "rights", "accommodation"],
    hours: "Mon–Fri 8AM–8PM ET",
    isFree: true,
  },

  // ─── ELDER CARE ──────────────────────────────────────────────────────────────
  {
    id: "eldercare-locator",
    name: "Eldercare Locator (US)",
    description:
      "Free US government service connecting older adults and caregivers to local support. Covers housing, transportation, meals, healthcare, and legal assistance.",
    category: "Elder Care",
    region: "United States",
    countryCode: "US",
    contact: {
      phone: "1-800-677-1116",
      website: "https://eldercare.acl.gov",
    },
    tags: ["elderly", "ageing", "caregiving", "local-services"],
    hours: "Mon–Fri 9AM–8PM ET",
    isFree: true,
  },

  // ─── GRIEF & LOSS ────────────────────────────────────────────────────────────
  {
    id: "grief-share",
    name: "GriefShare",
    description:
      "Network of grief recovery support groups available worldwide. In-person groups facilitated by trained leaders.",
    category: "Grief & Loss",
    region: "International",
    countryCode: "US",
    contact: {
      phone: "1-800-395-5755",
      website: "https://www.griefshare.org",
    },
    tags: ["grief", "bereavement", "loss", "support-group"],
  },
  {
    id: "cruse-uk",
    name: "Cruse Bereavement Support (UK)",
    description:
      "UK charity offering free support, information, and counselling for bereaved people after death of a close person.",
    category: "Grief & Loss",
    region: "United Kingdom",
    countryCode: "GB",
    contact: {
      phone: "0808 808 1677",
      website: "https://www.cruse.org.uk",
    },
    tags: ["grief", "bereavement", "uk", "counselling"],
    isFree: true,
  },

  // ─── GENERAL SUPPORT ─────────────────────────────────────────────────────────
  {
    id: "211-directory",
    name: "211 Find Help (US & Canada)",
    description:
      "Search by zip code or city for local health and human services — food, shelter, healthcare, mental health, employment, and more.",
    category: "General Support",
    region: "United States / Canada",
    countryCode: "US",
    contact: {
      phone: "211",
      website: "https://www.211.org",
    },
    tags: ["directory", "local", "referral", "general"],
    hours: "24/7 in most areas",
    isFree: true,
  },
  {
    id: "unitedway",
    name: "United Way Worldwide",
    description:
      "Global network connecting people to local resources including basic needs, education, financial stability, and health support. Search locally.",
    category: "General Support",
    region: "International",
    countryCode: "US",
    contact: {
      website: "https://www.unitedway.org/find-your-united-way",
    },
    tags: ["community", "local", "general", "support"],
    isFree: true,
  },
];

export const serviceCategories: ServiceCategory[] = [
  "Crisis & Mental Health",
  "Substance Use",
  "Domestic Violence",
  "Sexual Assault",
  "LGBTQ+ Support",
  "Veterans",
  "Food Assistance",
  "Housing",
  "Healthcare",
  "Legal Services",
  "Employment",
  "Youth Services",
  "Financial Assistance",
  "Immigrant & Refugee",
  "Disability Services",
  "Elder Care",
  "Grief & Loss",
  "Child Services",
  "General Support",
];

// Countries/regions available in directory
export const serviceRegions = [
  "All Regions",
  "International",
  "United States",
  "United Kingdom",
  "Australia",
  "Canada",
  "Ireland",
];

// Hotlines that are always shown prominently regardless of region
export const pinnedHotlines = services.filter((s) => s.isHotline);
