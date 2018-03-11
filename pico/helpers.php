<?php
if (!function_exists('dd')) {
    function dd(...$dumps) {
        var_dump(...$dumps);
        die();
    }
}