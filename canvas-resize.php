<?php
set_time_limit(0);
$pic_name = array();//上傳後,所有圖片檔名
$uploads_dir = 'uploadJSresize';//存放上傳檔案資料夾
foreach ($_FILES["ff"]["error"] as $key => $error) {
    if ($error == UPLOAD_ERR_OK) {
        $tmp_name = $_FILES["ff"]["tmp_name"][$key];
        $name = $_FILES["ff"]["name"][$key];
        $ext = pathinfo($name, PATHINFO_EXTENSION);
        $ext = strtolower($ext);
        if($ext !== 'jpg' && $ext !== 'jpeg'){
            continue;
        }
        $name = time() . rand(10, 99) . "." . $ext; // 新檔名
        $res = move_uploaded_file($tmp_name, "$uploads_dir/$name");
        if($res){
            $pic_name [] = $name;
        }
        
    }
}

echo  json_encode($pic_name); // 檔名以 JSON 輸出