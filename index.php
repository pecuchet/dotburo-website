<?php
define('ROOT_DIR', realpath(dirname(__FILE__)) .'/');
define('CONTENT_DIR', ROOT_DIR .'storage/content/');
define('CONTENT_EXT', '.md');
define('LIB_DIR', ROOT_DIR .'pico/');
define('PLUGINS_DIR', LIB_DIR .'plugins/');
define('RESOURCES_DIR', ROOT_DIR .'resources/');
define('CACHE_DIR', LIB_DIR .'cache/');
require_once(ROOT_DIR .'vendor/autoload.php');
require_once(LIB_DIR .'pico.php');
$pico = new Pico();