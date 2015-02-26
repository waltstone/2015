(function (){
	
	
	var elms = document.forms["form4"];//取得取得文件中第一個表單元素 (element) // 取得表單名稱為form1的表單集合 var oform = document.forms["form1"];

	
	
	function resize(evt){
		var file = FileAPI.getFiles(elms.file)[0];
		var type = (FileAPI.filter(elms.type, function (type){ return type.checked; })[0] || {}).value;
		document.getElementById('preview-processing').style.display = '';
	
		// Create preview
		FileAPI.Image(file)
			
			.resize(600, 600, 'max')           //resize
			//.overlay(overlay)
			//.preview(600, 600)
			//.rotate(45)    //旋轉照片
			.get(function (err, img){
			image.innerHTML = '';
			image.appendChild(img);	//附加		
			document.getElementById('preview-processing').style.display = 'none';   //處理中字樣
			});

		document.getElementById('uploading').style.display = '';

		// Upload
		FileAPI.upload({
			  url: 'js/FileAPI-master/server/ctrl.php'
			, files: elms.file
			, imageTransform: {
				  // width: elms.width.value|0
				// , height: elms.height.value|0
				width: 1000|0                                              //設定大小
				, height: elms.height.value/(elms.width.value/1000)|0
				, preview: true
				, type: type // Output type
				, quality: 0.1 // jpeg quality
				//, overlay: overlay // Add watermark
			}
			, upload: function (){//
				document.getElementById('uploading').innerHTML = '(uploading&hellip;)';
			}
			, progress: function (evt){//進度顯示
				document.getElementById('uploading').innerHTML = (evt.loaded/evt.total * 100).toFixed(2) +'%';//進度顯示
			}
			, complete: function (err, xhr){
				if( err ){
					alert('Oops, server error.');//server連接失敗
				} else {                         // All files successfully uploaded.
					var res = JSON.parse(xhr.responseText);

					FileAPI.each(res.images, function (file){//上傳server成功縮圖
						var matrix	= FileAPI.Image.prototype.getMatrix.call({ matrix: { dw: 300, dh: 300, resize: 'max' } }, file);//縮圖大小

						FileAPI.Image.fromDataURL(file.dataURL, { width: matrix.dw, height: matrix.dh }, function (img){
							server.innerHTML = '縮圖';//server回傳字串
							server.appendChild(img);  //顯示圖片
							server.innerHTML += '<div><b>'+file.width+'x'+file.height+', '+file.mime+', '+(file.size/1024).toFixed(3)+'KB</b></div>';
							//圖片資訊
						});

						//document.getElementById('uploading').style.display = 'none';   //百分比消失
					});
				}
			}
			, fileupload: function (file, xhr, options){
				
			}
		});
	
	}
	
	/* jQuery(function ($){
			if( FileAPI.support.dnd ){
				$('#drag-n-drop').show();
				$(document).dnd(function (over){
					$('#drop-zone').toggle(over);
				}, function (){resize();});
			}
	}); // ready */
	
	
	/* FileAPI.event.on(document, 'drop', function (){
	resize();
	}); */
	
	// Output type
	FileAPI.each(output.getElementsByTagName('input'), function (el){
	FileAPI.event.on(el, 'click', resize);
	});
			
	FileAPI.event.on(output, 'keyup', function (){
		clearTimeout(this.pid);
		this.pid = setTimeout(function (){
			resize();
		}, 1000);
	});
	
	
	FileAPI.event.on(elms.file, 'change', function (){
		FileAPI.getInfo(FileAPI.getFiles(elms.file)[0], function (err, info){
			var html = ['<table>'];

			FileAPI.each(info && info.exif, function (val, key){
				html.push('<tr><td>'+ key +'</td><td>'+ val +'</td></tr>');
			});
			exif.innerHTML = html.join('')+'</table>';

			elms.width.value = info.width;
			elms.height.value = info.height;

			preview.style.display = '';
			resize();
		});
	});
	
	
	
	
})();


		
		