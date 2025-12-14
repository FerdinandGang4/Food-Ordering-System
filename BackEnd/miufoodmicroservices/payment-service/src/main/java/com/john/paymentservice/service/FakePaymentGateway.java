package com.john.paymentservice.service;

import com.john.paymentservice.model.Payment;
import com.john.paymentservice.model.PaymentStatus;
import org.springframework.stereotype.Component;

import java.security.SecureRandom;

@Component
public class FakePaymentGateway implements PaymentGateway {
    private final SecureRandom random = new SecureRandom();

    @Override
    public PaymentStatus authorize(Payment payment) {
        // Simulate external processing latency or decision logic
        // boolean approved = random.nextInt(100) < 99; // 99% success rate
        // return approved ? PaymentStatus.SUCCESS : PaymentStatus.FAILED;
        return PaymentStatus.SUCCESS; // For simplicity, always approve the payment
    }
}
