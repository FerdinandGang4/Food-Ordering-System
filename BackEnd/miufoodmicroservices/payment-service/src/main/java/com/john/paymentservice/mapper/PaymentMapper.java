package com.john.paymentservice.mapper;

import com.john.paymentservice.model.Payment;
import com.john.paymentservice.dto.PaymentResponseDTO;
import com.john.paymentservice.dto.PaymentRequestDTO;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PaymentMapper {

    public static Payment toModel(PaymentRequestDTO request) {
        if (request == null) return null;
        Payment payment = new Payment();
        payment.setOrderId(request.getOrderId());
        payment.setCustomerId(request.getCustomerId());
        payment.setCustomerEmail(request.getCustomerEmail());
        payment.setAmount(request.getAmount());
        payment.setCurrency(request.getCurrency().toUpperCase());
        payment.setPaymentMethod(request.getPaymentMethod());
        payment.setNameOnCard(request.getNameOnCard());
        payment.setCardNumber(request.getCardNumber());
        payment.setExpiry(request.getExpiry());
        payment.setCvc(request.getCvc());
        payment.setBillingAddress(request.getBillingAddress());
        return payment;
    }

    public static PaymentResponseDTO toDto(Payment payment) {
        if (payment == null) return null;
        PaymentResponseDTO dto = new PaymentResponseDTO();
        dto.setTransactionReference(payment.getTransactionReference());
        dto.setOrderId(payment.getOrderId());
        dto.setCustomerId(payment.getCustomerId());
        dto.setCustomerEmail(payment.getCustomerEmail());
        dto.setAmount(payment.getAmount());
        dto.setCurrency(payment.getCurrency());
        dto.setPaymentMethod(payment.getPaymentMethod());
        dto.setStatus(payment.getStatus());
        dto.setCreatedAt(payment.getCreatedAt());
        dto.setUpdatedAt(payment.getUpdatedAt());
        dto.setNameOnCard(payment.getNameOnCard());
        dto.setCardNumber(payment.getCardNumber());
        dto.setExpiry(payment.getExpiry());
        dto.setCvc(payment.getCvc());
        dto.setBillingAddress(payment.getBillingAddress());
        return dto;
    }

    public static  List<PaymentResponseDTO> toDtoList(List<Payment> payments) {

        return payments.stream().map(PaymentMapper::toDto).toList();
    }
}
