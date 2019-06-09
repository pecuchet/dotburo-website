<?php
$config['base_url'] = 'my site URL';
$config['site_title'] = 'my site title';
$config['site_title_sep'] = ' ›_&thinsp;';
$config['site_author'] = 'my name';
$config['site_email'] = 'my email';
$config['site_description'] = 'my site';
$config['env'] = 'dev';
$config['cache_bust'] = 0;
$config['content_dir'] = 'storage/content/';

$config['twig_config'] = [
    'cache' => 'storage/cache/templates',
    'autoescape' => false,				      // Autoescape Twig vars
    'debug' => false					      // Enable Twig debug
];

$config['pages_order_by'] = 'date';	    	  // alpha | date
$config['date_format'] = 'Y-m-d';
$config['pages_order'] = 'desc';

return $config;