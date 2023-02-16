<?php

namespace App\Http\Controllers;

use Aws\S3\S3Client;
use Aws\S3\Exception\S3Exception;
use GuzzleHttp\Psr7\Uri;
use Illuminate\Http\Request;
use GuzzleHttp\Client as GuzzleClient;
use GuzzleHttp\HandlerStack;
use GuzzleHttp\Middleware;

class SpaceController extends Controller
{

    public function index()
    {
        return view('testPage');
    }
    public function
    uploadFileToSpace(Request $request)
    {
        // Create a new S3Client instance
        $client = new S3Client([
            'version' => 'latest',
            'region' => 'us-east-1',
            'endpoint' => 'https://nyc3.digitaloceanspaces.com',
            'credentials' => [
                'key' => env('DO_SPACES_KEY'),
                'secret' => env('DO_SPACES_SECRET'),
            ],
        ]);
       






        // Retrieve the file from the request
        $file = $request->file('file');

        // Get the contents of the file as a string
        $fileContents = file_get_contents($file->getPathname());

        // Generate a unique filename for the file
        $fileName = md5(uniqid()) . '.' . $file->getClientOriginalExtension();

        // Upload the file to your Space
        $result = $client->putObject([
                'Bucket' => env('DO_SPACES_BUCKET'),
                'Key' => $fileName,
                'Body' => $fileContents,
            ]);

        return 'File uploaded successfully!! Woohoo!';
    }

    // public function downloadFileFromSpace()
    // {
    //     // Create a new S3Client instance
    //     $client = new S3Client([
    //         'version' => 'latest',
    //         'region' => env('DO_SPACES_REGION'),
    //         'endpoint' => 'https://nyc3.digitaloceanspaces.com',
    //         'credentials' => [
    //             'key' => env('DO_SPACES_KEY'),
    //             'secret' => env('DO_SPACES_SECRET'),
    //         ],
    //     ]);

    //     // Download the file from your Space
    //     $contents = $client->getObject([
    //         'Bucket' => env('DO_SPACES_BUCKET'),
    //         'Key' => 'test.txt',
    //     ])['Body'];

    //     return $contents;
    // }
 
}

