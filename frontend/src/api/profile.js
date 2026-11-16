import { fallbackProfile } from "../data/fallbackProfile"

/**
 * Vite 프록시(/api → localhost:8080)로 프로필을 가져온다.
 * 서버가 꺼져 있거나 응답이 실패하면 프론트에 내장된 샘플을 쓴다.
 */
export async function loadProfile() {
  try {
    const response = await fetch("/api/profile")
    if (!response.ok) {
      throw new Error(`프로필 API 응답 오류: ${response.status}`)
    }
    const profile = await response.json()
    return { profile, source: "api" }
  } catch (error) {
    console.warn("백엔드에 연결하지 못해 내장 샘플 데이터를 표시합니다.", error)
    return { profile: fallbackProfile, source: "fallback" }
  }
}
