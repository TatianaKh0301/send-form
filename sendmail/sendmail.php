<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;

    require 'phpmailer/src/Exception.php';
    require 'phpmailer/src/PHPMailer.php';
    require 'phpmailer/src/SMTP.php';

    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->setLanguage('en', 'phpmailer/language');
    $mail->IsHTML(true);

    $mail->IsSMTP();
    $mail->Host='smtp.ukr.net';
    $mail->SMTPAuth = true;
    $mail->Username='testmailtkh@ukr.net';
    $mail->Password = 'uuLd49Du2UoEZybw';
    $mail->Port = '465';
    $mail->SMTPSecure = 'TLS';

    $mail->setFrom('testmailtkh@ukr.net', 'Test Mail');
    $mail->addAddress('tatyana.kharlamova@aysal.com.ua');
    $mail->Subject = 'E-mail from buyer';

    $body = '<h1>Information about me</h1>';

    if(trim(!empty($_POST['name']))) {
        $body .= "<p>Name: <strong>".$_POST['name']."</strong>";
    }
    if(trim(!empty($_POST['email']))) {
        $body .= "<p>E-mail: <strong>".$_POST['email']."</strong>";
    }
    if(trim(!empty($_POST['message']))) {
        $body .= "<p>Message: <strong>".$_POST['message']."</strong>";
    }
    if(trim(!empty($_POST['sex']))) {
        $body .= "<p>Sex: <strong>".$_POST['sex']."</strong>";
    }
    if(trim(!empty($_POST['agreement']))) {
        $body .= "<p>Agreement: <strong>".$_POST['agreement']."</strong>";
    }

    if(trim(!empty($_FILES['image']['tmp_name']))) {
        $fileTmpName = $_FILES['image']['tmp_name'];
        $fileName = $_FILES['image']['name'];
        $mail->addAttachment($fileTmpName, $fileName);
    }

    $mail->Body = $body;

    $mail->send();
    $mail->smtpClose();
?>
