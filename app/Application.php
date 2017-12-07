<?php

declare(strict_types = 1);

namespace App;

use Dotenv\Dotenv;
use Dotenv\Exception\InvalidPathException;
use RuntimeException;
use function file_exists, file_get_contents, header, preg_match, str_replace, trim;

/**
 * Class Application
 */
class Application
{
    /**
     * @return void
     * @throws RuntimeException
     */
    public function toResponse()
    {
        $route = trim($_SERVER['REQUEST_URI'], '/');

        if (preg_match('/^docs[\/]?/', $route)) {
            $content = $this->getDocFile($route);
        } else {
            $content = file_get_contents(__DIR__.'/../src/index.html');
        }

        echo $content;
    }

    /**
     * @param string $route
     *
     * @return string
     * @throws RuntimeException
     */
    protected function getDocFile(string $route): string
    {
        $file = __DIR__."/../{$route}";

        $file = !file_exists("{$file}.md") ? "{$file}/index.md" : "{$file}.md";

        if (!file_exists($file)) {
            header("{$_SERVER['SERVER_PROTOCOL']} 500 Internal Server Error");
            throw new RuntimeException('File not found', 500);
        }

        return file_get_contents($file);
    }


    /**
     * @return void
     */
    protected function loadEnvironment(): void
    {
        try {
            (new Dotenv(__DIR__.'/../'))->load();
        } catch (InvalidPathException $e) {
            echo 'Cannot load environment file';
            die;
        }
    }

    /**
     * @param string $content
     *
     * @return string
     */
    protected function replaceEnvironmentVariables(string $content): string
    {
        foreach ($_ENV as $key => $value) {
            $content = str_replace(":{$key}:", $value, $content);
        }

        return $content;
    }
}
