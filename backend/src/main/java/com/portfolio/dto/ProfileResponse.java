package com.portfolio.dto;

import java.util.List;

/**
 * GET /api/profile 응답. 화면 섹션과 1:1로 대응한다.
 */
public record ProfileResponse(
        String name,
        String title,
        String tagline,
        String about,
        List<Highlight> highlights,
        List<SkillGroup> skills,
        List<Experience> experiences,
        List<Project> projects,
        Contact contact
) {

    public record Highlight(String title, String description) {
    }

    public record SkillGroup(String category, List<String> items) {
    }

    public record Experience(
            String company,
            String role,
            String period,
            String summary,
            List<String> points
    ) {
    }

    public record Project(
            String name,
            String period,
            String summary,
            List<String> stack,
            String link
    ) {
    }

    public record Contact(String email, String github, String blog) {
    }
}
