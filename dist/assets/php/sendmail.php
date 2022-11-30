<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'PHPMailer-master/src/Exception.php';
require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/SMTP.php';

$name = $_POST["name"];
$city = $_POST["city"];
$phone = $_POST["phone"];
$email = $_POST["email"];
$country = $_POST["country"];
$zip = $_POST["zip"];
$message = $_POST["message"];

// Instantiation and passing [ICODE]true[/ICODE] enables exceptions
$mail = new PHPMailer(true);

 try {
	// https://netcorecloud.com/tutorials/phpmailer-smtp-error-could-not-connect-to-smtp-host/

    //Server settings
    $mail->SMTPDebug = 2;                                       // Enable verbose debug output
    $mail->isSMTP();                                            // Set mailer to use SMTP
    $mail->Host       = 'gains.promotech.in';  // Specify main and backup SMTP servers
    $mail->SMTPAuth   = false;                                   // Enable SMTP authentication
    $mail->Username   = 'info@zincline.in';                     // SMTP username
    $mail->Password   = 'NHT1p~%iDpBH';                               // SMTP password
    $mail->SMTPSecure = 'tls';                                  // Enable TLS encryption, [ICODE]ssl[/ICODE] also accepted
    $mail->Port       = 25;                                    // TCP port to connect to

 
    //Recipients
    $mail->setFrom($email, $name);
    $mail->addAddress('zinclineoverseas@gmail.com', 'Zincline');
	$mail->addAddress('info@zincline.in', 'Zincline');
    // $mail->addReplyTo('info@zincline.in', 'Information');
 
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'Web-Email - www.zincline.in';
	$mail->Body = 	'Message has been sent from your website <strong>www.zincline.in</strong>, as below details:<br/><br/>' 
					.'<strong>Message: </strong>'.$message.'<br>'
					.'<strong>Name: </strong>'.$name.'<br>'
					.'<strong>Address: </strong>'.$city.', '.$country.', '.$zip.'<br>'
					.'<strong>Phone: </strong>'.$phone.'<br>'
					.'<strong>Email: </strong>'.$email.'<br>';
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
    //Attach an image file
	//$mail->addAttachment('images/phpmailer_mini.png');
    $mail->send();
    echo 'Message has been sent'; ?>
	<script>
		window.location.assign("https://www.zincline.in/thankyou.html")
	</script>
<?php } catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
} ?>