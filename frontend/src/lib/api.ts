import type { DestinationResponse, NavItemResponse } from '@/types/api'

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'

export async function getDestinations(): Promise<DestinationResponse[]> {
  try {
    const res = await fetch(`${BASE_URL}/destinations`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

export async function getDestination(slug: string): Promise<DestinationResponse | null> {
  try {
    const res = await fetch(`${BASE_URL}/destinations/${slug}`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export async function getNavMenu(): Promise<NavItemResponse[]> {
  try {
    const res = await fetch(`${BASE_URL}/nav-menu`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}
