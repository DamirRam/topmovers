<?php 

$name             = $_POST['user_name'];
$phone            = $_POST['user_phone'];
$user_email       = $_POST['user_email'];
$country_from     = $_POST['country_from'];
$country_to       = $_POST['country_to'];
$town_from        = $_POST['town_from'];
$town_to          = $_POST['town_to'];
$weight           = $_POST['weight'];
$user_comment     = $_POST['user_comment'];

if($user_email != '') {
  $user_email = 'E-mail: ' . $user_email . '<br>';
}
if($country_from != '') {
  $country_from = 'Страна отправления: ' . $country_from . '<br>';
}
if($country_to != '') {
  $country_to = 'Страна назначения: ' . $country_to . '<br>';
}
if($town_from != '') {
  $town_from = 'Город отправления: ' . $town_from . '<br>';
}
if($town_to != '') {
  $town_to = 'Город назначения: ' . $town_to . '<br>';
}
if($weight != '') {
  $weight = 'Вес или объем перевозимого груза: ' . $weight . '<br>';
}
if($user_comment != '') {
  $user_comment = 'Комменарий: ' . $user_comment . '<br>';
}

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

//$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.yandex.ru';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'sendmailfromsite@yandex.ru';                 // Наш логин
$mail->Password = 'ucgpwjsckdefidky';                           // Наш пароль от ящика
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;                                    // TCP port to connect to
 
$mail->setFrom('sendmailfromsite@yandex.ru', 'Topmovers');   // От кого письмо 
$mail->addAddress('d.a.ramazanov@yandex.ru');     // Add a recipient
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = $name;
$mail->Body    = '
	Клиент оставил свои данные <br> 
	Имя: ' . $name . ' <br>
  Телефон: ' . $phone . '<br>' 
  . $user_email
  . $country_from
  . $country_to
  . $town_from
  . $town_to
  . $weight
  . $user_comment . '';
	//	Сайт: ' . $site . ' <br>//
/*$mail->AltBody = 'Это альтернативный текст';*/

if(!$mail->send()) {
    return false;
} else {
	return true;
}

?>
