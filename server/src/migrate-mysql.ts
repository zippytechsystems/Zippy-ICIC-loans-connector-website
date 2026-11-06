import mysql from 'mysql2/promise';

async function migrateMySQL() {
  console.log('🔄 Connecting to Hostinger MySQL server at srv1555.hstgr.io:3306...');

  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST || 'srv1555.hstgr.io',
    port: parseInt(process.env.MYSQL_PORT || '3306', 10),
    user: process.env.MYSQL_USER || 'u914601002_loan_user',
    password: process.env.MYSQL_PASSWORD || 'M.Linga@123',
    database: process.env.MYSQL_DATABASE || 'u914601002_zippy_loans'
  });

  console.log('✅ Connected to Hostinger MySQL database: u914601002_zippy_loans');

  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS loan_enquiries (
      id INT AUTO_INCREMENT PRIMARY KEY,
      reference_id VARCHAR(50) NOT NULL UNIQUE,
      full_name VARCHAR(150) NOT NULL,
      mobile_number VARCHAR(15) NOT NULL,
      email VARCHAR(150) NULL,
      city VARCHAR(100) NOT NULL,
      loan_category VARCHAR(100) NOT NULL,
      required_amount DECIMAL(15, 2) NOT NULL,
      employment_type VARCHAR(100) NOT NULL,
      monthly_income DECIMAL(15, 2) NULL,
      additional_info TEXT NULL,
      source_context VARCHAR(100) DEFAULT 'Website Loan Enquiry Form',
      status VARCHAR(30) DEFAULT 'NEW',
      consent_given TINYINT(1) NOT NULL DEFAULT 1,
      consent_timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      ip_address VARCHAR(45) NULL,
      user_agent VARCHAR(255) NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_ref (reference_id),
      INDEX idx_mobile (mobile_number),
      INDEX idx_category (loan_category),
      INDEX idx_city (city),
      INDEX idx_status (status),
      INDEX idx_created (created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `;

  await connection.query(createTableSQL);
  console.log('✅ Table `loan_enquiries` created successfully with indexes.');

  // Check table status
  const [rows] = await connection.query('SHOW TABLES LIKE "loan_enquiries";');
  console.log('✅ Verification result:', rows);

  await connection.end();
  console.log('🎉 Hostinger MySQL migration completed successfully!');
}

migrateMySQL().catch((err) => {
  console.error('❌ Migration failed:', err);
  process.exit(1);
});
