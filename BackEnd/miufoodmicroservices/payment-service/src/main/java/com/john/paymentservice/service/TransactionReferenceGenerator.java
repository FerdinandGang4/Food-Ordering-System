package com.john.paymentservice.service;

import com.john.paymentservice.model.Payment;
import com.john.paymentservice.repository.PaymentRepository;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class TransactionReferenceGenerator {
    private static final String PREFIX = "TXN-REF-";
    private final PaymentRepository repository;

    public TransactionReferenceGenerator(PaymentRepository repository) {
        this.repository = repository;
    }

    public String next() {
        Optional<Payment> latest = repository
                .findTopByTransactionReferenceStartingWithOrderByTransactionReferenceDesc(PREFIX);
        int nextNumber = latest.map(p -> parseSuffix(p.getTransactionReference()) + 1)
                .orElse(1);
        // Zero-pad to 3 digits until >= 1000
        String suffix = nextNumber < 1000
                ? String.format("%03d", nextNumber)
                : Integer.toString(nextNumber);
        return PREFIX + suffix;
    }

    private int parseSuffix(String ref) {
        if (ref == null) return 0;
        int idx = ref.lastIndexOf('-');
        if (idx < 0 || idx + 1 >= ref.length()) return 0;
        try {
            return Integer.parseInt(ref.substring(idx + 1));
        } catch (NumberFormatException e) {
            return 0;
        }
    }
}
