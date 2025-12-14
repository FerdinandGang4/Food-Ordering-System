package com.john.emailservice.config;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.simpleemail.AmazonSimpleEmailService;
import com.amazonaws.services.simpleemail.AmazonSimpleEmailServiceClientBuilder;
import com.amazonaws.services.simpleemail.model.Body;
import com.amazonaws.services.simpleemail.model.Content;
import com.amazonaws.services.simpleemail.model.Destination;
import com.amazonaws.services.simpleemail.model.Message;
import com.amazonaws.services.simpleemail.model.SendEmailRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.MailException;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;

import java.util.Arrays;

@Configuration
public class SesConfig {
    @Value("${cloud.aws.credentials.access-key}")
    private String accessKey;
    @Value("${cloud.aws.credentials.secret-key}")
    private String secretKey;
    @Value("${cloud.aws.region.static}")
    private String region;

    @Bean
    public MailSender mailSender(AmazonSimpleEmailService ses) {
        return new MailSender() {
            @Override
            public void send(SimpleMailMessage simpleMessage) throws MailException {
                SendEmailRequest request = new SendEmailRequest()
                        .withSource(simpleMessage.getFrom())
                        .withDestination(new Destination().withToAddresses(Arrays.asList(simpleMessage.getTo())))
                        .withMessage(new Message()
                                .withSubject(new Content(simpleMessage.getSubject()))
                                .withBody(new Body().withText(new Content(simpleMessage.getText()))));
                ses.sendEmail(request);
            }

            @Override
            public void send(SimpleMailMessage[] simpleMessages) throws MailException {
                if (simpleMessages == null) return;
                for (SimpleMailMessage msg : simpleMessages) {
                    send(msg);
                }
            }
        };
    }

    @Bean
    public AmazonSimpleEmailService amazonSimpleEmailService() {
        BasicAWSCredentials credentials = new BasicAWSCredentials(accessKey, secretKey);
        return AmazonSimpleEmailServiceClientBuilder
                .standard()
                .withRegion(region)
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .build();
    }
}
