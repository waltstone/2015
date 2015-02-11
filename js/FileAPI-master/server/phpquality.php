<html>
<head>
    
	<meta http-equiv="Content-Type" content="text/html; charset=big5">

    <title>Login</title>
</head>
<body>
test
</body>
</html>
<?php


//===================== 上傳到資料夾
if($_FILES['file']['error']>0){
  exit("檔案上傳失敗！");//如果出現錯誤則停止程式
}

$path ='C:\\wamp\\www\\upload\\';
$url = 'http://127.0.0.1/upload/';
$tmp= $_FILES['file']['tmp_name'];
$filename=basename(iconv("utf-8", "big5",$_FILES['file']['name']));  //編碼


/*
PHP 圖片壓縮+轉檔
*/
 
//$file ="1080p.jpg";
$quality = 50;
 
switch (exif_imagetype($tmp)) {
 
    case IMAGETYPE_PNG :
        $img = imagecreatefrompng($tmp);
        break;
    case IMAGETYPE_JPEG :
        $img = imagecreatefromjpeg($tmp);
        break;
    default:
        throw new InvalidArgumentException("錯誤發生");
        exit();
        break;
}
@imagejpeg($img, $filename, $quality);        //上傳檔案到php所在位置
@imagejpeg($img, $path.$filename, $quality);  //上傳檔案到目的資料夾 

//move_uploaded_file($tmp,$path.$filename);//複製檔案//無法移動中文檔案
//move_uploaded_file($tmp, iconv("utf-8", "big5", $path.$filename));//複製原始上傳檔案
echo '<a href="'.$url.$filename.'">file</a>';//顯示檔案路徑
//=====================

 
//印在畫面上
//header('Content-Type: image/jpeg');
//@imagejpeg($img, NULL, $quality);
 
//釋放記憶體
@imagedestroy($img);


?>

