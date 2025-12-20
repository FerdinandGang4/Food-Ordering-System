package com.john.emailservice.controller;

import com.john.emailservice.dto.EmailRequestDTO;
import com.john.emailservice.service.EmailService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/emails")
@Tag(name = "Emails", description = "API for Email Service")
@CrossOrigin
public class EmailController {

    private final EmailService emailService;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

        @PostMapping
        @Operation(summary = "Send email", description = "Sends an email via SES/MailSender")
        @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Email sent",
                content = @Content(mediaType = "text/plain", schema = @Schema(implementation = String.class))),
            @ApiResponse(responseCode = "400", description = "Validation error", content = @Content)
        })
        public ResponseEntity<String> sendEmail(@Validated @RequestBody EmailRequestDTO request) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(request.getFromEmail());
        message.setTo(request.getToEmail());
        message.setSubject(request.getSubject());
        message.setText(request.getBody());

        emailService.sendMessage(message);
        return new ResponseEntity<>("Email Queued", HttpStatus.OK);
    }
}
