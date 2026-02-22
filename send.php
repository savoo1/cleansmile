<?php
$mailto = "info@cleansmile.team";

$name = $_POST['name'];
$fromEmail = $_POST['email'];
$messageInput = $_POST['message'];

$subject = "Kontakt sa sajta";
$subject2 = "Potvrda: Vaša poruka je uspešno poslata";

$message = "Ime: $name\n\nEmail: $fromEmail\n\nPoruka:\n$messageInput";
$message2 = "Poštovani/na $name,\n\nVaša poruka je uspešno poslata.\n\nVaša poruka:\n'$messageInput'\n\nSrdačan pozdrav,\nTvoj tim";

$headers = "From: $fromEmail";
$headers2 = "From: $mailto";

$result1 = mail($mailto, $subject, $message, $headers);
$result2 = mail($fromEmail, $subject2, $message2, $headers2);

if ($result1 && $result2) {
  echo "✅ Vaša poruka je uspešno poslata!";
} else {
  echo "❌ Poruka nije poslata. Pokušajte ponovo.";
}
?>
