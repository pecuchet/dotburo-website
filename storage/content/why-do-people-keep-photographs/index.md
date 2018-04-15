/*
Title: Tessa Groenewoud: Why do people keep photographs?
Description: A daily dynamically generated movie fed by image search engine results.
Category: online
Type: Code
URL: http://whydopeoplekeepphotographs.net/
Image: wdkp-1.jpg

Date: 2016-06-21
Modified: 2018-04-10
*/
*Why do people keep photographs?* is a “database movie” project by [Tessa Groenewoud](https://tessagroenewoud.nl/){target=_blank rel=noopener} 
and coded by dotburo. *Every day a video is automatically generated based on a passage from the crime novel ‘Mrs. McGinty’s Dead’ (1952) by Agatha Christie.
Each word from the fragment is used to select the day’s highest ranking image result in the search engines of Bing, Google or Yahoo.* 
The [project website](https://whydopeoplekeepphotographs.net/){rel=noopener} displays the daily video and the archive of past generated movies.  
<br>
The generation of the HD video is done through Python and FFmpeg. The former performs 
the image requests for each word of the passage and builds the FFmpeg commands; 
the latter resizes each image proportionally to fit into the HD format and takes care of the actual video "editing" of each image/frame.
 FFmpeg also generates the burned-in subtitles and the rolling credits, which reference the original URL's
of the images. All this is done automatically and on a daily basis. Once all the parts are ready they are fit together and compressed
in a H264 mp4 movie, to finally be sent to the HTTP server of whydopeoplekeepphotographs.net.  
<br>
The [source code of the project](https://github.com/pecuchet/wdpkp-4){target=_blank rel=noopener} is on Github. Here is the result:
<br>
<video preload="auto" muted="" controls>
    <source src="https://whydopeoplekeepphotographs.net/videos/latest" type="video/mp4">
</video>

<br>
