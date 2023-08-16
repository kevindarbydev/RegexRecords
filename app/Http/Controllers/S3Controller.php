<?php

namespace App\Http\Controllers;

require_once '../vendor/autoload.php';

use Illuminate\Support\Facades\Storage;
use Cloudinary\Cloudinary;
use Cloudinary\Transformation\Resize;
use GuzzleHttp\Psr7;
use GuzzleHttp\Client as GuzzleClient;
use GuzzleHttp\HandlerStack;
use GuzzleHttp\Middleware;
use Aws\S3\S3Client;
use Illuminate\Http\Request;

class S3Controller extends Controller
{

    public function index()
    {
        return view('testPage');
    }

    // public function uploadCoverImageToSpace($coverImageURL)
    // {
    //     //replace cloudinary with AWS S3

    //     $cloudinary = new Cloudinary(
    //         [
    //             'cloud' => [
    //                 'cloud_name' => env('CLOUDINARY_NAME'),
    //                 'api_key'    => env('CLOUDINARY_KEY'),
    //                 'api_secret' => env('CLOUDINARY_SECRET'),
    //             ],
    //         ]
    //     );
    //     $fileName = substr(md5(uniqid()), 0, 8);

    //     $cloudinary->uploadApi()->upload(
    //         $coverImageURL,
    //         ['public_id' => $fileName]
    //     );

    //     return $cloudinary->image($fileName)->toUrl();
    // }

    public function uploadCoverImageToS3($coverImageURL)
    {
        $s3 = new S3Client([
            'version' => 'latest',
            'region' => env('AWS_DEFAULT_REGION'),
            'credentials' => [
                'key' => env('AWS_ACCESS_KEY_ID'),
                'secret' => env('AWS_SECRET_ACCESS_KEY'),
            ],
        ]);

        $bucket = env('AWS_BUCKET');
        $fileName = substr(md5(uniqid()), 0, 8);

        $s3->putObject([
            'Bucket' => $bucket,
            'Key' => $fileName,
            'Body' => file_get_contents($coverImageURL),
        ]);

        return $s3->getObjectUrl($bucket, $fileName);
    }
}
