/*
Title: Caching HTTP requests with Laravel 5.5 and Guzzle&nbsp;6
Date: 2018-03-11
Modified: 2018-03-11
Read: 1
*/
We needed a simple and unobtrusive way to cache our multiple API query within Laravel. 
It turns out this is quite easy with Guzzle. Just call the class beneath like so:  
<br>
```
$guzzleHandlerStack = \GuzzleHttp\HandlerStack:create();
$cache = \Illuminate\Support\Facades\Cache::store('database');
$guzzleHandlerStack->push(new GuzzleResponseCache($cache), 86400);
$client = new \GuzzleHttp\Client([
    handler => $guzzleHandlerStack
]);
```  
<br>
This will cache all requests done with ``$client`` for 24 hours in the database&mdash;provided you have
migrated a cache table with artisan.  
<br><br>
<script class='gist' src="https://gist.github.com/pecuchet/90a2246a0c381b9a9a82fbe452ab4301.js"></script>
