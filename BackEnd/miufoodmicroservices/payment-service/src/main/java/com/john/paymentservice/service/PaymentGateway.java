package com.john.paymentservice.service;

import com.john.paymentservice.model.Payment;
import com.john.paymentservice.model.PaymentStatus;

public interface PaymentGateway {
    PaymentStatus authorize(Payment payment);
}
