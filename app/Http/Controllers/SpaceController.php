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
    
    public function uploadCoverImageToSpace($coverImageURL)
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

        // Set the User-Agent header (needed for calling API from the server)
        $context = stream_context_create([
            'http' => [
                'user_agent' => 'Regex Records(Laravel Student Project)',
            ],
        ]);

        // Get the contents of the cover image from the URL
        $fileContents = file_get_contents($coverImageURL, false, $context);

        // Generate a unique filename for the image
        $fileName = md5(uniqid()) . '.jpg';

        // Upload the image to your Space
        $result = $client->putObject([
            'Bucket' => env('DO_SPACES_BUCKET'),
            'Key' => $fileName,
            'Body' => $fileContents,
            'ContentType' => 'image/jpeg',
            'ACL' => 'public-read',
        ]);

        // Return the URL of the uploaded image
        return $result['ObjectURL'];
    }
 
}

