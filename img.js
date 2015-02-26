<script type="text/javascript">
　　var proMaxHeight=100;
　　var proMaxWidth=100;
　　function ImgAuto(ImgD)
　　{
　　var image=new Image();
　　image.src=ImgD.src;
　　image.onload = function(){
　　if(image.width>0&&image.height>0)
　　{
　　var rate=(proMaxWidth/image.width<proMaxHeight/image.height)?proMaxWidth/image.width:proMaxHeight/image.height;
　　if(rate<=1)
　　{
　　ImgD.width=image.width*rate;
　　ImgD.height=image.height*rate
　　}
　　else
　　{
　　ImgD.width=image.width;
　　ImgD.height=image.height;
　　}
　　}
　　};
　　image.onload();
　　};
</script>