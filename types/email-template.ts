export interface EmailTemplate {
  id: string
  title: string
  subject: string
  content: string
  category: string
  tone: string
  isFavorite: boolean
  createdAt: string
  lastUsed: string
  usageCount: number
  tags: string[]
}
