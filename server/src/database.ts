import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface LoanEnquiryRecord {
  id?: number;
  reference_id: string;
  full_name: string;
  mobile_number: string;
  email?: string | null;
  city: string;
  loan_category: string;
  required_amount: number;
  employment_type: string;
  monthly_income?: number | null;
  additional_info?: string | null;
  source_context?: string;
  status: string;
  consent_given: number;
  consent_timestamp: string;
  ip_address?: string | null;
  user_agent?: string | null;
  created_at?: string;
  updated_at?: string;
}

let dbInstance: DatabaseSync | null = null;

export function getDatabase(): DatabaseSync {
  if (dbInstance) return dbInstance;

  const dbPath = process.env.DATABASE_PATH || path.join(__dirname, '../data/zippy_loans.db');
  const dbDir = path.dirname(dbPath);

  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  dbInstance = new DatabaseSync(dbPath);

  // Enable WAL mode for high concurrency
  dbInstance.exec('PRAGMA journal_mode = WAL;');
  dbInstance.exec('PRAGMA foreign_keys = ON;');

  // Run schema initialization
  initSchema(dbInstance);

  return dbInstance;
}

function initSchema(db: DatabaseSync) {
  const migrationPath = path.join(__dirname, '../migrations/001_create_loan_enquiries.sql');
  if (fs.existsSync(migrationPath)) {
    const migrationSql = fs.readFileSync(migrationPath, 'utf-8');
    db.exec(migrationSql);
  } else {
    // Fallback inline DDL
    db.exec(`
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
      CREATE INDEX IF NOT EXISTS idx_enquiries_ref ON loan_enquiries(reference_id);
      CREATE INDEX IF NOT EXISTS idx_enquiries_mobile ON loan_enquiries(mobile_number);
    `);
  }
}

/**
 * Save new loan enquiry using parameterized query (100% SQL injection immune)
 */
export function insertLoanEnquiry(record: LoanEnquiryRecord): LoanEnquiryRecord {
  const db = getDatabase();

  const stmt = db.prepare(`
    INSERT INTO loan_enquiries (
      reference_id,
      full_name,
      mobile_number,
      email,
      city,
      loan_category,
      required_amount,
      employment_type,
      monthly_income,
      additional_info,
      source_context,
      status,
      consent_given,
      consent_timestamp,
      ip_address,
      user_agent,
      created_at,
      updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
  `);

  stmt.run(
    record.reference_id,
    record.full_name,
    record.mobile_number,
    record.email ?? null,
    record.city,
    record.loan_category,
    record.required_amount,
    record.employment_type,
    record.monthly_income ?? null,
    record.additional_info ?? null,
    record.source_context || 'Website Loan Enquiry Form',
    record.status || 'NEW',
    record.consent_given ? 1 : 0,
    record.consent_timestamp,
    record.ip_address ?? null,
    record.user_agent ?? null
  );

  return record;
}

/**
 * Retrieve enquiry by reference ID
 */
export function getEnquiryByReference(refId: string): LoanEnquiryRecord | null {
  const db = getDatabase();
  const stmt = db.prepare('SELECT * FROM loan_enquiries WHERE reference_id = ? LIMIT 1');
  const result = stmt.get(refId);
  return (result as unknown as LoanEnquiryRecord) || null;
}

/**
 * Database health inspection
 */
export function getDatabaseHealth(): { connected: boolean; totalEnquiries: number } {
  try {
    const db = getDatabase();
    const stmt = db.prepare('SELECT COUNT(*) as count FROM loan_enquiries');
    const result = stmt.get() as { count: number } | undefined;
    return {
      connected: true,
      totalEnquiries: result ? Number(result.count) : 0
    };
  } catch (err) {
    return {
      connected: false,
      totalEnquiries: 0
    };
  }
}
