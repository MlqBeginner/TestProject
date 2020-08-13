(function($){

    var $list=$("#container");   //这几个初始化全局的百度文档上没说明，好蛋疼。
    var $btn =$("#uploader");   //开始上传

    var uploader = WebUploader.create({
        // 选完文件后，是否自动上传。
        auto: true,

        // swf文件路径
        swf: '/cc/core/webuploader-0.1.5/dist/Uploader.swf',

        // 文件接收服务端。
        server: '/cc/v1/common/fileBill/fileUpload/'+$("#billType").val(),

        // 是否分片上传
        chunked: false,

        // 去重
        duplicate: true,

        // 上传并发数。允许同时最大上传进程数[默认值：3]
        threads: 3,

        // 分片大小
        chunkSize: 512 * 1024,

        // 如果某个分片由于网络问题出错，允许自动重传多少次？
        chunkRetry: 3,

        // 压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
        resize: true,

        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: '#uploader',

        // 只允许选择图片文件。
        accept: {
         title: 'HTML5组态文件',
         extensions: 'docx,doc,word,excel,xls,xlsx,txt,gif,jpg,jpeg,png,bmp,rar,zip,mp4,mov,3gp,avi',
        /* mimeTypes: 'img/!*'*/
         },

        method:'POST',
        fileSingleSizeLimit:6*1024*1024
    });
// 当有文件添加进来的时候
    uploader.on( 'fileQueued', function( file ) {  // webuploader事件.当选择文件后，文件被加载到文件队列中，触发该事件。等效于 uploader.onFileueued = function(file){...} ，类似js的事件定义。
        var $li = $(
                '<li style="margin-left: 10px;" id="' + file.id + '" class="uploader_file_item fl">' +
                '<div style="text-align: right;" class="uploader_file">' +
                '<img width="34" height="34" alt="">' +
                '<div class="uploading">' +
                '<i class="uploaded fa fa-remove"></i>' +
                '<i class="uploading_remove fa fa-minus"></i>' +
                '</div>' +
                '</div>' +
                '<p class="uploader_file_name">' + file.name + '</p>' +
                '<input type="hidden" class="file_url" name="file_url" value=""/>' +
                '</li>'
            ),
            $img = $li.find('img');
        var zip = /\.zip$|\.rar$/,
            video = /\.mp4/;

        // $list为容器jQuery实例
        $list.append( $li );

        // 创建缩略图
        // 如果为非图片文件，可以不用调用此方法。
        // thumbnailWidth x thumbnailHeight 为 100 x 100
        uploader.makeThumb( file, function( error, src ) {
            if ( error ) {
                if(zip.test(file.name)){
                    $img.attr( 'src', path_root+'/images/img/zip.png' );
                } else if(video.test(file.name)){
                    $img.attr( 'src', path_root+'/images/img/video.png' );
                } else{
                    $img.replaceWith('');
                }
                return;
            }
            $img.attr( 'src', src );

        }, 34, 34 );


    });

    // 文件上传过程中创建进度条实时显示。
    uploader.on( 'uploadProgress', function( file, percentage ) {
        var $uploading = $( '#'+file.id + ' .uploading'),
            $percent = $uploading.find('.uploading_progress span');

        // 避免重复创建
        if ( !$percent.length ) {
            $percent = $('<p class="uploading_progress"><span></span></p>')
                .appendTo( $uploading )
                .find('span');
        }

        $percent.css( 'width', percentage * 100 + '%' );

    });
    // 文件上传成功，给item添加成功class, 用样式标记上传成功。
    uploader.on( 'uploadSuccess', function(file,response) {
        $( '#'+file.id+ ' .uploader_file').append('<i class="uploaded fa fa-remove" onclick="$(this).parent().parent().remove();"></i>');
        $( '#'+file.id+ ' .uploading').remove();
        $( '#'+file.id+ ' .file_url').val(response.url);
    });

    // 文件上传失败，显示上传出错。
    uploader.on( 'uploadError', function( file ) {
        var $li = $( '#'+file.id ),
            $error = $li.find('div.error');

        // 避免重复创建
        if ( !$error.length ) {
            $error = $('<div class="error"></div>').appendTo( $li );
        }

        $error.text('上传失败');
    });


    // 完成上传完了，成功或者失败，先删除进度条。
    uploader.on( 'uploadComplete', function( file ) {
        $( '#'+file.id ).find('.uploading').remove();
    });

    // 当有文件被添加进队列的时候
    uploader.on( 'beforeFileQueued', function( file ) {
        if(file.size == 0){
            layer.msg("空文件不能上传！");
            return false;
        }
    });
    
    /** * 验证文件格式以及文件大小 */
    uploader.on("error", function (type) {
        if (type == "Q_TYPE_DENIED") {
            layer.msg("请上传docx,doc,word,excel,xls,xlsx,txt,gif,jpg,jpeg,png,bmp,rar,zip,mp4,mov,3gp,avi格式文件");
        //} else if (type == "Q_EXCEED_SIZE_LIMIT") {
        } else if (type == "F_EXCEED_SIZE") {
            layer.msg("文件大小不能超过6M！");
        } else if (type == "Q_EXCEED_SIZE_LIMIT") {
            layer.msg("文件大小不能超过6M！");
        }else {
            layer.msg("上传出错！请检查后重新上传！错误代码" + type);
        }
    });

})(window.jQuery);













