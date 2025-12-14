package com.john.emailservice.dto;


import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class EmailRequestDTO {
    @NotBlank
    @Email
    private String fromEmail;

    @NotBlank
    @Email
    private String toEmail;

    @NotBlank
    private String subject;

    @NotBlank
    private String body;

}
