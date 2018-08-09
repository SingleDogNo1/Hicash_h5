const fs = require( 'fs' );
const path = require('path');
const child_process = require('child_process');

const type = process.argv[2] || 'local';
const cwd = __dirname;

const configPath = path.join(cwd, 'src', 'config.json');
const batPath = path.join(cwd, 'shell.bat');

fs.unlink(configPath, function(err){

    if(err){
        throw err;
    }
    console.info(configPath, ' 旧的配置文件删除成功！');

    const _src = path.join(cwd, 'globalUrl', type, 'config.json');
    const _dist = path.join(cwd, 'src', 'config.json');

    // 创建一个可读流
    var readStream = fs.createReadStream(_src);
    var writeStream = fs.createWriteStream(_dist);
    
    readStream.on('data', function(chunk){
        console.info(_src, ' 新配置文件写入中 ...');
        // 可读流收到data事件时，将内容写入到可写流
        writeStream.write(chunk);
    });
    
    readStream.on('end', function(){
        console.info(_dist, ' 新的配置文件写入完成!');
    // 当可读流读取完成，会发出end事件，这时我们要把可写流关闭
        writeStream.end();
        // console.info(batPath, ' 执行中...');
        // child_process.execFileSync(batPath,[cwd],function(error,stdout,stderr){
        //     if(error !==null){
        //         console.log("exec error" + error)
        //     }
        //     else console.log(batPath, " 执行完成!")
        //     console.log('stdout: ' + stdout);
        // })

        console.info('building ...');

        // child_process.exec('cd '+cwd +'& /mnt/jenkins/node/node-v10.5.0-linux-x64/bin/npm install --registry https://registry.npm.taobao.org  & /mnt/jenkins/node/node-v10.5.0-linux-x64/bin/npm run build',function (error, stdout, stderr) {
        //     if (error !== null) {
        //       console.log('exec error: ' + error);
        //     }
        //     console.info(stdout);
        // });
    });
});