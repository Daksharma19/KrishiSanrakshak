<?php
header('Content-Type: application/json');

// Path to the JSON file
$filePath = 'allDesc/crops.json';

if (file_exists($filePath)) {
    $jsonContent = file_get_contents($filePath);
    echo $jsonContent;
} else {
    echo json_encode(['error' => 'File not found']);
}
?>
