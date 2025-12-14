package com.john.paymentservice.repository;

import com.john.paymentservice.model.Payment;
import com.john.paymentservice.model.PaymentMethod;
import com.john.paymentservice.model.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, UUID> {
    Optional<Payment> findByOrderId(Long orderId);
    Optional<Payment> findTopByTransactionReferenceStartingWithOrderByTransactionReferenceDesc(String prefix);
    List<Payment> findAllByStatus(PaymentStatus status);
    List<Payment> findAllByCustomerId(Long customerId);
    List<Payment> findAllByCustomerIdAndStatus(Long customerId, PaymentStatus status);
    List<Payment> findAllByPaymentMethod(PaymentMethod paymentMethod);
}