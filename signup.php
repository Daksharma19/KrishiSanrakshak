<?php
// signup.php

// Enable error reporting for debugging
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Sanitize input data
    $fullname = htmlspecialchars($_POST['fullname']);
    $phone = htmlspecialchars($_POST['phone']);
    $password = htmlspecialchars($_POST['password']);

    // Database connection
    $conn = new mysqli('localhost', 'root', 'daksh', 'farm_optimizer');

    // Check the connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Check if the phone number already exists in the database
    $stmt = $conn->prepare("SELECT * FROM users WHERE phone = ?");
    $stmt->bind_param("s", $phone);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Phone number already exists
        echo "Error: Phone number already exists!";
    } else {
        // Prepare and bind SQL query to prevent SQL injection
        $stmt = $conn->prepare("INSERT INTO users (fullname, phone, password) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $fullname, $phone, $password);

        // Execute the query and check for success
        if ($stmt->execute()) {
            // Redirect to login page after successful sign up
            header("Location: signin.php");
            exit();
        } else {
            echo "Error: " . $stmt->error;
        }
    }

    // Close connections
    $stmt->close();
    $conn->close();
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Sign Up - Farm Optimizer</title>
    <!-- <link rel="stylesheet" href="/project_root/assets/css/styles.css"> Add your CSS here -->
    <style>
        /* General Styles */
        body {
            font-family: 'Roboto', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f9;
        }

        header {
            background-color: #004d00;
            padding: 10px;
        }

        header nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        header .logo h1 {
            color: white;
            margin: 0;
            font-family: 'Lobster', cursive;
        }

        header nav ul {
            list-style-type: none;
            margin: 0;
            padding: 0;
            display: flex;
        }

        header nav ul li {
            margin-right: 20px;
        }

        header nav ul li a {
            color: white;
            text-decoration: none;
            padding: 10px;
            font-size: 1.1em;
        }

        header nav ul li a:hover {
            background-color: #005c00;
            border-radius: 5px;
        }

        .language-switcher select {
            padding: 5px;
            font-family: 'Roboto', sans-serif;
        }

        .marquee-container {
            width: 100%;
            height: 30px;
            background-color: #f8f9fa;
            overflow: hidden;
            display: flex;
            align-items: center;
            border-bottom: 1px solid #ddd;
        }

        .marquee-content a {
            text-decoration: none;
            color: #007bff;
            margin: 0 15px;
            font-size: 16px;
        }

        .marquee-content a:hover {
            text-decoration: underline;
        }

        /* Hero Section */
        .hero {
            position: relative;
            background-image: url('/project_root/assets/images/farmer.jpg');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            height: 50vh;
            /* Reduced to half */
            overflow: hidden;
        }

        .hero::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            /* Dark overlay */
            z-index: 1;
        }

        .hero-content {
            position: relative;
            z-index: 2;
            text-align: center;
            color: white;
            padding: 20px;
        }

        .hero h1 {
            font-size: 3.5rem;
            font-family: 'Lobster', cursive;
        }

        .hero h2 {
            font-size: 2rem;
        }

        .hero p {
            margin-bottom: 20px;
            font-size: 1.2rem;
        }

        .cta-button {
            margin-top: 20px;
            padding: 15px 30px;
            background-color: #006600;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            font-size: 1.2em;
        }

        .cta-button:hover {
            background-color: #004d00;
        }

        /* About Section */
        .about {
            padding: 40px 20px;
            background-color: #fff;
            text-align: center;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .about h3 {
            font-size: 2.5em;
            color: #006600;
            margin-bottom: 20px;
            font-weight: bold;
        }

        .about p {
            font-size: 1.2em;
            color: #333;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
        }



        /* Features Section */
        .features {
            padding: 40px 20px;
            background-color: #e6f7e6;
        }

        .features h2 {
            font-size: 2em;
            text-align: center;
        }

        .feature-list {
            display: flex;
            justify-content: space-around;
            margin-top: 20px;
        }

        .feature-item {
            text-align: center;
            width: 30%;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .feature-item h3 {
            font-size: 1.5em;
            color: #006600;
        }

        .feature-item p {
            font-size: 1em;
            color: #333;
        }

        /* Sign In and Sign Up Forms */
        .signin,
        .signup {
            background-color: #fff;
            padding: 40px;
            max-width: 500px;
            margin: 40px auto;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .signin h2,
        .signup h2 {
            text-align: center;
            font-size: 2em;
            font-family: 'Roboto', sans-serif;
        }

        .signin form,
        .signup form {
            display: flex;
            flex-direction: column;
        }

        .signin label,
        .signup label {
            margin: 10px 0 5px;
            font-size: 1em;
        }

        .signin input,
        .signup input {
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 1em;
        }

        .signin button,
        .signup button {
            padding: 10px 20px;
            background-color: #006600;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 1.2em;
            cursor: pointer;
        }

        .signin button:hover,
        .signup button:hover {
            background-color: #004d00;
        }

        .signin p,
        .signup p {
            text-align: center;
            font-size: 1em;
        }

        .signin a,
        .signup a {
            color: #006600;
            text-decoration: none;
        }

        .signin a:hover,
        .signup a:hover {
            text-decoration: underline;
        }

        /* Footer Section */
        footer {
            background-color: #333;
            color: white;
            padding: 20px;
            text-align: center;
            font-size: 1em;
        }

        /* Call to Action Section */
        .cta {
            background-color: #e6f7e6;
            padding: 40px 20px;
            text-align: center;
        }

        .cta h2 {
            font-size: 2.5em;
            color: #006600;
        }

        .cta p {
            font-size: 1.2em;
            margin-bottom: 20px;
        }

        .cta-buttons {
            display: flex;
            justify-content: center;
            gap: 20px;
        }

        .cta-button {
            background-color: #006600;
            color: white;
            padding: 15px 25px;
            text-decoration: none;
            border-radius: 5px;
            font-size: 1.2em;
        }

        .cta-button:hover {
            background-color: #004d00;
        }

        /* Responsiveness */
        @media screen and (max-width: 768px) {
            .feature-list {
                flex-direction: column;
                align-items: center;
            }

            .feature-item {
                width: 80%;
                margin-bottom: 20px;
            }

            .cta-buttons {
                flex-direction: column;
            }

            .cta-button {
                margin-bottom: 10px;
            }

            .hero-img {
                width: 100%;
                max-width: 100%;
            }
        }

        /* General Header Styles */
        header {
            background-color: #333;
            padding: 15px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            max-width: 1200px;
            margin: 0 auto;
        }

        .logo h1 {
            color: #fff;
            font-size: 2rem;
            font-family: 'Lobster', cursive;
            letter-spacing: 2px;
        }

        .nav-links {
            display: flex;
            list-style-type: none;
            margin: 0;
        }

        .nav-links li {
            margin-left: 20px;
        }

        .nav-links li a {
            color: #fff;
            text-decoration: none;
            font-size: 1.1rem;
            font-weight: 500;
            padding: 8px 15px;
            border-radius: 5px;
            transition: background-color 0.3s;
        }

        .nav-links li a:hover {
            background-color: #5cb85c;
        }

        .language-switcher select {
            background-color: #fff;
            border: none;
            padding: 8px 12px;
            font-size: 1rem;
            border-radius: 5px;
            cursor: pointer;
        }

        .language-switcher select:focus {
            outline: none;
            border: 2px solid #5cb85c;
        }

        @media screen and (max-width: 768px) {
            .nav-links {
                display: none;
                flex-direction: column;
                align-items: flex-start;
            }

            .nav-links li {
                margin: 10px 0;
            }

            .navbar {
                flex-direction: column;
                align-items: flex-start;
            }

            .navbar.active .nav-links {
                display: flex;
            }
        }
    </style>
</head>

<body>
<div id="google_translate_element"></div>
  <script type="text/javascript">
    function googleTranslateElementInit() {
      new google.translate.TranslateElement(
        {
          pageLanguage: 'en', // Default language
          includedLanguages: 'en,hi', // Available languages
          layout: google.translate.TranslateElement.InlineLayout.SIMPLE, // Inline layout for one button
          autoDisplay: true // Prevent auto display of language selector
        },
        'google_translate_element' // The ID of the container
      );
    }
  </script>
  <script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>

    <!-- Header Section -->
    <header id="header"></header>

    <!-- Sign Up Form Section -->
    <section class="signup">
        <h2 id="signupTitle">Sign Up</h2>
        <form action="signup.php" method="POST">
            <label for="fullname" id="fullnameLabel">Full Name:</label>
            <input type="text" id="fullname" name="fullname" required>

            <label for="phone" id="phoneLabel">Phone Number:</label>
            <input type="tel" id="phone" name="phone" required>

            <label for="signupPassword" id="signupPasswordLabel">Password:</label>
            <input type="password" id="signupPassword" name="password" required>

            <button type="submit" id="signupButton">Sign Up</button>
        </form>
        <p id="signinPrompt">Already have an account? <a href="signin.html" id="signinLink">Sign In</a></p>
    </section>

    <!-- Footer Section -->
    <footer>
        <p id="footerText">© 2025 Farm Optimizer. All rights reserved.</p>
    </footer>

    <script src="script.js"></script>
    <script>
        // Fetch the content of the header.html and insert it into the header element
        fetch('header.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('header').innerHTML = data;
            })
            .catch(error => console.error('Error loading the header:', error));
    </script>
    <script src="otp.js"></script>
</body>

</html>