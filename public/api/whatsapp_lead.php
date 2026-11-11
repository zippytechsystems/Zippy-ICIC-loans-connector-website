<?php
/**
 * Zippy ICICI Loan Connector - Dedicated WhatsApp Lead Registration Endpoint
 * Database: u914601002_zippy_loans (Primary) + u914601002_Zippyloansdata (Mirror)
 * 
 * Supports:
 * 1. AJAX/Fetch POST or GET -> Returns JSON with referenceId & WhatsApp URL
 * 2. Direct browser link GET with ?redirect=1 -> Saves to DB & redirects to WhatsApp
 */

declare(strict_types=1);

// CORS and Headers
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, Accept, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    echo json_encode(['status' => 'ok']);
    exit;
}

// Database list
$dbConfigs = [
    [
        'name' => 'u914601002_zippy_loans',
        'user' => 'u914601002_loan_user',
        'pass' => 'M.Linga@123',
        'host' => '127.0.0.1',
        'port' => '3306'
    ],
    [
        'name' => 'u914601002_Zippyloansdata',
        'user' => 'u914601002_zippyicicloan',
        'pass' => 'M.Linga@123',
        'host' => '127.0.0.1',
        'port' => '3306'
    ]
];

function getDb(array $cfg): ?PDO {
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
        PDO::ATTR_TIMEOUT            => 4,
    ];
    $hosts = [$cfg['host'], 'localhost', 'srv1555.hstgr.io'];
    foreach ($hosts as $h) {
        try {
            $dsn = "mysql:host={$h};port={$cfg['port']};dbname={$cfg['name']};charset=utf8mb4";
            return new PDO($dsn, $cfg['user'], $cfg['pass'], $options);
        } catch (Throwable $e) {}
    }
    return null;
}

// Auto-create table and indexes if not exists
function ensureLoanEnquiriesTableExists(PDO $pdo): void {
    $schema = "CREATE TABLE IF NOT EXISTS loan_enquiries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        reference_id VARCHAR(50) NOT NULL UNIQUE,
        full_name VARCHAR(150) NOT NULL,
        mobile_number VARCHAR(20) NOT NULL,
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
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
    $pdo->exec($schema);
}

// Read payload from JSON or GET/POST parameters
$rawInput = file_get_contents('php://input');
$data = [];
if (!empty($rawInput)) {
    $data = json_decode($rawInput, true) ?: [];
}
if (empty($data)) {
    $data = array_merge($_GET, $_POST);
}

// Sanitize inputs
function cleanStr(?string $s, int $max = 255): string {
    if ($s === null) return '';
    $c = strip_tags(trim($s));
    $c = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/', '', $c);
    return mb_substr($c, 0, $max, 'UTF-8');
}

$rawName = cleanStr($data['fullName'] ?? ($data['name'] ?? ''), 150);
$fullName = !empty($rawName) ? $rawName : 'WhatsApp Visitor Lead';

$rawPhone = preg_replace('/\D/', '', (string)($data['mobileNumber'] ?? ($data['mobile'] ?? ($data['phone'] ?? ''))));
$mobileNumber = !empty($rawPhone) ? $rawPhone : '6302690251';

$loanCategory = cleanStr($data['loanCategory'] ?? ($data['loan'] ?? 'Personal Loans'), 100);
$city = cleanStr($data['city'] ?? 'Hyderabad', 100);
$sourceContext = cleanStr($data['sourceContext'] ?? ($data['source'] ?? 'WhatsApp Lead Click'), 100);
$amount = (float)preg_replace('/[^0-9.]/', '', (string)($data['requiredAmount'] ?? ($data['amount'] ?? '0')));
$notes = cleanStr($data['additionalInfo'] ?? ($data['notes'] ?? ''), 500);

// Generate Unique WhatsApp Tracking Reference (ZIP-WA-YYYYMMDD-XXXX)
$clientRef = cleanStr((string)($data['clientReferenceId'] ?? ($data['ref'] ?? '')), 50);
if (!empty($clientRef) && preg_match('/^ZIP-WA-\d{8}-\d{4}$/', $clientRef)) {
    $refId = $clientRef;
} else {
    $refId = 'ZIP-WA-' . date('Ymd') . '-' . random_int(1000, 9999);
}

$ip = cleanStr(substr($_SERVER['REMOTE_ADDR'] ?? '127.0.0.1', 0, 45), 45);
$ua = cleanStr($_SERVER['HTTP_USER_AGENT'] ?? 'WhatsApp Link', 255);

// Parameterized Insert
$sql = 'INSERT INTO loan_enquiries (
    reference_id, full_name, mobile_number, email, city, loan_category,
    required_amount, employment_type, monthly_income, additional_info,
    source_context, status, consent_given, consent_timestamp, ip_address, user_agent,
    created_at, updated_at
) VALUES (
    :ref, :name, :mobile, NULL, :city, :category,
    :amount, "Self / Salaried", NULL, :notes,
    :source, "NEW", 1, NOW(), :ip, :ua,
    NOW(), NOW()
)';

$params = [
    ':ref'      => $refId,
    ':name'     => $fullName,
    ':mobile'   => $mobileNumber,
    ':city'     => $city,
    ':category' => $loanCategory,
    ':amount'   => $amount,
    ':notes'    => !empty($notes) ? $notes : 'Initiated via WhatsApp Lead Connector',
    ':source'   => $sourceContext,
    ':ip'       => $ip,
    ':ua'       => $ua
];

$saved = 0;
foreach ($dbConfigs as $cfg) {
    try {
        $pdo = getDb($cfg);
        if ($pdo) {
            ensureLoanEnquiriesTableExists($pdo);
            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
            $saved++;
        }
    } catch (Throwable $e) {
        error_log("WhatsApp Lead insert failed on {$cfg['name']}: " . $e->getMessage());
    }
}

// Build WhatsApp Message & URL
$msg = "*New Loan Enquiry - Zippy Loan Connector*\n";
$msg .= "Ref ID: *{$refId}*\n\n";
$msg .= "*Customer Enquiry:*\n";
$msg .= "• Name: {$fullName}\n";
if ($mobileNumber !== '6302690251') {
    $msg .= "• Mobile: +91 {$mobileNumber}\n";
}
$msg .= "• City: {$city}\n";
$msg .= "• Loan: *{$loanCategory}*\n";
if ($amount > 0) {
    $msg .= "• Requested Amount: ₹" . number_format($amount, 0) . "\n";
}
if (!empty($notes)) {
    $msg .= "• Notes: {$notes}\n";
}
$msg .= "\nHello Zippy Loan Connector Advisor, I would like guidance on suitable lender options.";

$whatsappUrl = 'https://wa.me/916302690251?text=' . urlencode($msg);

// If user requested direct redirect (e.g., from an HTML <a> link)
if (!empty($data['redirect']) && $data['redirect'] == '1') {
    header("Location: {$whatsappUrl}", true, 302);
    exit;
}

// Otherwise JSON response
http_response_code(201);
echo json_encode([
    'success' => true,
    'referenceId' => $refId,
    'savedToDatabase' => ($saved > 0),
    'databasesSaved' => $saved,
    'whatsappUrl' => $whatsappUrl,
    'message' => 'WhatsApp enquiry registered in Hostinger database.'
]);
