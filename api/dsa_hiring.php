<?php
/**
 * Zippy DSA Loans - DSA Hiring & Job Applications API Endpoint
 * Database: u914601002_zippy_loans (Primary) + u914601002_Zippyloansdata (Mirror)
 * 
 * Supports:
 * 1. POST: Register new DSA Job Application
 * 2. GET ?action=list&key=Zippy@2026: Fetch all DSA job applications & metrics for Admin Dashboard
 * 3. POST ?action=update_status: Update application status (NEW, REVIEWING, SHORTLISTED, INTERVIEW_SCHEDULED, HIRED, REJECTED)
 * 4. POST ?action=delete: Remove an application record
 */

declare(strict_types=1);

// 1. HTTP Security Headers
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');
header('X-XSS-Protection: 1; mode=block');
header('Referrer-Policy: strict-origin-when-cross-origin');

// 2. CORS Handling
$allowedOrigins = [
    'https://mintcream-coyote-409919.hostingersite.com',
    'https://zippydsaloans.in',
    'https://www.zippydsaloans.in',
    'https://zippyicicloanconnector.in',
    'https://www.zippyicicloanconnector.in',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:5000',
    'http://127.0.0.1:5000',
    'http://localhost:3000'
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowedOrigins, true)) {
    header("Access-Control-Allow-Origin: {$origin}");
    header('Access-Control-Allow-Credentials: true');
} else {
    header('Access-Control-Allow-Origin: *');
}
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, Accept, X-Requested-With');

// Preflight CORS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    echo json_encode(['status' => 'ok']);
    exit;
}

// 3. Database Configurations (Primary and Mirror)
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

function getPdoConnection(array $cfg): ?PDO {
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
        } catch (Throwable $e) {
            // try next host
        }
    }
    return null;
}

function getPrimaryConnection(array $configs): PDO {
    foreach ($configs as $cfg) {
        $pdo = getPdoConnection($cfg);
        if ($pdo) return $pdo;
    }
    throw new RuntimeException('Database service temporarily unavailable.');
}

// Auto-create table if not exists
function ensureTableExists(PDO $pdo): void {
    $schema = "CREATE TABLE IF NOT EXISTS dsa_job_applications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        application_id VARCHAR(50) NOT NULL UNIQUE,
        full_name VARCHAR(150) NOT NULL,
        mobile_number VARCHAR(20) NOT NULL,
        email VARCHAR(150) NULL,
        qualification VARCHAR(100) NOT NULL,
        experience VARCHAR(100) NOT NULL,
        location VARCHAR(150) NOT NULL,
        notes TEXT NULL,
        role VARCHAR(100) DEFAULT 'Zippy DSA Loans Executive',
        status VARCHAR(50) DEFAULT 'NEW',
        source_context VARCHAR(100) DEFAULT 'Website Job Vacancy Widget',
        ip_address VARCHAR(45) NULL,
        user_agent VARCHAR(255) NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_app_id (application_id),
        INDEX idx_mobile (mobile_number),
        INDEX idx_status (status)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";
    $pdo->exec($schema);

    // Auto-migration: ensure 'role' column exists in case table was created with earlier schema
    try {
        $checkRole = $pdo->query("SHOW COLUMNS FROM dsa_job_applications LIKE 'role'");
        if ($checkRole && $checkRole->rowCount() === 0) {
            $pdo->exec("ALTER TABLE dsa_job_applications ADD COLUMN role VARCHAR(100) DEFAULT 'Zippy DSA Loans Executive' AFTER notes");
        }
    } catch (Throwable $e) {}
}

// Rigorous Input Sanitization
function cleanInput(?string $str, int $maxLength = 255): string {
    if ($str === null) return '';
    $clean = strip_tags(trim($str));
    $clean = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/', '', $clean);
    return mb_substr($clean, 0, $maxLength, 'UTF-8');
}

// 4. GET Requests
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $action = $_GET['action'] ?? 'list';
    $authKey = $_GET['key'] ?? '';

    if ($authKey !== 'Zippy@2026' && $authKey !== 'M.Linga@123' && $authKey !== 'zippy123') {
        http_response_code(401);
        echo json_encode(['success' => false, 'error' => 'UNAUTHORIZED']);
        exit;
    }

    try {
        $pdo = getPrimaryConnection($dbConfigs);
        ensureTableExists($pdo);

        $limit = min((int)($_GET['limit'] ?? 100), 200);
        $stmt = $pdo->query("SELECT * FROM dsa_job_applications ORDER BY id DESC LIMIT {$limit}");
        $applications = $stmt->fetchAll();

        // Calculate hiring metrics
        $totalStmt = $pdo->query('SELECT COUNT(*) FROM dsa_job_applications');
        $totalCount = (int)$totalStmt->fetchColumn();

        $newStmt = $pdo->query("SELECT COUNT(*) FROM dsa_job_applications WHERE status = 'NEW'");
        $newCount = (int)$newStmt->fetchColumn();

        $shortlistedStmt = $pdo->query("SELECT COUNT(*) FROM dsa_job_applications WHERE status IN ('SHORTLISTED', 'INTERVIEW_SCHEDULED')");
        $shortlistedCount = (int)$shortlistedStmt->fetchColumn();

        $todayStmt = $pdo->query('SELECT COUNT(*) FROM dsa_job_applications WHERE DATE(created_at) = CURDATE()');
        $todayCount = (int)$todayStmt->fetchColumn();

        $expStmt = $pdo->query("SELECT COUNT(*) FROM dsa_job_applications WHERE experience NOT LIKE '%Fresher%'");
        $expCount = (int)$expStmt->fetchColumn();

        echo json_encode([
            'success' => true,
            'metrics' => [
                'total' => $totalCount,
                'newApplicants' => $newCount,
                'shortlisted' => $shortlistedCount,
                'today' => $todayCount,
                'experienced' => $expCount
            ],
            'applications' => $applications
        ]);
    } catch (Throwable $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'DATABASE_ERROR', 'message' => $e->getMessage()]);
    }
    exit;
}

// 5. POST Requests
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $rawInput = file_get_contents('php://input');
    $data = [];
    if (!empty($rawInput)) {
        $data = json_decode($rawInput, true) ?: [];
    }
    if (empty($data)) {
        $data = $_POST;
    }

    $action = $_GET['action'] ?? ($data['action'] ?? 'create');

    // A. Update Status Action
    if ($action === 'update_status') {
        $authKey = $data['key'] ?? ($_GET['key'] ?? '');
        if ($authKey !== 'Zippy@2026' && $authKey !== 'M.Linga@123' && $authKey !== 'zippy123') {
            http_response_code(401);
            echo json_encode(['success' => false, 'error' => 'UNAUTHORIZED']);
            exit;
        }

        $appId = cleanInput($data['applicationId'] ?? '', 50);
        $newStatus = cleanInput($data['status'] ?? 'NEW', 50);

        if (empty($appId)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Missing applicationId']);
            exit;
        }

        $updated = 0;
        foreach ($dbConfigs as $cfg) {
            try {
                $conn = getPdoConnection($cfg);
                if ($conn) {
                    ensureTableExists($conn);
                    $stmt = $conn->prepare('UPDATE dsa_job_applications SET status = :status, updated_at = NOW() WHERE application_id = :id');
                    $stmt->execute([':status' => $newStatus, ':id' => $appId]);
                    $updated++;
                }
            } catch (Throwable $e) {}
        }

        echo json_encode([
            'success' => true,
            'applicationId' => $appId,
            'status' => $newStatus,
            'updated' => $updated
        ]);
        exit;
    }

    // B. Delete Action
    if ($action === 'delete') {
        $authKey = $data['key'] ?? ($_GET['key'] ?? '');
        if ($authKey !== 'Zippy@2026' && $authKey !== 'M.Linga@123' && $authKey !== 'zippy123') {
            http_response_code(401);
            echo json_encode(['success' => false, 'error' => 'UNAUTHORIZED']);
            exit;
        }

        $appId = cleanInput($data['applicationId'] ?? '', 50);
        if (empty($appId)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Missing applicationId']);
            exit;
        }

        foreach ($dbConfigs as $cfg) {
            try {
                $conn = getPdoConnection($cfg);
                if ($conn) {
                    $stmt = $conn->prepare('DELETE FROM dsa_job_applications WHERE application_id = :id');
                    $stmt->execute([':id' => $appId]);
                }
            } catch (Throwable $e) {}
        }

        echo json_encode(['success' => true, 'applicationId' => $appId]);
        exit;
    }

    // C. Default: Create New Job Application
    $fullName = cleanInput($data['fullName'] ?? ($data['name'] ?? ''), 150);
    $mobile = preg_replace('/\D/', '', (string)($data['mobileNumber'] ?? ($data['mobile'] ?? '')));
    $email = cleanInput($data['email'] ?? '', 150);
    $qualification = cleanInput($data['qualification'] ?? 'Graduate (Any Stream)', 100);
    $experience = cleanInput($data['experience'] ?? 'Fresher (Ready to Learn)', 100);
    $location = cleanInput($data['location'] ?? 'Hyderabad (Near Nacharam)', 150);
    $notes = cleanInput($data['notes'] ?? '', 1000);
    $role = cleanInput($data['role'] ?? 'Zippy DSA Loans Executive', 100);
    $sourceContext = cleanInput($data['sourceContext'] ?? 'Website Job Vacancy Widget', 100);

    if (mb_strlen($fullName) < 3) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Full name must be at least 3 characters.']);
        exit;
    }

    if (!preg_match('/^[6-9]\d{9}$/', $mobile)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'A valid 10-digit Indian mobile number is required.']);
        exit;
    }

    // Application Reference ID
    $clientRef = cleanInput((string)($data['applicationId'] ?? ($data['appId'] ?? '')), 50);
    if (!empty($clientRef) && preg_match('/^ZIP-JOB-\d{8}-\d{4}$/', $clientRef)) {
        $appId = $clientRef;
    } else {
        $appId = 'ZIP-JOB-' . date('Ymd') . '-' . random_int(1000, 9999);
    }

    $ip = cleanInput(substr($_SERVER['REMOTE_ADDR'] ?? '127.0.0.1', 0, 45), 45);
    $ua = cleanInput($_SERVER['HTTP_USER_AGENT'] ?? 'Job Applicant Form', 255);

    $sql = 'INSERT INTO dsa_job_applications (
        application_id, full_name, mobile_number, email, qualification,
        experience, location, notes, role, status, source_context,
        ip_address, user_agent, created_at, updated_at
    ) VALUES (
        :appId, :name, :mobile, :email, :qual,
        :exp, :loc, :notes, :role, "NEW", :source,
        :ip, :ua, NOW(), NOW()
    )';

    $params = [
        ':appId'  => $appId,
        ':name'   => $fullName,
        ':mobile' => $mobile,
        ':email'  => !empty($email) ? $email : null,
        ':qual'   => $qualification,
        ':exp'    => $experience,
        ':loc'    => $location,
        ':notes'  => !empty($notes) ? $notes : null,
        ':role'   => $role,
        ':source' => $sourceContext,
        ':ip'     => $ip,
        ':ua'     => $ua
    ];

    $saved = 0;
    foreach ($dbConfigs as $cfg) {
        try {
            $pdo = getPdoConnection($cfg);
            if ($pdo) {
                ensureTableExists($pdo);
                $stmt = $pdo->prepare($sql);
                $stmt->execute($params);
                $saved++;
            }
        } catch (Throwable $e) {
            error_log("DSA Application insert failed on {$cfg['name']}: " . $e->getMessage());
        }
    }

    echo json_encode([
        'success' => true,
        'applicationId' => $appId,
        'message' => 'Job application recorded successfully.',
        'savedToDatabase' => $saved > 0,
        'applicant' => [
            'applicationId' => $appId,
            'fullName' => $fullName,
            'mobileNumber' => $mobile,
            'email' => $email,
            'qualification' => $qualification,
            'experience' => $experience,
            'location' => $location,
            'role' => $role,
            'status' => 'NEW',
            'created_at' => date('c')
        ]
    ]);
    exit;
}
