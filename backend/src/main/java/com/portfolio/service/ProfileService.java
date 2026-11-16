package com.portfolio.service;

import com.portfolio.dto.ProfileResponse;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 포트폴리오에 표시할 샘플 프로필을 제공한다.
 * 실제 이력으로 바꿀 때는 이 클래스의 값만 수정하면 된다.
 */
@Service
public class ProfileService {

    public ProfileResponse getProfile() {
        return new ProfileResponse(
                "홍길동",
                "백엔드 개발자",
                "문제를 작은 단위로 나누고, 팀과 합의한 기준으로 끝까지 밀어붙입니다.",
                "주문·정산 도메인의 API를 설계하고 운영해 온 백엔드 개발자입니다. "
                        + "장애 원인을 로그와 데이터로 좁히고, 재발하지 않도록 계약과 테스트를 함께 고치는 일을 좋아합니다. "
                        + "화면 요구를 그대로 구현하기보다, 같이 쓰는 사람이 다음에도 고칠 수 있는 구조를 남기려 합니다.",
                List.of(
                        new ProfileResponse.Highlight(
                                "문제 해결",
                                "증상 대신 재현 조건부터 적고, 영향 범위와 롤백 방법을 먼저 맞춘 뒤 수정합니다."
                        ),
                        new ProfileResponse.Highlight(
                                "협업",
                                "기획·프론트와 API 계약(필드, 에러, 페이지네이션)을 문서로 고정하고 같이 검토합니다."
                        ),
                        new ProfileResponse.Highlight(
                                "소통",
                                "진행 상황과 막힌 지점을 짧게 공유해, 결정이 필요한 시점만 회의에 올립니다."
                        )
                ),
                List.of(
                        new ProfileResponse.SkillGroup("Language", List.of("Java", "JavaScript", "SQL")),
                        new ProfileResponse.SkillGroup("Backend", List.of("Spring Boot", "Spring MVC", "JPA", "REST")),
                        new ProfileResponse.SkillGroup("Frontend", List.of("React", "Vite", "Tailwind CSS")),
                        new ProfileResponse.SkillGroup("Tools", List.of("Git", "Gradle", "Docker", "IntelliJ IDEA"))
                ),
                List.of(
                        new ProfileResponse.Experience(
                                "한빛커머스",
                                "백엔드 개발자",
                                "2023.03 — 현재",
                                "주문·결제 API를 담당하며, 장애 대응과 배포 체크리스트를 팀 표준으로 정리했습니다.",
                                List.of(
                                        "주문 생성 API의 중복 요청을 멱등 키로 막아 결제 중복을 줄였습니다.",
                                        "조회 API 응답 계약을 프론트와 맞춰 화면별 추가 호출을 정리했습니다.",
                                        "장애 발생 시 타임라인·원인·재발 방지 항목을 같은 양식으로 남겼습니다."
                                )
                        ),
                        new ProfileResponse.Experience(
                                "푸른소프트",
                                "주니어 개발자",
                                "2021.07 — 2023.02",
                                "사내 관리자 도구의 서버 기능을 구현하고, 운영 문의에 대응하는 일을 맡았습니다.",
                                List.of(
                                        "회원 검색·권한 변경 API를 역할 기준으로 분리해 수정 범위를 줄였습니다.",
                                        "반복되던 데이터 보정 작업을 배치로 옮겨 수작업을 줄였습니다."
                                )
                        )
                ),
                List.of(
                        new ProfileResponse.Project(
                                "주문 API 재설계",
                                "2024",
                                "생성·조회·취소 흐름을 리소스로 나누고, 에러 코드와 예시 응답을 한 문서에 모았습니다.",
                                List.of("Java 17", "Spring Boot", "REST"),
                                "https://github.com"
                        ),
                        new ProfileResponse.Project(
                                "운영 대시보드",
                                "2023",
                                "주문 실패 건수를 시간 단위로 보여주는 내부 화면용 API와 집계 쿼리를 만들었습니다.",
                                List.of("Spring MVC", "SQL", "React"),
                                "https://github.com"
                        ),
                        new ProfileResponse.Project(
                                "프로필 웹",
                                "2026",
                                "이 저장소의 샘플입니다. Spring Boot API와 React 화면을 분리해 로컬에서 바로 띄웁니다.",
                                List.of("Spring Boot", "React", "Tailwind CSS"),
                                "https://github.com"
                        )
                ),
                new ProfileResponse.Contact(
                        "hello@example.com",
                        "https://github.com",
                        "https://example.com"
                )
        );
    }
}
