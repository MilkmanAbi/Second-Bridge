export interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  region: string;
  contact: {
    phone?: string;
    email?: string;
    website?: string;
    address?: string;
  };
  tags: string[];
  hours?: string;
}

export interface Thread {
  id: string;
  title: string;
  author: string;
  category: string;
  region: string;
  timestamp: string;
  replyCount: number;
  preview: string;
}

export interface Note {
  id: string;
  serviceId?: string;
  serviceName?: string;
  content: string;
  tags: string[];
  timestamp: string;
  isShared: boolean;
}

export const services: Service[] = [
  {
    id: "1",
    name: "Community Food Bank",
    description: "Provides food assistance to individuals and families in need. No income verification required. Available to all community members.",
    category: "Food Assistance",
    region: "Downtown",
    contact: {
      phone: "(555) 123-4567",
      email: "info@communityfoodbank.org",
      website: "www.communityfoodbank.org",
      address: "123 Main Street, Downtown"
    },
    tags: ["food", "emergency", "no-barrier"],
    hours: "Mon-Fri 9AM-5PM, Sat 10AM-2PM"
  },
  {
    id: "2",
    name: "Housing Support Services",
    description: "Assistance with finding affordable housing, rental assistance programs, and housing stability support. Case workers available by appointment.",
    category: "Housing",
    region: "Citywide",
    contact: {
      phone: "(555) 234-5678",
      email: "housing@citysupport.org",
      website: "www.citysupport.org/housing"
    },
    tags: ["housing", "rental-assistance", "case-management"],
    hours: "Mon-Fri 8AM-6PM"
  },
  {
    id: "3",
    name: "Crisis Line - 24/7",
    description: "Free, confidential crisis support available 24 hours a day, 7 days a week. Trained counselors available to listen and provide resources.",
    category: "Crisis Support",
    region: "Statewide",
    contact: {
      phone: "1-800-273-8255",
      website: "www.crisisline.org"
    },
    tags: ["crisis", "24/7", "hotline"],
    hours: "24/7"
  },
  {
    id: "4",
    name: "Job Training Center",
    description: "Free job training programs, resume workshops, computer skills classes, and job placement assistance. Open to all adults.",
    category: "Employment",
    region: "North Side",
    contact: {
      phone: "(555) 345-6789",
      email: "training@jobcenter.org",
      address: "456 Oak Avenue, North Side"
    },
    tags: ["employment", "training", "education"],
    hours: "Mon-Thu 9AM-7PM, Fri 9AM-5PM"
  },
  {
    id: "5",
    name: "Free Health Clinic",
    description: "Primary care, preventive services, and health screenings. Sliding scale fees based on income. No one turned away.",
    category: "Healthcare",
    region: "East End",
    contact: {
      phone: "(555) 456-7890",
      website: "www.freehealthclinic.org",
      address: "789 Park Road, East End"
    },
    tags: ["healthcare", "sliding-scale", "primary-care"],
    hours: "Tue-Sat 8AM-4PM"
  },
  {
    id: "6",
    name: "Legal Aid Society",
    description: "Free legal assistance for low-income individuals. Services include housing disputes, family law, consumer rights, and public benefits.",
    category: "Legal Services",
    region: "Downtown",
    contact: {
      phone: "(555) 567-8901",
      email: "intake@legalaid.org",
      website: "www.legalaid.org"
    },
    tags: ["legal", "advocacy", "free"],
    hours: "Mon-Fri 9AM-5PM"
  },
  {
    id: "7",
    name: "Youth Mentorship Program",
    description: "Free mentorship and after-school programs for youth ages 10-18. Tutoring, recreational activities, and life skills workshops.",
    category: "Youth Services",
    region: "South Side",
    contact: {
      phone: "(555) 678-9012",
      email: "youth@mentorship.org",
      address: "321 Elm Street, South Side"
    },
    tags: ["youth", "mentorship", "education"],
    hours: "Mon-Fri 3PM-7PM"
  },
  {
    id: "8",
    name: "Transportation Assistance",
    description: "Free or reduced-cost transportation for medical appointments, job interviews, and essential errands. Call to schedule.",
    category: "Transportation",
    region: "Citywide",
    contact: {
      phone: "(555) 789-0123",
      email: "rides@transport.org"
    },
    tags: ["transportation", "medical", "appointments"],
    hours: "Mon-Fri 6AM-8PM"
  }
];

export const threads: Thread[] = [
  {
    id: "1",
    title: "Looking for recommendations: Food pantries in North Side",
    author: "Anonymous",
    category: "Food Assistance",
    region: "North Side",
    timestamp: "2026-03-15T14:30:00Z",
    replyCount: 7,
    preview: "Does anyone know of food pantries in the North Side area that are open on weekends? My work schedule makes it hard to access weekday services."
  },
  {
    id: "2",
    title: "Job training programs - anyone have experience?",
    author: "Anonymous",
    category: "Employment",
    region: "General",
    timestamp: "2026-03-14T10:15:00Z",
    replyCount: 12,
    preview: "I'm considering enrolling in a job training program. Has anyone completed one recently? Would love to hear about your experience."
  },
  {
    id: "3",
    title: "Housing application tips?",
    author: "Anonymous",
    category: "Housing",
    region: "Downtown",
    timestamp: "2026-03-13T16:45:00Z",
    replyCount: 5,
    preview: "First time applying for housing assistance. Any tips on what documents to gather or how to prepare for the interview?"
  },
  {
    id: "4",
    title: "Free dental services?",
    author: "Anonymous",
    category: "Healthcare",
    region: "East End",
    timestamp: "2026-03-12T09:20:00Z",
    replyCount: 4,
    preview: "Does anyone know of free or low-cost dental services in the East End? I've been putting off getting work done."
  },
  {
    id: "5",
    title: "Transportation for medical appointments",
    author: "Anonymous",
    category: "Transportation",
    region: "South Side",
    timestamp: "2026-03-11T13:00:00Z",
    replyCount: 8,
    preview: "I need to get to regular medical appointments but don't have reliable transportation. What options are available?"
  }
];

export const categories = [
  "All Categories",
  "Food Assistance",
  "Housing",
  "Crisis Support",
  "Employment",
  "Healthcare",
  "Legal Services",
  "Youth Services",
  "Transportation"
];

export const regions = [
  "All Regions",
  "Citywide",
  "Statewide",
  "Downtown",
  "North Side",
  "East End",
  "South Side"
];
