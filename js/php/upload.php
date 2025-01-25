<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['file']) && isset($_POST['uniqueId'])) {
        $file = $_FILES['file'];
        $uniqueId = $_POST['uniqueId'];

        // Define the directory to store the uploaded files
        $uploadDir = 'uploads/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        // Generate a unique file name
        $fileName = $uniqueId . '_' . basename($file['name']);
        $uploadFile = $uploadDir . $fileName;

        // Move the uploaded file to the target directory
        if (move_uploaded_file($file['tmp_name'], $uploadFile)) {
            // Return the file path to the client
            echo json_encode(['filePath' => $uploadFile]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to move uploaded file.']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid request.']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed.']);
}
?>