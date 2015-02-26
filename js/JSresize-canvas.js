        var apiURL = (window.createObjectURL && window) || (window.URL && URL.revokeObjectURL && URL) || (window.webkitURL && webkitURL);
        var perf = window.performance;
        function triggerTest(offset) {

//            var refImage = document.getElementById("base");
            offset = offset || 1;
            if (offset > 1) {
                return;
            } else if (offset == 1) {
                document.getElementById("previews").innerHTML = '';
            }
            var renderTimeEl = document.getElementById("renderTime");
            var loadTimeEl = document.getElementById("loadTime");
            var encodeTimeEl = document.getElementById("encodeTime");
            var input = document.getElementById('files');
            var idx, file, files = input.files;

            file = files.item(0);

            var startTime = perf.now();
            var img = document.createElement("img");
//            img.width = img.height = 768;
            var fileUrl = apiURL.createObjectURL(file);
            img.onload = img.onerror = function (event) {
                img.onload = img.onerror = undefined;
                if (event.type == 'load') {
                    loadTimeEl.innerHTML = "" + ~~(perf.now() - startTime);
                    startTime = perf.now();
                    // var preview2 = document.createElement("img");   //上傳檔案預覽小圖
                    // preview2.width = 500;
					// preview2.height = img.height/(img.width/500);
                    // preview2.onload = preview2.onerror = function () {
// //                        apiURL.revokeObjectURL(fileUrl);
                    // };
                    // preview2.src = fileUrl;
                    // document.getElementById("previews").appendChild(preview2);

                    window.setTimeout(function() {
                        var ratio = Math.max(img.width / 1000, img.height / 1000);
                        var canvas = document.createElement('canvas');
                        canvas.width = img.width / ratio;
                        canvas.height = img.height / ratio;
                        canvas.quality = 0.9;
                        var context = canvas.getContext("2d");
                        context.drawImage(img, 0, 0, canvas.width, canvas.height);
//                        img.src = 'about:blank';
                        encodeTimeEl.innerHTML = "" + ~~(perf.now() - startTime);
                        startTime = perf.now();


                        var uri = canvas.toDataURL("image/jpeg", 0.9);
                        renderTimeEl.innerHTML = "" + ~~(perf.now() - startTime);

                        var preview = document.createElement("img");//壓縮後檔案預覽小圖
                        preview.width = 500;
						preview.height = img.height/(img.width/500);
                        preview.src = uri;

                        document.getElementById("previews").appendChild(preview);
    //                if (offset % 10 == 0) {
                        document.getElementById("previews").appendChild(document.createElement("br"));
    //                }
                        window.setTimeout(function () {
                            triggerTest(offset + 1)
                        }, 1);
                    }, 1);
                } else {
                    debugger;
                }
            };
            img.src = fileUrl;

            /*
             for (idx=0; idx<files.length; idx++) {
             }
             */


        }
