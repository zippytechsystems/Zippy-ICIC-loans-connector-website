<?php
/**
 * Zippy ICICI Loan Connector - Hostinger MySQL Backend API Endpoint
 * Handles secure submission and saving of loan enquiries into Hostinger MySQL database.
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, Accept, X-Requested-With');

// Preflight CORS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    echo json_encode(['status' => 'ok']);
    exit;
}

// Database Credentials for Hostinger
$dbHost = '127.0.0.1';
$dbPort = '3306';
$dbName = 'u914601002_zippy_loans';
$dbUser = 'u914601002_loan_user';
$dbPass = 'ZippyLoan#2026!Secure';

function getDbConnection(string $host, string $port, string $name, string $user, string $pass): PDO {
    $dsn = "mysql:host={$host};port={$port};dbname={$name};charset=utf8mb4";
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];
    return new PDO($dsn, $user, $pass, $options);
}

// Health check on GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $pdo = getDbConnection($dbHost, $dbPort, $dbName, $dbUser, $dbPass);
        $stmt = $pdo->query('SELECT COUNT(*) AS total FROM loan_enquiries');
        $row = $stmt->fetch();
        
        echo json_encode([
            'status' => 'healthy',
            'service' => 'Zippy Loan Connector Hostinger MySQL API',
            'database' => [
                'name' => $dbName,
                'status' => 'connected',
                'enquiriesCount' => (int)($row['total'] ?? 0)
            ],
            'whatsappBusiness' => '+916302690251',
            'officialEmail' => 'zippyloanconnector2@gmail.com',
            'timestamp' => date('c')
        ]);
    } catch (Throwable $e) {
        http_response_code(500);
        echo json_encode([
            'status' => 'error',
            'message' => 'Database connection failed: ' . $e->getMessage()
        ]);
    }
    exit;
}

// Only allow POST for submissions
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'METHOD_NOT_ALLOWED']);
    exit;
}

// Read JSON input
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'INVALID_JSON',
        'message' => 'Malformed or missing JSON request body'
    ]);
    exit;
}

// Sanitization & Extraction
$fullName = trim((string)($data['fullName'] ?? ''));
$mobileNumber = preg_replace('/\D/', '', (string)($data['mobileNumber'] ?? ''));
$email = !empty($data['email']) ? strtolower(trim((string)$data['email'])) : null;
$city = trim((string)($data['city'] ?? 'Hyderabad'));
$loanCategory = trim((string)($data['loanCategory'] ?? 'Personal Loans'));
$requiredAmount = (float)preg_replace('/[^0-9.]/', '', (string)($data['requiredAmount'] ?? '0'));
$employmentType = trim((string)($data['employmentType'] ?? 'Salaried'));
$monthlyIncome = !empty($data['monthlyIncome']) ? (float)preg_replace('/[^0-9.]/', '', (string)$data['monthlyIncome']) : null;
$additionalInfo = !empty($data['additionalInfo']) ? trim((string)$data['additionalInfo']) : null;
$sourceContext = !empty($data['sourceContext']) ? trim((string)$data['sourceContext']) : 'Website Loan Enquiry Form';
$consent = !empty($data['consent']);

// Validation
$errors = [];

if (strlen($fullName) < 3) {
    $errors['fullName'] = 'Full legal name must be at least 3 characters.';
}

if (!preg_match('/^[6-9]\d{9}$/', $mobileNumber)) {
    $errors['mobileNumber'] = 'Enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.';
}

if (!empty($email) && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'Enter a valid email address.';
}

if ($requiredAmount < 10000) {
    $errors['requiredAmount'] = 'Minimum required loan amount is ₹10,000.';
}

if (!$consent) {
    $errors['consent'] = 'Explicit consent is mandatory to process your loan enquiry.';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'VALIDATION_FAILED',
        'details' => $errors
    ]);
    exit;
}

// Generate Reference ID: ZIP-YYYYMMDD-XXXX
$referenceId = !empty($data['clientReferenceId']) && preg_match('/^ZIP-\d{8}-\d{4}$/', (string)$data['clientReferenceId'])
    ? (string)$data['clientReferenceId']
    : 'ZIP-' . date('Ymd') . '-' . random_int(1000, 9999);

$ipAddress = $_SERVER['REMOTE_ADDR'] ?? ($_SERVER['HTTP_X_FORWARDED_FOR'] ?? 'unknown');
$userAgent = $_SERVER['HTTP_USER_AGENT'] ?? 'unknown';

try {
    $pdo = getDbConnection($dbHost, $dbPort, $dbName, $dbUser, $dbPass);

    $sql = 'INSERT INTO loan_enquiries (
        reference_id, full_name, mobile_number, email, city, loan_category,
        required_amount, employment_type, monthly_income, additional_info,
        source_context, status, consent_given, consent_timestamp, ip_address, user_agent,
        created_at, updated_at
    ) VALUES (
        :ref, :name, :mobile, :email, :city, :category,
        :amount, :emp, :income, :info,
        :context, "NEW", 1, NOW(), :ip, :ua,
        NOW(), NOW()
    )';

    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':ref'      => $referenceId,
        ':name'     => mb_substr($fullName, 0, 150),
        ':mobile'   => $mobileNumber,
        ':email'    => $email ? mb_substr($email, 0, 150) : null,
        ':city'     => mb_substr($city, 0, 100),
        ':category' => mb_substr($loanCategory, 0, 100),
        ':amount'   => $requiredAmount,
        ':emp'      => mb_substr($employmentType, 0, 100),
        ':income'   => $monthlyIncome,
        ':info'     => $additionalInfo ? mb_substr($additionalInfo, 0, 1000) : null,
        ':context'  => mb_substr($sourceContext, 0, 100),
        ':ip'       => mb_substr($ipAddress, 0, 45),
        ':ua'       => mb_substr($userAgent, 0, 255)
    ]);

    http_response_code(201);
    echo json_encode([
        'success' => true,
        'referenceId' => $referenceId,
        'message' => 'Loan enquiry successfully registered in Hostinger MySQL database.',
        'savedToDatabase' => true,
        'whatsappRecipient' => '+916302690251',
        'createdAt' => date('c')
    ]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'DATABASE_ERROR',
        'referenceId' => $referenceId,
        'message' => 'Enquiry accepted with reference ID. Please complete via WhatsApp.',
        'savedToDatabase' => false
    ]);
}
