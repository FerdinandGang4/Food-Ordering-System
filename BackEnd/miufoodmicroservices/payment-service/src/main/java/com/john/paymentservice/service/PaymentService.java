package com.john.paymentservice.service;

import com.john.paymentservice.dto.PaymentRequestDTO;
import com.john.paymentservice.exception.PaymentAlreadyExistsException;
import com.john.paymentservice.exception.PaymentNotFoundException;
import com.john.paymentservice.mapper.PaymentMapper;
import com.john.paymentservice.model.Payment;
import com.john.paymentservice.model.PaymentMethod;
import com.john.paymentservice.model.PaymentStatus;
import com.john.paymentservice.dto.PaymentResponseDTO;
import com.john.paymentservice.repository.PaymentRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDate;
import java.util.List;


@Service
public class PaymentService {

    private static final Logger log = LoggerFactory.getLogger(
            PaymentService.class);
    private final PaymentRepository repository;
    private final PaymentGateway paymentGateway;
    private final TransactionReferenceGenerator transactionReferenceGenerator;

    @Value("${email.api.url}")
    private String emailApiUrl;

    public PaymentService(PaymentRepository repository, PaymentGateway paymentGateway,
                          TransactionReferenceGenerator transactionReferenceGenerator) {
        this.repository = repository;
        this.paymentGateway = paymentGateway;
        this.transactionReferenceGenerator = transactionReferenceGenerator;
    }

    public PaymentResponseDTO processPayment(PaymentRequestDTO paymentRequestDTO) {
        Payment payment = PaymentMapper.toModel(paymentRequestDTO);
        payment.setTransactionReference(transactionReferenceGenerator.next());
        payment.setStatus(PaymentStatus.PENDING);
        payment.setCreatedAt(LocalDate.now());
        payment.setUpdatedAt(LocalDate.now());

        log.info("PaymentService request: {}", payment);

        PaymentStatus result = paymentGateway.authorize(payment);
        payment.setStatus(result);
        payment.setUpdatedAt(LocalDate.now());

        Payment saved;
        try {
            saved = repository.save(payment);
        } catch (DataIntegrityViolationException e) {
            System.out.println(e.getMessage());
            throw new PaymentAlreadyExistsException("A payment with the same orderId already exists." );
        }
        log.info("PaymentService saved: {}", saved);

        // If payment is successful, send email notification
        if (saved.getStatus() == PaymentStatus.SUCCESS) {
            try {
                sendSuccessEmail(paymentRequestDTO, saved);
            } catch (Exception ex) {
                log.warn("Failed to send success email for orderId {}: {}", saved.getOrderId(), ex.getMessage());
            }
        }
        return PaymentMapper.toDto(saved);
    }

    public PaymentResponseDTO getPaymentHistoryByOrderId(Long orderId) {
        Payment payment = repository.findByOrderId(orderId).orElseThrow(
                () -> new PaymentNotFoundException("Payment not found with orderId: " + orderId));
        log.info("PaymentService find by orderId: {}", payment);
        return PaymentMapper.toDto(payment);
    }

    public List<PaymentResponseDTO> findAll() {
        return PaymentMapper.toDtoList(repository.findAll());
    }

    public List<PaymentResponseDTO> findAllByStatus(PaymentStatus status) {
        return PaymentMapper.toDtoList(repository.findAllByStatus(status));
    }

    public List<PaymentResponseDTO> findAllByCustomerId(Long customerId) {
        return PaymentMapper.toDtoList(repository.findAllByCustomerId(customerId));
    }

    public List<PaymentResponseDTO> findAllByCustomerIdAndStatus(Long customerId, PaymentStatus status) {
        return PaymentMapper.toDtoList(repository.findAllByCustomerIdAndStatus(customerId, status));
    }

    public List<PaymentResponseDTO> findAllByPaymentMethod(PaymentMethod paymentMethod) {
        return PaymentMapper.toDtoList(repository.findAllByPaymentMethod(paymentMethod));
    }
    
    private void sendSuccessEmail(PaymentRequestDTO dto, Payment payment) {
        RestTemplate restTemplate = new RestTemplate();
        String url = emailApiUrl;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String subject = "Payment Successful: Order " + payment.getOrderId();
        String body = "Hello,\n\n" +
                "Your payment was successful.\n" +
                "Order ID: " + payment.getOrderId() + "\n" +
                "Amount: " + dto.getAmount() + " " + dto.getCurrency() + "\n" +
                "Transaction Reference: " + payment.getTransactionReference() + "\n\n" +
                "Thank you for your purchase.";

        String payload = "{" +
                "\"fromEmail\":\"support@roofapp.com.ng\"," +
                "\"toEmail\":\"" + dto.getCustomerEmail() + "\"," +
                "\"subject\":\"" + subject.replace("\"", "\\\"") + "\"," +
                "\"body\":\"" + body.replace("\"", "\\\"").replace("\n", "\\n") + "\"" +
                "}";

        HttpEntity<String> request = new HttpEntity<>(payload, headers);
        restTemplate.postForEntity(url, request, String.class);
    }
}