<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],  // Adjust as needed
    'allowed_methods' => ['*'],  // Allow all HTTP methods
    'allowed_origins' => ['*'],  // Allow requests from all domains (change for security)
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],  // Allow all headers
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false, // Change to true if using authentication cookies
];
