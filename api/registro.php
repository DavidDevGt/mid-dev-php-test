<?php
declare(strict_types=1);

// CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// CONSTANTS
const ALLOWED_METHOD = 'POST';
const ALLOWED_FORMAT = 'application/json';

// UTILS FUNCTIONS

function loadEnv(string $path): void
{
    if (!file_exists($path)) {
        throw new RuntimeException(".env no encontrado: $path");
    }

    foreach (file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        if ($line[0] === '#')
            continue;

        [$name, $value] = array_map('trim', explode('=', $line, 2));
        putenv("$name=$value");
        $_ENV[$name] = $_SERVER[$name] = $value;
    }
}

function jsonResponse(array $data, int $status = 200): never
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

function sanitize(string $value): string
{
    return htmlspecialchars(trim($value), ENT_QUOTES, 'UTF-8');
}

function validatePassword(string $password): bool
{
    return strlen($password) >= 8
        && preg_match_all('/[A-Z]/', $password) >= 2
        && preg_match('/\d/', $password)
        && preg_match('/[!@#$%^&*(),.?":{}|<>]/', $password);
}

function generateToken(array $payload): string
{
    $secret = getenv('APP_KEY') ?: bin2hex(random_bytes(16));

    $b64 = fn($d) => rtrim(strtr(base64_encode($d), '+/', '-_'), '=');

    $header = $b64(json_encode(['alg' => 'HS256', 'typ' => 'JWT']));
    $body = $b64(json_encode($payload));

    $signature = hash_hmac('sha256', "$header.$body", $secret, true);
    if ($signature === false) {
        throw new RuntimeException('Error generando signature');
    }

    $sig = $b64($signature);

    return "$header.$body.$sig";
}

loadEnv(__DIR__ . '/../.env');

try {
    $pdo = new PDO(
        getenv('DSN'),
        getenv('DB_USER'),
        getenv('DB_PASS'),
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]
    );

    if ($pdo->query('SELECT 1')->fetchColumn() != 1) {
        throw new RuntimeException('Error en la conexión a DB');
    }
} catch (Throwable $e) {
    error_log($e->getMessage());
    jsonResponse(['success' => false, 'message' => 'Database connection error'], 500);
}

// VALIDACION NIVEL API
$method = $_SERVER['REQUEST_METHOD'] ?? '';

if ($method !== ALLOWED_METHOD) {
    jsonResponse([
        'success' => false,
        'message' => "Método no permitido: $method"
    ], 405);
}

if (stripos($_SERVER['CONTENT_TYPE'] ?? '', ALLOWED_FORMAT) === false) {
    jsonResponse(['success' => false, 'message' => 'Content-Type debe ser application/json'], 415);
}

$data = json_decode(file_get_contents('php://input'), true);
if (!is_array($data)) {
    jsonResponse(['success' => false, 'message' => 'JSON inválido'], 400);
}

// SANITIZAR Y VALIDAR INFORMACION

$firstName = sanitize($data['firstName'] ?? '');
$email = filter_var($data['email'] ?? '', FILTER_SANITIZE_EMAIL);
$password = $data['password'] ?? '';
$birthDate = sanitize($data['birthDate'] ?? '');

if (!$firstName || !$email || !$password || !$birthDate) {
    jsonResponse(['success' => false, 'message' => 'Faltan campos requeridos'], 422);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    jsonResponse(['success' => false, 'message' => 'Email inválido'], 422);
}

if (!validatePassword($password)) {
    jsonResponse(['success' => false, 'message' => 'Password no cumple políticas'], 422);
}

$age = (new DateTime($birthDate))->diff(new DateTime('today'))->y;
if ($age < 18) {
    jsonResponse(['success' => false, 'message' => 'Debes ser mayor de 18'], 422);
}

// REGISTRAR INFO EN LA DATABASE

try {
    $check = $pdo->prepare('SELECT id FROM usuarios WHERE correo = :correo');
    $check->execute([':correo' => $email]);

    if ($check->fetch()) {
        jsonResponse(['success' => false, 'message' => 'Email ya registrado'], 409);
    }

    $stmt = $pdo->prepare("
        INSERT INTO usuarios (nombre, correo, password_hash, fecha_nacimiento)
        VALUES (:nombre, :correo, :password_hash, :fecha_nacimiento)
    ");

    $stmt->execute([
        ':nombre' => $firstName,
        ':correo' => $email,
        ':password_hash' => password_hash($password, PASSWORD_DEFAULT),
        ':fecha_nacimiento' => $birthDate
    ]);

    $userId = (int) $pdo->lastInsertId();

    // GENERAR TOKEN

    $token = generateToken([
        'sub' => $userId,
        'email' => $email,
        'iat' => time(),
        'exp' => time() + 3600
    ]);

    jsonResponse([
        'success' => true,
        'message' => 'Usuario registrado correctamente',
        'token' => $token,
        'user' => [
            'id' => $userId,
            'firstName' => $firstName,
            'email' => $email
        ]
    ]);

} catch (Throwable $e) {
    error_log($e->getMessage());
    jsonResponse(['success' => false, 'message' => 'Error al registrar usuario'], 500);
}