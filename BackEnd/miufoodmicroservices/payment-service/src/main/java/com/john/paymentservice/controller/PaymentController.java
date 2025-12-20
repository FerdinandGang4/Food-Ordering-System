package com.john.paymentservice.controller;

import com.john.paymentservice.dto.PaymentRequestDTO;
import com.john.paymentservice.dto.PaymentResponseDTO;
import com.john.paymentservice.model.PaymentMethod;
import com.john.paymentservice.model.PaymentStatus;
import com.john.paymentservice.service.PaymentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.groups.Default;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin
@Tag(name= "Payments", description = "API for Payment Service")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

        @PostMapping
        @Operation(summary = "Create payment", description = "Authorizes and persists a payment for an order")
        @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Payment created",
                content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = PaymentResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Validation error or entity already exists",
                content = @Content)
        })
    public ResponseEntity<PaymentResponseDTO> createPayment(@Validated(Default.class) @RequestBody PaymentRequestDTO paymentRequestDTO) {
        PaymentResponseDTO result = paymentService.processPayment(paymentRequestDTO);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

        @GetMapping
        @Operation(summary = "List payments", description = "Returns all payments")
        @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK",
                content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = PaymentResponseDTO.class)))
        })
    public ResponseEntity<List<PaymentResponseDTO>> getAllPayments() {
        return ResponseEntity.ok(paymentService.findAll());
    }

        @GetMapping("/{orderId}")
        @Operation(summary = "Get by order id", description = "Returns a payment by its order id")
        @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK",
                content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = PaymentResponseDTO.class))),
            @ApiResponse(responseCode = "404", description = "Payment not found", content = @Content)
        })
    public ResponseEntity<PaymentResponseDTO> getByOrderId(@PathVariable Long orderId) {
        PaymentResponseDTO dto = paymentService.getPaymentHistoryByOrderId(orderId);
        if (dto == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(dto);
    }

        @GetMapping("/status/{status}")
        @Operation(summary = "List by status", description = "Returns payments filtered by status")
        @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK",
                content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = PaymentResponseDTO.class)))
        })
    public ResponseEntity<List<PaymentResponseDTO>> getByStatus(@PathVariable PaymentStatus status) {
        return ResponseEntity.ok(paymentService.findAllByStatus(status));
    }

        @GetMapping("/customer/{customerId}")
        @Operation(summary = "List by customer", description = "Returns payments for a customer")
        @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK",
                content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = PaymentResponseDTO.class)))
        })
    public ResponseEntity<List<PaymentResponseDTO>> getByCustomer(@PathVariable Long customerId) {
        return ResponseEntity.ok(paymentService.findAllByCustomerId(customerId));
    }

        @GetMapping("/customer/{customerId}/status/{status}")
        @Operation(summary = "List by customer and status", description = "Returns payments filtered by customer and status")
        @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK",
                content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = PaymentResponseDTO.class)))
        })
    public ResponseEntity<List<PaymentResponseDTO>> getByCustomerAndStatus(@PathVariable Long customerId,
                                                                           @PathVariable PaymentStatus status) {
        return ResponseEntity.ok(paymentService.findAllByCustomerIdAndStatus(customerId, status));
    }

        @GetMapping("/method/{method}")
        @Operation(summary = "List by method", description = "Returns payments filtered by payment method")
        @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK",
                content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = PaymentResponseDTO.class)))
        })
    public ResponseEntity<List<PaymentResponseDTO>> getByMethod(@PathVariable("method") PaymentMethod paymentMethod) {
        return ResponseEntity.ok(paymentService.findAllByPaymentMethod(paymentMethod));
    }
}
