package com.portfolio.controller;

import com.portfolio.dto.ProfileResponse;
import com.portfolio.service.ProfileService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 포트폴리오 화면이 소비하는 프로필 API.
 */
@RestController
@RequestMapping("/api")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping("/profile")
    public ProfileResponse getProfile() {
        return profileService.getProfile();
    }
}
