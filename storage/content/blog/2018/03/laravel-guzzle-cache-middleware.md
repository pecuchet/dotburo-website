/*
Title: Caching HTTP requests with Laravel 5.5 and Guzzle&nbsp;6
Date: 2018-03-11
Modified: 2018-04-09
Read: 1
Keywords: php, laravel, guzzle, cache
*/
While working on a Laravel project in which repeated HTTP requests are made against several APIs,
I needed a simple and unobtrusive way to cache the multiple API responses for some time &mdash; 
a time to live (TTL) specific for each API.  
<br>
The project has a wrapper interface around Guzzle's ClientInterface and each
implementation of the former corresponds to one of the APIs the project is talking to. 
This way I can manage all the requests in a likely fashion, while taking care of the
specifics of each API. I can, for example, instantiate the below [GuzzleResponseCache](https://gist.github.com/pecuchet/90a2246a0c381b9a9a82fbe452ab4301){target=_blank rel=noopener}
 with a specific TTL.  
<br>
The GuzzleResponseCache class is a [Guzzle middleware](http://docs.guzzlephp.org/en/stable/handlers-and-middleware.html#middleware){target=_blank rel=noopener}, 
which means that it handles the intermediary execution of a *handler*, 
i.e. a function that modifies the request options and response of the HTTP request performed by Guzzle.  
<br>
To make it work the GuzzleResponseCache middleware needs to be added to
a handler stack, which will be traversed while doing the request. Like so:    
<br>
```
$guzzleHandlerStack = \GuzzleHttp\HandlerStack:create();
$cache = \Illuminate\Support\Facades\Cache::store('database');
$guzzleHandlerStack->push(new GuzzleResponseCache($cache, 86400));
$client = new \GuzzleHttp\Client([
    handler => $guzzleHandlerStack
]);
```  
<br>
This will cache all requests done with ``$client`` for 24 hours in the database &mdash; making use 
of Laravel's ``Cache`` facade (provided you have migrated a cache table with artisan).  
<br>
<script class='gist' src="https://gist.github.com/pecuchet/90a2246a0c381b9a9a82fbe452ab4301.js"></script>
