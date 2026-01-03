export type CaseStudy = {
  slug: string
  title: string
  category: string
  location: string
  heroImage: string
  summary: string
  challenge: string
  solution: string
  outcome: string
  stats: { label: string; value: string }[]
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "successful-citizenship-by-investment-cbi-placement-for-grenada",
    title: "Successful Citizenship by Investment (CBI) Placement for Grenada",
    category: "Citizenship by Investment",
    location: "Grenada",
    heroImage: "/collated/cbi.png",
    summary:
      "Structured a custom citizenship-by-investment plan for a Nigerian business mogul seeking global mobility, family security, and access to new opportunities.",
    challenge:
      "The principal applicant needed a reputable second passport within six months while keeping a complex asset portfolio fully compliant with program due diligence.",
    solution:
      "We aligned the family profile with Grenada's CBI program, curated a government-approved real estate stake, and coordinated legal, banking, and source-of-funds disclosures.",
    outcome:
      "The entire family secured Grenadian citizenship on the first review cycle, unlocking visa-free access to 140+ countries and E2-eligible pathways into the United States.",
    stats: [
      { label: "Application Timeline", value: "120 Days" },
      { label: "Family Members Approved", value: "5" },
    ],
  },
  {
    slug: "successful-eb-5-investment-and-eb-5-visa-placement",
    title: "Successful EB-5 Investment and EB-5 Visa Placement",
    category: "EB-5 Visa",
    location: "United States",
    heroImage: "/collated/eb5.png",
    summary:
      "Managed full EB-5 investment and application for an Indian entrepreneur seeking U.S. permanent residency and future citizenship for their family.",
    challenge:
      "The investor needed to deploy USD 800K into a compliant project while documenting job-creation evidence and remittance trails across three banking jurisdictions.",
    solution:
      "We diligenced USCIS-approved regional center projects, structured the remittance plan with tax counsel, and prepared a comprehensive I-526E submission.",
    outcome:
      "The petition was accepted without an RFE, reserving a visa number and positioning the family for conditional green cards within the current fiscal year.",
    stats: [
      { label: "Capital Deployed", value: "$800K" },
      { label: "Projected Jobs", value: "12+" },
    ],
  },
  {
    slug: "seamless-relocation-of-a-pan-african-fintech-headquarters-to-dubai",
    title: "Seamless Relocation of a Pan-African Fintech Headquarters to Dubai",
    category: "Corporate Relocation",
    location: "Dubai, UAE",
    heroImage: "/collated/dubai.png",
    summary:
      "Relocated a fast-scaling pan-African fintech company's global HQ to Dubai for enhanced credibility, tax efficiency, and global expansion.",
    challenge:
      "Leadership needed to transition the holding company, banking stack, and C-suite visas to the UAE without disrupting live payment operations.",
    solution:
      "We incorporated a DIFC structure, migrated governance and treasury processes, and coordinated senior leadership relocation and dependent visas.",
    outcome:
      "The fintech relaunched from Dubai within eight weeks, reduced effective tax exposure, and secured access to new investor pools across the GCC.",
    stats: [
      { label: "Jurisdictions Migrated", value: "3" },
      { label: "Relocation Timeline", value: "8 Weeks" },
    ],
  },
  {
    slug: "malta-citizenship-for-a-middle-eastern-hni",
    title: "Malta Citizenship for a Middle-Eastern HNI",
    category: "Citizenship by Investment",
    location: "Malta",
    heroImage: "/collated/malta.png",
    summary:
      "Secured reputable EU citizenship for a high-net-worth individual from the Middle East, providing global mobility and family security.",
    challenge:
      "The applicant faced heightened scrutiny due to regional exposure and required an investment mix that satisfied Malta's residency-plus-investment track.",
    solution:
      "We curated a property lease, government contribution, and philanthropic commitments while staging enhanced due-diligence responses with Maltese counsel.",
    outcome:
      "Citizenship was granted in just over 14 months, enabling the client to re-domicile wealth structures within the EU and access preferential banking corridors.",
    stats: [
      { label: "Residency Tenure", value: "14 Months" },
      { label: "Compliance Exceptions", value: "0" },
    ],
  },
  {
    slug: "successful-canada-pr-through-start-up-visa-program",
    title: "Successful Canada PR Through Start-Up Visa Program",
    category: "Investment Immigration",
    location: "Canada",
    heroImage: "/collated/canada.png",
    summary:
      "Guided an Indian entrepreneur to Canadian permanent residency via the Start-Up Visa, enabling business expansion and family settlement.",
    challenge:
      "The founder had to align an innovation narrative, secure a designated organization letter, and keep the operating company compliant during processing.",
    solution:
      "We refined the venture pitch, negotiated commitment certificates with a designated angel group, and implemented Canadian payroll and IP assignments.",
    outcome:
      "The client obtained a work permit in 6 months and progressed to permanent residency, opening a North American sales base for the venture.",
    stats: [
      { label: "Commitment Raised", value: "$250K" },
      { label: "Team Members Relocated", value: "4" },
    ],
  },
  {
    slug: "successful-canadian-intra-company-transfer-ict",
    title: "Successful Canadian Intra-Company Transfer (ICT)",
    category: "Intra-Company Transfer",
    location: "Toronto, Canada",
    heroImage: "/collated/transfer.png",
    summary:
      "Facilitated the transfer of a senior executive for a Nigerian construction company expanding into Toronto, Canada.",
    challenge:
      "The sponsor needed to prove a qualifying relationship and a viable Canadian business plan while the executive remained tied to live African projects.",
    solution:
      "We incorporated the Canadian affiliate, drafted market-entry financials, and compiled employer support letters, payroll evidence, and executive resumes.",
    outcome:
      "The ICT work permit was approved for three years, allowing the executive to launch Canadian operations and hire local technical staff.",
    stats: [
      { label: "Work Permit Validity", value: "3 Years" },
      { label: "Local Roles Created", value: "6" },
    ],
  },
  {
    slug: "successful-e2-visa-placement-for-u-s-business-expansion",
    title: "Successful E2 Visa Placement for U.S. Business Expansion",
    category: "E-2 Visa",
    location: "Miami, USA",
    heroImage: "/collated/e2-visa.png",
    summary:
      "Enabled a Brazilian entrepreneur to establish and manage a U.S.-based business while relocating their family under the E2 investor visa.",
    challenge:
      "The investor needed to season capital, document the lawful source of funds, and stand up an operating entity before the consular interview.",
    solution:
      "We structured the Florida entity, executed a franchise agreement, opened U.S. banking, and prepared a compliant business plan and visa brief.",
    outcome:
      "The visa was issued for five years, giving the family work and study authorization and unlocking the next phase of U.S. expansion.",
    stats: [
      { label: "Capital Invested", value: "$320K" },
      { label: "Visa Validity", value: "5 Years" },
    ],
  },
  {
    slug: "successful-south-african-financial-independence-visa",
    title: "Successful South African Financial Independence Visa",
    category: "Financial Independence Visa",
    location: "Cape Town, South Africa",
    heroImage: "/collated/africa.png",
    summary:
      "Assisted a retired UK couple in relocating to South Africa for retirement, securing financial independence without employment needs.",
    challenge:
      "They needed to prove recurring offshore income, convert tax residency, and settle property and medical insurance ahead of the move.",
    solution:
      "We synchronized pension statements, SARS tax opinions, medical coverage, and property leases to satisfy consular officers and local compliance.",
    outcome:
      "Both visas were issued for four years, enabling the couple to settle in Cape Town with a compliant financial footprint and lifestyle services.",
    stats: [
      { label: "Monthly Income Proven", value: "$6,000+" },
      { label: "Visa Duration", value: "4 Years" },
    ],
  },
  {
    slug: "successful-south-african-business-setup-visa",
    title: "Successful South African Business Setup Visa",
    category: "Business Setup Visa",
    location: "Johannesburg, South Africa",
    heroImage: "/collated/south-africa.png",
    summary:
      "Helped a Dubai-based tech entrepreneur establish a startup in South Africa, meeting job creation and investment requirements.",
    challenge:
      "The business needed to land minimum capital within 12 months and present a credible plan to hire South African citizens.",
    solution:
      "We secured endorsement from the Department of Trade, negotiated co-working and staffing agreements, and managed Reserve Bank approvals for capital inflows.",
    outcome:
      "The entrepreneur received a five-year visa and met the first-year hiring threshold ahead of schedule.",
    stats: [
      { label: "Capital Committed", value: "ZAR 5M" },
      { label: "Local Jobs Planned", value: "10" },
    ],
  },
  {
    slug: "successful-u-s-intra-company-transfer-l1-visa",
    title: "Successful U.S. Intra-Company Transfer (L1 Visa)",
    category: "L1 Visa",
    location: "Houston, USA",
    heroImage: "/collated/intra.png",
    summary:
      "Set up a U.S. subsidiary in Texas and transferred key staff for a Nigerian oil and gas company director.",
    challenge:
      "The parent company needed to demonstrate a bona fide U.S. office, revenue projections, and managerial duties for the transferee.",
    solution:
      "We incorporated the U.S. entity, secured office leases, prepared five-year financial models, and assembled detailed organizational charts.",
    outcome:
      "USCIS approved the new-office L1A petition for one year with a clear roadmap for extension once revenue milestones were met.",
    stats: [
      { label: "Team Members Relocated", value: "3" },
      { label: "Projection Horizon", value: "5 Years" },
    ],
  },
  {
    slug: "family-office-structuring-in-lagos-nigeria",
    title: "Family Office Structuring in Lagos, Nigeria",
    category: "Family Office Structuring",
    location: "Lagos, Nigeria",
    heroImage: "/collated/lagos.png",
    summary:
      "Implemented a comprehensive governance framework for a first-generation family office to preserve multi-generational wealth.",
    challenge:
      "The founders required institutional-grade controls and reporting without slowing down decision-making across manufacturing, real estate, and public markets.",
    solution:
      "We created a three-entity holding structure, installed independent directors, and implemented consolidated risk, treasury, and impact dashboards.",
    outcome:
      "The office achieved audit readiness within six months and unlocked co-investments with regional private equity partners.",
    stats: [
      { label: "Entities Coordinated", value: "3" },
      { label: "Audit Timeline", value: "6 Months" },
    ],
  },
]

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug)
}
