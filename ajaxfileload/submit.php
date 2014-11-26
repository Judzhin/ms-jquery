<?php
/**
 * You need to add server side validation and better error handling here
 * Created by PhpStorm.
 * User: judzhin
 * Date: 26.11.14
 * Time: 16:22
 */

$data = array();
if (isset($_GET['files'])) {
    $error = false;
    $files = array();
    $uploaddir = './uploads/';
    foreach ($_FILES as $file) {
        if (move_uploaded_file($file['tmp_name'], $uploaddir . basename($file['name']))) {
            $files[] = $uploaddir . $file['name'];
        } else {
            $error = true;
        }
    }
    $data = ($error) ? array('error' => 'There was an error uploading your files') : array('files' => $files);
} else {
    $data = array('success' => 'Form was submitted', 'formData' => $_POST);
}
echo json_encode($data);
?>