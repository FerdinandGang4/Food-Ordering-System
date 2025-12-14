-- Schema and seed data for Payment model

DROP TABLE IF EXISTS payment;

CREATE TABLE payment (
	id VARCHAR(36) PRIMARY KEY,
	transaction_reference VARCHAR(64) NOT NULL UNIQUE,
	order_id BIGINT NOT NULL UNIQUE,
	customer_id BIGINT NOT NULL,
	customer_email VARCHAR(255) NOT NULL,
	amount DECIMAL(19,2) NOT NULL,
	currency VARCHAR(10) NOT NULL,
	payment_method VARCHAR(32) NOT NULL,
	status VARCHAR(32) NOT NULL,
	created_at DATE NOT NULL,
	updated_at DATE NOT NULL
);

-- Dummy data
INSERT INTO payment (id, transaction_reference, order_id, customer_id, customer_email, amount,
	currency, payment_method, status, created_at, updated_at)
VALUES ('123e4567-e89b-12d3-a456-426614174000', 'TXN-REF-001', 1, 1, 'alice@example.com', 49.99,
	'USD', 'CREDIT_CARD', 'SUCCESS', '2025-12-01', '2025-12-01');

INSERT INTO payment (id, transaction_reference, order_id, customer_id, customer_email, amount,
	currency, payment_method, status, created_at, updated_at)
VALUES ('123e4567-e89b-12d3-a456-426614174002', 'TXN-REF-002', 2, 2, 'dave@example.com', 19.50,
	'USD', 'PAYPAL', 'FAILED', '2025-12-03', '2025-12-03');

INSERT INTO payment (id, transaction_reference, order_id, customer_id, customer_email, amount,
	currency, payment_method, status, created_at, updated_at)
VALUES ('123e4567-e89b-12d3-a456-426614174003', 'TXN-REF-003', 3, 3, 'bob@example.com', 120.00,
	'EUR', 'APPLE_PAY', 'PENDING', '2025-12-05', '2025-12-05');

INSERT INTO payment (id, transaction_reference, order_id, customer_id, customer_email, amount,
	currency, payment_method, status, created_at, updated_at)
VALUES ('223e4567-e89b-12d3-a456-426614174006', 'TXN-REF-004', 4, 4, 'carol@example.com', 75.25,
	'GBP', 'BANK_TRANSFER', 'SUCCESS', '2025-12-06', '2025-12-06');
