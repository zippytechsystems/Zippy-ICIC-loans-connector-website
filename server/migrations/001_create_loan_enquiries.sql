-- ============================================================
-- Migration: 001_create_loan_enquiries.sql
-- Description: Creates the core loan_enquiries table and indexes
-- Compatible with: SQLite 3.35+, PostgreSQL 12+, MySQL 8.0+
-- ============================================================

CREATE TABLE IF NOT EXISTS loan_enquiries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  reference_id VARCHAR(50) NOT NULL UNIQUE,
  full_name VARCHAR(150) NOT NULL,
  mobile_number VARCHAR(15) NOT NULL,
  email VARCHAR(150) NULL,
  city VARCHAR(100) NOT NULL,
  loan_category VARCHAR(100) NOT NULL,
  required_amount NUMERIC NOT NULL,
  employment_type VARCHAR(100) NOT NULL,
  monthly_income NUMERIC NULL,
  additional_info TEXT NULL,
  source_context VARCHAR(100) DEFAULT 'Website Loan Enquiry Form',
  status VARCHAR(30) DEFAULT 'NEW',
  consent_given BOOLEAN NOT NULL DEFAULT 1,
  consent_timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ip_address VARCHAR(45) NULL,
  user_agent TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Optimization & Lookup Indexes
CREATE INDEX IF NOT EXISTS idx_enquiries_ref ON loan_enquiries(reference_id);
CREATE INDEX IF NOT EXISTS idx_enquiries_mobile ON loan_enquiries(mobile_number);
CREATE INDEX IF NOT EXISTS idx_enquiries_category ON loan_enquiries(loan_category);
CREATE INDEX IF NOT EXISTS idx_enquiries_city ON loan_enquiries(city);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON loan_enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_created ON loan_enquiries(created_at);
