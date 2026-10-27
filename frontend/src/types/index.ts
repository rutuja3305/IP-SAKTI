// ─────────────────────────────────────────────────────────────────────────────
// IP-SAKTI Sahayak — Central TypeScript Types
// ─────────────────────────────────────────────────────────────────────────────

// ─── Auth & User ──────────────────────────────────────────────────────────────

export type UserRole =
  | 'student'
  | 'ayurveda_professional'
  | 'ip_professional'
  | 'manufacturer'
  | 'regulatory_professional'
  | 'researcher'
  | 'innovator'
  | 'admin'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  institution?: string
  fieldOfInterest?: string
  createdAt: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  email: string
  password: string
}

export interface RegistrationProfile {
  name: string
  institution: string
  fieldOfInterest: string
}

// ─── Knowledge Atlas ──────────────────────────────────────────────────────────

export type ChapterPartId =
  | 'part-1'
  | 'part-2'
  | 'part-3'
  | 'part-4'
  | 'part-5'
  | 'part-6'

export interface ChapterPart {
  id: ChapterPartId
  title: string           // "Part I — Understanding Ayurveda"
  shortTitle: string      // "Understanding Ayurveda"
  description: string
  chapterRange: string    // "Chapters 1–7"
  color: string           // Tailwind color class for part accent
  chapters: Chapter[]     // chapters belonging to this part
}

export interface Chapter {
  id: string              // 'ch-1', 'ch-15'
  partId: ChapterPartId
  number: number
  title: string
  subtitle: string
  description: string     // 2–3 sentence summary for the card
  estimatedReadMinutes: number
  coverImage?: string
  tags: string[]
  contentBlocks: ContentBlock[]
  sources: SourceReference[]
}

// ─── Content Blocks (discriminated union) ─────────────────────────────────────

export interface TextBlock {
  type: 'text'
  heading?: string
  body: string            // markdown-compatible prose
}

export interface ImageBlock {
  type: 'image'
  src: string
  alt: string
  caption?: string
  width?: 'full' | 'wide' | 'standard'
}

export interface TimelineEvent {
  year: string
  title: string
  description: string
  icon?: string
}

export interface TimelineBlock {
  type: 'timeline'
  heading: string
  events: TimelineEvent[]
}

export interface ComparisonTableBlock {
  type: 'comparison-table'
  heading: string
  columns: string[]
  rows: string[][]
}

export interface InfoCard {
  icon?: string
  title: string
  body: string
  accent?: string         // Tailwind color token for card accent
}

export interface InfoCardGridBlock {
  type: 'info-card-grid'
  heading?: string
  columns?: 2 | 3 | 4
  cards: InfoCard[]
}

export interface ChartBlock {
  type: 'chart'
  heading: string
  chartType: 'bar' | 'line' | 'pie' | 'radial'
  data: Record<string, unknown>   // chart data — structure varies by type
  caption?: string
}

export interface VideoBlock {
  type: 'video'
  heading?: string
  src: string             // URL (YouTube embed or local)
  caption?: string
  poster?: string
}

export type ContentBlock =
  | TextBlock
  | ImageBlock
  | TimelineBlock
  | ComparisonTableBlock
  | InfoCardGridBlock
  | ChartBlock
  | VideoBlock

// ─── Source References ────────────────────────────────────────────────────────

export type SourceType =
  | 'classical_text'
  | 'peer_review'
  | 'pharmacological'
  | 'regulatory'
  | 'government'
  | 'international'

export interface SourceReference {
  id: string
  title: string
  type: SourceType
  citation: string
  url?: string
  jurisdiction?: string
  year?: string
}

// ─── Ayurveda AI ─────────────────────────────────────────────────────────────

export type AIMode = 'ask' | 'explore' | 'verify' | 'research' | 'innovate'

export interface AIQuery {
  id: string
  question: string
  mode: AIMode
  sessionId?: string
  timestamp: string
}

export interface EvidenceMetadata {
  sourceCount: number
  jurisdiction: string
  documentType: string
}

export interface RelatedEntity {
  name: string
  scientificName?: string
  imageUrl?: string
  family?: string
}

export interface AIMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  // Only on assistant messages
  confidence?: 'high' | 'medium' | 'low'
  humanReviewRecommended?: boolean
  sources?: SourceReference[]
  evidenceMetadata?: EvidenceMetadata
  relatedEntities?: RelatedEntity[]
  disclaimer?: string
}

export interface AIResponse {
  id: string
  question: string
  mode: AIMode
  answer: string
  confidence: 'high' | 'medium' | 'low'
  humanReviewRecommended: boolean
  sources: SourceReference[]
  evidenceMetadata: EvidenceMetadata
  relatedEntities?: RelatedEntity[]
  disclaimer: string
  generatedAt: string
}

// ─── Innovation Intelligence ──────────────────────────────────────────────────

export type InnovationCategory =
  | 'herbal_supplement'
  | 'ayurvedic_formulation'
  | 'cosmetic'
  | 'nutraceutical'
  | 'pharmaceutical'
  | 'biotechnology'
  | 'device'
  | 'process'
  | 'other'

export interface InnovationInput {
  productType: InnovationCategory
  productTypeCustom?: string   // when productType = 'other'
  ingredients: string[]
  purpose: string
  modifiedProcess: string
  biologicalResources: string[]
  origin: string
  targetJurisdictions: string[]
}

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical'

export interface RiskScore {
  level: RiskLevel
  score: number              // 0–100
  summary: string
  evidence: SourceReference[]
}

export interface InnovationRisks {
  patent: RiskScore
  traditionalKnowledge: RiskScore
  abs: RiskScore             // Access & Benefit Sharing
  regulatory: RiskScore
  internationalMarket: RiskScore
}

export type IPPathwayType =
  | 'patent'
  | 'trade_secret'
  | 'geographical_indication'
  | 'traditional_knowledge_protection'
  | 'plant_variety'
  | 'copyright'

export interface IPPathway {
  type: IPPathwayType
  title: string
  description: string
  feasibility: 'high' | 'medium' | 'low'
  jurisdiction: string[]
  references: SourceReference[]
}

export interface RegulatoryItem {
  authority: string          // "CDSCO", "Ministry of AYUSH"
  requirement: string
  jurisdiction: string
  urgency: 'immediate' | 'before_launch' | 'ongoing'
  references: SourceReference[]
}

export interface TKDLMatch {
  tkdlId: string
  title: string
  similarity: number         // 0–1
  matchType: 'exact' | 'partial' | 'related'
  sourceText: string
  jurisdiction: string
}

export interface InnovationAnalysisResult {
  queryId: string
  innovationTitle: string
  risks: InnovationRisks
  ipPathways: IPPathway[]
  regulatoryConsiderations: RegulatoryItem[]
  tkdlMatches?: TKDLMatch[]
  recommendedNextSteps: string[]
  confidence: 'high' | 'medium' | 'low'
  disclaimer: string
  generatedAt: string
}

// ─── API Layer ────────────────────────────────────────────────────────────────

export interface ApiError {
  message: string
  code?: string
  statusCode?: number
}

export interface ApiResponse<T> {
  data: T
  success: boolean
  error?: ApiError
}

// ─── UI State ─────────────────────────────────────────────────────────────────

export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

export interface AsyncState<T> {
  data: T | null
  status: LoadingState
  error: string | null
}
