# home_automation
[IFTTT](https://ifttt.com) webhook endpoint for home automation. This Webhook assumes usage with specific USB device [USB赤外線リモコンアドバンス](http://bit-trade-one.co.jp/product/module/adir01p/).  

    POST http://localhost:3000/api/action
    {"target":"{{TextField}}", "location":"living", "cmd":"turnoff"}
    
Then, prepared data is sent to device. 

# Setup

## Build command line tool
 - install libusb, ```apt-get install libusb-dev```
 - download [USB赤外線リモコンアドバンス・UNIX系環境用コマンドライン操作ツール＆GUI操作ツール Ver1.0.0](http://a-desk.jp/modules/mydownloads/singlefile.php?cid=3&lid=76) 
 - ```make && make install```

## Record Infrared data

    $ bto_advanced_USBIR_cmd -r # wait for emitting infrared data
    $ bto_advanced_USBIR_cmd -s # stop recording
    $ bto_advanced_USBIR_cmd -g | tee turnon # dump data

## Name Convension

dumped data should be located ```data/target/cmd```. For example. ```data/tv/turnon```

## IFTTT applet

You can choose **Say a phrase with a text ingredient** template. One ingredient would correspond with your target device like TV, aircon, light.





