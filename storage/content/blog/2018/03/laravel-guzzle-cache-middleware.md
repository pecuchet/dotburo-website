/*
Title: Caching HTTP requests with Laravel 5.5 and Guzzle&nbsp;6
Date: 2018-03-11
Modified: 2019-03-25
Read: 1
Keywords: php, laravel, guzzle, cache
*/

 > **<span class="txt-ul">UPDATE 25/03/2019</span>** *The gist below has been refactored and is available as a package. It's now easier to re-configure 
 > the cache for every request made by the same Guzzle client! Check the readme of the repository on [Github](https://github.com/brightfish-be/caching-guzzle){target=_blank rel=noopener} 
 > or fetch the package with `composer require brightfish/caching-guzzle`. (It still works with Laravel 5.8 ;)*

While working on a Laravel project in which repeated HTTP requests are made against several APIs,
I needed a simple and unobtrusive way to cache the API responses for a *time to live* (TTL) specific to each API.

The project in question uses an interface around Guzzle's `ClientInterface` where each
implementation of it corresponds to one of the services the project is talking to. 
That way I could manage all the requests in a likely fashion, while taking care of the
requirements of each API. One those was the requirement to have the ability to enable and configure the caching of responses 
differently for each service. Because each service instantiates a Guzzle object, I was able to instantiate the below 
[`GuzzleResponseCache`](https://gist.github.com/pecuchet/90a2246a0c381b9a9a82fbe452ab4301){target=_blank rel=noopener} class
with a specific TTL for each of them.

The `GuzzleResponseCache` class is a [Guzzle middleware](http://docs.guzzlephp.org/en/stable/handlers-and-middleware.html#middleware){target=_blank rel=noopener}, 
which means that it handles the execution of an intermediary *handler* function, 
i.e. a function that can intercept and modify the requests performed by Guzzle as well as the returned responses. 
The handler functions are added to a stack and upon each Guzzle request the stack will be traversed and every handler will be called one by one. 

Here is how the `GuzzleResponseCache` middleware is added to a Guzzle instance:

```
$guzzleHandlerStack = \GuzzleHttp\HandlerStack:create();
$cache = \Illuminate\Support\Facades\Cache::store('database');
$guzzleHandlerStack->push(new GuzzleResponseCache($cache, 86400));
$client = new \GuzzleHttp\Client([
    handler => $guzzleHandlerStack
]);
``` 

This will cache all requests done with `$client` for 24 hours in the database &mdash; making use 
of Laravel's `Cache` facade (provided you have migrated a cache table with artisan).

<script class='gist' src="https://gist.github.com/pecuchet/90a2246a0c381b9a9a82fbe452ab4301.js"></script>
